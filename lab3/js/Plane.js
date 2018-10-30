class Plane extends ConstructableObject {
    constructor(scene, x, y, z) {
        super();

        this.currentMaterial = 0;

        this.materials = [];
        this.makePlaneMaterials();

        this.cockpitVertices = [];
        this.cockpitFaces = [];

        this.tailVertices = [];
        this.tailFaces = [];

        this.frontVertices = [];
        this.frontFaces = [];

        this.rightWingVertices = [];
        this.rightWingFaces = [];

        this.leftWingVertices = [];
        this.leftWingFaces = [];

        this.plane = new THREE.Group();

        this.plane.add(this.makePlaneCockpitGeometry(this.currentMaterial));

        this.plane.add(this.makePlaneTailGeometry(this.currentMaterial, 4));

        this.plane.add(this.makePlaneFrontGeometry(this.currentMaterial, 1));

        this.plane.add(this.makePlaneRightWingGeometry(this.currentMaterial, 1));
        this.plane.add(this.makePlaneLeftWingGeometry(this.currentMaterial, 1));

        this.children = this.plane.children;

        scene.add(this.plane);
    }

    makePlaneCockpitGeometry(materialIndex) {
        let geometry = new THREE.Geometry();

        this.createVertexBoxGroup(this.cockpitVertices, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5); // cube box

        this.createFaceCubeGroup(this.cockpitFaces);

		geometry.vertices = this.cockpitVertices;
		geometry.faces = this.cockpitFaces;
		geometry.computeFaceNormals();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex]);

        planeMesh.receiveShadow = true;

        return planeMesh
    }

    makePlaneTailGeometry(materialIndex, height) {
        let geometry = new THREE.Geometry();

        let pyramidTop = new THREE.Vector3(0.5 - height, 0, 0)

        this.tailVertices.push(this.cockpitVertices[2],
            this.cockpitVertices[6],
            this.cockpitVertices[4],
            this.cockpitVertices[0], pyramidTop);


        this.createFacePyramidGroup(this.tailFaces);

		geometry.vertices = this.tailVertices;
		geometry.faces = this.tailFaces;
		geometry.computeFaceNormals();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex]);

        planeMesh.receiveShadow = true;

        return planeMesh;
    }

    makePlaneFrontGeometry(materialIndex, height) {
        let geometry = new THREE.Geometry();

        let pyramidTop = new THREE.Vector3(0.5 + height, 0, 0);
        let pyramidMiddle1 = new THREE.Vector3(0.5, 0, -0.5);
        let pyramidMiddle2 = new THREE.Vector3(0.5, 0, 0.5);

        this.frontVertices.push(pyramidMiddle2,
            pyramidMiddle1,
            this.cockpitVertices[5],
            this.cockpitVertices[1], pyramidTop);


        this.createFacePyramidGroup(this.frontFaces);

		geometry.vertices = this.frontVertices;
		geometry.faces = this.frontFaces;
		geometry.computeFaceNormals();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex]);

        planeMesh.receiveShadow = true;

        return planeMesh;
    }

    makePlaneRightWingGeometry(materialIndex, height) {
        let geometry = new THREE.Geometry();

        let pyramidTop = new THREE.Vector3(0.5 + height, 0, 0);
        let pyramidMiddle1 = new THREE.Vector3(0.5, 0, -0.5);
        let pyramidMiddle2 = new THREE.Vector3(0.5, 0, 0.5);

        this.rightWingVertices.push(pyramidMiddle2,
            pyramidMiddle1,
            this.cockpitVertices[5],
            this.cockpitVertices[1], pyramidTop);

        this.createFacePyramidGroup(this.rightWingFaces);

		geometry.vertices = this.rightWingVertices;
		geometry.faces = this.rightWingFaces;
		geometry.computeFaceNormals();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex]);

        planeMesh.receiveShadow = true;

        return planeMesh;
    }

    makePlaneLeftWingGeometry(materialIndex, height) {
        let geometry = new THREE.Geometry();

        let pyramidTop = new THREE.Vector3(0.5 + height, 0, 0);
        let pyramidMiddle1 = new THREE.Vector3(0.5, 0, -0.5);
        let pyramidMiddle2 = new THREE.Vector3(0.5, 0, 0.5);

        this.leftWingVertices.push(pyramidMiddle2,
            pyramidMiddle1,
            this.cockpitVertices[5],
            this.cockpitVertices[1], pyramidTop);

        this.createFacePyramidGroup(this.leftWingFaces);

		geometry.vertices = this.leftWingVertices;
		geometry.faces = this.leftWingFaces;
		geometry.computeFaceNormals();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex]);

        planeMesh.receiveShadow = true;

        return planeMesh;
    }

    makePlaneMaterials() {
        this.materials[0] = new THREE.MeshBasicMaterial({color: 0x646363, wireframe: true, side: THREE.DoubleSide});
        this.materials[1] = new THREE.MeshPhongMaterial({color: 0x646363, side: THREE.DoubleSide});
        this.materials[2] = new THREE.MeshLambertMaterial({color: 0x646363, side: THREE.DoubleSide});
    }

    changeMaterial() {
        for(let i = 0; i < this.children.length; i++) {
            if(this.children[i] instanceof THREE.Mesh) {
                this.children[i].material = this.materials[this.currentMaterial];
            }
        }
    }

    // g
    changeShading() {
        if (this.currentMaterial == 2) {
            this.currentMaterial = 1; //Phong
        }
        else {
            this.currentMaterial = 1; //Lambert (Gouraud Shadian)
        }

        this.changeMaterial();
    }

    // l
    onOffLight() {
        if (this.currentMaterial == 0) {
            // VER SE E POR A PHONG OU A LAMBERT ??????
            this.currentMaterial = 1;
        }
        else {
            this.currentMaterial = 0;
        }

        this.changeMaterial();
    }

    getPositionX() {
        return this.plane.position.x;
    }

    getPositionY() {
        return this.plane.position.y;
    }

    getPositionZ() {
        return this.plane.position.z;
    }

    setPositionX(x) {
        this.plane.position.x = x;
    }

    setPositionY(y) {
        this.plane.position.y = y;
    }

    setPositionZ(z) {
        this.plane.position.z = z;
    }

    getRotationY() {
        return this.plane.rotation.y;
    }

    rotateX(angle) {
        this.plane.rotateX(angle);
    }

    rotateY(angle) {
        this.plane.rotateY(angle);
    }

    rotateZ(angle) {
        this.plane.rotateZ(angle);
    }
}
