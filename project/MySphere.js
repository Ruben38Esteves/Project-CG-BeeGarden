import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
	constructor(scene, radius, slices, stacks)	{
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

		let angle = (2 * Math.PI) / this.slices;
        let angle_2 = Math.PI / this.stacks;
        let cutSize = (2* this.original_radius) / this.stacks;
        let radius = this.original_radius;
        // x = r cos angle
        // y = r sin angle
        // z = 
		

        for (let j = 0; j <= this.stacks; j++){
            /*
            let o = Math.abs(j- (this.stacks / 2)) * cutSize;
            if (o == 0) {
                radius = this.original_radius;
            }else{
                //radius = o / Math.tan( Math.asin( o / this.original_radius ));
            }
            */
            radius = this.original_radius * Math.sin(j * angle_2);
            for(let i = 0; i < this.slices; i++){
				
				let x=Math.cos(i*angle) * radius;
                let y=Math.sin(i*angle) * radius;
				
				//vertices
                this.vertices.push(x,-y,/*j*cutSize*/ (this.original_radius * Math.cos(j * angle_2)));
				

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
