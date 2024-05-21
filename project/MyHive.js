import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
import { MyUnitCube } from './MyUnitCube.js';

export class MyHive extends CGFobject {
    constructor(scene){
        super(scene);
        this.initObjects();
        this.initMaterials();
    }

    initMaterials(){
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1.0);
        this.material.loadTexture('images/hiveSides.jpg');
    }

    initObjects(){
        this.cube = new MyUnitCubeQuad(this.scene);
        this.top = new MyUnitCube(this.scene);
    }


    display(){
        this.scene.pushMatrix();
        this.scene.scale(1, 1.5, 1);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.scale(1.2, 0.1, 1);
        this.scene.translate(-0.41, 7.5, -0.5);
        this.top.display();
        this.scene.popMatrix();
    }
    
    
}