var game, camera, renderer;
var controls;

const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const ANGLE = Math.PI / 32;

function onResize() {
  'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    let ratio = window.innerWidth/window.innerHeight;


    if (window.innerHeight > 0 && window.innerWidth > 0) {
        let val = 1400/window.innerWidth;
        camera1.aspect = ratio;
        var vet = new THREE.Vector3(10, 10, 0);
        vet.multiplyScalar(val);
        camera1.position.x = vet.x;
        camera1.position.y = vet.y;
        camera1.position.z = vet.z;
        camera1.updateProjectionMatrix();

        camera2.aspect = ratio;
        var vet = new THREE.Vector3(0, 10, 10);
        vet.multiplyScalar(val);
        camera2.position.x = vet.x;
        camera2.position.y = vet.y;
        camera2.position.z = vet.z;
        camera2.updateProjectionMatrix();

      }

}

function onKeyUp(e) {
    'use strict';

    var keyCode = e.keyCode;
    switch(keyCode) {
        /*
        case 38: // up arrow
            scene.setUpRotationFlag(false);
            break;
        case 40: // down arrow
            scene.setDownRotationFlag(false);
            break;
        case 39: // right arrow
            scene.setRightRotationFlag(false);
            break;
        case 37: // left arrow
            scene.setLeftRotationFlag(false);
            break;
        */
        default:
            break;
    }
}

function onKeyDown(e) {
    'use strict';

    var keyCode = e.keyCode;
    switch(keyCode) {
      case 83: //s
        game.switchCamera(game.getCamera2());
        break;
      case 68: //d
        scene.getDirectionalLight().onOffLight();
        break;
      case 80: //p
        scene.getPointLight().onOffLight();
        break;
      case 87: //w
        scene.traverse(function (node) {
          if (node instanceof THREE.Mesh) node.material.wireframe = !node.material.wireframe;
        });
        break;
      // activate/deactivate illumination calculation
      case 76: //L
      case 108: //l
        //scene.getPlane().onOffLight();
        //scene.getFloor().onOffLight();
        break;

      case 66: //b
      
        break;
        /*
        case 49: // 1
            scene.getSpotlight1().onOffSpotlight();
            break;

        case 50: // 2
            scene.getSpotlight2().onOffSpotlight();
            break;

        case 51: // 3
            scene.getSpotlight3().onOffSpotlight();
            break;

        case 52: // 4
            scene.getSpotlight4().onOffSpotlight();
            break;

        case 65: // a
            switchCamera(camera1);
            break;

        // rotate around z - blue axis
        case 38: // up arrow
            scene.setUpRotationFlag(true);
            break;
        case 40: // down arrow
            scene.setDownRotationFlag(true);
            break;

        // rotate around y - green axis
        case 39: // right arrow
            scene.setRightRotationFlag(true);
            break;
        case 37: // left arrow
            scene.setLeftRotationFlag(true);
            break;

        // change shading between Gouraud (diffuse) and Phong
        case 71: //G
        case 103: //g
            scene.getPlane().changeShading();
            scene.getFloor().changeShading();
            break;

        // activate/deactivate illumination calculation
        case 76: //L
        case 108: //l
            scene.getPlane().onOffLight();
            scene.getFloor().onOffLight();
            break;

        // turn on/off sun light
        case 78: //N
        case 110: //n
            scene.getSun().onOffSunLight();s
            break;
        */
       /* r - reset
       probably will need to check if the game is on pause
       */
        case 82:
            reset();
            break;

        default:
            break;

    }
}

function render() {
    'use strict';
    renderer.render(game.getScene(), game.getCurrentCamera());
}

function reset() {
    /* garbage colector will deal with the previous instance */
    game = new Game(window.innerWidth, window.innerHeight);
}

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  //  camera2 = new OrthographicCamera(0, 100, 0); // Allows to see the whole terrain #2
    /* instance of the game that will be renewed when 'reset' is pressed */
    game = new Game(window.innerWidth, window.innerHeight);
    controls = game.getControls();
    controls.update();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    controls.update();
    render();
    requestAnimationFrame(animate);
}
