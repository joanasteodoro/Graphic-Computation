class OrthographicCamera extends THREE.OrthographicCamera {
    constructor(x, y, z) {
        super(window.innerWidth / -300, window.innerWidth / 300,
            window.innerHeight / 300, window.innerHeight / -300);

        this.position.set(x, y, z);

        var vector = new THREE.Vector3(0, 0, 0);
        this.lookAt(vector);
    }
}
