import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyFlower } from "./MyFower.js";
import { MyGarden } from "./MyGarden.js";
import { MyLeaf } from "./MyLeaf.js";
import { MyPetal } from "./MyPetal.js";
import { MyPlane } from "./MyPlane.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyRock } from "./MyRock.js";
import { MySphere } from "./MySphere.js";
import { MyStem } from "./MyStem.js";
import { MyPanorama } from "./myPanorama.js";
import { MyBee } from "./MyBee.js";
import { MyRockSet } from "./MyRockSet.js";

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

    this.setUpdatePeriod(100);

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
    this.garden = new MyGarden(this, 5, 5, 10);


    this.rockSet = new MyRockSet(this);
    this.rock = new MyRock(this, 15, 15, 2);

    //bee
    this.bee = new MyBee(this,0,0,0,0);



    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.speedFactor = 0.1;

    this.initTextures();


    this.appStartTime = Date.now();

  }

  initTextures() {
    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
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
    // Check for key codes e.g. in https://keycode.info/

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
    this.translate(0, -100, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    //this.plane.display();
    this.popMatrix();



    this.panorama.display();
    //this.receptacle.display();
    //this.petal.display();
    //this.stem.display();
    //this.flower.display()
    this.pushMatrix();
    this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
    this.bee.display();
    this.popMatrix();
    //this.leaf.display();
    //this.garden.display();
    //this.rockAppearance.apply();
    //this.rockSet.display();
    // ---- END Primitive drawing section
  }
  update(delta_t){
    this.checkKeys();
    this.bee.update(delta_t);
  }
}
