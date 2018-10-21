class Scene extends THREE.Scene {
    constructor() {
        super();
        this.background = new THREE.Color("rgb(247, 231, 207)");
        this.add(new THREE.AxisHelper(50));

        this.room = new Room(this, 0, 0 ,0);

        this.balls = [];

        for (let i = 0; i < 10; i++) {
            let width = this.room.getRoomWidth();
            let depth = this.room.getRoomDepth();
            let radius = this.room.getRoomHeight() / 2;
            let posX = THREE.Math.randFloat(-width / 2 + radius, width / 2 - radius);
            let posY = radius;
            let posZ = THREE.Math.randFloat(-depth / 2 + radius, depth / 2 - radius);
            let dir = THREE.Math.randFloat(0 - Math.PI, Math.PI);
            let vel = THREE.Math.randFloat(1, 10);
            this.balls[i] = new Ball(this, posX, posY, posZ, dir, vel, radius);
        }
    }


    resize(windowWidth, windowHeight, ratio) {
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

        console.log(distanceX);
        console.log(distanceZ);

        if ((windowWidth / 2) < distanceX || (windowHeight / 2) < distanceZ) {
            console.log("chegou");
            return {
              width: windowWidth,
              height: windowHeight
            };
        }
        // if the height has to be adjusted to the diminishing width
        else if (currentWindowRatio < roomAspectRatio) {
            console.log("chegou2");
            return {
                width: windowWidth,
                height: windowWidth / ratio
            };
        }
        // if the width has to be adjusted to the diminishing height
        else if (currentWindowRatio > roomAspectRatio) {
            console.log("chegou3");
            return {
                width: windowHeight * ratio,
                height: windowHeight
            };
        }
    }

    getBalls() {
        return this.balls;
    }

    getRoom() {
        return this.room;
    }

    //colisoes
    ballsToWallSum(i) {
        return (this.balls[i].getRadius() + this.room.getWallThickness() / 2)  * (this.balls[i].getRadius() + this.room.getWallThickness() / 2); //(this.room.getWallThickness() / 2);
    }

    ballsToWallLeftDistance(i) {
        let ballX = this.balls[i].getPositionX();
        let ballZ = this.balls[i].getPositionZ();

        let wallPosition = this.room.getLeftWallPosition();
        let wallX = wallPosition.x;
        let wallZ = wallPosition.z;

        return (ballX - wallX) * (ballX - wallX);
    }

    ballsToWallRightDistance(i) {
        let ballX = this.balls[i].getPositionX();
        let ballZ = this.balls[i].getPositionZ();

        let wallPosition = this.room.getRightWallPosition();
        let wallX = wallPosition.x;
        let wallZ = wallPosition.z;

        return (ballX - wallX) * (ballX - wallX);
    }

    ballsToWallUpDistance(i) {
        let ballX = this.balls[i].getPositionX();
        let ballZ = this.balls[i].getPositionZ();

        let wallPosition = this.room.getUpWallPosition();
        let wallX = wallPosition.x;
        let wallZ = wallPosition.z;

        return (ballZ - wallZ) * (ballZ - wallZ);
    }

    ballsToWallDownDistance(i) {
        let ballX = this.balls[i].getPositionX();
        let ballZ = this.balls[i].getPositionZ();

        let wallPosition = this.room.getDownWallPosition();
        let wallX = wallPosition.x;
        let wallZ = wallPosition.z;

        return (ballZ - wallZ) * (ballZ - wallZ);
    }
}
