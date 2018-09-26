var geometry, material, mesh;

function addChairBack(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CubeGeometry(20, 18, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
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
    geometry = new THREE.CubeGeometry(5, 0.5, 0.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(0.05, 2, 1.8);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairWheel(obj, x, y, z) {
    'use strict';
    geometry = new THREE.TorusGeometry(2, 2, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createChair(scene, x, y, z) {
    'use strict';

    var chair = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addChairBack(chair, 0, 10, 19);
    addChairSeat(chair, 0, -1, 10); /* 'mass' center of the chair */
    //addChairPole(chair, -25, -1, 8);
    //addChairBase(chair, 25, -1, 8);
    //addChairWheel(chair, 25, -1, -8);
    //addChairWheel(chair, 25, -1, -8);
    //addChairWheel(chair, 25, -1, -8);
    //addChairWheel(chair, 25, -1, -8);

    scene.add(chair);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}
