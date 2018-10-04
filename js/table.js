class Table extends THREE.Object3D {
    constructor(scene, x, y, z) {
        super();

        this.scene = scene;

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.createTable();
    }

    addTableLeg(x, y, z) {
        'use strict';

        let geometry = new THREE.CylinderGeometry(1, 1, 28);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addTableTop(x, y, z) {
        'use strict';

        var geometry = new THREE.BoxGeometry(48, 2, 24);
        var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true }));
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    createTable() {
        'use strict';

        this.addTableTop(0, 0, 0);
        this.addTableLeg(-21, -14, -9); /* y = -28 (table leg height)  */
        this.addTableLeg(-21, -14, 9);
        this.addTableLeg(21, -14, 9);
        this.addTableLeg(21, -14, -9);

        this.scene.add(this);
    }
}
