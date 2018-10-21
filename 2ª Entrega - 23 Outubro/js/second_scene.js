var scene, camera, renderer;
var camera1, camera2, camera3;

var balls;

var time = new THREE.Clock();
var delta, sinceBeginning;
var incrementFlag = false;
var level, levelAux;

const ASPECT_RATIO = window.innerWidth / window.innerHeight;

function switchCamera(nCamera) {
    'use strict';
    camera = nCamera;
}

// CHANGE FUNCTION ONRESIZE
function onResize() {
    'use strict';

    var newDimensions = scene.resize(window.innerWidth, window.innerHeight, ASPECT_RATIO);
    camera.aspect = window.innerWidth / window.innerHeight;
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

    scene = new Scene();

    balls = scene.getBalls();

    camera1 = new OrthographicCamera(0, 100, 0); // Upper camera #1
    camera2 = new PerspectiveCamera(15, 20, 10); // Allows to see the whole terrain #2
    camera3 = new PerspectiveCamera(100, 30, 0); // Same as #2 but mobile #3
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

    for (let i = 0; i < 10; i++) {
        if (incrementFlag == true) {
            balls[0].setVelocity(balls[i].getVelocity() + 1);
        }

        //colisoes
        var distance = scene.ballsToWallSum(i);
        var ballToWallLeft = scene.ballsToWallLeftDistance(i);
        var ballToWallRight = scene.ballsToWallRightDistance(i);
        var ballToWallUp = scene.ballsToWallUpDistance(i);
        var ballToWallDown = scene.ballsToWallDownDistance(i);

        if(balls[i].mayRotateFlag) {
            if(distance > ballToWallUp || distance > ballToWallDown) {
                let angle = (Math.PI - 2 * (Math.PI / 2 - balls[i].getRotationY()));
                if(balls[i].getRotationY() < Math.PI / 2) balls[i].rotateY(0 - angle);
                else balls[i].rotateY(angle)
            }
            else if(distance > ballToWallLeft || distance > ballToWallRight) {
                let angle = (2 * (Math.PI / 2 - balls[i].getRotationY()));
                if(balls[i].getRotationY() < (0 - Math.PI / 2)) balls[i].rotateY(0 - angle);
                else balls[i].rotateY(angle)
            }
            balls[i].translateX(balls[i].getVelocity() * delta);
            balls[i].mayRotateFlag = false;
        }
        else {
            balls[i].translateX(balls[i].getVelocity() * delta);
            balls[i].mayRotateFlag = true
        }
    }
    incrementFlag = false;
    render();
    requestAnimationFrame(animate);
}
