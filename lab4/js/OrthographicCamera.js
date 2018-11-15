class OrthographicCamera extends THREE.OrthographicCamera {
    constructor(x, y, z) {
        super(window.innerWidth / -50, window.innerWidth / 50,
            window.innerHeight / 50, window.innerHeight / -50);

        this.position.set(x, y, z);

        var vector = new THREE.Vector3(0, 0, 0);
        this.lookAt(vector);
    }
}
