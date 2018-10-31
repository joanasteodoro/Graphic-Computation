var scene, camera, renderer;
var camera1, camera2, camera3;

const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const ANGLE = Math.PI / 8;

function switchCamera(nCamera) {
    'use strict';
    camera = nCamera;
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    let ratio = window.innerWidth/window.innerHeight;


    if (window.innerHeight > 0 && window.innerWidth > 0) {
        let val = 1400/window.innerWidth;
        camera1.aspect = ratio;
        var vet = new THREE.Vector3(0,60,60);
        vet.multiplyScalar(val);
        camera1.position.x = vet.x;
        camera1.position.y = vet.y;
        camera1.position.z = vet.z;
        camera1.updateProjectionMatrix();

        camera3.aspect = ratio;
        var vet = new THREE.Vector3(-30, 15, 0);
        vet.multiplyScalar(val);
        camera3.position.x = vet.x;
        camera3.position.y = vet.y;
        camera3.position.z = vet.z;
        camera3.updateProjectionMatrix();
    }

    if (ratio > 1) {
        camera2.left = -ratio * ASPECT_RATIO / 2;
        camera2.right = ratio * ASPECT_RATIO / 2;
        camera2.top = ASPECT_RATIO / 2;
        camera2.bottom = -ASPECT_RATIO / 2;
    }
    else {
        camera2.left = -ASPECT_RATIO / 2;
        camera2.right = ASPECT_RATIO / 2;
        camera2.top = ASPECT_RATIO / (2 * ratio);
        camera2.bottom = -ASPECT_RATIO / (2 * ratio);
    }
    camera2.updateProjectionMatrix();
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

        // rotate around y - green axis
        case 38: // up arrow
            scene.getPlane().rotateY(-ANGLE);
            break;
        case 40: // down arrow
            scene.getPlane().rotateY(ANGLE);
            break;

        // rotate around z - blue axis
        case 39: // right arrow
            scene.getPlane().rotateZ(-ANGLE);
            break;
        case 37: // left arrow
            scene.getPlane().rotateZ(ANGLE);
            break;

        // change shading between Gouraud (diffuse) and Phong
        case 71: //G
        case 103: //g
            scene.getPlane().changeShading();
            break;

        // activate/deactivate illumination calculation
        case 76: //L
        case 108: //l
            scene.getPlane().onOffLight();
            break;

        // turn on/off sun light
        case 78: //N
        case 110: //n
            scene.getSun().onOffSunLight();
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

    scene = new Scene(window.innerWidth, window.innerHeight);

    // adjust cameras
    camera1 = new PerspectiveCamera(10, 10, 0, 0, 0, 0); // Upper camera #1
    camera2 = new PerspectiveCamera(0, 10, 10, 0, 0, 0); // Allows to see the whole terrain #2
    camera3 = new PerspectiveCamera(10, 0, 10, 0, 0, 0); // Same as #2 but mobile #3
    switchCamera(camera1);

    render();

    window.addEventListener("keydown", onKeyDown);

    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    render();
    requestAnimationFrame(animate);
}
