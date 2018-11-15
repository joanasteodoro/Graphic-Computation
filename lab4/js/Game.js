class Game {
    constructor(windowWidth, windowHeight) {
        this.scene = new Scene(window.innerWidth, window.innerHeight);
        this.camera = new PerspectiveCamera(5, 5, 0, 0, 0, 0);
        this.camera2 = new OrthographicCamera(0, 100, 0);
        this.currentCamera = this.camera;
        this.controls = new THREE.OrbitControls(this.currentCamera);
        this.directionalLight = new DirectionalLight(3, 5, 3);
        this.pointLight = new PointLight(0, 5, 0);
        this.chessBoard = new Board();
        //this.magicCube = new this.magicCube();
        //this.ball = new Ball(1, 1, 1, 0.5, 0.5, 0, 0);
        this.scene.add(this.chessBoard.getMesh());
        //this.scene.add(this.ball.getBallMesh());
        this.scene.add(this.directionalLight);
        this.scene.add(this.pointLight);
    }

    getScene() {
        return this.scene;
    }

    getCamera() {
        return this.camera;
    }

    getCamera2(){
      return this.camera2;
    }

    getCurrentCamera(){
      return this.currentCamera;
    }

    getBall(){
      return this.ball;
    }

    getControls() {
        return this.controls;
    }

    getDirectionalLight() {
        return this.directionalLight;
    }
  
    getPointLight() {
        return this.pointLight;
    }

    switchCamera(nCamera) {
        'use strict';
        this.currentCamera = nCamera;
        this.controls = new THREE.OrbitControls(this.currentCamera);
    }

}
