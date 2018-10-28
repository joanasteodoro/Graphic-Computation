class Floor extends THREE.Object3D {
    constructor(scene, x, y, z, width, height) {
        super();

        var geometry = new THREE.PlaneBufferGeometry(width, height, 2, 2);
        var material = new THREE.MeshBasicMaterial({ color:"rgb(140, 181, 247)", side: THREE.DoubleSide }); // renders on both sides
        var floorMesh = new THREE.Mesh(geometry, material);

        floorMesh.position.x = x;
        floorMesh.position.y = y;
        floorMesh.position.z = z;

        floorMesh.rotation.x = Math.PI / 2;

        this.add(floorMesh);
        scene.add(this);
    }
}
