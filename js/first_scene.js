var scene, camera, renderer;

var chair;

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    createTable(scene, 0, 29, 0);  /*reference point is the table top center*/
    chair = createChair(scene, 0, 16, 20); /*reference point is the chair seat center*/
    createLamp(scene, -34, 0, 0); /*reference point is the lamp base center*/
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = 0;
    camera.lookAt(scene.position);
}

function createCamera2() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 100;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(scene.position);
}

function createCamera3() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
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
var amountOfMovementKeysPressed = 0;

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
        amountOfMovementKeysPressed++;
    }
    //up arrow
    if(keyMap[38]){
        chair.userData.up = true;
        movementKeyPressed = true;
        amountOfMovementKeysPressed++;
    }
    //right arrow
    if(keyMap[39]){
        chair.userData.right = true;
        movementKeyPressed = true;
        amountOfMovementKeysPressed++;
    }
    //down arrow
    if(keyMap[40]){
        chair.userData.down = true;
        movementKeyPressed = true;
        amountOfMovementKeysPressed++;
    }
}

function onKeyReleased() {
    'use strict';

    var keyCode = event.keyCode;
    keyMap[keyCode] = false;

    if (keyCode == 37) {
        chair.userData.left = false;
        movementKeyPressed = false;
        amountOfMovementKeysPressed--;
    }
    if (keyCode == 38) {
        chair.userData.up = false;
        movementKeyPressed = false;
        amountOfMovementKeysPressed--;
    }
    if (keyCode == 39) {
        chair.userData.right = false;
        movementKeyPressed = false;
        amountOfMovementKeysPressed--;
    }
    if (keyCode == 40) {
        chair.userData.down = false;
        movementKeyPressed = false;
        amountOfMovementKeysPressed--;
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

function animate() {
    'use strict';
    if (movementKeyPressed == true) {
        if (chair.userData.acceleration < chair.userData.maximumVel)
            chair.userData.acceleration += 0.04;
        if (chair.userData.left) {
            chair.position.x -= 1 * chair.userData.acceleration;
            chair.lastMoves.counterLeft++;
        }
        if (chair.userData.up) {
            chair.position.z -= 1 * chair.userData.acceleration;
            chair.lastMoves.counterUp++;
        }
        if (chair.userData.right) {
            chair.position.x += 1 * chair.userData.acceleration;
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
      console.log('acelaracao: ' + chair.userData.acceleration);
      console.log('left: ' + chair.lastMoves.counterLeft);
      console.log('up: ' + chair.lastMoves.counterUp);
      console.log('right: ' + chair.lastMoves.counterRight);
      console.log('down: ' + chair.lastMoves.counterDown);
        chair.userData.acceleration -= 0.04;
        if (chair.lastMoves.counterLeft > 0) {
            chair.lastMoves.counterLeft--;
            chair.position.x -= 1 * chair.userData.acceleration;
        }
        if (chair.lastMoves.counterUp > 0) {
            chair.lastMoves.counterUp--;
            chair.position.z -= 1 * chair.userData.acceleration;
        }
        if (chair.lastMoves.counterRight > 0) {
            chair.lastMoves.counterRight--;
            chair.position.x += 1 * chair.userData.acceleration;
        }
        if (chair.lastMoves.counterDown > 0) {
            chair.lastMoves.counterDown--;
            chair.position.z += 1 * chair.userData.acceleration;
        }
    }
    else {
        chair.lastMoves.counterLeft = 0;
        chair.lastMoves.counterUp = 0;
        chair.lastMoves.counterRight = 0;
        chair.lastMoves.counterDown = 0;
        chair.userData.acceleration = 0;
    }

    render();

    requestAnimationFrame(animate);
}
