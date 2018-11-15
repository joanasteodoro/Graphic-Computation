class Board extends THREE.Object3D {
    constructor(scene) {
        super();
        this.createTexture();
    }

    createTexture() {
        this.texture = new THREE.TextureLoader().load('../textures/chessBoardTexture.png');
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set(3,3);
        //material
    }
}