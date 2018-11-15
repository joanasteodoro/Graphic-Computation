class OrthographicCamera extends THREE.OrthographicCamera {
    constructor(x, y, z) {
        super(window.innerWidth / -50, window.innerWidth / 50,
            window.innerHeight / 50, window.innerHeight / -50);

        this.position.set(x, y, z);

        var vector;
        // Upper camera #1
        if(y == 100) {
            vector = new THREE.Vector3(0, 0, 0);
        }
        this.lookAt(vector);
    }
}
