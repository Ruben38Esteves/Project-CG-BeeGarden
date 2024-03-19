import {CGFobject, CGFappearance} from '../lib/CGF.js';
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
        this.initMaterials();
    }

    initMaterials(){
        //diamond green
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0, 1, 0, 1.0); 
        this.diamondMaterial.setDiffuse(0, 1, 0, 1.0); 
        this.diamondMaterial.setSpecular(0, 1, 0, 1.0); 
        this.diamondMaterial.setShininess(10.0);
    
        //big triangle blue
        this.triangleBlue = new CGFappearance(this.scene);
        this.triangleBlue.setAmbient(0, 0, 0.9, 1.0); 
        this.triangleBlue.setDiffuse(0, 0, 1, 1.0); 
        this.triangleBlue.setSpecular(0, 0.5, 0.9, 1.0); 
        this.triangleBlue.setShininess(10.0);
    
        //big triangle orange
        this.triangleOrange = new CGFappearance(this.scene);
        this.triangleOrange.setAmbient(0.9, 0.45, 0, 1.0); 
        this.triangleOrange.setDiffuse(1, 0.5, 0, 1.0); 
        this.triangleOrange.setSpecular(0.9, 0.9, 0.9, 1.0); 
        this.triangleOrange.setShininess(10.0);
    
        //small triangle red
        this.smalltriangleRed = new CGFappearance(this.scene);
        this.smalltriangleRed.setAmbient(0.9, 0, 0, 1.0); 
        this.smalltriangleRed.setDiffuse(1, 0, 0, 1.0); 
        this.smalltriangleRed.setSpecular(0.9, 0.6, 0.6, 1.0); 
        this.smalltriangleRed.setShininess(10.0);
    
        //small triangle purple
        this.smallTrianglePurple = new CGFappearance(this.scene);
        this.smallTrianglePurple.setAmbient(0.5, 0, 0.5, 1.0);
        this.smallTrianglePurple.setDiffuse(0.5, 0, 0.5, 1.0); 
        this.smallTrianglePurple.setSpecular(0.9, 0.9, 0.9, 1.0); 
        this.smallTrianglePurple.setShininess(10.0);
    
        //triangle pink
        this.trianglePink = new CGFappearance(this.scene);
        this.trianglePink.setAmbient(1, 0.71, 1, 1.0); 
        this.trianglePink.setDiffuse(1, 0.71, 0.76, 1.0); 
        this.trianglePink.setSpecular(0.9, 0.9, 0.9, 1.0); 
        this.trianglePink.setShininess(10.0);
    
        //parallelogram yellow
        this.paralMaterial = new CGFappearance(this.scene);
        this.paralMaterial.setAmbient(1, 1, 0, 1.0); 
        this.paralMaterial.setDiffuse(1, 1, 0, 1.0); 
        this.paralMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); 
        this.paralMaterial.setShininess(10.0);

        // Tangram texture
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/tangram.png');
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
        this.translate(0,3,0);
        //this.diamondMaterial.apply();
        //this.scene.customMaterial.apply();
        this.texture.apply();
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

    enableNormalViz(){
        this.diamond.enableNormalViz()
        this.triangle.enableNormalViz()
        this.triangleBig_1.enableNormalViz()
        this.triangleBig_2.enableNormalViz()
        this.parallelogram.enableNormalViz()
        this.triangleSmall_1.enableNormalViz()
        this.triangleSmall_2.enableNormalViz()
    };

    disableNormalViz(){
        this.diamond.disableNormalViz()
        this.triangle.disableNormalViz()
        this.triangleBig_1.disableNormalViz()
        this.triangleBig_2.disableNormalViz()
        this.parallelogram.disableNormalViz()
        this.triangleSmall_1.disableNormalViz()
        this.triangleSmall_2.disableNormalViz()
    }
}