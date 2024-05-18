import { CGFobject } from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptacle extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);
        this.original_radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angle = (2 * Math.PI) / this.slices;
        let angle_2 = Math.PI / this.stacks;
        let cutSize = (2 * this.original_radius) / this.stacks;
        let radius = this.original_radius;


        for (let j = 0; j <= this.stacks; j++) {
            radius = this.original_radius * Math.sin(j * angle_2);
            for (let i = 0; i < this.slices; i++) {

                let x = Math.cos(i * angle) * radius;
                let y = Math.sin(i * angle) * radius;
                let z = this.original_radius * Math.cos(j * angle_2);

                //vertices
                this.vertices.push(x, y, z);


                // assure 1 unit length
                let n = Math.sqrt(x * x + y * y + z * z);
                let normalx = x / n;
                let normaly = y / n;
                let normalz = z / n;

                this.normals.push(
                    normalx, normaly, normalz,
                )

                if (j != 0) {
                    this.indices.push(this.slices * (j - 1) + i, i - 1 + this.slices * j, this.slices * j + i);
                    this.indices.push(this.slices * (j - 1) + i, this.slices * j + i, this.slices * (j - 1) + i + 1);
                    let u = i/this.slices;
                    let v = j/this.stacks;
                    this.texCoords.push(u,v);
                }

                


            }


        }
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
