class Floor extends THREE.Object3D {
    constructor(scene, x, y, z, width, height) {
        super();

        this.basicMaterial = new THREE.MeshBasicMaterial({ color:"rgb(140, 181, 247)", side: THREE.DoubleSide });
        this.phongMaterial = new THREE.MeshPhongMaterial({ color:"rgb(140, 181, 247)", side: THREE.DoubleSide });
        this.lambertMaterial = new THREE.MeshLambertMaterial({ color:"rgb(140, 181, 247)", side: THREE.DoubleSide });

        this.currentMaterial = this.basicMaterial;
        this.currentMaterialL = this.phongMaterial;

        var geometry = new THREE.PlaneBufferGeometry(width, height, 2, 2);
        var floorMesh = new THREE.Mesh(geometry, this.basicMaterial);

        floorMesh.position.x = x;
        floorMesh.position.y = y;
        floorMesh.position.z = z;

        floorMesh.rotation.x = Math.PI / 2;

        floorMesh.receiveShadow = true;

        this.add(floorMesh);
        scene.add(this);
    }

    changeMaterial() {
        this.children[0].material = this.currentMaterial;
    }

    // g
    // switches from phong to lambert
    changeShading() {
        if (this.currentMaterial == this.lambertMaterial) {
            this.currentMaterial = this.phongMaterial;
        }
        else if (this.currentMaterial == this.phongMaterial) {
            this.currentMaterial = this.lambertMaterial;
        }

        this.changeMaterial();
    }

    // l
    onOffLight() {
        if (this.currentMaterial == this.basicMaterial) {
            this.currentMaterial = this.currentMaterialL;
        }
        else {
            this.currentMaterialL = this.currentMaterial;
            this.currentMaterial = this.basicMaterial;
        }

        this.changeMaterial();
    }

}
