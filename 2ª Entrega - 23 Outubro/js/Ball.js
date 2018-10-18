class Ball extends THREE.Object3D {
    constructor(scene, x, y, z, dir, vel, radius) {
        super();

        this.scene = scene;

        console.log("posX " + x);
        console.log("posY " + y);
        console.log("posZ " + z);

        this.createBall(x, y, z, radius);

    }

    createBall(x, y, z, radius) {
        let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        let geometry = new THREE.SphereGeometry(radius, 10, 10);
        let ball = new THREE.Mesh(geometry, material);

        ball.position.set(x, y, z);

        this.add(ball);
        this.scene.add(ball);
    }
}
