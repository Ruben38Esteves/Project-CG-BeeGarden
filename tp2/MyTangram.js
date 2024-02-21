import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    initObjects(){
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene)
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall_1 = new MyTriangleSmall(this.scene);
        this.triangleSmall_2 = new MyTriangleSmall(this.scene);
        this.triangleBig_1 = new MyTriangleBig(this.scene);
        this.triangleBig_2 = new MyTriangleBig(this.scene);

        //Variables for transformations
        this.translateX = 0;
        this.translateY = 0;
        this.translateZ = 0;
        this.rotation = 0;
    }

    intiTransforms(){
        //cenas
    }

    degToRad(degrees){
        return (degrees * Math.PI / 180)
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
        //diamond
        this.scene.pushMatrix();
        this.rotate(15,0,0,1);
        this.translate(0,3,0)
        this.diamond.display();
        this.scene.popMatrix();
        //first big triangle
        this.scene.pushMatrix();
        this.translate(0.8,1.4,0);
        this.rotate(15,0,0,1);
        this.triangleBig_1.display();
        this.scene.popMatrix();
        //normal triangle
        this.scene.pushMatrix();
        this.rotate(195,0,0,1);
        this.translate(-2.15,-0.15,0);
        this.triangle.display()
        this.scene.popMatrix();
        //second big triangle
        this.scene.pushMatrix()
        this.rotate(285,0,0,1);
        this.translate(0.85,1.15,0);
        this.triangleBig_2.display();
        this.scene.popMatrix();
        //parallelogram
        this.scene.pushMatrix()
        this.rotate(105,0,0,1);
        this.translate(-2.5,-0.15,0);
        this.scale(1,-1,1);
        this.parallelogram.display();
        this.scene.popMatrix();
        //first samll triangle
        this.scene.pushMatrix();
        this.rotate(60,0,0,1);
        this.translate(-0.75,-2.8,0);
        this.scale(1,-1,1);
        this.triangleSmall_1.display();
        this.scene.popMatrix();
        //second small triangle
        this.scene.pushMatrix();
        this.rotate(60,0,0,1);
        this.translate(-1.9,-1.15,0);
        this.scale(1,-1,1);
        this.triangleSmall_2.display();
        this.scene.popMatrix();
    }
}