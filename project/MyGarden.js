import {CGFobject} from '../lib/CGF.js';
import { MyFlower } from './MyFower.js';
/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
	constructor(scene, cols, rows, spacing) {
		super(scene);
        this.cols = cols;
        this.rows = rows;
        this.spacing = spacing;
        this.initObjects();
	}
	
	initObjects(){
        this.flowers = [];
        for(let i = 0; i < this.rows * this.cols; i ++){
            this.flowers.push(new MyFlower(this.scene, Math.floor(Math.random() * 4)+3,Math.floor(Math.random() * 5)+3,(Math.random() * 0.5)+0.5, (Math.random() / 2) + 0.2, Math.floor(Math.random() * 4)+3));
        }
    }

    display(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.scene.pushMatrix();
                this.scene.translate(j * this.spacing,0, i * this.spacing);
                console.log((i * this.cols) + j);
                this.flowers[(i * this.cols) + j].display();
                this.scene.popMatrix();
            }
        }
    }
}

