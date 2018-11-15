class Scene extends THREE.Scene {
    constructor(windowWidth, windowHeight) {
        super();
        this.background = new THREE.Color("rgb(255, 255, 255)");
        this.add(new THREE.AxisHelper(50));
        /*
        this.floor = new Floor(this, 0, -4, 0, 20, 20);

        this.plane = new Plane(this, 0, 0, 0);

        this.sun = new Sun(this, 0, 5, 0);

        this.spotlight1 = new Spotlight(this,"rgb(255, 255, 255)", 1);
        this.spotlight2 = new Spotlight(this,"rgb(255, 255, 255)", 2);
        this.spotlight3 = new Spotlight(this,"rgb(255, 255, 255)", 3);
        this.spotlight4 = new Spotlight(this,"rgb(255, 255, 255)", 4);

        this.rotationFlags = {
            up: false,
            down: false,
            left: false,
            right: false
        }*/
    }

    getFloor() {
        return this.floor;
    }

    getPlane() {
        return this.plane;
    }

    getSun() {
        return this.sun;
    }

    getSpotlight1() {
        return this.spotlight1;
    }

    getSpotlight2() {
        return this.spotlight2;
    }

    getSpotlight3() {
        return this.spotlight3;
    }

    getSpotlight4() {
        return this.spotlight4;
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
