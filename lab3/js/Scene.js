class Scene extends THREE.Scene {
    constructor(windowWidth, windowHeight) {
        super();
        this.background = new THREE.Color("rgb(255, 255, 255)");
        this.add(new THREE.AxisHelper(50));

        this.floor = new Floor(this, 0, -2, 0, 20, 20);

        this.plane = new Plane(this, 0, 0, 0);

        this.sun = new Sun(this, 0, 5, 0);

        this.spotlight1 = new Spotlight(this, "rgb(255, 255, 255)");
    }

    getPlane() {
        return this.plane;
    }

    getSun() {
        return this.sun;
    }

    /*resize(windowWidth, windowHeight, ratio) {
        var roomWidth = this.room.getRoomWidth();
        var roomHeight = this.room.getRoomDepth();
        // variable to mantain the room aspect ratio
        var roomAspectRatio = roomWidth / roomHeight;
        // current ratio of the window
        var currentWindowRatio = windowWidth / windowHeight;

        // if there is no need to resize the scene's content
        var centerX = this.room.getPositionX();
        var distanceX = centerX + roomWidth / 2;

        var centerZ = this.room.getPositionZ();
        var distanceZ = centerZ + roomHeight / 2;

        if ((windowWidth / 2) < distanceX || (windowHeight / 2) < distanceZ) {
            return {
              width: windowWidth,
              height: windowHeight
            };
        }
        // if the height has to be adjusted to the diminishing width
        else if (currentWindowRatio < roomAspectRatio) {
            return {
                width: windowWidth,
                height: windowWidth / ratio
            };
        }
        // if the width has to be adjusted to the diminishing height
        else if (currentWindowRatio > roomAspectRatio) {
            return {
                width: windowHeight * ratio,
                height: windowHeight
            };
        }
    }*/

}
