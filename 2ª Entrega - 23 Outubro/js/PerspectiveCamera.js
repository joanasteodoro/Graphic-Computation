class PerspectiveCamera extends THREE.PerspectiveCamera {
    constructor(x, y, z) {
        super(70, window.innerWidth / window.innerHeight, 1, 1000);

        this.position.set(x, y, z);

        var vector = new THREE.Vector3();
        this.lookAt(vector);
    }
}
