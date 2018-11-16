var game, camera, renderer;
var controls;
var time = new THREE.Clock(); // timer used to determine the delta
var delta = 0; // delta used to calc the velocity and position
var id;

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

function onKeyDown(e) {
    'use strict';

    var keyCode = e.keyCode;
    
    switch(keyCode) {
      case 83: //s
        pauseTime();
        game.pauseUnpauseGame(id);
        break;

      case 68: //d
        game.getDirectionalLight().onOffLight();
        break;

      case 80: //p
        game.getPointLight().onOffLight();
        break;

      case 87: //w
        game.getScene().traverse(function (node) {
          if (node instanceof THREE.Mesh) node.material.wireframe = !node.material.wireframe;
        });
        break;

      // activate/deactivate illumination calculation
      case 76: //L
      case 108: //l
        game.switchMeshLightFlag();
        break;

      case 66: //b
        game.getBall().startStopMovement();
        break;

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
    requestAnimationFrame(animate);
}

function pauseTime() {
  time.stop();
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
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    delta = time.getDelta();

    game.getBall().updateMovement(delta);
    game.rotateBall();
    //game.getBall().getMesh().rotateY(0.01);
    controls.update();
    render();
    id = requestAnimationFrame(animate);
}
