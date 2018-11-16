class Game {
    constructor(windowWidth, windowHeight) {
        this.scene = new Scene(window.innerWidth, window.innerHeight);
        this.pauseScene = new Scene(window.innerWidth, window.innerHeight);
        this.objects = [];

        //flags
        this.meshLightFlag = 1; //phong material
        this.isRunning = true; //unpaused

        //cameras
        this.camera = new PerspectiveCamera(5, 5, 0, 0, 0, 0);
        this.camera2 = new OrthographicCamera(0, 10, 0);
        this.currentCamera = this.camera;
        this.controls = new THREE.OrbitControls(this.currentCamera);

        //lights
        this.directionalLight = new DirectionalLight(3, 5, 3);
        this.pointLight = new PointLight(0, 5, 0);

        //objects
        this.chessBoard = new Board(this.meshLightFlag, 0);
        this.objects.push(this.chessBoard);
        this.magicCube = new MagicCube(this.meshLightFlag);
        this.objects.push(this.magicCube);
        this.ball = new Ball(this.meshLightFlag);
        this.objects.push(this.ball);
        this.pivotPoint = new THREE.Object3D();
        this.pauseBoard = new Board(0, 1);
        this.objects.push(this.pauseBoard);

        this.magicCube.getMesh().add(this.pivotPoint);
        this.pivotPoint.add(this.ball.getMesh());

        this.scene.add(this.chessBoard.getMesh());
        this.scene.add(this.magicCube.getMesh());
        this.scene.add(this.directionalLight);
        this.scene.add(this.pointLight);
        this.pauseScene.add(this.pauseBoard.getMesh());
    }

    getScene() {
        return this.scene;
    }

    getCamera() {
        return this.camera;
    }

    getCamera2() {
        return this.camera2;
    }

    getCurrentCamera() {
        return this.currentCamera;
    }

    getBall() {
        return this.ball;
    }

    getPivotPoint() {
        return this.pivotPoint;
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

    getMeshLightFlag() {
        return this.meshLightFlag;
    }

    getIsRunnigFlag() {
        return this.isRunning;
    }

    switchMeshLightFlag() {
        if(this.getMeshLightFlag()) this.meshLightFlag = 0;
        else this.meshLightFlag = 1;

        this.updateMaterials();
    }

    updateMaterials() {
        for(let i = 0; i < this.objects.length; i++) 
            this.objects[i].updateMaterial(this.meshLightFlag);
    }

    switchCamera(nCamera) {
        'use strict';
        this.currentCamera = nCamera;
        this.controls = new THREE.OrbitControls(this.currentCamera);
    }

    rotateBall() {
        this.pivotPoint.rotation.y = this.ball.getAngle();
        this.ball.getMesh().rotation.z = -this.ball.getAngle();
    }

    pauseUnpauseGame(id) {
        if(this.isRunning) {
            renderer.render(this.pauseScene, this.camera2);
            cancelAnimationFrame(id);
            this.isRunning = false;
        }
        else {
            renderer.render(this.scene, this.camera);
            requestAnimationFrame(animate);
            this.isRunning = true;
        }
    }

}
