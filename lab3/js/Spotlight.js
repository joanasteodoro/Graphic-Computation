class Spotlight extends THREE.SpotLight {
    constructor(scene, color) {
        super(color);
        this.castShadow = true;

        this.shadow.mapSize.width = 1024;
        this.shadow.mapSize.height = 1024;

        this.shadow.camera.near = 500;
        this.shadow.camera.far = 4000;
        this.shadow.camera.fov = 30;

        this.spotlight = new THREE.Object3D();

        this.spotlight.add(this.makeSpotlightHead(4, 0, -4));
        //this.spotlight.add(this.makeSpotlightBulb(4, 0, -4));

        scene.add(this);
    }

    makeSpotlightHead(x, y, z) {
        let geometry = new THREE.ConeGeometry(5, 15, 32);
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var head = new THREE.Mesh( geometry, material );

        head.position.x = x;
        head.position.y = y;
        head.position.z = z;

        return head;
    }

    makeSpotlightBulb(x, y, z) {
        let geometry = new THREE.SphereGeometry(5, 32, 32);
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var bulb = new THREE.Mesh( geometry, material );

        bulb.position.x = x;
        bulb.position.y = y;
        bulb.position.z = z;

        return bulb;
    }

    makeSpotlightPole() {
        let geometry = new THREE.ConeGeometry(2, 20, 32);
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var pole = new THREE.Mesh( geometry, material );

        return pole;
    }
}
