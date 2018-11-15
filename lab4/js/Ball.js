class Ball extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.createTexture();
        this.createMesh();
    }

    createTexture() {
        this.texture = new THREE.TextureLoader().load('textures/ballTexture.png');
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set(1, 1);   
    }

    createMesh() {
        let geometry = new THREE.SphereGeometry(0.25, 10, 10);

        let material = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x666666, shininess: 50, wireframe: false, map: this.texture});
        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;

        this.mesh.position.set(0, 0.25, 1);

        this.mesh.name = "ball";
    }

    getMesh() {
        return this.mesh;
    }
}
