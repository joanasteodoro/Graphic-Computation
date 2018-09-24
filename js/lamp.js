var geometry, material, mesh;

function addLampPole(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(2, 6, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function addLampHead(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampLight(obj, x, y, z) {
    'use strict';
    geometry = new THREE.SphereGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createLamp(x, y, z) {
    'use strict';

    var lamp = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addLampPole(table, 0, 0, 0);
    addLampHead(table, -25, -1, -8);
    addLampLight(table, -25, -1, 8);
    addLampBase(table, 25, -1, 8);

    scene.add(lamp);

    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;
}
