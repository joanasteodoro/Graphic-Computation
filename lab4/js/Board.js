class Board extends THREE.Object3D {
    constructor() {
        super();
        this.createTexture();
        this.createMesh();
    }

    createTexture() {
        this.texture = new THREE.TextureLoader().load('textures/chessBoardTexture.png');
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set( 4, 4);
        
    }

    createMesh() {
        /*let geometry = new THREE.Geometry();

        for(let line = 0; line < 5; line++) {
            for(let col = 0; col < 5; col++) {
                this.vertices.push(new THREE.Vector3(line, 0, col));
            }
        }

        // creates 32 triangular faces
        for(let index = 0; index < 19; index++) {
            if(index != 4 & index != 9 & index != 14) {
                this.faces.push(new THREE.Face3(index, index+1, index+6));
                this.faces.push(new THREE.Face3(index, index+6, index+5));
            }
        }

        geometry.vertices = this.vertices;
        geometry.faces = this.faces;
        geometry.computeFaceNormals();*/
        let geometry = new THREE.PlaneBufferGeometry(5, 5, 8, 8);

        let material = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, shininess: 10, wireframe: false, map: this.texture});
        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;

        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.x = -Math.PI / 2;

        this.mesh.name = "board";
    }

    getMesh()  {
        return this.mesh;
    }
}