var scene, camera, renderer;

var camera1, camera2, camera3;

var table, chair, lamp;

var keyMap = [];
var movementKeyPressed = false;
var movementKeyReleased = false;

var time = new THREE.Clock(); // timer used to determine the delta
var delta; // delta used to calc the velocity and position
var deslVector = new THREE.Vector3(0, 0, 0); // vector representing the delta pos

var cv, pv; // auxiliar var
var mayRotate = false;


function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color("rgb(247, 231, 207)");
    scene.add(new THREE.AxisHelper(50));

    table = new Table(scene, 0, 28, 0);  /*reference point is the table top center*/
    chair = new Chair(scene, 0, 16, 25); /*reference point is the chair seat center*/
    lamp = new Lamp(scene, -34, 0, 0); /*reference point is the lamp base center*/
}

function createCamera(x, y, z) {
    'use strict';
    var nCamera = new THREE.OrthographicCamera(window.innerWidth / -50,
                                         window.innerWidth / 50,
                                         window.innerHeight / 50,
                                         window.innerHeight / -50);
    nCamera.position.x = x;
    nCamera.position.y = y;
    nCamera.position.z = z;

    var vector;

    if(x == 100) {
        vector = new THREE.Vector3(0, 30, 0);
    }
    else if(y == 100) {
        vector = new THREE.Vector3(0, 0, 0);
    }
    else if(z == 100) {
        vector = new THREE.Vector3(0, 30, 0);
    }

    nCamera.lookAt(vector);

    return nCamera;
}

function switchCamera(nCamera) {
    'use strict';
    camera = nCamera;
}

function onResize() {
    'use strict';

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.left = window.innerWidth / -50;
        camera.right = window.innerWidth / 50;
        camera.top = window.innerHeight / 50;
        camera.bottom = window.innerHeight / -50;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

function onKeyDown(e) {
    'use strict';

    var keyCode = e.keyCode;
    keyMap[keyCode] = true;

    switch(keyCode) {
        case 65: // a
            scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) node.material.wireframe = !node.material.wireframe;
             });
            break;

        case 97: // A
            scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) node.material.wireframe = !node.material.wireframe;
             });
            break;

        case 49: // 1
            switchCamera(camera1);
            break;

        case 50: // 2
            switchCamera(camera2);
            break;

        case 51: // 3
            switchCamera(camera3);
            break;

        case 37: // left arrow
            chair.userData.left = true;
            movementKeyPressed = true;
            movementKeyReleased = false;
            chair.userData.leftRel = false;
            break;

        case 38: // up arrow
            chair.userData.up = true;
            movementKeyPressed = true;
            movementKeyReleased = false;
            chair.userData.upRel = false;
            break;

        case 39: // right arrow
            chair.userData.right = true;
            movementKeyPressed = true;
            movementKeyReleased = false;
            chair.userData.rightRel = false;
            break;

        case 40: // down arrow
            chair.userData.down = true;
            movementKeyPressed = true;
            movementKeyReleased = false;
            chair.userData.downRel = false;
            break;

        default:
             break;

    }
}

function onKeyReleased() {
    'use strict';

    var keyCode = event.keyCode;
    keyMap[keyCode] = false;

    switch(keyCode) {
        case 37: // left arrow
            chair.userData.left = false;
            movementKeyPressed = false;
            movementKeyReleased = true;
            chair.userData.leftRel = true;
            break;

        case 38: // up arrow
            chair.userData.up = false;
            movementKeyPressed = false;
            movementKeyReleased = true;
            chair.userData.upRel = true;
            break;

        case 39: // right arrow
            chair.userData.right = false;
            movementKeyPressed = false;
            movementKeyReleased = true;
            chair.userData.rightRel = true;
            break;

        case 40: // down arrow
            chair.userData.down = false;
            movementKeyPressed = false;
            movementKeyReleased = true;
            chair.userData.downRel = true;
            break;

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

    createScene();
    camera1 = createCamera(0, 100, 0); // eagle view
    camera2 = createCamera(0, 30, 100); // front view
    camera3 = createCamera(100, 30, 0); // side view
    switchCamera(camera1);

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyReleased);

    window.addEventListener("resize", onResize);
}

function updateChairPosition() {
    chair.position.x += deslVector.x;
    chair.position.y += deslVector.y;
    chair.position.z += deslVector.z;
}

function updateWheelsDirection() {
    if(mayRotate) { /* may rotate is a flag */
        chair.wheel1.rotation.y += (chair.getWheelsAngle());
        chair.wheel2.rotation.y += (chair.getWheelsAngle());
        chair.wheel3.rotation.y += (chair.getWheelsAngle());
        chair.wheel4.rotation.y += (chair.getWheelsAngle());
        chair.setWheelsAngle(0);
    }
    mayRotate = false;
}

function rotateObject() {
    var pivot = new THREE.Vector3(0, 1, 0);
    var vectorToPivot = chair.position.sub(pivot);
    var moveToPivot = new THREE.Matrix4().makeTranslation(vectorToPivot.x,
                                                      vectorToPivot.y,vectorToPivot.z);
    var rotation = new THREE.Matrix4().makeRotationY(Math.PI/2);
    var matrix = rotation.multiply(moveToPivot);
    chair.applyMatrix(matrix);
}

function animate() {
    'use strict';
    delta = time.getDelta();
    /* when no keys were pressed previously */
    if(chair.lastMoves.counterUp ==  0 && chair.lastMoves.counterDown == 0) {
        deslVector.x = 0;
        deslVector.y = 0;
        deslVector.z = 0;
        chair.setAcceleration(0);
        chair.setCurrentVelocity(0);
        chair.setPreviousVelocity(0);
        time.start();
    }

    /* when a key is pressed */
    if (movementKeyPressed) {
        /* up key*/
        if(chair.userData.up) {
            if(chair.getCurrentVelocity() < chair.getMaximumVelocity() &&
                chair.getCurrentVelocity() > chair.getMinimumVelocity()) {

                    chair.setAcceleration(-1);
                    chair.setPreviousVelocity(chair.getCurrentVelocity()); 
                    chair.setCurrentVelocity(chair.getCurrentVelocity() + chair.getAcceleration() * delta) // v = v0 + at

                    cv = chair.getCurrentVelocity();
                    pv = chair.getPreviousVelocity();
                  
                    deslVector.z += ((cv+pv)*delta/2)*Math.cos(chair.getAngleToMove());
                    deslVector.x += ((cv+pv)*delta/2)*Math.sin(chair.getAngleToMove());
                    
                    updateChairPosition();
                    updateWheelsDirection();
                    chair.lastMoves.counterUp++; 
            }
        }
        if(chair.userData.down) {
            if(chair.getCurrentVelocity() < chair.getMaximumVelocity() &&
                chair.getCurrentVelocity() > chair.getMinimumVelocity()) {
                
                    chair.setAcceleration(1);
                    chair.setPreviousVelocity(chair.getCurrentVelocity()); 
                    chair.setCurrentVelocity(chair.getCurrentVelocity() + chair.getAcceleration() * delta) // v = v0 + at

                    cv = chair.getCurrentVelocity();
                    pv = chair.getPreviousVelocity();
                  
                    deslVector.z += ((cv+pv)*delta/2)*Math.cos(chair.getAngleToMove());
                    deslVector.x += ((cv+pv)*delta/2)*Math.sin(chair.getAngleToMove());
                    
                    updateChairPosition();
                    updateWheelsDirection();
                    chair.lastMoves.counterDown++;
            }
            console.log(chair.getCurrentVelocity());
        }
        if(chair.userData.left) {
            chair.rotateUpperChair(1); // rotates the chair
            chair.setAngleToMove(chair.getAngleToMove() + (Math.PI / 32));
            chair.setWheelsAngle(chair.getWheelsAngle() + (Math.PI / 32));
            mayRotate = true;

        }
        if(chair.userData.right) {
            chair.rotateUpperChair(-1); // rotates the chair
            chair.setAngleToMove(chair.getAngleToMove() - (Math.PI / 32));
            chair.setWheelsAngle(chair.getWheelsAngle() - (Math.PI / 32));
            mayRotate = true;
        }
    }
    /* when a key is released */
    else if(movementKeyReleased) {
        /* up key */
        if(chair.userData.upRel) {         
            if(chair.getCurrentVelocity() < 0) {
                chair.setAcceleration(2);
                chair.setPreviousVelocity(chair.getCurrentVelocity()); 
                chair.setCurrentVelocity(chair.getPreviousVelocity() + chair.getAcceleration() * delta); // v = v0 + at

                cv = chair.getCurrentVelocity();
                pv = chair.getPreviousVelocity();
                  
                deslVector.z += ((cv+pv)*delta/2)*Math.cos(chair.getAngleToMove());
                deslVector.x += ((cv+pv)*delta/2)*Math.sin(chair.getAngleToMove());
                    
                updateChairPosition();
                updateWheelsDirection();
                chair.lastMoves.counterUp -= 2;
            }
            else chair.lastMoves.counterUp = 0;
        }
        if(chair.userData.downRel) {
            if(chair.getCurrentVelocity() > 0) {
                chair.setAcceleration(-2);
                chair.setPreviousVelocity(chair.getCurrentVelocity()); 
                chair.setCurrentVelocity(chair.getPreviousVelocity() + chair.getAcceleration() * delta); // v = v0 + at

                cv = chair.getCurrentVelocity();
                pv = chair.getPreviousVelocity();
                  
                deslVector.z += ((cv+pv)*delta/2)*Math.cos(chair.getAngleToMove());
                deslVector.x += ((cv+pv)*delta/2)*Math.sin(chair.getAngleToMove());
                    
                updateChairPosition();
                updateWheelsDirection();
                chair.lastMoves.counterDown -= 2;
            }
            else {
                chair.lastMoves.counterDown = 0;
            }
        }
        updateChairPosition();
    }

    render();
    requestAnimationFrame(animate);
}
