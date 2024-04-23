import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, radius, inverted = false) {
        super(scene);
        this.scene = scene;
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.inverted = inverted;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

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
                let u = 1 - (slice / this.slices);
                let v = stack / this.stacks;

                this.vertices.push(x, y, z);
                if (this.inverted) {
                    this.normals.push(-x, -y, -z); 
                } else {
                    this.normals.push(x, y, z); 
                }
                this.texCoords.push(u, v);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                if (this.inverted) {
                    this.indices.push(first, second, first + 1);
                    this.indices.push(second, second + 1, first + 1);
                } else {
                    this.indices.push(first + 1, second, first);
                    this.indices.push(first + 1, second + 1, second);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}