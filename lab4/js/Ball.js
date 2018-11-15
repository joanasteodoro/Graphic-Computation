class Ball extends THREE.Object3D {
    constructor(index) {
        super();
        this.createTexture();
        this.materials = [];
        this.createMaterials();
        this.createMesh(index);
    }

    createTexture() {
        this.texture = new THREE.TextureLoader().load('textures/ballTexture.png');
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set(1, 1);   
    }

    createMaterials() {
        this.materials.push(new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x666666, shininess: 50, wireframe: false, map: this.texture}));
        this.materials.push(new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, map: this.texture}));
    }

    createMesh(index) {
        let geometry = new THREE.SphereGeometry(0.25, 10, 10);

        this.mesh = new THREE.Mesh(geometry, this.materials[index]);

        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;

        this.mesh.position.set(0, 0.25, 1);

        this.mesh.name = "ball";
    }

    getMesh() {
        return this.mesh;
    }

    updateMaterial(index) {
        this.mesh.material = this.materials[index];
    }

    /*rotateY() {
        this.mesh.rotation.y
    }*/
}
