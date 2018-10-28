class PerspectiveCamera extends THREE.PerspectiveCamera {
    constructor(x, y, z, x1, y1, z1) {
        super(45 , window.innerWidth / window.innerHeight, 1, 1000);

        this.setPosition(x, y, z);
        this.setLookAt(x1, y1, z1);
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z);
    }

    setLookAt(x, y, z) {
        var vector = new THREE.Vector3(x, y, z);
        this.lookAt(vector);
    }
}
