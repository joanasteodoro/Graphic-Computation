class Ball extends THREE.Object3D {
    constructor(scene, x, y, z, dir, velX, velY, velZ, radius, hasCamera) {
        super();

        this.scene = scene;

        this.pos = new THREE.Vector3(x, y, z);
        this.dir = dir;
        this.vel = new THREE.Vector3(velX, velY, velZ);
        this.radius = radius;
        this.mayRotateFlag = true;
        this.realAngle = dir;

        this.ballColliding = -1;

        let material = new THREE.MeshBasicMaterial({ color:"rgb(206, 219, 221)", wireframe: true });
        let geometry = new THREE.SphereGeometry(this.radius, 10, 10);
        let ball = new THREE.Mesh(geometry, material);

        this.axis = new THREE.AxisHelper(3);
        this.axis.visible = false;

        ball.add(this.axis);

        //if(!(hasCamera)) {
        ball.position.set(x, y, z);
        //}

        this.ball = ball;

        this.rotateBall();

        //if(!(hasCamera)) {
        this.scene.add(this.ball);
        //}
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

    getBallColliding() {
        return this.ballColliding;
    }

    setBallColliding(ball) {
        this.ballColliding = ball;
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

    getRadius() {
        return this.radius;
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

    switchAxisVisibility() {
        this.axis.visible = !this.axis.visible;
    }
}
