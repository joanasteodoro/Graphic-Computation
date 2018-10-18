class Scene extends THREE.Scene {
    constructor() {
        super();
        this.background = new THREE.Color("rgb(247, 231, 207)");
        this.add(new THREE.AxisHelper(50));

        //ADD SCENE ELEMENTS
        this.room = new Room(this, 0, 0 ,0);

        /*for (int i = 0; i < 10; i++) {
            let pos = Math.randFloat();
            let dir = Math.randFloat();
            let vel = Math.randFloat();
            this.balls[i] = new Ball(pos, dir, vel);
        }*/
    }
}
