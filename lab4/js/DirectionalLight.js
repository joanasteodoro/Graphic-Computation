class DirectionalLight extends THREE.DirectionalLight {
    constructor(scene, x, y, z) {
        super("rgb(255, 255, 255)", 1);
      	this.position.set(x, y, z);
      	this.target.position.set(0, 10, 0);
      	this.target.updateMatrixWorld();
      	scene.add(this);
    }

    // d
    onOffLight() {
    	this.visible = !this.visible;
    }
}
