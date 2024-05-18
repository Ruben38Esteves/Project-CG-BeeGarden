import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyAntenna } from './MyAntenna.js';
import { MySphereBee } from './MySphereBee.js';
import { MySphere } from './MySphere.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initObjects();
        this.initMaterials(); 
	}

    initObjects(){
        this.componentBack = new MySphereBee(this.scene, 16, 8, 0.5, 4, 4);
        this.component = new MySphere(this.scene, 16, 8, 0.5);
        this.antennas = new MyAntenna(this.scene);
    }
	
	initMaterials(){
        //body has texture from images/beeTex.jpeg
        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(1, 1, 1, 1.0);
        this.bodyMaterial.setDiffuse(1, 1, 1, 1.0);
        this.bodyMaterial.setSpecular(1, 1, 1, 1.0);
        this.bodyMaterial.setShininess(10.0);
        this.bodyMaterial.loadTexture('images/beeTex.jpg');
        this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');
        


        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.headMaterial.setDiffuse(0.2, 0.2, 0.2, 1.0);
        this.headMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.headMaterial.setShininess(10.0);
        this.headMaterial.loadTexture('images/beeHEad.jpg');

        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0.5, 0.5, 0.5, 1.0);
        this.eyeMaterial.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.eyeMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.eyeMaterial.setShininess(10.0);
        this.eyeMaterial.loadTexture('images/beeEyes.jpg');
    }

    display(){
        //center Body
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.bodyMaterial.apply();
        this.componentBack.display();
        this.scene.popMatrix();

        //head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.7);
        this.scene.rotate(Math.PI/7, 1, 0, 0);
        this.scene.scale(0.6, 0.6, 1);
        this.headMaterial.apply();
        this.component.display();
        this.scene.popMatrix();

        //back body
        this.scene.pushMatrix();
        this.scene.translate(0, -0.4, -0.7);
        this.scene.rotate(-Math.PI/8, 1, 0, 0);
        this.scene.scale(0.8, 0.8, 1.2);
        this.bodyMaterial.apply();
        this.componentBack.display();
        this.scene.popMatrix();

        //eyes
        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.2, 0.8);
        this.scene.rotate(Math.PI/7, 1, 0, 0);
        this.scene.scale(0.2, 0.2, 0.4);
        this.eyeMaterial.apply();
        this.component.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0.2, 0.8);
        this.scene.rotate(Math.PI/7, 1, 0, 0);
        this.scene.scale(0.2, 0.2, 0.4);
        this.eyeMaterial.apply();
        this.component.display();
        this.scene.popMatrix();


        //antennas
        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.translate(0, 1.1, 1.6);
        this.antennas.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.8, 0.2, 0.2);
        this.scene.translate(-0.1, -1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.antennas.display();
        this.scene.translate(0, 0, 0.5);
        this.antennas.display();
        this.scene.translate(0, 0, -1);
        this.antennas.display();
        this.scene.popMatrix();

    


    }
}
