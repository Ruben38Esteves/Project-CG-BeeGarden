# CG 2023/2024

## Group T12G06

## Project Notes
- We started by developing the sphere as asked and applying the earth texture.

![Screenshot 1](screenshots/cg-t12g06-project-1.png)

- Then, we adapted the sphere so we could insert a texture on its inside and create a panorama

![Screenshot 2](screenshots/cg-t12g06-project-2a.png)
![Screenshot 3](screenshots/cg-t12g06-project-2b.png)

- We developed the flower. The constructor takes many parameters for its construction, that are then used with random values when building a garden so there's differences in them.

![Screenshot 4](screenshots/cg-t12g06-project-2.png)

- The rock was made by differing the radius on a sphere's vartices by an offset within a given inteval. The higher the offset interval, the "rockier" the rock. We then generated multiple of these with random scaling to generate a pyramid like structure.

![Screenshot 4](screenshots/cg-t12g06-tp2-3a.png)
![Screenshot 5](screenshots/cg-t12g06-tp2-3b.png)
![Screenshot 6](screenshots/cg-t12g06-tp2-3c.png)

- The bee is composed of scaled spheres, and the antennas and legs are cylinders with spheres on the end. The wings are Ellipses. We added textures we though were appropriate. The wings are animated.

![Screenshot 7](screenshots/cg-t12g06-tp2-4a.png)
![Screenshot 8](screenshots/cg-t12g06-tp2-4b.png)

- For the pollen we developed another class resembling MySphere, that takes arguments for the scale of the bottom and upper part. It resulted in an egg like figure.

![Screenshot 9](screenshots/cg-t12g06-tp2-5a.png)
![Screenshot 10](screenshots/cg-t12g06-tp2-5d.png)

The hive is a box Hive, with different textures for the respective faces. When the bee goes to store pollen at the hive, it is placed on top of it. Pollens are displayed with random rotation in their class, so we just reference pollen instances across the scene, from flower to bee to hive

![Screenshot 11](screenshots/cg-t12g06-tp2-5b.png)
![Screenshot 12](screenshots/cg-t12g06-tp2-5e.png)

The grass is composed of trapezoids. We alter their rotation to givec the impression of a waving movement

![Screenshot 13](screenshots/cg-t12g06-tp2-7.png)
