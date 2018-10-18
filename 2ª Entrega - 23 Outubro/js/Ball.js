class Ball extends THREE.Object3D {
    constructor(scene, x, y, z, dir, vel) {
        super();

        this.scene = scene;

        this.createBall(x, y, z);

        scene.add(ball);
    }

    createBall(x, y, z) {
        material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        geometry = new THREE.SphereGeometry(4, 10, 10);
        ball = new THREE.Mesh(geometry, material);

        this.position.set(x, y, z);

        this.add(ball);
        this.scene.add(ball);
    }
}
