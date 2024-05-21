import {CGFobject, CGFtexture, CGFappearance} from '../../../lib/CGF.js';
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
        this.initObjects();
        this.initMaterials();
        this.textureTop = new CGFtexture(this.scene, 'images/hiveSides.jpg');
        this.textureFront = new CGFtexture(this.scene, 'images/hiveFront.jpg');
        this.textureRight = new CGFtexture(this.scene, 'images/hiveSides.jpg');
        this.textureBack = new CGFtexture(this.scene, 'images/hiveSides.jpg');
        this.textureLeft = new CGFtexture(this.scene, 'images/hiveSides.jpg');
        this.textureBottom = new CGFtexture(this.scene, 'images/hiveSides.jpg');
	}

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1.0);
    }

    initObjects(){
        this.quad = new MyQuad(this.scene);
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
        this.material.apply();
        //Top
        this.scene.pushMatrix()
        this.scene.translate(0,0.5,0)
        this.scene.rotate(3 * Math.PI/2 ,1, 0, 0)
        this.textureTop.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()

        //Front
        this.scene.pushMatrix()
        this.scene.translate(0.5, 0, 0)
        this.scene.rotate(Math.PI / 2, 0, 1, 0)
        this.textureFront.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()
        
        //Right
        this.scene.pushMatrix()
        this.scene.translate(0,0,-0.5)
        this.scene.rotate(Math.PI,0, 1, 0)
        this.textureRight.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()
        
        //Back
        this.scene.pushMatrix()
        this.scene.translate(-0.5, 0, 0)
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0)
        this.textureBack.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()
        
        //Left
        this.scene.pushMatrix()
        this.scene.translate(0,0,0.5)
        this.textureLeft.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()

        //Bottom
        this.scene.pushMatrix()
        this.scene.translate(0,-0.5,0)
        this.scene.rotate(Math.PI/2 ,1, 0, 0)
        this.textureBottom.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()
    
    }
}
