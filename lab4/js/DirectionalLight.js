class DirectionalLight extends THREE.DirectionalLight {
    constructor( x, y, z) {
        super("rgb(255, 255, 255)", 0.5);
      	this.position.set(x, y, z);
      	this.target.position.set(0, 0, 0);
      	this.target.updateMatrixWorld();
    }

    // d
    onOffLight() {
    	this.visible = !this.visible;
    }
}
