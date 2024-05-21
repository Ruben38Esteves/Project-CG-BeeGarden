import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';

export class MyPollen extends CGFobject {
    constructor(scene, slices, stacks, radius, yScaleTop = 1, yScaleBottom = 1) {
        super(scene);
        this.scene = scene;
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.yScaleTop = yScaleTop;
        this.yScaleBottom = yScaleBottom;
        this.initMaterials();
        this.initBuffers();
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
    this.material.setAmbient(1, 1, 1, 1.0);
    this.material.setDiffuse(0.7, 0.5, 0.3, 1.0);
    this.material.setSpecular(0, 0, 0, 1.0);
    this.material.setShininess(10.0);
    this.material.loadTexture('images/pollen.jpg');
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        this.xrot = Math.random();
        this.yrot = Math.random();
        this.zrot = Math.random();

        for (let stack = 0; stack <= this.stacks; stack++) {
            let theta = stack * Math.PI / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let slice = 0; slice <= this.slices; slice++) {
                let phi = 2 * slice * Math.PI / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = this.radius * cosPhi * sinTheta;
                let y = this.radius * cosTheta;
                let z = this.radius * sinPhi * sinTheta;

                if (stack <= this.stacks / 2) {
                    y *= this.yScaleBottom;
                } else {
                    y *= this.yScaleTop;
                }

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first + 1, second, first);
                this.indices.push(first + 1, second + 1, second);
                
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.material.apply();
        //rotate
        this.scene.rotate(this.xrot, 1, 0, 0);
        this.scene.rotate(this.yrot, 0, 1, 0);
        this.scene.rotate(this.zrot, 0, 0, 1);
        super.display();
    }
}