class Scene extends THREE.Scene {
    constructor(windowWidth, windowHeight) {
        super();
        this.background = new THREE.Color("rgb(255, 255, 255)");
        this.add(new THREE.AxisHelper(50));

        this.floor = new Floor(this, 0, -4, 0, 20, 20);

        this.plane = new Plane(this, 0, 0, 0);

        this.sun = new Sun(this, 0, 5, 0);

        this.spotlight1 = new Spotlight(this,"rgb(255, 255, 255)", 2, -3.5, -4,
                                        -Math.PI / 2, -Math.PI / 4, 1.6, -3.5, -3.6, 1.5, -3.5, -4.5, -3, 4, 9);
        this.spotlight2 = new Spotlight(this,"rgb(255, 255, 255)", -2, -3.5, -4,
                                        -Math.PI / 2, Math.PI / 4, -1.6, -3.5, -3.6, -1.5, -3.5, -4.5, 3, 4, 9);
        this.spotlight3 = new Spotlight(this,"rgb(255, 255, 255)", 2, -3.5, 4,
                                        -Math.PI / 2, -3 * Math.PI / 4, 1.6, -3.5, 3.6, 1, -3.5, 4.5, -3, 4, -9);
        this.spotlight4 = new Spotlight(this,"rgb(255, 255, 255)", -2, -3.5, 4,
                                        -Math.PI / 2, 3 * Math.PI / 4, -1.6, -3.5, 3.6, -1.5, -3.5, 4.5, 3, 4, -9);
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
}
