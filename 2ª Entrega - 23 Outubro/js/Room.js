class Room extends THREE.Object3D {
    constructor(scene, x, y, z) {
        super();

        this.scene = scene;

        this.position.set(x, y, z);

        this.createFloor();

        this.height;

        this.createWall(-15, this.height/2, 0, 'l'); //PORQUEEEE??????
        this.createWall(-15, this.height/2, 0, 'l');
        this.createWall(15, this.height/2, 0, 'l');
        this.createWall(0, this.height/2, -7.5, 'f');
        this.createWall(0, this.height/2, 7.5, 'f');

    }

    createWall(x, y, z, side) {
        var geometry;
        this.height = Math.sqrt(15*15 + 30.4*30.4) / 10;
        if (side == 'l') { // side wall
            geometry = new THREE.BoxGeometry(0.4, this.height, 15);
        }
        else if (side == 'f') { // front wall
            geometry = new THREE.BoxGeometry(0.4, this.height, 30.4);
        }
        var material = new THREE.MeshBasicMaterial({color: "rgb(255, 219, 77)", side: THREE.DoubleSide}); // renders on both sides
        var wall = new THREE.Mesh(geometry, material);

        if (side == 'f') { // front wall
            wall.rotation.y = Math.PI / 2;
        }

        wall.position.set(x, y, z);

        this.add(wall);
        this.scene.add(wall);
    }


    createFloor() {
        var geometry = new THREE.PlaneBufferGeometry(30, 15, 8, 8);
        var material = new THREE.MeshBasicMaterial({ color:"rgb(51, 17, 0)", side: THREE.DoubleSide }); // renders on both sides
        var plane = new THREE.Mesh(geometry, material);

        plane.rotation.x = Math.PI / 2;

        this.add(plane);
        this.scene.add(plane);
    }
}
