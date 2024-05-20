import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';


export class MyRockSet {
    constructor(scene) {
        this.scene = scene;
        this.rocks = [];
        this.scales = [];
        this.rotations = [];
        this.generateRocks();
    }

    generateRocks() {
        for (let i = 0; i < 9; i++) {
            this.rocks.push(new MyRock(this.scene, 10, 10, 1));
            let scalex = Math.random() * 0.5 + 0.5;
            let scaley = Math.random() * 0.5 + 0.5;
            let scalez = Math.random() * 0.5 + 0.5;
            let rotatex = Math.random();
            let rotatey = Math.random();
            let rotatez = Math.random();
            this.rotations.push([rotatex, rotatey, rotatez]);
            this.scales.push([scalex, scaley, scalez]);
        }
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(this.scales[0][0], this.scales[0][1], this.scales[0][2]);
        this.scene.rotate(this.rotations[0][0], 1, 0, 0);
        this.scene.rotate(this.rotations[0][1], 0, 1, 0);
        this.scene.rotate(this.rotations[0][2], 0, 0, 1);

        this.rocks[0].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.scene.scale(this.scales[1][0], this.scales[1][1], this.scales[1][2]);
        this.scene.rotate(this.rotations[1][0], 1, 0, 0);
        this.scene.rotate(this.rotations[1][1], 0, 1, 0);
        this.scene.rotate(this.rotations[1][2], 0, 0, 1);
        this.rocks[1].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 2);
        this.scene.scale(this.scales[2][0], this.scales[2][1], this.scales[2][2]);
        this.scene.rotate(this.rotations[2][0], 1, 0, 0);
        this.scene.rotate(this.rotations[2][1], 0, 1, 0);
        this.scene.rotate(this.rotations[2][2], 0, 0, 1);
        this.rocks[2].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, 0, 2);
        this.scene.scale(this.scales[3][0], this.scales[3][1], this.scales[3][2]);
        this.scene.rotate(this.rotations[3][0], 1, 0, 0);
        this.scene.rotate(this.rotations[3][1], 0, 1, 0);
        this.scene.rotate(this.rotations[3][2], 0, 0, 1);
        this.rocks[3].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.scale(this.scales[4][0], this.scales[4][1], this.scales[4][2]);
        this.scene.rotate(this.rotations[4][0], 1, 0, 0);
        this.scene.rotate(this.rotations[4][1], 0, 1, 0);
        this.scene.rotate(this.rotations[4][2], 0, 0, 1);
        this.rocks[4].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4, 0, 0);
        this.scene.scale(this.scales[5][0], this.scales[5][1], this.scales[5][2]);
        this.scene.rotate(this.rotations[5][0], 1, 0, 0);
        this.scene.rotate(this.rotations[5][1], 0, 1, 0);
        this.scene.rotate(this.rotations[5][2], 0, 0, 1);
        this.rocks[5].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4, 0, 2);
        this.scene.scale(this.scales[6][0], this.scales[6][1], this.scales[6][2]);
        this.scene.rotate(this.rotations[6][0], 1, 0, 0);
        this.scene.rotate(this.rotations[6][1], 0, 1, 0);
        this.scene.rotate(this.rotations[6][2], 0, 0, 1);
        this.rocks[6].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3, 1, 1);
        this.scene.scale(this.scales[7][0], this.scales[7][1], this.scales[7][2]);
        this.scene.rotate(this.rotations[7][0], 1, 0, 0);
        this.scene.rotate(this.rotations[7][1], 0, 1, 0);
        this.scene.rotate(this.rotations[7][2], 0, 0, 1);
        this.rocks[7].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, 2, 1);
        this.scene.scale(this.scales[8][0], this.scales[8][1], this.scales[8][2]);
        this.scene.rotate(this.rotations[8][0], 1, 0, 0);
        this.scene.rotate(this.rotations[8][1], 0, 1, 0);
        this.scene.rotate(this.rotations[8][2], 0, 0, 1);
        this.rocks[8].display();
        this.scene.popMatrix();
        
    }
    

}