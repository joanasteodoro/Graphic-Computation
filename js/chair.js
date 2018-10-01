class Chair extends THREE.Object3D {
    constructor(scene, x, y, z) {
        super();

        this.scene = scene;

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.userData = { maximumVel: 4, left: false, up: false, right: false, down: false, acceleration: 0 };
        this.lastMoves = { counterLeft: 0, counterUp: 0, counterRight: 0, counterDown: 0 };

        this.createChair();
    }

    addChairBack(x, y, z) {
        'use strict';

        let geometry = new THREE.CubeGeometry(20, 16, 2);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addChairSeat(x, y, z) {
        'use strict';

        let geometry = new THREE.CubeGeometry(20, 2, 20); /* width, height, depth */
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addChairPole(x, y, z) {
        'use strict';

        let geometry = new THREE.CubeGeometry(2, 10, 2);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addChairBase(x, y, z, angle) {
        'use strict';

        let geometry = new THREE.CubeGeometry(28, 2, 2);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }));
        mesh.position.set(x, y, z);
        geometry.rotateY(angle);
        this.add(mesh);
    }

    addChairWheel(x, y, z) {
        'use strict';

        let geometry = new THREE.TorusGeometry(1, 1);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    createChair() {
        'use strict';

        this.addChairBack(0, 9, 19);
        this.addChairSeat(0, 0, 10); /* 'mass' center of the chair */
        this.addChairPole(0, -6, 10);
        this.addChairBase(0, -12, 10, Math.PI/4);
        this.addChairBase(0, -12, 10, Math.PI/(-4));
        this.addChairWheel(-10, -14, 1);
        this.addChairWheel(10, -14, 1);
        this.addChairWheel(10, -14, 19);
        this.addChairWheel(-10, -14, 19);

        this.scene.add(this);
    }
}
