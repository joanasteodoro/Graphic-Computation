class MagicCube extends THREE.Object3D {
    constructor() {
        super();
        this.createTexture();
        this.createBumpMap();
        this.createMesh();
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

    createMesh() {
        let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5, 3, 3);

        let material = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 10, wireframe: false, map: this.texture, bumpMap: this.bump, bumpScale: 1});
        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;

        this.mesh.position.set(0, 0.25, 0);

        this.mesh.name = "magicCube";
    }

    getMesh() {
        return this.mesh;
    }
}