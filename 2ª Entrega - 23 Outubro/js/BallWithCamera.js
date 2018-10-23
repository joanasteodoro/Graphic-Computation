class BallWithCamera extends Ball {
    constructor(scene, x, y, z, dir, velX, velY, velZ, radius, hasCamera) {
        super(scene, x, y, z, dir, velX, velY, velZ, radius, hasCamera);
        this.camera = new PerspectiveCamera();
        this.ball.add(this.camera);
        this.camera.setPosition(-5, 3, -5);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    getCamera() {
        return this.camera;
    }
}
