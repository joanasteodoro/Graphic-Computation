var scene, camera, renderer;
var camera1, camera2, camera3;

var balls;
const N_BALLS = 10;

var time = new THREE.Clock();
var delta, sinceBeginning;
var incrementFlag = false;
var level, levelAux;

const ASPECT_RATIO = window.innerWidth / window.innerHeight;

function switchCamera(nCamera) {
    'use strict';
    camera = nCamera;
}

function onResize() {
    'use strict';

    var newDimensions = scene.resize(window.innerWidth, window.innerHeight, ASPECT_RATIO);
    /*camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newDimensions.width, newDimensions.height);*/

	if ( ASPECT_RATIO > ( window.innerWidth / window.innerHeight ) ) {

		camera.left   = ( window.innerHeight * ASPECT_RATIO ) / -50;
		camera.right  = ( window.innerHeight * ASPECT_RATIO ) /  50;
		camera.top    = window.innerHeight / 50;
		camera.bottom = window.innerHeight / -50;

	} else {

		camera.left   = window.innerWidth / -50;
		camera.right  = window.innerWidth /  50;
		camera.top    = ( window.innerWidth / ASPECT_RATIO ) / 50;
		camera.bottom = ( window.innerWidth / ASPECT_RATIO ) / -50;

	}

	camera.updateProjectionMatrix();
    renderer.setSize(newDimensions.width, newDimensions.height);
}

function onKeyDown(e) {
    'use strict';

    var keyCode = e.keyCode;
    switch(keyCode) {

        case 49: // 1
            switchCamera(camera1);
            break;

        case 50: // 2
            switchCamera(camera2);
            break;

        case 51: // 3
            switchCamera(camera3);
            break;

        case 69: // e or E
            for (let i = 0; i < 10; i++) {
                balls[i].switchAxisVisibility();
            }

        default:
             break;

    }
}

function render() {
    'use strict';

    renderer.render(scene, camera);
}

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new Scene(N_BALLS);
    balls = scene.getBalls();

    // adjust cameras
    camera1 = new OrthographicCamera(0, 100, 0); // Upper camera #1
    camera2 = new PerspectiveCamera(); // Allows to see the whole terrain #2
    camera2.setPosition(17, 20, 20);
    camera2.setLookAt(0, 0, 0);
    camera3 = balls[0].getCamera(); // Same as #2 but mobile #3
    switchCamera(camera1);

    time.start();

    render();

    window.addEventListener("keydown", onKeyDown);

    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    delta = time.getDelta();
    sinceBeginning = time.getElapsedTime();
    levelAux = level;
    level = (sinceBeginning / 3)|0; // forces the result to be an integer
    if (levelAux != level && level != 0 && sinceBeginning != 0) {
        incrementFlag = true;
    }

    for (let i = 0; i < N_BALLS; i++) {
        if (incrementFlag == true) {
            balls[i].setVelocity(new THREE.Vector3(balls[i].getVelocityX() + 0.5, 0, balls[i].getVelocityZ() + 1));
            balls[i].rotateBall();
        }

        // colisoes com as paredes
        scene.collisionWithWalls(i);
        //balls[i].ballRolling();
        balls[i].rotateBall();

        // colisoes com as outras bolas
        for (let j = i + 1; j < N_BALLS; j++) {
            scene.setFlagsBallToBallCollision(i, j)
        }
        scene.checkBallWithinBounds(i);
    }

    for (let i = 0; i < N_BALLS; i++) {
        var ballColliding = balls[i].getBallColliding();
        if(ballColliding != -1) {
            var newVelX = balls[ballColliding].getVelocityX();
            var newVelY = balls[ballColliding].getVelocityY();
            var newVelZ = balls[ballColliding].getVelocityZ();

            var currentVelX = balls[i].getVelocityX();
            var currentVelY = balls[i].getVelocityY();
            var currentVelZ = balls[i].getVelocityZ();

            var difVelX = (currentVelX - newVelX);
            var difVelY = (currentVelY - newVelY)
            var prod = (currentVelX - newVelX) * (balls[i].getPositionX() - balls[ballColliding].getPositionX()) +
                (currentVelY - newVelY) * (balls[i].getPositionY() - balls[ballColliding].getPositionY()) +
                (currentVelZ - newVelZ) * (balls[i].getPositionZ() - balls[ballColliding].getPositionZ());

            var prod2 = (newVelX - currentVelX) * (balls[ballColliding].getPositionX() - balls[i].getPositionX()) +
                (newVelY - currentVelY) * (balls[ballColliding].getPositionY() - balls[i].getPositionY()) +
                (newVelZ - currentVelZ) * (balls[ballColliding].getPositionZ() - balls[i].getPositionZ());


            balls[i].setVelocityX((balls[i].getVelocityX() - (prod
                /scene.ballToBallDistance(i, ballColliding))*(balls[i].getPositionX() - balls[ballColliding].getPositionX())));

            balls[i].setVelocityY(-newVelY);

            balls[i].setVelocityZ((balls[i].getVelocityZ() - (prod
                /scene.ballToBallDistance(i, ballColliding))*(balls[i].getPositionZ() - balls[ballColliding].getPositionZ())));

            balls[ballColliding].setVelocityX(-(balls[ballColliding].getVelocityX() - (prod2
                /scene.ballToBallDistance(ballColliding, i))*(balls[ballColliding].getPositionX() - balls[i].getPositionX())));

            balls[ballColliding].setVelocityY(-currentVelY);

            balls[ballColliding].setVelocityZ(-(balls[ballColliding].getVelocityZ() - (prod2
                /scene.ballToBallDistance(ballColliding, i))*(balls[ballColliding].getPositionZ() - balls[i].getPositionZ())));

            balls[i].rotateBall();
            balls[ballColliding].rotateBall();

            balls[i].setBallColliding(-1);
            balls[ballColliding].setBallColliding(-1);

            scene.checkBallInsideBall(i, ballColliding);
        }
        scene.checkBallWithinBounds(i);
    }

    for(let i = 0; i < N_BALLS; i++) {
        scene.updateBallPosition(i, delta);
        //balls[i].ballRolling();
        balls[i].rotateBall();
        scene.checkBallWithinBounds(i);
    }

    incrementFlag = false;

    render();
    requestAnimationFrame(animate);
}
