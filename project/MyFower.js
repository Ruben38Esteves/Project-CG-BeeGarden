import {CGFobject, CGFappearance} from '../lib/CGF.js';
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
        this.initBuffers();
	}

    initObjects(){
        // RECEPTACLE
        this.receptacle = new MyReceptacle(this.scene,this.receptacle_radius,30,30);
        // STEAMS
        this.stem_rotations = [];
        this.stem_lengths = []; // holds the length of each stem to help with other objects transformations
        this.stems = []; // holds all stems
        for(let a = 0; a < this.stem_length; a++){
            this.stem_rotations.push(Math.floor(Math.random() * 15));
            let new_len = Math.floor(Math.random() * 6) + 1;
            this.stem_lengths.push(new_len);
            this.stems.push(new MyStem(this.scene,30,30,this.stem_radius,new_len))
        }
        // PETALS
        this.petal_rotations = []; //hold the rotation of each petal
        this.petals = []; // holds all petals
        for(let c = 0; c < this.petal_amount + (this.stem_length -1); c++){
            this.petal_rotations.push(Math.floor(Math.random() * 60) - 30);
            this.petals.push(new MyPetal(this.scene,Math.floor(Math.random() * 60) + 60,this.outside_radius-this.receptacle_radius))
        }
        this.new_x = 0;
        this.new_z = 0;
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
        this.scene.rotate(deg,x,y,z);
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
            this.stems[0].display();
            this.scene.popMatrix();
            for(let i = 1; i < this.stem_length;i++){
                // petal
                this.scene.pushMatrix();
                this.scene.translate(this.new_x, hight, this.new_z);
                this.scene.rotate(this.degToRad(this.petal_rotations[i]),0,1,0);
                this.scene.rotate((Math.PI/2),0,0,1);
                this.petals[i].display();
                this.scene.popMatrix();
                // stem
                this.scene.pushMatrix();
                this.scene.translate(this.new_x, hight ,this.new_z);
                let angle= this.degToRad(this.stem_rotations[i]);
                this.scene.rotate(angle,0,0,1);
                this.scene.rotate(angle,1,0,0);
                hight +=  this.stem_lengths[i] * Math.cos(angle) * Math.cos(angle);
                this.new_x -= this.stem_lengths[i] * Math.sin(angle) * Math.cos(angle);
                this.new_z += this.stem_lengths[i] *  Math.sin(angle);
                this.stems[i].display();
                this.scene.popMatrix();
            }
        }else{
            this.scene.pushMatrix();
            hight = this.stem_lengths[0];
            this.stems[0].display();
            this.scene.popMatrix();
        }

        
        // display receptacle
        this.scene.pushMatrix();
        this.scene.translate(this.new_x, hight, this.new_z);
        this.receptacle.display();
        this.scene.popMatrix();
        // display petals
        for(let j = 0; j < this.petal_amount; j++){
            this.scene.pushMatrix();
            this.scene.translate(this.new_x, hight, this.new_z);
            this.scene.rotate(((2*Math.PI)/this.petal_amount)*j,0,0,1);
            this.scene.translate(0,this.receptacle_radius,0);
            this.scene.rotate(this.degToRad(this.petal_rotations[j + (this.stem_length -1)]),1,0,0);
            this.petals[j+ (this.stem_length -1)].display();
            this.scene.popMatrix();
        }
    
    }

    enableNormalViz(){
    }

    disableNormalViz(){
    }
}