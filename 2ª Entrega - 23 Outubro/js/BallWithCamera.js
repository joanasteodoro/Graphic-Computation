class BallWithCamera extends Ball {
    constructor(scene, x, y, z, dir, velX, velY, velZ, radius, hasCamera) {
        super(scene, x, y, z, dir, velX, velY, velZ, radius, hasCamera);
        this.camera = new PerspectiveCamera();
        /*this.camera.position.x = this.getPositionX();
        this.camera.position.y = this.getPositionY() + 10;
        this.camera.position.z = this.getPositionZ();
        this.camera.lookAt(this.position);*/
        //let material1 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        //let geometry1 = new THREE.SphereGeometry(this.radius /4, 10, 10);
        //this.ballAux = new THREE.Mesh(geometry1, material1);
        /*this.ballAux.visible = false;*/
        //this.ballAux.position.set(x, y, z);
        this.ball.add(this.camera);
        //this.ballAux.add(this.ball);
        this.camera.setPosition(-5, 3, -5);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        //this.scene.add(this.ballAux);
    }

    getCamera() {
        return this.camera;
    }

    /*rotateBall() {

    }*/

    /*getPositionX() {
        return this.ball.position.x;
    }

    getPositionY() {
        return this.ball.position.y;
    }

    getPositionZ() {
        return this.ball.position.z;
    }

    getPosition() {
        return this.ball.position;
    }

    setPositionX(x) {
        super.setPositionX(x);
        this.ballAux.position.x = x;
    }

    setPositionY(y) {
        super.setPositionY(y);
        this.ballAux.position.y = y;
    }

    setPositionZ(z) {
        super.setPositionZ(z);
        this.ballAux.position.z = z;
    }

    translateX(x) {
        super.translateX(x);
        this.ballAux.translateX(x);
    }

    translateY(y) {
        super.translateY(y);
        this.ballAux.translateY(y);
    }

    translateZ(z) {
        super.translateZ(z);
        this.ballAux.translateZ(z);
    }

    getRotationY() {
        return this.ball.rotation.y;
    }

    rotateX(angle) {
        super.rotateX(angle);
        this.ballAux.rotateX(angle);
    }

    rotateY(angle) {
        super.rotateY(angle);
        this.ballAux.rotateY(angle);
    }

    rotateZ(angle) {
        super.rotateZ(angle);
        this.ballAux.rotateZ(angle);
    }*/
}
