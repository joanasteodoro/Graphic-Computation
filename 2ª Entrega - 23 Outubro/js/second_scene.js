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

function computePosition(ball, delta) {
    var posX = ball.getPositionX() + (ball.getVelocity() * delta * Math.sin(ball.getRealAngle()));
    var posZ = ball.getPositionZ() + (ball.getVelocity() * delta * Math.cos(ball.getRealAngle()));
    tentativePos = new THREE.Vector3(posX, ball.getPositionY(), posZ);
    return tentativePos;
}

function checkLimits(tentativePos, ball) {
    var posX = tentativePos.x;
    var posZ = tentativePos.z;

    if(tentativePos.x - ball.getRadius() < -15) {
        posX = -15 + ball.getRadius();
    }
    if(tentativePos.x + ball.getRadius() > 15) {
        posX = 15 - ball.getRadius();
    }
    if(tentativePos.z + ball.getRadius() > 7.5) {
        posZ = 7.5 - ball.getRadius();
    }
    if(tentativePos.z - ball.getRadius() < - 7.5) {
        posZ = -7.5 + ball.getRadius();
    }
    newPosition = new THREE.Vector3(posX, tentativePos.y, posZ);
    return newPosition
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

    //for (let i = 0; i < 10; i++) {
        if (incrementFlag == true) {
            balls[0].setVelocity(balls[0].getVelocity() + 1);
        }

        //colisoes
        var distance = scene.ballsToWallSum(0);
        var ballToWallLeft = scene.ballsToWallLeftDistance(0);
        var ballToWallRight = scene.ballsToWallRightDistance(0);
        var ballToWallUp = scene.ballsToWallUpDistance(0);
        var ballToWallDown = scene.ballsToWallDownDistance(0);
        
        if(balls[0].mayRotateFlag) {
            console.log('colisão')
            var tentativePosition;
            var currentPosition;

            if(distance > ballToWallUp) {
                console.log('wallUp')
                tentativePosition = computePosition(balls[0], delta);
                currentPosition = checkLimits(tentativePosition, balls[0]);
                balls[0].setPositionX(currentPosition.x);
                balls[0].setPositionZ(currentPosition.z);
                
                if(balls[0].getRealAngle() < (Math.PI / 2)) {
                    let relAng = (Math.PI / 2 - balls[0].getRealAngle());
                    let angle = 2 * (Math.PI / 2 - relAng);
                    balls[0].rotateY(0 - angle);
                    balls[0].setRealAngle((0 - angle)/2);
                } else {
                    console.log('maior que 90');
                    let relAng = (balls[0].getRealAngle() - Math.PI / 2);
                    let angle = 2 * (Math.PI / 2 - relAng);
                    balls[0].rotateY(angle);
                    balls[0].setRealAngle((0-Math.PI) + angle / 2);
                }
                console.log('new angle:' + balls[0].getRealAngle()*180/Math.PI);
            }
            else if(distance > ballToWallDown) {
                tentativePosition = computePosition(balls[0], delta);
                currentPosition = checkLimits(tentativePosition, balls[0]);
                balls[0].setPositionX(currentPosition.x);
                balls[0].setPositionZ(currentPosition.z);

                //let angle = (Math.PI - 2 * (Math.PI / 2 + balls[0].getRotationY()));
                if(balls[0].getRealAngle() < (0 - Math.PI / 2)) {
                    let relAng = (0 - balls[0].getRealAngle()) - (Math.PI / 2);
                    let angle = 2 * (Math.PI / 2 - relAng);
                    balls[0].rotateY(0 - angle);
                    balls[0].setRealAngle(Math.PI - angle / 2);
                } else {
                    let relAng = (Math.PI / 2 - (0 - balls[0].getRealAngle()));
                    let angle = 2 * (Math.PI / 2 - relAng);
                    balls[0].rotateY(angle);
                    balls[0].setRealAngle(angle/2);
                }
                console.log(balls[0].getRealAngle()*180/Math.PI);
            }
            else if(distance > ballToWallLeft) {
                tentativePosition = computePosition(balls[0], delta);
                currentPosition = checkLimits(tentativePosition, balls[0]);
                balls[0].setPositionX(currentPosition.x);
                balls[0].setPositionZ(currentPosition.z);

                if(balls[0].getRealAngle() < 0) {
                    let relAng = (0 - balls[0].getRealAngle() - Math.PI / 2);
                    let angle = 2 * relAng;
                    balls[0].rotateY(0 - angle);
                    balls[0].setRealAngle((0-Math.PI/2) - angle/2);
                    console.log(balls[0].getRealAngle()*180/Math.PI);
                } 
                else {
                    let relAng = balls[0].getRealAngle() - Math.PI /2;
                    let angle = 2 * (Math.PI - relAng);
                    balls[0].rotateY(0-angle)
                    balls[0].setRealAngle(angle / 2);
                    console.log(balls[0].getRealAngle()*180 / Math.PI);
                }
            } 
            else if(distance > ballToWallRight) {
                tentativePosition = computePosition(balls[0], delta);
                currentPosition = checkLimits(tentativePosition, balls[0]);
                balls[0].setPositionX(currentPosition.x);
                balls[0].setPositionZ(currentPosition.z);

                if(balls[0].getRealAngle() < 0) {
                    let relAng = (Math.PI / 2 - (0 - balls[0].getRealAngle()));
                    let angle = 2 * relAng;
                    balls[0].rotateY(0 - angle);
                    balls[0].setRealAngle((0-Math.PI/2) - angle/2);
                    console.log(balls[0].getRealAngle()*180/Math.PI);
                } 
                else {
                    let relAng = (Math.PI / 2 - balls[0].getRealAngle());
                    let angle = 2 * relAng;
                    balls[0].rotateY(angle)
                    balls[0].setRealAngle(Math.PI / 2 + angle / 2);
                    console.log(balls[0].getRealAngle()*180 / Math.PI);
                } 
            }
            balls[0].translateX(balls[0].getVelocity() * delta);
            balls[0].mayRotateFlag = false;
        }
        else {
            balls[0].translateX(balls[0].getVelocity() * delta);
            balls[0].mayRotateFlag = true;
        }

        // colisoes com as outras bolas
        /*for (let j = i + 1; j < 10; j++) {
            var distanceToBall = scene.ballToBallSum(i, j);
            var ballToBall = scene.ballToBallDistance(i, j);

            if(balls[i].mayRotateFlag) {
                var tentativePositionBalls;
                var currentPositionBalls;

                if(distanceToBall > ballToBall) {
                    tentativePositionBalls = computePosition(balls[i], delta);
                    currentPositionBalls = checkLimits(tentativePositionBalls, balls[i]);
                    balls[i].setPositionX(currentPositionBalls.x);
                    balls[i].setPositionZ(currentPositionBalls.z);

                    let angle = (Math.PI - 2 * (Math.PI / 2 - balls[i].getRotationY()));
                    if(balls[i].getRealAngle() < (Math.PI / 2)) {
                        balls[i].rotateY(0 - angle);
                        balls[i].setRealAngle(0 - angle);
                    } else {
                        balls[i].rotateY(angle);
                        balls[i].setRealAngle(angle);
                    }
                }
            }
            else {
                balls[i].translateX(balls[i].getVelocity() * delta);
                balls[i].mayRotateFlag = true;
            }*/
        //}
    //}
    incrementFlag = false;

    render();
    requestAnimationFrame(animate);
}
