class Spotlight extends THREE.SpotLight {
    constructor(scene, color, x, y, z, angleX, angleZ, bx, by, bz, sx, sy, sz, tx, ty, tz) {
        super(color, 1);
        this.castShadow = true;

        this.shadow.mapSize.width = 1024;
        this.shadow.mapSize.height = 1024;

        this.shadow.camera.near = 10;
        this.shadow.camera.far = 100;
        this.shadow.camera.fov = 30;

        scene.add(this);
        scene.add(this.target);

        this.target.position.set(tx, ty, tz);

        this.position.set(sx, sy, sz);

        this.spotlight = new THREE.Object3D();

        this.spotlight.add(this.makeSpotlightHead(x, y, z, angleX, angleZ));
        this.spotlight.add(this.makeSpotlightBulb(bx, by, bz));

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

    onOffSpotlight() {
        this.visible = !this.visible;
    }
}
