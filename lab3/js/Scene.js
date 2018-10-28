class Scene extends THREE.Scene {
    constructor() {
        super();
        this.background = new THREE.Color("rgb(247, 231, 207)");
        this.add(new THREE.AxisHelper(50));

        this.plane = new Plane(this, 0, 0, 0);
    }

    getPlane() {
        return this.plane;
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
