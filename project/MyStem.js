import { CGFobject } from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
	constructor(scene, slices, stacks, radius, length) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.radius = radius;
		this.stem_length = length;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let angle = (2 * Math.PI) / this.slices;
		let cutSize = this.stem_length / this.stacks;


		for (let j = 0; j <= this.stacks; j++) {
			for (let i = 0; i < this.slices; i++) {

				let x = Math.cos(i * angle) * this.radius;
				let z = Math.sin(i * angle) * this.radius;

				//vertices
				this.vertices.push(x, j * cutSize, -z);


				// assure 1 unit length
				let n = Math.sqrt(x * x + z * z);
				let normalx = x / n;
				let normalz = z / n;

				this.normals.push(
					normalx, 0, -normalz,
				)

				if (j != 0) {
					//this.indices.push(j*this.slices + i, (j-1)*this.slices + i, (j-1) * this.slices + i-1);
					this.indices.push(this.slices * (j - 1) + i, this.slices * (j - 1) + i + 1, this.slices * j + i);
					this.indices.push(this.slices * (j - 1) + i, this.slices * j + i, i - 1 + this.slices * j);

				}


			}


		}
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
