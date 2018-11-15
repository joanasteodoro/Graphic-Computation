class Board extends THREE.Object3D {
    constructor(index) {
        super();
        this.createTexture();
        this.materials = [];
        this.createMaterials();
        this.createMesh(index);
    }

    createTexture() {
        this.texture = new THREE.TextureLoader().load('textures/chessBoardTexture.png');
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set( 4, 4);
        
    }

    createMaterials() {
        this.materials.push(new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 10, wireframe: false, map: this.texture}));
        this.materials.push(new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, map: this.texture}));
    }

    createMesh(index) {
        let geometry = new THREE.PlaneBufferGeometry(5, 5, 8, 8);

        this.mesh = new THREE.Mesh(geometry, this.materials[index]);

        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;

        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.x = -Math.PI / 2;

        this.mesh.name = "board";
    }

    getMesh()  {
        return this.mesh;
    }

    updateMaterial(index) {
        this.mesh.material = this.materials[index];
    }
}