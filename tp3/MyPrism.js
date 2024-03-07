import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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
		

        for (let j = 0; j < this.stacks; j++){
            for(let i = 0; i < this.slices; i++){
				
				let x=Math.cos(i*angle);
                let nextx=Math.cos((i+1)*angle);
                let y=Math.sin(i*angle);
                let nexty=Math.sin((i+1)*angle);
				
				//vertices
                this.vertices.push(x,-y,(j+1)*cutSize);
                this.vertices.push(x,-y,j*cutSize);
                this.vertices.push(nextx,-nexty,j*cutSize);
                this.vertices.push(nextx,-nexty, (j+1)*cutSize);
				
				//calculate normal
				let normalx = nexty-y
				let normaly = nextx-x

				// assure 1 unit length
                let n = Math.sqrt(normalx*normalx + normaly*normaly);
                normalx /= n;
                normaly /= n;
    
                this.normals.push(
					normalx, normaly, 0,
					normalx, normaly, 0,
					normalx, normaly, 0,
					normalx, normaly, 0,
					)

                this.indices.push((i*4) + (j*4*this.slices) + 2, (i*4) + (j*4*this.slices) + 1, (i*4) + (j*4*this.slices));
                this.indices.push((i*4) + (j*4*this.slices) + 3, (i*4) + (j*4*this.slices) + 2, (i*4) + (j*4*this.slices));
            }
        		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
}
