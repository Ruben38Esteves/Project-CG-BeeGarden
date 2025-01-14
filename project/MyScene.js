import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyFlower } from "./flower/MyFower.js";
import { MyGarden } from "./objects/Garden/MyGarden.js";
import { MyLeaf } from "./objects/Garden/MyLeaf.js";
import { MyPetal } from "./objects/Garden/MyPetal.js";
import { MyPlane } from "./objects/Components/MyPlane.js";
import { MyReceptacle } from "./objects/Garden/MyReceptacle.js";
import { MyRock } from "./objects/RockSet/MyRock.js";
import { MySphere } from "./objects/Components/MySphere.js";
import { MyStem } from "./objects/Garden/MyStem.js";
import { MyPanorama } from "./myPanorama.js";
import { MyBee } from "./objects/BeeHive/MyBee.js";
import { MyRockSet } from "./objects/RockSet/MyRockSet.js";
import { MyHive } from "./objects/BeeHive/MyHive.js";
import { MyPollen } from "./objects/BeeHive/MyPollen.js";
import { MyTrapezoid } from "./objects/Components/MyTrapezoid.js";
import { MyGrassLeaf } from "./objects/Garden/MyGrassLeaf.js";
import { MyGrass } from "./objects/Garden/MyGrass.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);

    this.setUpdatePeriod(0.01);
    this.time = 0;

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 30, 30, 100, true);
    let panoTexture = new CGFtexture(this, "images/panorama.jpg")
    this.panorama = new MyPanorama(this, panoTexture);
    //flower
    this.petal = new MyPetal(this, 80, 4);
    this.receptacle = new MyReceptacle(this, 3, 30, 30);
    this.stem = new MyStem(this, 30, 30, 1);
    this.flower = new MyFlower(this, 5, 8, 1, 0.2, 3);
    this.leaf = new MyLeaf(this, 5, 2);
    this.garden = new MyGarden(this, 6, 6, 10);
    this.trapezoid = new MyTrapezoid(this);
    this.grassleaf = new MyGrassLeaf(this,0.01);
    this.grass = new MyGrass(this,50,50,10,1000);



    //garden
    this.gardenTranslate = [15, -30, 20];
    this.gardenScale = 0.7;
    this.garden = new MyGarden(this, 5, 5, 10);


    this.trapezoid = new MyTrapezoid(this);
    this.grassleaf = new MyGrassLeaf(this,0.01);

    //rock
    this.rockTranslate = [-30, -30, 5];
    this.rockSet = new MyRockSet(this);
    this.rock = new MyRock(this, 15, 15, 2);


    //hive
    this.hive = new MyHive(this);
    this.pollen = new MyPollen(this, 10, 10, 1, 2, 1);

    //bee
    this.bee = new MyBee(this,0,0,0,0,this.hive);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.speedFactor = 0.1;

    this.initTextures();

    this.appStartTime = Date.now();

  }

  initTextures() {
    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/grass.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    //make it lighter and brighter
    this.appearance.setAmbient(0.5, 1, 0.5, 1);
    this.appearance.setDiffuse(0.5, 1, 0.5, 1);
    this.appearance.setSpecular(0.5, 1, 0.5, 1);
    this.appearance.setShininess(10.0);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.earthTexture = new CGFtexture(this, "images/earth.jpg");
    this.earthAppearance = new CGFappearance(this);
    this.earthAppearance.setTexture(this.earthTexture);
    this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');

    //gray material for a rock
    this.rockAppearance = new CGFappearance(this);
    this.rockAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.rockAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.rockAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.rockAppearance.setShininess(10.0);

  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    if (this.gui.isKeyPressed("KeyW")) {
      this.bee.accelerate(this.speedFactor / 10);
      text += " W ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")) {
      this.bee.stop();
      text += " S ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyA")) {
      this.bee.turn(Math.PI/80);
      text += " A ";
      keysPressed = true;
    }


    if (this.gui.isKeyPressed("KeyD")) {
      this.bee.turn(-Math.PI/80);
      text += " D ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      this.bee.reset();
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyP")) {
      text += " P ";
      let flower = this.bee.currentFlower;
      if (flower){
        flower.hasPollen = false;
        this.bee.carryingPollen = true;
        this.bee.pollen = flower.getPollen();
        this.bee.currentFlower = null;
        this.bee.keepMoving();
      } else {
        this.bee.keepMoving();
      }

    }

    if (this.gui.isKeyPressed("KeyO")) {
      text += " O ";
      if (this.bee.carryingPollen){
        this.bee.movingHive = true;
        this.bee.moveTo(this.rockTranslate[0]+5, this.rockTranslate[1]+22, this.rockTranslate[2]+3)
      }
    }

    if (this.gui.isKeyPressed("KeyF")) {
      text += " F ";
      let closestDistance = 10000;
      let closestFlower = null;
      let xCloPol = 0;
      let yCloPol = 0;
      let zCloPol = 0;

      for (let flower of this.garden.flowers){
        if (!flower.hasPollen){
          continue;
        }
        let xGarden = flower.xInGarden * this.gardenScale;
        let zGarden = flower.zInGarden * this.gardenScale;
        let pollenPos = flower.getPollenPos();
        let xPollenAbsolut = xGarden + this.gardenTranslate[0] + (pollenPos.x * this.gardenScale);
        console.log("altura flower", flower.height);
        let yPollenAbsolut = this.gardenTranslate[1] + (flower.height * this.gardenScale);
        let zPollenAbsolut = zGarden + this.gardenTranslate[2] + (pollenPos.z * this.gardenScale);
        let distanceToBee = this.bee.distance(xPollenAbsolut, yPollenAbsolut, zPollenAbsolut);
        console.log("distance to bee", distanceToBee)
        if (distanceToBee < closestDistance){
          closestDistance = distanceToBee;
          closestFlower = flower;
          xCloPol = xPollenAbsolut;
          yCloPol = yPollenAbsolut;
          zCloPol = zPollenAbsolut;
        }

      }
      if (!this.bee.carryingPollen){
        this.bee.currentFlower = closestFlower;
      }
      this.bee.moving = true;
      this.bee.moveTo(xCloPol, yCloPol, zCloPol);  

    }

    if (keysPressed){
      console.log(text);
    }

  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0, -30, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.plane.display();
    this.popMatrix();

    
    this.pushMatrix();
    this.rockAppearance.apply();
    this.translate(this.rockTranslate[0], this.rockTranslate[1], this.rockTranslate[2]);
    this.scale(3, 3, 3);
    this.rockSet.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(this.rockTranslate[0]+5, this.rockTranslate[1]+13, this.rockTranslate[2]+3);
    this.scale(8,8,8);
    this.hive.display();
    this.popMatrix();
    

    this.panorama.display();
    //this.receptacle.display();
    //this.petal.display();
    //this.stem.display();
    //this.flower.display()
    //this.pushMatrix();
    //this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
    this.bee.display();
    //this.popMatrix();
    //this.leaf.display();
    this.pushMatrix();
    this.translate(this.gardenTranslate[0], this.gardenTranslate[1], this.gardenTranslate[2]);
    this.scale(this.gardenScale, this.gardenScale, this.gardenScale);
    this.garden.display();
    this.popMatrix();
    //this.rockAppearance.apply();
    //this.rockSet.display();
    //this.rockAppearance.apply();
    //this.rockSet.display();
    //this.hive.display();
    //this.pollen.display();
    //this.trapezoid.display()
    //this.grassleaf.display();
    this.pushMatrix();
    
    this.translate(5,-30, 7);
    this.grass.display();
    this.popMatrix();
    // ---- END Primitive drawing section
  }
  update(delta_t){
    this.time += 0.1;
    this.checkKeys();
    this.bee.update(delta_t);
    this.grass.update(0.1*Math.sin(this.time));
  }
}
