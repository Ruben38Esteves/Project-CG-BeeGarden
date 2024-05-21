import {CGFobject} from '../lib/CGF.js';
import { MyGrassLeaf } from './MyGrassLeaf.js';
/**
 * MyGrass
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrass extends CGFobject {
	constructor(scene, cols, rows, spacing) {
		super(scene);
        this.cols = cols;
        this.rows = rows;
        this.spacing = spacing;
        this.initObjects();
	}

    update(angle){
        for(let i = 0; i < this.rows * this.cols; i ++){
            this.grassLeaves[i].setAngle(angle);
        }
    }
	
	initObjects(){
        this.grassLeaves = [];
        for(let i = 0; i < this.rows * this.cols; i ++){
            this.grassLeaves.push(new MyGrassLeaf(this.scene,0))
        }
    }

    display(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.scene.pushMatrix();
                this.scene.translate(j * this.spacing,0, i * this.spacing);
                this.grassLeaves[(i * this.cols) + j].display();
                this.scene.popMatrix();
            }
        }
    }
}