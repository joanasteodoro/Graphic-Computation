class Game {
    constructor(windowWidth, windowHeight) {
        this.scene = new Scene(window.innerWidth, window.innerHeight);
        this.camera = new PerspectiveCamera(10, 10, 0, 0, 0, 0);
        this.controls = new THREE.OrbitControls(this.camera);
        this.chessBoard = new Board(this);
        this.scene.add(this.chessBoard);
    }

    getScene() {
        return this.scene;
    }

    getCamera() {
        return this.camera;
    }

    getControls() {
        return this.controls;
    }

}