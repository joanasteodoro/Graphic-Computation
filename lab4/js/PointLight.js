class PointLight extends THREE.PointLight {
    constructor(x, y, z) {
        super("rgb(255, 255, 255)", 0.5, 0, 2);
      	this.position.set(x, y, z);
    }

    // p
    onOffLight() {
    	this.visible = !this.visible;
    }
}
