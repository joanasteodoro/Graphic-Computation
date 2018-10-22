class Scene extends THREE.Scene {
    constructor(camera) {
        super();
        this.background = new THREE.Color("rgb(247, 231, 207)");
        this.add(new THREE.AxisHelper(50));

        this.room = new Room(this, 0, 0 ,0);

        this.balls = [];

        for (let i = 0; i < 3; i++) {
            let width = this.room.getRoomWidth();
            let depth = this.room.getRoomDepth();
            let radius = this.room.getRoomHeight() / 2;
            let posX = THREE.Math.randFloat(-width / 2 + radius, width / 2 - radius);
            let posY = radius;
            let posZ = THREE.Math.randFloat(-depth / 2 + radius, depth / 2 - radius);
            let dir = THREE.Math.randFloat(- Math.PI, Math.PI);
            let velX = THREE.Math.randFloat(1, 10) * Math.sin(dir);
            let velY = 0;
            let velZ = THREE.Math.randFloat(1, 10) * Math.cos(dir);
            // adds a camera to the first ball
            if (i == 0) {
                this.balls[i] = new BallWithCamera(this, posX, posY, posZ, dir, velX, velY, velZ, radius);
            }
            else {
                this.balls[i] = new Ball(this, posX, posY, posZ, dir, velX, velY, velZ, radius);
            }
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
    }

    getBalls() {
        return this.balls;
    }

    getRoom() {
        return this.room;
    }

    updateBallPosition(i, delta) {
        this.balls[i].setPositionX(this.balls[i].getPositionX() + this.balls[i].getVelocityX() * delta);
        this.balls[i].setPositionZ(this.balls[i].getPositionZ() + this.balls[i].getVelocityZ() * delta);
    }

    checkBallInsideBall(i, j) {
        /*var upperBound = this.room.getRoomDepth() / 2;
        var lowerBound = - upperBound;
        var rightBound = this.room.getRoomWidth() / 2;
        var leftBound = - rightBound;*/
    }

    checkBallWithinBounds(i) {
        var upperBound = this.room.getRoomDepth() / 2;
        var lowerBound = - upperBound;
        var rightBound = this.room.getRoomWidth() / 2;
        var leftBound = - rightBound;

        var ballX = this.balls[i].getPositionX();
        var ballZ = this.balls[i].getPositionZ();

        var radius = this.balls[i].getRadius();

        if((ballZ + radius) > upperBound) {
            this.balls[i].setPositionZ(ballZ - radius);
        }
        if((ballZ - radius) < lowerBound) {
            this.balls[i].setPositionZ(ballZ + radius);
        }
        if((ballX + radius) > rightBound) {
            this.balls[i].setPositionX(ballX - radius);
        }
        if((ballX - radius) < leftBound) {
            this.balls[i].setPositionX(ballX + radius);
        }
    }

    // colisoes com as outras bolas
    setFlagsBallToBallCollision(i, j) {
        var distanceToBall = this.ballToBallSum(i, j);
        var ballToBall = this.ballToBallDistance(i, j);

        if(distanceToBall >= ballToBall) {
            this.balls[i].setBallColliding(j);
        }
    }

    ballToBallSum(i , j) {
        return (this.balls[i].getRadius() + this.balls[j].getRadius())**2;
    }

    ballToBallDistance(i, j) {
        let ball1X = this.balls[i].getPositionX();
        let ball1Z = this.balls[i].getPositionZ();

        let ball2X = this.balls[j].getPositionX();
        let ball2Z = this.balls[j].getPositionZ();

        return (ball1X - ball2X)**2 + (ball1Z - ball2Z)**2 ;
    }

    // colisoes com as paredes
    collisionWithWalls(i) {
        var distance = this.ballsToWallSum(i);
        var ballToWallLeft = this.ballsToWallLeftDistance(i);
        var ballToWallRight = this.ballsToWallRightDistance(i);
        var ballToWallUp = this.ballsToWallUpDistance(i);
        var ballToWallDown = this.ballsToWallDownDistance(i);

        if(distance >= ballToWallUp) {
            this.balls[i].setVelocityX(this.balls[i].getVelocityX());
            this.balls[i].setVelocityZ(-this.balls[i].getVelocityZ());

        }
        if(distance >= ballToWallDown) {
            this.balls[i].setVelocityX(this.balls[i].getVelocityX());
            this.balls[i].setVelocityZ(-balls[i].getVelocityZ());
        }
        if(distance >= ballToWallLeft || distance >= ballToWallRight) {
            this.balls[i].setVelocityX(-this.balls[i].getVelocityX());
            this.balls[i].setVelocityZ(this.balls[i].getVelocityZ());
        }
        this.updateBallPosition(i, delta);
    }

    ballsToWallSum(i) {
        return (this.balls[i].getRadius() + this.room.getWallThickness() / 2)  * (this.balls[i].getRadius() + this.room.getWallThickness() / 2); //(this.room.getWallThickness() / 2);
    }

    ballsToWallLeftDistance(i) {
        let ballX = this.balls[i].getPositionX();

        let wallPosition = this.room.getLeftWallPosition();
        let wallX = wallPosition.x;

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
