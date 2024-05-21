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
        this.flowerRotations = [];
        for(let i = 0; i < this.rows * this.cols; i ++){
            this.flowers.push(new MyFlower(this.scene, Math.floor(Math.random() * 4)+3,Math.floor(Math.random() * 5)+7,(Math.random() * 0.5)+0.7, (Math.random() * 0.5) + 0.2, Math.floor(Math.random() * 4)+3));
            //this.flowerRotations.push(Math.floor((Math.random()* Math.PI *2 / 3) - Math.PI / 3))
        }
    }

    display(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.scene.pushMatrix();
                this.scene.translate(j * this.spacing,0, i * this.spacing);
                //this.scene.rotate(this.flowerRotations[i * this.rows + j],0,1,0);
                this.flowers[(i * this.cols) + j].display();
                //console.log((i * this.cols) + j);
                let flower = this.flowers[(i * this.cols) + j];
                flower.xInGarden = j * this.spacing;
                flower.zInGarden = i * this.spacing;
                //console.log(flower.xInGarden, flower.zInGarden);
                flower.display();
                this.scene.popMatrix();
            }
        }
    }
}

