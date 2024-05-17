import {CGFobject} from '../lib/CGF.js';
/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
	constructor(scene, radius)	{
        super(scene);
        this.original_radius = radius;
		this.initBuffers();
        this.offsets = [];
        for(x = 0; x < 100; x++){
            this.offsets.push(Math.random());
        }
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let angle = (2 * Math.PI) / 10;
        let angle_2 = Math.PI / 10;
        let cutSize = (2* this.original_radius) / 10;
        let radius = this.original_radius;
		

        for (let j = 0; j <= 10; j++){
            radius = this.original_radius * Math.sin(j * angle_2);
            for(let i = 0; i < 10; i++){
				
				let x=Math.cos(i*angle) * radius;
                let y=Math.sin(i*angle) * radius;
                let z=this.original_radius * Math.cos(j * angle_2);
				
				//vertices
                this.vertices.push(x,y,z);
				

				// assure 1 unit length
                let n = Math.sqrt(x*x + y*y + z*z);
                let normalx = x / n;
                let normaly = y / n;
                let normalz = z / n;
    
                this.normals.push(
					normalx, normaly, normalz,
					)

                if (j != 0){
                    this.indices.push(10*(j-1) + i, i-1 + 10*j, 10*j + i);
                    this.indices.push(10*(j-1) + i, 10*j + i, 10*(j-1)+i+1);
                    
                }
                
                   
            }
        		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
}
