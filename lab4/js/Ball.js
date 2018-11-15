class Ball extends THREE.Object3D {
    constructor(x, y, z, dir, velX, velY, velZ) {
        super();

        this.pos = new THREE.Vector3(x, y, z);
        this.dir = dir;
        this.vel = new THREE.Vector3(velX, velY, velZ);
        this.mayRotateFlag = true;
        this.realAngle = dir;

        let material = new THREE.MeshBasicMaterial({ color:"rgb(206, 219, 221)", wireframe: false });
        let geometry = new THREE.SphereGeometry(2, 10, 10);
        this.mesh = new THREE.Mesh(geometry, material);


      /*  ball.position.set(x, y, z);

        this.ball = ball;

        this.rotateBall();*/

    }

    rotateBall() {
        var unityX  = new THREE.Vector3(1, 0, 0);
        var angle  = unityX.angleTo(this.getVelocity());

        var z = this.getVelocityZ();
        if (z > 0) {
            this.ball.rotation.y = -angle;
        }
        else {
            this.ball.rotation.y = angle;
        }
    }

    ballRolling() {
        this.rotateZ(this.getVelocity());
    }

    getPositionX() {
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
        this.ball.position.x = x;
    }

    setPositionY(y) {
        this.ball.position.y = y;
    }

    setPositionZ(z) {
        this.ball.position.z = z;
    }

    translateX(x) {
        this.ball.translateX(x);
    }

    translateY(y) {
        this.ball.translateY(y);
    }

    translateZ(z) {
        this.ball.translateZ(z);
    }

    getRotationY() {
        return this.ball.rotation.y;
    }

    rotateX(angle) {
        this.ball.rotateX(angle);
    }

    rotateY(angle) {
        this.ball.rotateY(angle);
        this.realAngle += angle;
    }

    rotateZ(angle) {
        this.ball.rotateZ(angle);
    }

    getDirection() {
        return this.dir;
    }

    setDirection(dir) {
        this.dir = dir;
    }

    getVelocity() {
        return this.vel;
    }

    getBallMesh(){
      return this.mesh;
    }

    setVelocity(vel) {
        this.vel = vel;
    }

    getVelocityX() {
        return this.vel.x;
    }

    setVelocityX(vel) {
        this.vel.x = vel;
    }

    getVelocityY() {
        return this.vel.y;
    }

    setVelocityY(vel) {
        this.vel.y = vel;
    }

    getVelocityZ() {
        return this.vel.z;
    }

    setVelocityZ(vel) {
        this.vel.z = vel;
    }


}
