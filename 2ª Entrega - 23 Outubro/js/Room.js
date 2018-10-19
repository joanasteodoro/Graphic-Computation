class Room extends THREE.Object3D {
    constructor(scene, x, y, z) {
        super();

        this.scene = scene;

        this.position.set(x, y, z);

        this.wallThickness = 0.4;
        this.depth = 15 - this.wallThickness; // l
        this.width = 2 * this.depth;

        this.height = Math.sqrt(5) / 10 * this.depth;

        this.createFloor(this.width, this.depth);

        this.leftWall = this.createWall(-15, this.height/2, 0, 'l');
        this.rightWall = this.createWall(15, this.height/2, 0, 'l');
        this.upWall = this.createWall(0, this.height/2, -7.5, 'f');
        this.downWall = this.createWall(0, this.height/2, 7.5, 'f');
    }

    getRoomWidth() {
        return this.width;
    }

    getRoomDepth() {
        return this.depth;
    }

    getRoomHeight() {
        return this.height;
    }

    getWallThickness() {
        return this.wallThickness;
    }

    getLeftWallPosition() {
        return this.leftWall.position;
    }

    getRightWallPosition() {
        return this.rightWall.position;
    }

    getUpWallPosition() {
        return this.upWall.position;
    }

    getDownWallPosition() {
        return this.downWall.position;
    }

    createWall(x, y, z, side) {
        var geometry;
        if (side == 'l') { // side wall
            geometry = new THREE.BoxGeometry(this.wallThickness, this.height, 15);
        }
        else if (side == 'f') { // front wall
            geometry = new THREE.BoxGeometry(this.wallThickness, this.height, 30.4);
        }
        var material = new THREE.MeshBasicMaterial({color: "rgb(255, 219, 77)", side: THREE.DoubleSide}); // renders on both sides
        var wall = new THREE.Mesh(geometry, material);

        if (side == 'f') { // front wall
            wall.rotation.y = Math.PI / 2;
        }

        wall.position.set(x, y, z);

        this.add(wall);
        this.scene.add(wall);

        return wall;
    }


    createFloor(width, depth) {
        var geometry = new THREE.PlaneBufferGeometry(width + this.wallThickness, depth + this.wallThickness, 8, 8);
        var material = new THREE.MeshBasicMaterial({ color:"rgb(51, 17, 0)", side: THREE.DoubleSide }); // renders on both sides
        var plane = new THREE.Mesh(geometry, material);

        plane.rotation.x = Math.PI / 2;

        this.add(plane);
        this.scene.add(plane);
    }
}
