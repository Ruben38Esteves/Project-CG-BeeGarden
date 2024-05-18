import {CGFobject} from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, length = 1, radius = 0.1) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.length = length;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let angle = (2 * Math.PI) / this.slices;
        let cutSize = this.length / this.stacks;

        for (let j = 0; j <= this.stacks; j++){
            for(let i = 0; i < this.slices; i++){

                let x = this.radius * Math.cos(i * angle);
                let y = this.radius * Math.sin(i * angle);

                //vertices
                this.vertices.push(x, -y, j * cutSize);

                // assure 1 unit length
                let n = Math.sqrt(x * x + y * y);
                let normalx = x / n;
                let normaly = y / n;

                this.normals.push(
                    normalx, -normaly, 0,
                )

                if (j != 0){
                    this.indices.push(this.slices * (j - 1) + i, i - 1 + this.slices * j, this.slices * j + i);
                    this.indices.push(this.slices * (j - 1) + i, this.slices * j + i, this.slices * (j - 1) + i + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}