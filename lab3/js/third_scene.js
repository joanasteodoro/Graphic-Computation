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

    //var newDimensions = scene.resize(window.innerWidth, window.innerHeight, ASPECT_RATIO);

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
    //renderer.setSize(newDimensions.width, newDimensions.height);
    renderer.setSize(window.innerWidth, window.innerHeight);
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
