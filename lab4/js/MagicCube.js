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
        var textureLoader = new THREE.TextureLoader();
        this.texture1 = textureLoader.load('textures/cubeTextures/1.png');
        this.texture2 = textureLoader.load('textures/cubeTextures/2.png');
        this.texture3 = textureLoader.load('textures/cubeTextures/3.png');
        this.texture4 = textureLoader.load('textures/cubeTextures/4.png');
        this.texture5 = textureLoader.load('textures/cubeTextures/5.png');
        this.texture6 = textureLoader.load('textures/cubeTextures/6.png');
    }

    createBumpMap() {
        this.bump = new THREE.TextureLoader().load('textures/bumpMap.png');
        this.bump.wrapS = this.bump.wrapT = THREE.RepeatWrapping;
        this.bump.repeat.set( 1, 1);
    }

    createMaterials() {
        this.materials[0] = [
            new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, map: this.texture1, bumpMap: this.bump, bumpScale: 1}),
            new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, map: this.texture2, bumpMap: this.bump, bumpScale: 1}),
            new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, map: this.texture3, bumpMap: this.bump, bumpScale: 1}),
            new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, map: this.texture4, bumpMap: this.bump, bumpScale: 1}),
            new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, map: this.texture5, bumpMap: this.bump, bumpScale: 1}),
            new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, map: this.texture6, bumpMap: this.bump, bumpScale: 1})
        ];
        this.materials[1] = [
            new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 10, wireframe: false, map: this.texture1, bumpMap: this.bump, bumpScale: 1}),
            new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 10, wireframe: false, map: this.texture2, bumpMap: this.bump, bumpScale: 1}),
            new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 10, wireframe: false, map: this.texture3, bumpMap: this.bump, bumpScale: 1}),
            new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 10, wireframe: false, map: this.texture4, bumpMap: this.bump, bumpScale: 1}),
            new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 10, wireframe: false, map: this.texture5, bumpMap: this.bump, bumpScale: 1}),
            new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 10, wireframe: false, map: this.texture6, bumpMap: this.bump, bumpScale: 1})
        ];
    }

    createMesh(index) {
        let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5, 3, 3, 3);

        this.faceMaterials = [
                new THREE.MeshFaceMaterial(this.materials[0]),
                new THREE.MeshFaceMaterial(this.materials[1])
            ];

        this.mesh = new THREE.Mesh(geometry, this.faceMaterials[index]);
        this.mesh2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x000000, wireframe:true}));

        this.mesh2.visible = false;

        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;

        this.mesh.position.set(0, 0.25, 0);
        this.mesh2.position.set(0, 0.25, 0);

        this.mesh.name = "magicCube";
    }

    getMesh() {
        return this.mesh;
    }

    updateMaterial(index) {
        this.mesh.material = this.faceMaterials[index];
    }
}
