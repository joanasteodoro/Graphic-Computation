class Chair extends THREE.Object3D {
    constructor(scene, x, y, z) {
        super();

        this.scene = scene;

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.userData = {left: false, up: false, right: false, down: false, leftRel: false, upRel: false, rightRel: false, downRel: false};
        this.lastMoves = {counterLeft: 0, counterUp: 0, counterRight: 0, counterDown: 0};

        this.acceleration = 0;
        this.previousVelocity = 0;
        this.currentVelocity = 0;
        this.maximumVelocity = 100000;
        this.minimumVelocity = -100000;

        this.rotationAngle = 0;
        this.angleToMove = 0;

        this.createUpperChair();
        this.createBottomChair();
    }
    
    setAcceleration(acceleration) {
        this.acceleration = acceleration;
    }

    setPreviousVelocity(vel) {
        this.previousVelocity = vel;
    }

    setCurrentVelocity(vel) {
        this.currentVelocity = vel;
    }

    setAngleToMove(angle) {
        this.angleToMove = angle;
    }

    getAcceleration() {
        return this.acceleration;
    }

    getPreviousVelocity() {
        return this.previousVelocity;
    }

    getCurrentVelocity() {
        return this.currentVelocity;
    }

    getMaximumVelocity() {
        return this.maximumVelocity;
    }

    getMinimumVelocity() {
        return this.minimumVelocity;
    }

    getAngleToMove() {
        return this.angleToMove;
    }

    addChairBack(x, y, z) {
        'use strict';

        let geometry = new THREE.CubeGeometry(20, 16, 2);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color:"rgb(92, 61, 15)", wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);

        return mesh;
    }

    addChairSeat(x, y, z) {
        'use strict';

        let geometry = new THREE.CubeGeometry(20, 2, 20); /* width, height, depth */
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "rgb(92, 61, 15)", wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);

        return mesh;
    }

    addChairPole(x, y, z) {
        'use strict';

        let geometry = new THREE.CubeGeometry(2, 10, 2);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "rgb(92, 61, 15)", wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);

        return mesh;
    }

    addChairBase(x, y, z, angle) {
        'use strict';

        let geometry = new THREE.CubeGeometry(28, 2, 2);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "rgb(92, 61, 15)", wireframe: true }));
        mesh.position.set(x, y, z);
        geometry.rotateY(angle);
        this.add(mesh);

        return mesh;
    }

    addChairWheel(x, y, z) {
        'use strict';

        let geometry = new THREE.TorusGeometry(1, 1);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "rgb(0, 0, 0)", wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);

        return mesh;
    }

    createUpperChair() {
        'use strict';

        this.upperchair = new THREE.Object3D();
        this.seat = this.addChairSeat(0, 0, 0); /* 'mass' center of the chair */
        this.back = this.addChairBack(0, 9, 9);

        this.upperchair.add(this.seat);
        this.upperchair.add(this.back);

        this.add(this.upperchair);
    }

    createBottomChair() {
        'use strict';

        this.addChairPole(0, -6, 0);
        this.addChairBase(0, -12, 0, Math.PI/4);
        this.addChairBase(0, -12, 0, Math.PI/(-4));
        this.wheel1 = this.addChairWheel(10, -14, -9);
        this.wheel2 = this.addChairWheel(10, -14, 9);
        this.wheel3 = this.addChairWheel(-10, -14, 9);
        this.wheel4 = this.addChairWheel(-10, -14, -9);

        this.scene.add(this);
    }

    rotateChairWheels(direction) {
        this.wheel1.rotation.y += (Math.PI / 8) * direction;
        this.wheel2.rotation.y += (Math.PI / 8) * direction;
        this.wheel3.rotation.y += (Math.PI / 8) * direction;
        this.wheel4.rotation.y += (Math.PI / 8) * direction;
    }

    rotateUpperChair(direction) {
        this.upperchair.rotation.y += (Math.PI / 32) * direction;
        //this.seat.rotation.y += (Math.PI / 8) * direction;
        //this.rotationAngle = (Math.PI / 8) * direction;
    }
}
