class Game {
    constructor(windowWidth, windowHeight) {
        this.scene = new Scene(window.innerWidth, window.innerHeight);
        this.camera = new PerspectiveCamera(10, 10, 0, 0, 0, 0);
        this.camera2 = new OrthographicCamera(0, 100, 0);
        this.currentCamera = this.camera;
        this.controls = new THREE.OrbitControls(this.currentCamera);
        this.chessBoard = new Board(this);
        this.scene.add(this.chessBoard);
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

    getControls() {
        return this.controls;
    }

    switchCamera(nCamera) {
        'use strict';
        this.currentCamera = nCamera;
        this.controls = new THREE.OrbitControls(this.currentCamera);
    }

}
