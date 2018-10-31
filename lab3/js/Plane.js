class Plane extends ConstructableObject {
    constructor(scene, x, y, z) {
        super();

        this.currentMaterial = 0;

        this.currentMaterialL = 1; //only alternates between phong or lambert and basic

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

        this.stabilizer1Vertices = [];
        this.stabilizer1Faces = [];

        this.stabilizer2Vertices = [];
        this.stabilizer2Faces = [];

        this.stabilizer3Vertices = [];
        this.stabilizer3Faces = [];

        this.plane = new THREE.Group();

        this.plane.add(this.makePlaneCockpitGeometry(this.currentMaterial));

        this.tailLength = 4;
        this.plane.add(this.makePlaneTailGeometry(this.currentMaterial, this.tailLength));

        this.frontLength = 1;
        this.plane.add(this.makePlaneFrontGeometry(this.currentMaterial, this.frontLength));

        this.planeWidth = 3;
        this.plane.add(this.makePlaneRightWingGeometry(this.currentMaterial, this.planeWidth));
        this.plane.add(this.makePlaneLeftWingGeometry(this.currentMaterial, this.planeWidth));

        this.plane.add(this.makePlaneStabilizer1Geometry(this.currentMaterial, this.tailLength));
        this.plane.add(this.makePlaneStabilizer2Geometry(this.currentMaterial, this.tailLength));
        this.plane.add(this.makePlaneStabilizer3Geometry(this.currentMaterial, this.tailLength));

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

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex][1]);

        planeMesh.receiveShadow = true;
        planeMesh.castShadow = true;

        planeMesh.name = "cockpit";

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

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex][0]);

        planeMesh.receiveShadow = true;
        planeMesh.castShadow = true;

        planeMesh.name = "tail";

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

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex][0]);

        planeMesh.receiveShadow = true;
        planeMesh.castShadow = true;

        planeMesh.name = "front";

        return planeMesh;
    }

    makePlaneRightWingGeometry(materialIndex, planeWidth) {
        let geometry = new THREE.Geometry();

        let pyramidTop = new THREE.Vector3(0, 0, -planeWidth);
        let pyramidBase1 = new THREE.Vector3(-0.5, -0.1, -0.5);
        let pyramidBase2 = new THREE.Vector3(0.5, -0.1, -0.5);
        let pyramidBase3 = new THREE.Vector3(-0.5, 0.1, -0.5);
        let pyramidBase4 = new THREE.Vector3(0.5, 0.1, -0.5);

        this.rightWingVertices.push(pyramidBase1,
            pyramidBase2,
            pyramidBase4,
            pyramidBase3, pyramidTop);

        this.createFacePyramidGroup(this.rightWingFaces);

		geometry.vertices = this.rightWingVertices;
		geometry.faces = this.rightWingFaces;
		geometry.computeFaceNormals();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex][2]);

        planeMesh.receiveShadow = true;
        planeMesh.castShadow = true;

        planeMesh.name = "wing";

        return planeMesh;
    }

    makePlaneLeftWingGeometry(materialIndex, planeWidth) {
        let geometry = new THREE.Geometry();

        let pyramidTop = new THREE.Vector3(0, 0, planeWidth);
        let pyramidBase1 = new THREE.Vector3(-0.5, -0.1, 0.5);
        let pyramidBase2 = new THREE.Vector3(0.5, -0.1, 0.5);
        let pyramidBase3 = new THREE.Vector3(-0.5, 0.1, 0.5);
        let pyramidBase4 = new THREE.Vector3(0.5, 0.1, 0.5);

        this.leftWingVertices.push(pyramidBase1,
            pyramidBase2,
            pyramidBase4,
            pyramidBase3, pyramidTop);


        this.createFacePyramidGroup(this.leftWingFaces);

		geometry.vertices = this.leftWingVertices;
		geometry.faces = this.leftWingFaces;
		geometry.computeFaceNormals();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex][2]);

        planeMesh.receiveShadow = true;
        planeMesh.castShadow = true;

        planeMesh.name = "wing";

        return planeMesh;
    }

    makePlaneStabilizer1Geometry(materialIndex, tailLength) {
        let geometry = new THREE.Geometry();

        let pyramidTop = new THREE.Vector3(-tailLength + 1, 0, 0.5);
        let pyramidBase1 = new THREE.Vector3(-0.1 - tailLength + 1, -0.1, 0);
        let pyramidBase2 = new THREE.Vector3(0.1 - tailLength + 1, -0.1, 0);
        let pyramidBase3 = new THREE.Vector3(-0.1 - tailLength + 1, 0.1, 0);
        let pyramidBase4 = new THREE.Vector3(0.1 - tailLength + 1, 0.1, 0);

        this.stabilizer1Vertices.push(pyramidBase1,
            pyramidBase2,
            pyramidBase4,
            pyramidBase3, pyramidTop);


        this.createFacePyramidGroup(this.stabilizer1Faces);

		geometry.vertices = this.stabilizer1Vertices;
		geometry.faces = this.stabilizer1Faces;
		geometry.computeFaceNormals();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex][2]);

        planeMesh.receiveShadow = true;
        planeMesh.castShadow = true;

        planeMesh.name = "stabilizer";

        return planeMesh;
    }

    makePlaneStabilizer2Geometry(materialIndex, tailLength) {
        let geometry = new THREE.Geometry();

        let pyramidTop = new THREE.Vector3(-tailLength + 1, 0, -0.5);
        let pyramidBase1 = new THREE.Vector3(-0.1 - tailLength + 1, -0.1, 0);
        let pyramidBase2 = new THREE.Vector3(0.1 - tailLength + 1, -0.1, 0);
        let pyramidBase3 = new THREE.Vector3(-0.1 - tailLength + 1, 0.1, 0);
        let pyramidBase4 = new THREE.Vector3(0.1 - tailLength + 1, 0.1, 0);

        this.stabilizer2Vertices.push(pyramidBase1,
            pyramidBase2,
            pyramidBase4,
            pyramidBase3, pyramidTop);


        this.createFacePyramidGroup(this.stabilizer2Faces);

		geometry.vertices = this.stabilizer2Vertices;
		geometry.faces = this.stabilizer2Faces;
		geometry.computeFaceNormals();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex][2]);

        planeMesh.receiveShadow = true;
        planeMesh.castShadow = true;

        planeMesh.name = "stabilizer";

        return planeMesh;
    }

    makePlaneStabilizer3Geometry(materialIndex, tailLength) {
        let geometry = new THREE.Geometry();

        let pyramidTop = new THREE.Vector3(-tailLength + 1, 0.5, 0);
        let pyramidBase1 = new THREE.Vector3(-0.1 - tailLength + 1, 0, -0.1);
        let pyramidBase2 = new THREE.Vector3(0.1 - tailLength + 1, 0, -0.1);
        let pyramidBase3 = new THREE.Vector3(-0.1 - tailLength + 1, 0, 0.1);
        let pyramidBase4 = new THREE.Vector3(0.1 - tailLength + 1, 0, 0.1);

        this.stabilizer3Vertices.push(pyramidBase1,
            pyramidBase2,
            pyramidBase4,
            pyramidBase3, pyramidTop);


        this.createFacePyramidGroup(this.stabilizer3Faces);

		geometry.vertices = this.stabilizer3Vertices;
		geometry.faces = this.stabilizer3Faces;
		geometry.computeFaceNormals();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex][2]);

        planeMesh.receiveShadow = true;
        planeMesh.castShadow = true;

        planeMesh.name = "stabilizer";

        return planeMesh;
    }

    makePlaneMaterials() {
        this.materials[0] = [];
        this.materials[0].push(new THREE.MeshBasicMaterial({color: 0x646363, side: THREE.DoubleSide}),
                                new THREE.MeshBasicMaterial({color: "rgb(59, 82, 119)", side: THREE.DoubleSide}),
                                new THREE.MeshBasicMaterial({color: "rgb(74, 75, 76)", side: THREE.DoubleSide}));
        this.materials[1] = [];
        this.materials[1].push(new THREE.MeshPhongMaterial({color: 0x646363, side: THREE.DoubleSide}),
                                new THREE.MeshPhongMaterial({color: "rgb(59, 82, 119)", side: THREE.DoubleSide}),
                                new THREE.MeshPhongMaterial({color: "rgb(74, 75, 76)", side: THREE.DoubleSide}));
        this.materials[2] = [];
        this.materials[2].push(new THREE.MeshLambertMaterial({color: 0x646363, side: THREE.DoubleSide}),
                                new THREE.MeshLambertMaterial({color: "rgb(59, 82, 119)", side: THREE.DoubleSide}),
                                new THREE.MeshLambertMaterial({color: "rgb(74, 75, 76)", side: THREE.DoubleSide}));
    }

    changeMaterial() {
        for(let i = 0; i < this.children.length; i++) {
            if(this.children[i] instanceof THREE.Mesh) {
                if(this.children[i].name == "cockpit") {
                    this.children[i].material = this.materials[this.currentMaterial][1];
                }
                else if(this.children[i].name == "tail" || this.children[i].name == "front") {
                    this.children[i].material = this.materials[this.currentMaterial][0];
                }
                else if(this.children[i].name == "wing" || this.children[i].name == "stabilizer") {
                    this.children[i].material = this.materials[this.currentMaterial][2];
                }
            }
        }
    }

    // g
    // switches from phong to lamber
    changeShading() {
        if (this.currentMaterial == 2) {
            this.currentMaterial = 1; //Phong
        }
        else if (this.currentMaterial == 1) {
            this.currentMaterial = 2; //Lambert (Gouraud Shadian)
        }

        this.changeMaterial();
    }

    // l
    onOffLight() {
        if (this.currentMaterial == 0) {
            this.currentMaterial = this.currentMaterialL;
        }
        else {
            this.currentMaterialL = this.currentMaterial;
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
