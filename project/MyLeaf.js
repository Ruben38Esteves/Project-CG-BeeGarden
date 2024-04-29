import {CGFobject} from '../lib/CGF.js';
/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
	constructor(scene, length, width) {
		super(scene);
        this.leaf_length = length;
        this.leaf_width = width;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let angle = (2 * Math.PI) / 10;
		let cutSize = this.leaf_length / 12;


		for (let j = 0; j <= 12; j++) {
			for (let i = 0; i < 10; i++) {

				let x = Math.cos(i * angle) * 0.1;
				let z = Math.sin(i * angle) * 0.1;

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
					//this.indices.push(j*10 + i, (j-1)*10 + i, (j-1) * 10 + i-1);
					this.indices.push(10 * (j - 1) + i, 10 * (j - 1) + i + 1, 10 * j + i);
					this.indices.push(10 * (j - 1) + i, 10 * j + i, i - 1 + 10 * j);

				}


			}


		}
        //verticies
        this.vertices.push(0.1,0,0);
        this.vertices.push(0.1 + (this.leaf_width / 2),this.leaf_length / 2,0);
        this.vertices.push(0.1,this.leaf_length,0);

        this.vertices.push(-0.1,0,0);
        this.vertices.push(-0.1 - (this.leaf_width / 2),this.leaf_length / 2,0);
        this.vertices.push(-0.1,this.leaf_length,0);
        //normals
        this.normals.push(0,0,1);
        this.normals.push(0,0,0);
        this.normals.push(0,0,1);

        this.normals.push(0,0,1);
        this.normals.push(0,0,0);
        this.normals.push(0,0,1);
        //indicies
        this.indices.push((this.vertices.length / 3)-6,(this.vertices.length/3)-5,(this.vertices.length/3)-4);
        this.indices.push((this.vertices.length / 3)-1,(this.vertices.length/3)-2,(this.vertices.length/3)-3);
        
        this.indices.push((this.vertices.length / 3)-4,(this.vertices.length/3)-5,(this.vertices.length/3)-6);
        this.indices.push((this.vertices.length / 3)-3,(this.vertices.length/3)-2,(this.vertices.length/3)-1);
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

