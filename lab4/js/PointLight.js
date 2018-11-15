class PointLight extends THREE.PointLight {
    constructor(scene, x, y, z) {
        super("rgb(180, 0, 180)");
      	this.position.set(x, y, z);
      	//this.target.position.set(0, 0, 0);
      	//this.target.updateMatrixWorld();
      	scene.add(this);
    }

    // p
    onOffLight() {
    	this.visible = !this.visible;
    }
}
