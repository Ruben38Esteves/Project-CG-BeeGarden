import { CGFobject } from '../../../lib/CGF.js';

export class MyEllipse extends CGFobject {
    constructor(scene, slices, width, height, inverted) {
        super(scene);
        this.slices = slices;
        this.width = width;
        this.height = height;
        this.inverted = inverted;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        for (let slice = 0; slice <= this.slices; slice++) {
            let phi = 2 * slice * Math.PI / this.slices;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);
    
            let x = this.width * cosPhi;
            let y = this.height * sinPhi;
            let u = 1 - (slice / this.slices);
            let v = 0.5 - (Math.sin(phi) / 2); // Adjusted for ellipse
    
            // Front face
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, 1);
            this.texCoords.push(u, v);
    
            // Back face
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, -1);
            this.texCoords.push(u, 1 - v);
        }
    
        for (let i = 0; i < this.slices; i++) {
            // Front face
            this.indices.push(i * 2, this.slices * 2, (i * 2 + 2) % (this.slices * 2));
    
            // Back face
            this.indices.push(i * 2 + 1, (i * 2 + 3) % (this.slices * 2), this.slices * 2 + 1);
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}