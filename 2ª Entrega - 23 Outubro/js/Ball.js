class Ball extends THREE.Object3D {
    constructor(scene, x, y, z, dir, velX, velY, velZ, radius) {
        super();

        this.scene = scene;

        this.pos = new THREE.Vector3(x, y, z);
        this.dir = dir;
        this.vel = new THREE.Vector3(velX, velY, velZ);
        this.radius = radius;
        this.mayRotateFlag = true;
        this.realAngle = dir;

        let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        let geometry = new THREE.SphereGeometry(this.radius, 10, 10);
        let ball = new THREE.Mesh(geometry, material);

        this.axis = new THREE.AxisHelper(3);

        ball.add(this.axis);

        ball.position.set(x, y, z);

        this.ball = ball;
        this.scene.add(ball);

        this.ball.rotateY(dir);
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

    setRealAngle(angle) {
        this.realAngle += angle;
        //if(this.realAngle > Math.PI) this.realAngle -= (2 * Math.PI);
        //if(this.realAngle < Math.PI) this.realAngle += (2 * Math.PI);
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

    getRealAngle() {
        return this.realAngle;
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
