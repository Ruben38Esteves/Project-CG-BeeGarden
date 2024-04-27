import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
	constructor(scene, slices, stacks)	{
        super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let angle = (2 * Math.PI) / this.slices;
        let cutSize = 1 / this.stacks;
		

        for (let j = 0; j <= this.stacks; j++){
            for(let i = 0; i < this.slices; i++){
				
				let x=Math.cos(i*angle);
                let y=Math.sin(i*angle);
				
				//vertices
                this.vertices.push(x,-y,j*cutSize);
				

				// assure 1 unit length
                let n = Math.sqrt(x*x + y*y);
                let normalx = x / n;
                let normaly = y / n;
    
                this.normals.push(
					normalx, -normaly, 0,
					)

                if (j != 0){
                    //this.indices.push(j*this.slices + i, (j-1)*this.slices + i, (j-1) * this.slices + i-1);
                    this.indices.push(this.slices*(j-1) + i, i-1 + this.slices*j, this.slices*j + i);
                    this.indices.push(this.slices*(j-1) + i, this.slices*j + i, this.slices*(j-1)+i+1);
                    
                }
                
                   
            }
        		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
}
