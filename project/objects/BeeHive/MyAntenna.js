import {CGFobject, CGFappearance} from '../../../lib/CGF.js';
import { MySphere } from '../Components/MySphere.js';
import { MyCylinder } from '../Components/myCylinder.js';

export class MyAntenna extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initObjects();
        this.initMaterials();
    }
    
    initObjects() {
        this.top = new MySphere(this.scene, 16, 8, 1);
        this.mid = new MyCylinder(this.scene, 6, 10, 10, 0.5);
    }

    initMaterials() {
        this.blackMaterial = new CGFappearance(this.scene);
        this.blackMaterial.setAmbient(0, 0, 0, 1);
        this.blackMaterial.setDiffuse(0, 0, 0, 1);
        this.blackMaterial.setSpecular(0, 0, 0, 1);
        this.blackMaterial.setShininess(10.0);
    }

    display() {
    this.blackMaterial.apply();

    // First antenna
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 6, 0, 0, 1); // Rotate 30 degrees around the Z-axis
    this.scene.scale(0.1, 0.1, 0.1);
    this.scene.translate(-0.25, 10, 0); // Move 0.25 towards the center
    this.top.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 6, 0, 0, 1); // Rotate 30 degrees around the Z-axis
    this.scene.scale(0.1, 0.1, 0.1);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.mid.display();
    this.scene.popMatrix();

    // Second antenna
    this.scene.pushMatrix();
    this.scene.translate(0.25, 0, 0); // Adjust the position of the second antenna
    this.scene.rotate(-Math.PI / 6, 0, 0, 1); // Rotate -30 degrees around the Z-axis
    this.scene.scale(0.1, 0.1, 0.1);
    this.scene.translate(-0.25, 10, 0); // Move 0.25 towards the center
    this.top.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.25, 0, 0); // Adjust the position of the second antenna
    this.scene.rotate(-Math.PI / 6, 0, 0, 1); // Rotate -30 degrees around the Z-axis
    this.scene.scale(0.1, 0.1, 0.1);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.mid.display();
    this.scene.popMatrix();
}
}