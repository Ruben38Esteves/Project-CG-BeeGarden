import { CGFobject } from '../../../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.scene = scene;
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
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
        
            let firstOffset = (Math.random() - 0.5) * 0.7 * sinTheta;
        
            for (let slice = 0; slice <= this.slices; slice++) {
                let phi = 2 * slice * Math.PI / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);
        
                let offset;
                if (slice === 0 || slice === this.slices) {
                    offset = firstOffset; // connect sliices so its not possible to see inside the rock
                } else {
                    offset = (Math.random() - 0.5) * 0.7 * sinTheta;
                }
            
        
                let x = (this.radius + offset) * cosPhi * sinTheta;
                let y = (this.radius + offset) * cosTheta;
                let z = (this.radius + offset) * sinPhi * sinTheta;
                let u = 1 - (slice / this.slices);
                let v = stack / this.stacks;
        
                this.vertices.push(x, y, z);
                this.texCoords.push(u, v);
        
                let nx = cosPhi * sinTheta;
                let ny = cosTheta;
                let nz = sinPhi * sinTheta;
        
                this.normals.push(nx, ny, nz);
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
}