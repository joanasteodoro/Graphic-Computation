class Plane extends ConstructableObject {
    constructor(scene, x, y, z) {
        super();

        this.materials = [];
        this.makePlaneMaterials();

        this.cockpitVertices = [];
        this.cockpitFaces = [];

        this.frontVertices = [];
        this.frontFaces = [];

        this.plane = new THREE.Group();

        this.plane.add(this.makePlaneCockpitGeometry(0));
        this.plane.add(this.makePlaneFrontGeometry(0));

        scene.add(this.plane);
    }

    makePlaneCockpitGeometry(materialIndex) {
        let geometry = new THREE.Geometry();

        this.createVertexBoxGroup(this.cockpitVertices, 0, 1, 1, 0, 1, 0); // cube box

        // play connect the dots with index values from the vertexes array
        this.createSquareFace(this.cockpitFaces, 2, 3, 0, 1, 0); // Front face1
    	this.createSquareFace(this.cockpitFaces, 6, 7, 5, 4, 1); // Back face2
        this.createSquareFace(this.cockpitFaces, 0, 1, 5, 4, 0); // Bottom face3
    	this.createSquareFace(this.cockpitFaces, 2, 3, 7, 6, 1); // Up face4
        this.createSquareFace(this.cockpitFaces, 3, 7, 5, 0, 0); // Right face5
    	this.createSquareFace(this.cockpitFaces, 2, 6, 4, 0, 1); // Left face6

		geometry.vertices = this.cockpitVertices;
		geometry.faces = this.cockpitFaces;
		geometry.computeFaceNormals();

        geometry.normalize();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex]);

        //this.add(planeMesh);
        return planeMesh
    }

    makePlaneFrontGeometry(materialIndex) {
        let geometry = new THREE.Geometry();

        this.createVertexPyramidGroup(this.frontVertices, 2, 1, 1, 0.5, 0, 1, 0);


        // play connect the dots with index values from the vertexes array
        this.createSquareFace(this.frontFaces, 2, 3, 0, 1, 0); // pyramid base
    	this.createTriangleFace(this.frontFaces, 2, 1, 4, 1); // Side1
        this.createTriangleFace(this.frontFaces, 1, 0, 4, 0); // Side2
    	this.createTriangleFace(this.frontFaces, 0, 3, 4, 1); // Side3
        this.createTriangleFace(this.frontFaces, 3, 2, 4, 1); // Side4

		geometry.vertices = this.frontVertices;
		geometry.faces = this.frontFaces;
		geometry.computeFaceNormals();

        geometry.normalize();

        let planeMesh = new THREE.Mesh(geometry, this.materials[materialIndex]);

        console.log(planeMesh.position);
        //this.add(planeMesh);
        return planeMesh;
    }

    makePlaneMaterials() {
        this.materials[0] = new THREE.MeshBasicMaterial({color: 0x646363, wireframe: true, side: THREE.DoubleSide});
        this.materials[1] = new THREE.MeshPhongMaterial({color: 0x646363, wireframe: true, side: THREE.DoubleSide});
        this.materials[2] = new THREE.MeshLambertMaterial({color: 0x646363, wireframe: true, side: THREE.DoubleSide});
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
