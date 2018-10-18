var scene, camera, renderer;
var camera1, camera2, camera3;
var balls;
var time = new THREE.Clock();
var delta, sinceBeginning;
var incrementFlag = false;
var level, levelAux;

function switchCamera(nCamera) {
    'use strict';
    camera = nCamera;
}

// CHANGE FUNCTION ONRESIZE
function onResize() {
    'use strict';

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.left = window.innerWidth / -50;
        camera.right = window.innerWidth / 50;
        camera.top = window.innerHeight / 50;
        camera.bottom = window.innerHeight / -50;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.aspect = firstWidth / firstHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }
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
            balls[i].setVelocity(balls[i].getVelocity() + 1);
        }
        balls[i].translateX(balls[i].getVelocity() * delta);
    }
    incrementFlag = false;
    render();
    requestAnimationFrame(animate);
}
