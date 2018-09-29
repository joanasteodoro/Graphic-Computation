var geometry, material, mesh;

function addChairBack(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CubeGeometry(20, 16, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairSeat(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(20, 2, 20); /* width, height, depth */
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairPole(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(2, 10, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairBase(obj, x, y, z, angle) {
    'use strict';
    geometry = new THREE.CubeGeometry(28, 2, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    geometry.rotateY(angle);
    obj.add(mesh);
}

function addChairWheel(obj, x, y, z) {
    'use strict';
    geometry = new THREE.TorusGeometry(1, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createChair(scene, x, y, z) {
    'use strict';

    var chair = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addChairBack(chair, 0, 9, 19);
    addChairSeat(chair, 0, 0, 10); /* 'mass' center of the chair */
    addChairPole(chair, 0, -6, 10);
    addChairBase(chair, 0, -12, 10, Math.PI/4);
    addChairBase(chair, 0, -12, 10, Math.PI/(-4));
    addChairWheel(chair, -10, -14, 1);
    addChairWheel(chair, 10, -14, 1);
    addChairWheel(chair, 10, -14, 19);
    addChairWheel(chair, -10, -14, 19);

    scene.add(chair);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}
