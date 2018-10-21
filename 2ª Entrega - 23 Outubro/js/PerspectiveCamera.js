class PerspectiveCamera extends THREE.PerspectiveCamera {
    constructor() {
        super(45 , window.innerWidth / window.innerHeight, 1, 1000);
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z);
    }

    setLookAt(x, y, z) {
        var vector = new THREE.Vector3(x, y, z);
        this.lookAt(vector);
    }
}
