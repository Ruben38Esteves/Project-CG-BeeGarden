import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyLeaf } from './MyLeaf.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
	constructor(scene,outside_radius,petal_amount,receptacle_radius,stem_radius,stem_length) {
		super(scene);
        this.outside_radius = outside_radius;
        this.petal_amount = petal_amount;
        this.receptacle_radius = receptacle_radius;
        this.stem_radius = stem_radius;
        this.stem_length = stem_length;
        this.initObjects();
        this.initMaterials();
        this.initBuffers();
	}

    initObjects(){
        // RECEPTACLE
        this.receptacle = new MyReceptacle(this.scene,this.receptacle_radius,30,30);
        // STEAMS
        this.stem_rotations = [];
        this.stem_lengths = []; // holds the length of each stem to help with other objects transformations
        this.stems = []; // holds all stems
        this.leafs = [];
        for(let a = 0; a < this.stem_length; a++){
            this.stem_rotations.push(Math.floor(Math.random() * 10));
            let new_len = Math.floor(Math.random() * 4) + 3;
            this.stem_lengths.push(new_len);
            this.stems.push(new MyStem(this.scene,30,30,this.stem_radius,new_len));
            this.leafs.push(new MyLeaf(this.scene,Math.floor(Math.random() * 4) + 2,Math.floor(Math.random() * 2) +1));
        }
        // PETALS
        this.initial_petal_rotation = this.degToRad(Math.floor(Math.random() * 10));
        this.petal_rotations = []; //hold the rotation of each petal
        this.petals = []; // holds all petals
        for(let c = 0; c < this.petal_amount; c++){
            this.petal_rotations.push(Math.floor(Math.random() * 60) - 30);
            this.petals.push(new MyPetal(this.scene,Math.floor(Math.random() * 60) + 60,this.outside_radius-this.receptacle_radius))
        }
        this.new_x = 0;
        this.new_z = 0;
    }

    initMaterials(){
        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setAmbient(1, 0, 0, 1.0); 
        this.petalMaterial.setDiffuse(1, 0, 0, 1.0); 
        this.petalMaterial.setSpecular(1, 0, 0, 1.0); 
        this.petalMaterial.setShininess(10.0);

        this.leafMaterial = new CGFappearance(this.scene);
        this.leafMaterial.setAmbient(0, 1, 0, 1.0); 
        this.leafMaterial.setDiffuse(0, 1, 0, 1.0); 
        this.leafMaterial.setSpecular(0, 1, 0, 1.0); 
        this.leafMaterial.setShininess(10.0);

        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setAmbient(1, 1, 0, 1.0); 
        this.receptacleMaterial.setDiffuse(1, 1, 0, 1.0); 
        this.receptacleMaterial.setSpecular(1, 1, 0, 1.0); 
        this.receptacleMaterial.setShininess(10.0);

        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(0, 0.5, 0, 1.0); 
        this.stemMaterial.setDiffuse(0, 0.5, 0, 1.0); 
        this.stemMaterial.setSpecular(0, 0.5, 0, 1.0); 
        this.stemMaterial.setShininess(10.0);
    }


    intiTransforms(){
        //cenas
    }
	
	initBuffers() {
        this.initObjects()
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			1, 0, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    //helper functions for transforms
    degToRad(degrees){
        return (degrees * Math.PI / 180)
    }
    rotate(deg,x,y,z){
        this.scene.rotate(this.degToRad(deg),x,y,z);
    }
    translate(x,y,z){
        this.scene.translate(x,y,z);
    }
    scale(x,y,z){
        this.scene.scale(x,y,z)
    }

    display(){
        let hight = 0;
        this.new_x = 0;
        this.new_z = 0;
        // display stems
        if(this.stem_length > 1){
            this.scene.pushMatrix();
            hight = this.stem_lengths[0];
            this.stemMaterial.apply();
            this.stems[0].display();
            this.scene.popMatrix();
            for(let i = 1; i < this.stem_length;i++){
                // leaf
                this.scene.pushMatrix();
                this.scene.translate(this.new_x, hight, this.new_z);
                //this.scene.rotate(this.degToRad(this.petal_rotations[i]),0,1,0);
                this.scene.rotate((Math.PI/2),0,0,1);
                this.leafMaterial.apply();
                this.leafs[i-1].display();
                this.scene.popMatrix();
                // stem
                //  - pre calculations
                let angle= this.degToRad(this.stem_rotations[i]);
                hight -= (Math.sin(angle) * (this.stem_radius))
                this.scene.pushMatrix();
                this.scene.translate(this.new_x, hight ,this.new_z);
                this.scene.rotate(angle,0,0,1);
                this.scene.rotate(angle,1,0,0);
                this.stemMaterial.apply();
                this.stems[i].display();
                this.scene.popMatrix();
                //  - after display calculations
                hight +=  (this.stem_lengths[i] * Math.cos(angle) * Math.cos(angle));
                this.new_x -= this.stem_lengths[i] * Math.sin(angle) * Math.cos(angle);
                this.new_z += this.stem_lengths[i] *  Math.sin(angle);
            }
        }else{
            this.scene.pushMatrix();
            hight = this.stem_lengths[0];
            this.stemMaterial.apply();
            this.stems[0].display();
            this.scene.popMatrix();
        }

        
        // display receptacle
        this.scene.pushMatrix();
        this.scene.translate(this.new_x, hight, this.new_z);
        this.receptacleMaterial.apply();
        this.receptacle.display();
        this.scene.popMatrix();
        // display petals
        for(let j = 0; j < this.petal_amount; j++){
            this.scene.pushMatrix();
            this.scene.translate(this.new_x, hight, this.new_z);
            this.scene.rotate((((2*Math.PI)/this.petal_amount)*j)+this.initial_petal_rotation,0,0,1);
            this.scene.translate(0,this.receptacle_radius,0);
            this.scene.rotate(this.degToRad(this.petal_rotations[j]),1,0,0);
            this.petalMaterial.apply();
            this.petals[j].display();
            this.scene.popMatrix();
        }
    
    }

    enableNormalViz(){
    }

    disableNormalViz(){
    }
}