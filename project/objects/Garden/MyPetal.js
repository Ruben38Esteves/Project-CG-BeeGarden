import {CGFobject} from '../../../lib/CGF.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene, angle, length) {
		super(scene);
        this.angle = angle;
        this.petal_length = length / 2;
		this.initBuffers();
	}
	
	initBuffers() {
        let new_angle = this.angle * (Math.PI / 180);
		this.vertices = [
			0, 0, 0,	//0
			1, this.petal_length, 0,	//1
			-1, this.petal_length, 0,	//2
			0, this.petal_length + (Math.sin(new_angle) * (this.petal_length)), -(Math.cos(new_angle) * (this.petal_length)),	//3
			1,this.petal_length + ((Math.sin(new_angle) * (this.petal_length)))/2, (-(Math.cos(new_angle) * (this.petal_length))) / 2,
			-1,this.petal_length + ((Math.sin(new_angle) * (this.petal_length)))/2, (-(Math.cos(new_angle) * (this.petal_length))) / 2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,
            2, 1, 0,
            2, 3, 1,
			1, 4, 3,
			2, 3, 5
		];

        this.normals = [
            0,0,1,
            0,0,1,
            0,0,1,
            0,0.45,0.45
        ]

		this.texCoords = [
			0.5,1,
			0.75,0.5,
			0.25,0.5,
			0.5,0
        ]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

