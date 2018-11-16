class Board extends THREE.Object3D {
    constructor(index, type) {
        super();
        this.createTexture(type);
        this.materials = [];
        this.createMaterials(type);
        this.createMesh(index, type);
    }

    createTexture(type) {
        if(type) {
            this.texture = new THREE.TextureLoader().load('textures/pause.png');
            this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
            this.texture.repeat.set( 1, 1);
        } 
        else {
            this.texture = new THREE.TextureLoader().load('textures/woodboard.png');
            this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
            this.texture.repeat.set( 4, 4);
        } 
        
        
    }

    createMaterials(type) {
        this.materials.push(new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, map: this.texture}));
        if(!type) this.materials.push(new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 10, wireframe: false, map: this.texture}));
    }

    createMesh(index, type) {
        let geometry;
        if (type) geometry = new THREE.PlaneBufferGeometry(16, 5, 8, 8);
        else geometry = new THREE.PlaneBufferGeometry(5, 5, 8, 8);

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