class Spotlight extends THREE.SpotLight {
    constructor(scene, color, spotlightIndex) {
        super(color, 1);
        this.castShadow = true;

        this.shadow.mapSize.width = 1024;
        this.shadow.mapSize.height = 1024;

        this.shadow.camera.near = 10;
        this.shadow.camera.far = 100;
        this.shadow.camera.fov = 30;

        this.angle = Math.PI / 3;

        scene.add(this);
        scene.add(this.target);

        this.spotlight = new THREE.Object3D();

        if (spotlightIndex == 1) {
            this.makeSpotlight1();
        }
        else if (spotlightIndex == 2) {
            this.makeSpotlight2();
        }
        else if (spotlightIndex == 3) {
            this.makeSpotlight3();
        }
        else {
            this.makeSpotlight4();
        }
        scene.add(this.spotlight);
    }

    makeSpotlightHead(x, y, z, angleX, angleZ) {
        let geometry = new THREE.ConeGeometry(0.5, 1, 32);
        var material = new THREE.MeshBasicMaterial( {color: "rgb(21, 28, 40)"} );
        var head = new THREE.Mesh( geometry, material );

        head.position.x = x;
        head.position.y = y;
        head.position.z = z;

        head.rotation.x = angleX;
        head.rotation.z = angleZ;

        return head;
    }

    makeSpotlightBulb(x, y, z) {
        let geometry = new THREE.SphereGeometry(0.4, 32, 32);
        var material = new THREE.MeshBasicMaterial( {color: "rgb(247, 224, 79)"} );
        var bulb = new THREE.Mesh( geometry, material );

        bulb.position.x = x;
        bulb.position.y = y;
        bulb.position.z = z;

        return bulb;
    }

    makeSpotlight1() {
        let x = 2;
        let y = -3.5;
        let z = -4;
        let angleX = -Math.PI / 2;
        let angleZ = -Math.PI / 4;
        let bx = 1.6;
        let by = -3.5;
        let bz = -3.6;
        let sx = 1.5;
        let sy = -3.5;
        let sz = -4.5;
        let tx = -3;
        let ty = 4;
        let tz = 9;

        this.target.position.set(tx, ty, tz);
        this.position.set(sx, sy, sz);

        this.spotlight.add(this.makeSpotlightHead(x, y, z, angleX, angleZ));
        this.spotlight.add(this.makeSpotlightBulb(bx, by, bz));
    }

    makeSpotlight2() {
        let x = -2;
        let y = -3.5;
        let z = -4;
        let angleX = -Math.PI / 2;
        let angleZ = Math.PI / 4;
        let bx = -1.6;
        let by = -3.5;
        let bz = -3.6;
        let sx = -1.5;
        let sy = -3.5;
        let sz = -4.5;
        let tx = 3;
        let ty = 4;
        let tz = 9;

        this.target.position.set(tx, ty, tz);
        this.position.set(sx, sy, sz);

        this.spotlight.add(this.makeSpotlightHead(x, y, z, angleX, angleZ));
        this.spotlight.add(this.makeSpotlightBulb(bx, by, bz));
    }

    makeSpotlight3() {
        let x = 2;
        let y = -3.5;
        let z = 4;
        let angleX = -Math.PI / 2;
        let angleZ = -3 * Math.PI / 4;
        let bx = 1.6;
        let by = -3.5;
        let bz = 3.6;
        let sx = 1.5;
        let sy = -3.5;
        let sz = 4.5;
        let tx = -3;
        let ty = 4;
        let tz = -9;

        this.target.position.set(tx, ty, tz);
        this.position.set(sx, sy, sz);

        this.spotlight.add(this.makeSpotlightHead(x, y, z, angleX, angleZ));
        this.spotlight.add(this.makeSpotlightBulb(bx, by, bz));
    }

    makeSpotlight4() {
        let x = -2;
        let y = -3.5;
        let z = 4;
        let angleX = -Math.PI / 2;
        let angleZ = 3 * Math.PI / 4;
        let bx = -1.6;
        let by = -3.5;
        let bz = 3.6;
        let sx = -1.5;
        let sy = -3.5;
        let sz = 4.5;
        let tx = 3;
        let ty = 4;
        let tz = -9;

        this.target.position.set(tx, ty, tz);
        this.position.set(sx, sy, sz);

        this.spotlight.add(this.makeSpotlightHead(x, y, z, angleX, angleZ));
        this.spotlight.add(this.makeSpotlightBulb(bx, by, bz));
    }

    onOffSpotlight() {
        this.visible = !this.visible;
    }

    getAngle() {
        return this.angle;
    }

    setAngle(angle) {
        this.angle = angle;
    }
}
