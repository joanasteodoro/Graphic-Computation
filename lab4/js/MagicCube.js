class MagicCube extends THREE.Object3D {
    constructor(index) {
        super();
        this.createTexture();
        this.createBumpMap();
        this.materials = [];
        this.createMaterials();
        this.createMesh(index);
    }

    createTexture() {
        this.texture = new THREE.TextureLoader().load('textures/cubeTexture.png');
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set( 1, 1);   
    }

    createBumpMap() {
        this.bump = new THREE.TextureLoader().load('textures/bumpMap.png');
        this.bump.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.bump.repeat.set( 1, 1);   
    }

    createMaterials() {
        this.materials.push(new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 10, wireframe: false, map: this.texture, bumpMap: this.bump, bumpScale: 1}));
        this.materials.push(new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, map: this.texture, bumpMap: this.bump, bumpScale: 1}));
    }

    createMesh(index) {
        let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5, 3, 3);

        this.mesh = new THREE.Mesh(geometry, this.materials[index]);

        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;

        this.mesh.position.set(0, 0.25, 0);

        this.mesh.name = "magicCube";
    }

    getMesh() {
        return this.mesh;
    }

    updateMaterial(index) {
        this.mesh.material = this.materials[index];
        console.log("ola");
    }
}