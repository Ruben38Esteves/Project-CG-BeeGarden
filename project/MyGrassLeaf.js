import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyTrapezoid } from './MyTrapezoid.js';
/**
 * MyGrassLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrassLeaf extends CGFobject {
	constructor(scene,angle) {
		super(scene);
        this.angle = angle;
        this.initObjects();
        this.initMaterials();
	}

    initObjects(){
        this.trapezoids = [];
        for(let i = 0; i < 10 ; i++){
            this.trapezoids.push(new MyTrapezoid(this.scene));
        }
    }

    initMaterials(){
        this.leafMaterial = new CGFappearance(this.scene);
        this.leafMaterial.setAmbient(0,1,0, 1.0); 
        this.leafMaterial.setDiffuse(0,1,0, 1.0); 
        this.leafMaterial.setSpecular(0,1,0, 1.0); 
        this.leafMaterial.setShininess(10.0);
        //this.leafMaterial.loadTexture('images/grasstext_1.jpg');
        //this.leafMaterial.setTextureWrap('REPEAT','REPEAT');
    }

    setAngle(angle){
        this.angle = angle;
    }

    display(){

        let height = 0;
        let move = 0;
        for(let i = 0; i < 10 ; i++){
            this.scene.pushMatrix();
            this.scene.translate(0,height,move);
            height = height + Math.cos(this.angle * i) * 2;
            move = move + Math.sin(this.angle * i) * 2;
            this.scene.rotate(this.angle*i,1,0,0);
            this.scene.scale(Math.pow(0.75,i),1,1);
            this.leafMaterial.apply();
            this.trapezoids[i].display();
            this.scene.popMatrix();
        }
    }
}

