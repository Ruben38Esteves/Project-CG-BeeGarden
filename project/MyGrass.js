import { CGFobject } from '../lib/CGF.js';
import { MyGrassLeaf } from './MyGrassLeaf.js';
/**
 * MyGrass
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrass extends CGFobject {
    constructor(scene, cols, rows, spacing, amount) {
        super(scene);
        this.cols = cols;
        this.rows = rows;
        this.spacing = spacing;
        this.amount = amount;
        this.initObjects();
    }

    update(angle) {
        for (let i = 0; i < this.amount; i++) {
            this.grassLeaves[i].setAngle(angle);
        }
    }

    initObjects() {
        this.grassLeaves = [];
        this.grassX = [];
        this.grassZ = [];
        for (let i = 0; i < this.amount; i++) {
            this.grassLeaves.push(new MyGrassLeaf(this.scene, 0))
            this.grassX.push(Math.floor(Math.random() * 50));
            this.grassZ.push(Math.floor(Math.random() * 50));
        }
    }

    display() {

        for (let j = 0; j < this.amount; j++) {
            this.scene.pushMatrix();
            this.scene.translate(this.grassX[j], 0, this.grassZ[j]);
            this.scene.scale(0.5,0.5,0.5);
            this.grassLeaves[j].display();
            this.scene.popMatrix();
        }

    }
}