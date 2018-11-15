class Board extends THREE.Object3D {
    constructor(scene) {
        super();
        this.createTexture();
    }

    createTexture() {
        this.texture = THREE.TextureLoader('../textures/chessBoardTexture.png');
        //this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrappings();
        //this.texture.repeat.set(N,N);
        //material
    }
}