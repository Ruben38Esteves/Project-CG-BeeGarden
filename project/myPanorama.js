import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {

    constructor(scene, texture) {
        super(scene)
        this.sphere = new MySphere(this.scene, 40, 40, 200, true)
        this.material = new CGFappearance(this.scene)
        this.material.setTexture(texture)
        this.material.setEmission(1, 1, 1, 1)
    }

    display() {
        this.scene.pushMatrix()
        let cameraPosition = this.scene.camera.position;
        this.scene.translate(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
        this.material.apply()
        this.sphere.display()
        this.scene.popMatrix()
    }
}