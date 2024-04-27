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
        this.stem_rotations = [];
        for(let a = 0; a < this.stem_length; a++){
            this.stem_rotations.push(Math.floor(Math.random() * 30));
            console.log(this.stem_rotations[a]);
        }
        this.petal_rotations = [];
        this.petal_curvatures = [];
        for(let c = 0; c < this.petal_amount + (this.stem_length -1); c++){
            this.petal_rotations.push(Math.floor(Math.random() * 60) - 30);
            this.petal_curvatures.push(Math.floor(Math.random() * 60) + 60);
        }
        this.initObjects();
        this.initBuffers();
	}

    initObjects(){
        this.petal = new MyPetal(this.scene,60,this.outside_radius-this.receptacle_radius);
        this.receptacle = new MyReceptacle(this.scene,this.receptacle_radius,30,30);
        this.stem = new MyStem(this.scene,30,30,this.stem_radius);
        
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
        // display stems
        if(this.stem_length > 1){
            this.scene.pushMatrix();
            this.stem.display();
            this.scene.popMatrix();
            for(let i = 1; i < this.stem_length;i++){
                // petal
                this.scene.pushMatrix();
                this.scene.translate(0, i * 4, 0);
                this.scene.rotate(this.degToRad(this.petal_rotations[i]),0,1,0);
                this.scene.rotate((Math.PI/2),0,0,1);
                this.petal.display();
                this.scene.popMatrix();
                // stem
                this.scene.pushMatrix();
                //this.scene.rotate(this.degToRad(this.stem_rotations[i]),1,0,0);
                //this.scene.rotate(this.degToRad(this.stem_rotations[i]),0,0,1);
                this.scene.translate(0, i * 4 ,0);
                this.stem.display();
                this.scene.popMatrix();
            }
        }else{
            this.scene.pushMatrix();
            this.stem.display();
            this.scene.popMatrix();
        }

        
        // display receptacle
        this.scene.pushMatrix();
        this.scene.translate(0, this.stem_length * 4, 0)
        this.receptacle.display();
        this.scene.popMatrix();
        // display petals
        for(let j = 0; j < this.petal_amount; j++){
            this.scene.pushMatrix();
            this.scene.translate(0, this.stem_length * 4, 0);
            this.scene.rotate(((2*Math.PI)/this.petal_amount)*j,0,0,1);
            this.scene.translate(0,this.receptacle_radius,0);
            this.scene.rotate(this.degToRad(this.petal_rotations[j + (this.stem_length -1)]),1,0,0);
            let new_petal = new MyPetal(this.scene,this.petal_curvatures[j+ (this.stem_length -1)],this.outside_radius-this.receptacle_radius);
            new_petal.display();
            this.scene.popMatrix();
        }
    
    }

    enableNormalViz(){
    }

    disableNormalViz(){
    }
}