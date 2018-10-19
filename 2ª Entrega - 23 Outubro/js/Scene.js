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
            let dir = THREE.Math.randFloat(0, 2 * Math.PI);
            let vel = THREE.Math.randFloat(1, 10);
            this.balls[i] = new Ball(this, posX, posY, posZ, dir, vel, radius);
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
        return this.balls[i].getRadius() + (this.room.getWallThickness() / 2);
    }

    ballsToWallLeftDistance(i) {
        let ballX = this.balls[i].getPositionX();
        let ballZ = this.balls[i].getPositionZ();

        let wallPosition = this.room.getLeftWallPosition();
        let wallX = wallPosition.x;
        let wallZ = wallPosition.z;

        return Math.sqrt((ballX - wallX) * (ballX - wallX) + (ballZ - wallZ) * (ballZ - wallZ));
    }

    ballsToWallRightDistance(i) {
        let ballX = this.balls[i].getPositionX();
        let ballZ = this.balls[i].getPositionZ();

        let wallPosition = this.room.getRightWallPosition();
        let wallX = wallPosition.x;
        let wallZ = wallPosition.z;

        return Math.sqrt((ballX - wallX) * (ballX - wallX) + (ballZ - wallZ) * (ballZ - wallZ));
    }

    ballsToWallUpDistance(i) {
        let ballX = this.balls[i].getPositionX();
        let ballZ = this.balls[i].getPositionZ();

        let wallPosition = this.room.getUpWallPosition();
        let wallX = wallPosition.x;
        let wallZ = wallPosition.z;

        return Math.sqrt((ballX - wallX) * (ballX - wallX) + (ballZ - wallZ) * (ballZ - wallZ));
    }

    ballsToWallDownDistance(i) {
        let ballX = this.balls[i].getPositionX();
        let ballZ = this.balls[i].getPositionZ();

        let wallPosition = this.room.getDownWallPosition();
        let wallX = wallPosition.x;
        let wallZ = wallPosition.z;

        return Math.sqrt((ballX - wallX) * (ballX - wallX) + (ballZ - wallZ) * (ballZ - wallZ));
    }
}
