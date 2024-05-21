import {CGFobject, CGFappearance} from '../../../lib/CGF.js';
import { MyAntenna } from './MyAntenna.js';
import { MySphereBee } from './MySphereBee.js';
import { MySphere } from '../Components/MySphere.js';
import { MyEllipse } from '../Components/MyEllipse.js';
import { MyHive } from './MyHive.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
	constructor(scene,posx,posy,posz,rot,hive) {
		super(scene);
		this.initObjects();
        this.initMaterials();
        
        this.posx = posx;
        this.posy = posy;
        this.posz = posz;
        this.rot = rot;
        this.hive = hive;
        this.velx = 0;
        this.vely = 0;
        this.velz = 0;
        this.oldVelx = 0;
        this.oldVelz = 0;
        this.time = 0;

        this.currentFlower = null;
        this.pollen = null;

        this.moving = false;
        this.movingUp = false;
        this.movingHive = false;
        this.carryingPollen = false;

        this.targetX = 0;
        this.targetY = 0;
        this.targetZ = 0;
	}

    initObjects(){
        this.componentBack = new MySphereBee(this.scene, 16, 8, 0.5, 4, 4);
        this.component = new MySphere(this.scene, 16, 8, 0.5);
        this.antennas = new MyAntenna(this.scene);
        this.wing = new MyEllipse(this.scene, 16, 1, 0.4, false);
    }
	
	initMaterials(){
        //body has texture from images/beeTex.jpeg
        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(1, 1, 1, 1.0);
        this.bodyMaterial.setDiffuse(1, 1, 1, 1.0);
        this.bodyMaterial.setSpecular(1, 1, 1, 1.0);
        this.bodyMaterial.setShininess(10.0);
        this.bodyMaterial.loadTexture('images/beeTex_2.jpg');
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

        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(0.1, 0.1, 0.1, 0.4);
        this.wingMaterial.setDiffuse(0.1, 0.1, 0.1, 0.4);
        this.wingMaterial.setSpecular(0.1, 0.1, 0.1, 0.4);
        this.wingMaterial.setShininess(0.0);
        this.wingMaterial.setEmission(0.1,0.1,0.1,0.1);
        // Enable blending
        this.scene.gl.enable(this.scene.gl.BLEND);
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
    }

     update(delta_t){ 
        
        if (this.velx >= 0.5){
            this.velx = 1;
        }
        if (this.velz >= 0.5){
            this.velz = 1;
        }

        if (this.movingHive){
            if(this.distance(this.targetX, this.targetY, this.targetZ) < 0.3){
                this.movingHive = false;
                this.velx = 0;
                this.vely = 0;
                this.velz = 0;
                this.hive.addPollen(this.pollen);
                this.carryingPollen = false;
                this.pollen = null;
            }
        }
        
        if (this.moving){
            if(this.distance(this.targetX, this.targetY, this.targetZ) < 0.3){
                this.moving = false;
                this.velx = 0;
                this.vely = 0;
                this.velz = 0;
            }
        }   

        if (this.movingUp){
            if (this.posy >=0){
                this.movingUp = false;
                this.vely = 0;
            }
        }

        
        this.posx = this.posx + this.velx;// * delta_t;
        this.posy = this.posy + this.vely;// * delta_t;
        this.posz = this.posz + this.velz;// * delta_t;
        this.time += 0.1;
    }

    stop(){
        this.velx = 0;
        this.vely = 0;
        this.velz = 0;
    }

    reset(){
        this.velx = 0;
        this.vely = 0;
        this.velz = 0;
        this.posx = 0;
        this.posy = 0;
        this.posz = 0;
        this.rot = 0;
    }

    accelerate(v){
        this.velx = this.velx + Math.sin(this.rot) * v;
        //this.vely = this.vely + v;
        this.velz = this.velz + Math.cos(this.rot) * v;
        if(this.velx < 0){
            this.velx = 0;
        }
        if(this.velz < 0){
            this.velz = 0;
        }
    }

    turn(v){
        let old_norm = Math.sqrt(this.velx * this.velx + this.vely * this.vely + this.velz * this.velz);
        this.rot += v;
        this.velx = Math.sin(this.rot) * old_norm;
        this.velz = Math.cos(this.rot) * old_norm;
    }

    turnTo(targetX, targetZ) {
        let dx = targetX - this.posx;
        let dz = targetZ - this.posz;
        let targetRot = Math.atan2(dx, dz);
        let old_norm = Math.sqrt(this.velx * this.velx + this.vely * this.vely + this.velz * this.velz);
        this.rot = targetRot;
        this.velx = Math.sin(this.rot) * old_norm;
        this.velz = Math.cos(this.rot) * old_norm;
    }


    display(){
        let oscilation = Math.sin(this.time);
        this.scene.pushMatrix();
        //move bee
        this.scene.translate(this.posx,this.posy,this.posz);
        this.scene.rotate(this.rot,0,1,0);

        //center Body
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.bodyMaterial.apply();
        this.componentBack.display();
        this.scene.popMatrix();

        if (this.carryingPollen){
            this.scene.pushMatrix();
            this.scene.translate(0, -0.5, 0);
            this.scene.scale(0.5, 0.5, 0.5);
            this.pollen.display();
            this.scene.popMatrix();
        }

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
        this.scene.rotate(-Math.PI/8 + Math.PI/2, 1, 0, 0);
        this.scene.scale(0.8, 1.2, 0.8);
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

        

        //wings
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/8 * oscilation, 0, 0, 1);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(1, 0.2, 0);
        this.wingMaterial.apply();
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/8 * oscilation, 0, 0, 1);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.scene.translate(1, -0.5, 0);
        this.wingMaterial.apply();
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/8 * -oscilation, 0, 0, 1);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(-1, 0.2, 0);
        this.wingMaterial.apply();
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/8 * -oscilation, 0, 0, 1);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.scene.translate(-1, -0.5, 0);
        this.wingMaterial.apply();
        this.wing.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }

    distance(x, y, z){
        let dx = this.posx - x;
        let dy = this.posy - y;
        let dz = this.posz - z;
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    }

    moveDown(){
        this.vely = -0.05;
    }

    teleport (x, y, z){
        this.posx = x;
        this.posy = y;
        this.posz = z;
    }

    moveTo(x, y, z){
        if(this.velx == 0){
            this.velx = 0.1;
        }
        if(this.velz == 0){
            this.velz = 0.1;
        }
        this.oldVelx = this.velx;
        this.oldVelz = this.velz;
        this.targetX = x;
        this.targetY = y;
        this.targetZ = z;
        this.turnTo(x, z);
        

        let dy = y - this.posy;
        let dx = x - this.posx;
        let dz = z - this.posz;
        let distancexz = Math.sqrt(dx*dx + dz*dz);
        let speedxz = Math.sqrt(this.velx * this.velx + this.velz * this.velz);
        let time = distancexz / speedxz;

        this.vely = dy / time;
    }

    keepMoving(){
        this.movingUp = true;
        this.velx = this.oldVelx;
        this.velz = this.oldVelz;
        this.vely = 0.5;
    }

}
