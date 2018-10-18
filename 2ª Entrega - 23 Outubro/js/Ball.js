class Ball extends THREE.Object3D {
    constructor(scene, x, y, z, dir, vel, radius) {
        super();

        this.scene = scene;

        this.pos = new THREE.Vector3(x, y, z);
        this.dir = dir;
        this.vel = vel;

        let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        let geometry = new THREE.SphereGeometry(radius, 10, 10);
        let ball = new THREE.Mesh(geometry, material);

        this.axis = new THREE.AxisHelper(3);

        this.axis.rotateY(dir);
        ball.add(this.axis);

        ball.position.set(x, y, z);

        this.add(ball);
        this.scene.add(ball);

    }

    getPosition() {
        return this.pos;
    }

    setPosition(posVector) {
        this.pos = posVector;
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

    switchAxisVisibility() {
        this.axis.visible = !this.axis.visible;
    }
}
