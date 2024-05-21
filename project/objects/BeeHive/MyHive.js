import {CGFobject, CGFappearance, CGFtexture} from '../../../../lib/CGF.js';
import { MyUnitCubeQuad } from '../Components/MyUnitCubeQuad.js';
import { MyUnitCube } from '../Components/MyUnitCube.js';
import { MyPollen } from './MyPollen.js';

export class MyHive extends CGFobject {
    constructor(scene){
        super(scene);
        this.initObjects();
        this.initMaterials();
        this.pollens = [];
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

    addPollen(pollen){
        this.pollens.push(pollen);
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

        let i = 0;
        console.log(this.pollens.length);
        for (let pollen of this.pollens){
            this.scene.pushMatrix();
            this.scene.translate(0, 0.9, 0.2*i);
            this.scene.scale(0.05, 0.05, 0.05);
            pollen.display();
            this.scene.popMatrix();
            i++;
        }
    }
    
    
}