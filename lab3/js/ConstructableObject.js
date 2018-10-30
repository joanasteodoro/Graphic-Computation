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

            new THREE.Vector3(-height, (y0-y1) / 2, (z0-z1) / 2), // vertex 5
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
            vector.push(new THREE.Face3(v0, v2, v1));
        }

        else {
            vector.push(new THREE.Face3(v0, v1, v2));
        }
    }
}
