var geometry, material, mesh;

function addTableLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(1, 1, 28);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(48, 2, 24);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTable(scene, x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addTableTop(table, 0, 0, 0);
    addTableLeg(table, -21, -14, -9); /* y = -28 (table leg height)  */
    addTableLeg(table, -21, -14, 9);
    addTableLeg(table, 21, -14, 9);
    addTableLeg(table, 21, -14, -9);

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}
