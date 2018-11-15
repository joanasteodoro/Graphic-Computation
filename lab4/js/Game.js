class Game {
    constructor(windowWidth, windowHeight) {
        this.scene = new Scene(window.innerWidth, window.innerHeight);
        this.objects = [];

        //flags
        this.meshLightFlag = 0; //phong material

        //cameras
        this.camera = new PerspectiveCamera(5, 5, 0, 0, 0, 0);
        this.camera2 = new OrthographicCamera(0, 100, 0);
        this.currentCamera = this.camera;
        this.controls = new THREE.OrbitControls(this.currentCamera);

        //lights
        this.directionalLight = new DirectionalLight(3, 5, 3);
        this.pointLight = new PointLight(0, 5, 0);

        //objects
        this.chessBoard = new Board(this.meshLightFlag);
        this.objects.push(this.chessBoard);
        this.magicCube = new MagicCube(this.meshLightFlag);
        this.objects.push(this.magicCube);
        this.ball = new Ball(this.meshLightFlag);
        this.objects.push(this.ball);
        this.pivotPoint = new THREE.Object3D();

        this.magicCube.getMesh().add(this.pivotPoint);
        this.pivotPoint.add(this.ball.getMesh());

        this.scene.add(this.chessBoard.getMesh());
        this.scene.add(this.magicCube.getMesh());
        this.scene.add(this.directionalLight);
        this.scene.add(this.pointLight);
        
    }

    update() {
        
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

    getMeshLightFlag() {
        return this.meshLightFlag;
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

    switchMesh() {

    }

}
