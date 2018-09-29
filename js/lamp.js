var geometry, material, mesh;

function addLampPole(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(1, 1, 55);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampHead(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(7, 7, 10, 8, 1, true);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampLight(obj, x, y, z) {
    'use strict';
    geometry = new THREE.SphereGeometry(2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.ConeGeometry(7, 2, 8, 1, true);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createLamp(scene, x, y, z) {
    'use strict';

    var lamp = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addLampPole(lamp, 0, 29, 0);
    addLampHead(lamp, 0, 57, 0);
    addLampLight(lamp, 0, 57, 0);
    addLampBase(lamp, 0, 1, 0);

    scene.add(lamp);

    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;
}
