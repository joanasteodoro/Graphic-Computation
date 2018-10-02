var scene, camera, renderer;

var table, chair, lamp;

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(50));

    table = new Table(scene, 0, 29, 0);  /*reference point is the table top center*/
    chair = new Chair(scene, 0, 16, 25); /*reference point is the chair seat center*/
    lamp = new Lamp(scene, -34, 0, 0); /*reference point is the lamp base center*/
}

function createCamera() {
    'use strict';
    camera = new THREE.OrthographicCamera(window.innerWidth / -50,
                                         window.innerWidth / 50,
                                         window.innerHeight / 50,
                                         window.innerHeight / -50);
    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = 0;
    camera.lookAt(scene.position);

    //camera.rotation.y = 90 * Math.PI / 180;
}

function createCamera2() {
    'use strict';
    camera = new THREE.OrthographicCamera(window.innerWidth / -50,
                                         window.innerWidth / 50,
                                         window.innerHeight / 50,
                                         window.innerHeight / -50);
    camera.position.x = 100;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(scene.position);
}

function createCamera3() {
    'use strict';
    camera = new THREE.OrthographicCamera(window.innerWidth / -50,
                                         window.innerWidth / 50,
                                         window.innerHeight / 50,
                                         window.innerHeight / -50);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100;
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}

var keyMap = [];
var movementKeyPressed = false;

function onKeyDown(e) {
    'use strict';

    var keyCode = e.keyCode;
    keyMap[keyCode] = true;

    //a or A
    if (keyMap[65] || keyMap[97]) {
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
              node.material.wireframe = !node.material.wireframe;
            }
        });
    }
    //1
    if (keyMap[49]) {
        createCamera();
    }
    //2
    if (keyMap[50]) {
        createCamera2();
    }
    //3
    if (keyMap[51]) {
        createCamera3();
    }
    //left arrow
    if(keyMap[37]){
        chair.userData.left = true;
        movementKeyPressed = true;
    }
    //up arrow
    if(keyMap[38]){
        chair.userData.up = true;
        movementKeyPressed = true;
    }
    //right arrow
    if(keyMap[39]){
        chair.userData.right = true;
        movementKeyPressed = true;
    }
    //down arrow
    if(keyMap[40]){
        chair.userData.down = true;
        movementKeyPressed = true;
    }
}

function onKeyReleased() {
    'use strict';

    var keyCode = event.keyCode;
    keyMap[keyCode] = false;

    if (keyCode == 37) {
        chair.userData.left = false;
        movementKeyPressed = false;
    }
    if (keyCode == 38) {
        chair.userData.up = false;
        movementKeyPressed = false;
    }
    if (keyCode == 39) {
        chair.userData.right = false;
        movementKeyPressed = false;
    }
    if (keyCode == 40) {
        chair.userData.down = false;
        movementKeyPressed = false;
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
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyReleased);

    window.addEventListener("resize", onResize);
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

    if (movementKeyPressed == true) {
        if (chair.userData.acceleration < chair.userData.maximumVel)
            chair.userData.acceleration += 0.04;
        if (chair.userData.left) {
            //rotateObject();
            //let axis = new THREE.Vector3(0,2,0);
            //chair.rotateOnAxis(axis, Math.PI/8);
            //chair.rotation.y -= Math.PI/2;
            //chair.rotateY(Math.PI/8)
            //chair.rotateChairWheels(1);
            chair.rotateChair(1);
            chair.lastMoves.counterLeft++;
        }
        if (chair.userData.up) {
            chair.position.z -= 1 * chair.userData.acceleration;
            chair.lastMoves.counterUp++;
        }
        if (chair.userData.right) {
            //chair.rotation.y += Math.PI/2;
            chair.rotateChairWheels(-1);
            chair.lastMoves.counterRight++;
        }
        if (chair.userData.down) {
            chair.position.z += 1 * chair.userData.acceleration;
            chair.lastMoves.counterDown++;
        }
    }

    else if ((chair.userData.acceleration > 0) && (chair.lastMoves.counterLeft +
              chair.lastMoves.counterUp + chair.lastMoves.counterRight +
              chair.lastMoves.counterDown > 0)) {

        chair.userData.acceleration -= 0.04;
        /*if (chair.lastMoves.counterLeft > 0) {
            chair.lastMoves.counterLeft--;
            chair.position.x -= 1 * chair.userData.acceleration;
        }*/
        if (chair.lastMoves.counterUp > 0) {
            chair.lastMoves.counterUp--;
            chair.position.z -= 1 * chair.userData.acceleration;
        }
        /*if (chair.lastMoves.counterRight > 0) {
            chair.lastMoves.counterRight--;
            chair.position.x += 1 * chair.userData.acceleration;
        }*/
        if (chair.lastMoves.counterDown > 0) {
            chair.lastMoves.counterDown--;
            chair.position.z += 1 * chair.userData.acceleration;
        }
    }
    /*else {
        chair.lastMoves.counterLeft = 0;
        chair.lastMoves.counterUp = 0;
        chair.lastMoves.counterRight = 0;
        chair.lastMoves.counterDown = 0;
        chair.userData.acceleration = 0;
    }*/

    render();

    requestAnimationFrame(animate);
}
