class ConstructableObject extends THREE.Object3D {
    constructor() {
        super();
    }

    createVertexBoxGroup(vector, x0, x1, y0, y1, z0, z1) {
        vector.push(
            new THREE.Vector3(x0, y1, z0), // vertex E
            new THREE.Vector3(x1, y1, z0), // vertex F
            new THREE.Vector3(x0, y0, z0), // vertex A
            new THREE.Vector3(x1, y0, z0), // vertex B

            new THREE.Vector3(x0, y1, z1), // vertex H
            new THREE.Vector3(x1, y1, z1), // vertex G
            new THREE.Vector3(x0, y0, z1), // vertex D
            new THREE.Vector3(x1, y0, z1) // vertex C
        );
    }

    createVertexPyramidGroup(vector, height, x0, x1, y0, y1, z0, z1) {
        vector.push(
            new THREE.Vector3(x0, y1, z1), // vertex 3
            new THREE.Vector3(x0, y1, z0), // vertex 4
            new THREE.Vector3(x0, y0, z0), // vertex 1
            new THREE.Vector3(x0, y0, z1), // vertex 2

            new THREE.Vector3(x0 - height, (y0-y1) / 2, (z0-z1) / 2), // vertex 5
        );
    }

    /* Creates a face for a given geometry*/
    createSquareFace(vector, v0, v1, v2, v3, side) {
    	if (side) {
    		vector.push(
    			new THREE.Face3(v0, v2, v1),
    			new THREE.Face3(v1, v2, v3)
    		);
    	}

    	else {
    		vector.push(
    			new THREE.Face3(v0, v1, v2),
    			new THREE.Face3(v1, v3, v2)
    		);
    	}
    }

    /* Creates a face for a given geometry*/
    createTriangleFace(vector, v0, v1, v2, side) {
        if (side) {
            vector.push(
                new THREE.Face3(v0, v2, v1)
            );
        }

        else {
            vector.push(
                new THREE.Face3(v0, v1, v2)
            );
        }
    }

    createFaceCubeGroup(vector) {
        // play connect the dots with index values from the vertexes array
        vector.push( new THREE.Face3(2, 3, 7), //up
            new THREE.Face3(7, 6, 2));
        vector.push( new THREE.Face3(0, 1, 5), //down
            new THREE.Face3(5, 4, 0));
        vector.push( new THREE.Face3(3, 7, 5), //right
            new THREE.Face3(5, 1, 3));
        vector.push( new THREE.Face3(2, 6, 4), //left
            new THREE.Face3(4, 0, 2));
        vector.push( new THREE.Face3(2, 3, 1), //front
            new THREE.Face3(1, 0, 2));
        vector.push( new THREE.Face3(6, 7, 5), //back
            new THREE.Face3(5, 4, 6));
    }

    createFacePyramidGroup(vector) {
        // play connect the dots with index values from the vertexes array
        this.createSquareFace(vector, 2, 3, 0, 1, 0); // pyramid base
    	  this.createTriangleFace(vector, 2, 1, 4, 1); // Side1
        this.createTriangleFace(vector, 1, 0, 4, 0); // Side2
    	  this.createTriangleFace(vector, 0, 3, 4, 1); // Side3
        this.createTriangleFace(vector, 3, 2, 4, 1); // Side4
    }
}
