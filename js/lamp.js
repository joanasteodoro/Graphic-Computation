class Lamp extends THREE.Object3D {
    constructor(scene, x, y, z) {
        super();

        this.scene = scene;

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.createLamp();
    }

    addLampPole(x, y, z) {
        'use strict';

        let geometry = new THREE.CylinderGeometry(1, 1, 55);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "rgb(255, 179, 102)", wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addLampHead(x, y, z) {
        'use strict';

        let geometry = new THREE.CylinderGeometry(7, 7, 10, 8, 1, true);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "rgb(255, 179, 102)", wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addLampLight(x, y, z) {
        'use strict';

        let geometry = new THREE.SphereGeometry(2);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "rgb(255, 255, 255)", wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addLampBase(x, y, z) {
        'use strict';

        let geometry = new THREE.ConeGeometry(7, 2, 8, 1, true);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "rgb(255, 179, 102)", wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    createLamp() {
        'use strict';

        this.addLampPole(0, 29, 0);
        this.addLampHead(0, 57, 0);
        this.addLampLight(0, 57, 0);
        this.addLampBase(0, 1, 0);

        this.scene.add(this);
    }
}
