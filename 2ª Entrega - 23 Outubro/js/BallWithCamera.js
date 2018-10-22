class BallWithCamera extends Ball {
    constructor(scene, x, y, z, dir, velX, velY, velZ, radius) {
        super(scene, x, y, z, dir, velX, velY, velZ, radius);

        this.camera = new PerspectiveCamera();
        /*this.camera.position.x = this.getPositionX();
        this.camera.position.y = this.getPositionY() + 10;
        this.camera.position.z = this.getPositionZ();
        this.camera.lookAt(this.position);*/
        //this.camera.setPosition(this.getPositionX(), this.getPositionY() + 10, this.getPositionZ());
        //this.camera.lookAt(this.getPosition());
        this.ball.add(this.camera);
        this.camera.setPosition(-5, 3, -5);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    getCamera() {
        return this.camera;
    }
}
