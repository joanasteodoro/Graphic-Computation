class Sun extends THREE.DirectionalLight {
    constructor(scene, x, y, z) {
        super("rgb(255, 255, 255)", 1);
      	this.position.set(x, y, z);
      	this.target.position.set(0, 0, 0);
      	this.target.updateMatrixWorld();
      	scene.add(this);
    }

    // n
    onOffSunLight() {
    	this.visible = !this.visible;
    }
}
