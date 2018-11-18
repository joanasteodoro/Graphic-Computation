var game, camera, renderer;
var controls;
var time = new THREE.Clock(); // timer used to determine the delta
var delta = 0; // delta used to calc the velocity and position
var id;

const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const PLANE_HEIGHT = 10;
const ANGLE = Math.PI / 32;

function calcCameraSize() {
  'use strict'

  var scale = window.innerWidth / window.innerHeight;

  if(scale > ASPECT_RATIO) {
    var width = scale * PLANE_HEIGHT;
    var height = PLANE_HEIGHT;
  } else {
    var width = ASPECT_RATIO * PLANE_HEIGHT;
    var height = width / scale;
  }
  
  return [width, height];
}

function onResize() {
  'use strict';

    let ratio = window.innerWidth/window.innerHeight;
    var newD = calcCameraSize();

    if (window.innerHeight > 0 && window.innerWidth > 0) {
      game.getCamera().aspect = ratio;

      game.getCamera2().left = newD[0] / -2;
      game.getCamera2().right = newD[0] / 2;
      game.getCamera2().top = newD[1] / 2;
      game.getCamera2().bottom = newD[1] / -2;

      game.getCamera().updateProjectionMatrix();
      game.getCamera2().updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      if(!game.getIsRunningFlag())
        renderer.render(game.pauseScene, game.getCamera2());
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
        game.switchWireframe();
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
