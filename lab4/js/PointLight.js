class PointLight extends THREE.PointLight {
    constructor(x, y, z) {
        super("rgb(255, 255, 255)", 0.5, 0, 2);
      	this.position.set(x, y, z);
      	//this.target.position.set(0, 0, 0);
      	//this.target.updateMatrixWorld();
    }

    // p
    onOffLight() {
    	this.visible = !this.visible;
    }
}
