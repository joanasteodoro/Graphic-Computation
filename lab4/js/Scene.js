class Scene extends THREE.Scene {
    constructor(windowWidth, windowHeight) {
        super();
        this.background = new THREE.Color("rgb(255, 255, 255)");
        this.add(new THREE.AxisHelper(50));
    }

    getUpRotationFlag() {
        return this.rotationFlags.up;
    }

    getDownRotationFlag() {
        return this.rotationFlags.down;
    }

    getLeftRotationFlag() {
        return this.rotationFlags.left;
    }

    getRightRotationFlag() {
        return this.rotationFlags.right;
    }

    setUpRotationFlag(b) {
        this.rotationFlags.up = b;
    }

    setDownRotationFlag(b) {
        this.rotationFlags.down = b;
    }

    setLeftRotationFlag(b) {
        this.rotationFlags.left = b;
    }

    setRightRotationFlag(b) {
        this.rotationFlags.right = b;
    }
}
