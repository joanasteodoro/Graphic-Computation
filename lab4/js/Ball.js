const MAX_VEL = 10;
const MIN_VEL = 0;

class Ball extends THREE.Object3D {
    constructor(index) {
        super();
        this.createTexture();
        this.materials = [];
        this.createMaterials();
        this.createMesh(index);

        this.acceleration = Math.PI / 8;
        this.angVelocity = 0;
        this.angle = 0;

        this.isMoving = false;
    }

    createTexture() {
        this.texture = new THREE.TextureLoader().load('textures/8ball.png');
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set(1, 1);   
    }

    createMaterials() {
        this.materials.push(new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, map: this.texture}));
        this.materials.push(new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x666666, shininess: 50, wireframe: false, map: this.texture}));
    }

    createMesh(index) {
        let geometry = new THREE.SphereGeometry(0.25, 10, 10);

        this.mesh = new THREE.Mesh(geometry, this.materials[index]);

        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;

        this.mesh.position.set(0, 0, 1);

        this.mesh.name = "ball";
    }

    getMesh() {
        return this.mesh;
    }

    getAngVelocity() {
        return this.angVelocity;
    }

    getAngle() {
        return this.angle;
    }

    updateMaterial(index) {
        this.mesh.material = this.materials[index];
    }

    startStopMovement() {
        this.isMoving = !this.isMoving;
    }

    updateMovement(delta) {
        let signal;
        
        if(this.isMoving) signal = 1;
        else signal = -1;

        this.updateAngVelocity(signal * delta);
        this.updateAngle(delta);
        
    }

    updateAngVelocity(delta) {
        this.angVelocity += this.acceleration * delta;
        if(this.angVelocity > MAX_VEL) this.angVelocity = MAX_VEL;
        if(this.angVelocity < MIN_VEL) this.angVelocity = MIN_VEL;
    }

    updateAngle(delta) {
        this.angle += this.angVelocity * delta;
    }
}
