import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0, // 0 - lower back left
            1, 0, 0, // 1 - lower back rigth
            1, 0, 1, // 2 - lower front rigth
            0, 0, 1, // 3 - lower front left 
            0, 1, 0, // 4 - upper back left
            1, 1, 0, // 5 - upper back right
            1, 1, 1, // 6 - upper front right
            0, 1, 1,  // 7 - upper front left
                        0, 0, 0, // 0 - lower back left
                        1, 0, 0, // 1 - lower back rigth
                        1, 0, 1, // 2 - lower front rigth
                        0, 0, 1, // 3 - lower front left 
                        0, 1, 0, // 4 - upper back left
                        1, 1, 0, // 5 - upper back right
                        1, 1, 1, // 6 - upper front right
                        0, 1, 1,  // 7 - upper front left      
            0, 0, 0, // 0 - lower back left
            1, 0, 0, // 1 - lower back rigth
            1, 0, 1, // 2 - lower front rigth
            0, 0, 1, // 3 - lower front left 
            0, 1, 0, // 4 - upper back left
            1, 1, 0, // 5 - upper back right
            1, 1, 1, // 6 - upper front right
            0, 1, 1  // 7 - upper front left
		];

        this.normals = [
			0, -1, 0, // up
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, 1, 0, // down
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
                    0, 0, -1, //backwards lower back
                    0, 0, -1,
                    0, 0, 1, //frontwards lower front
                    0, 0, 1,
                    0, 0, -1, //backwards upper back
                    0, 0, -1,
                    0, 0, 1, //frontwards upper front
                    0, 0, 1,
            -1, 0, 0, // left
            1, 0, 0, //right
            1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            -1, 0, 0, 
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			3, 0, 1, //down
            3, 1, 2, //------------
            3, 2, 6, //front
            6, 7, 3, //----------
            7, 6, 5, //top
            7, 5, 4, //------------
            2, 1, 5, //right
            2, 5, 6, //------------
            4, 0, 3, //left
            4, 3, 7, //-----------
            0, 4, 5, //back
            0, 5, 1, //-----------
		];

        

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

