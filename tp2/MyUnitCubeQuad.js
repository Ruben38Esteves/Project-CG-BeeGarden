import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    initObjects(){
        this.lowerFace = new MyQuad(this.scene);
        this.upperFace = new MyQuad(this.scene);
        this.leftFace = new MyQuad(this.scene);
        this.rigthFace = new MyQuad(this.scene);
        this.frontFace = new MyQuad(this.scene);
        this.backFace = new MyQuad(this.scene);
    }
	
	initBuffers() {
        this.initObjects()
		this.vertices = [
			0, 0, 0, // 0 
		];

		//Counter-clockwise reference of vertices
		this.indices = [
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

    display(){
        //lower
        this.lowerFace.display();
        //upper
        this.scene.pushMatrix();
        this.translate(0,1,0)
        this.upperFace.display();
        this.scene.popMatrix();
        //left
        this.scene.pushMatrix();
        this.translate(-0.5,0.5,0);
        this.rotate(90,0,0,1);
        this.leftFace.display();
        this.scene.popMatrix();
        //right
        this.scene.pushMatrix();
        this.translate(0.5,0.5,0)
        this.rotate(90,0,0,1);
        this.rigthFace.display();
        this.scene.popMatrix();
        //front
        this.scene.pushMatrix();
        this.translate(0,0.5,0.5)
        this.rotate(90,1,0,0);
        this.frontFace.display();
        this.scene.popMatrix();
        //back
        this.scene.pushMatrix();
        this.translate(0,0.5,-0.5)
        this.rotate(90,1,0,0);
        this.backFace.display();
        this.scene.popMatrix();
    }
}

