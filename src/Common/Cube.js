/**
 * Created by Vge on 13.2.2015.
 */

class Cube {

    constuctor() {

    }

    vertices() {
        return [
            -1.0, -1.0, -1.0, // triangle 1 : begin
            -1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0, // triangle 1 : end
            1.0, 1.0, -1.0, // triangle 2 : begin
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0, // triangle 2 : end
            1.0, -1.0, 1.0,
            -1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0,
            -1.0, -1.0, -1.0,
            -1.0, -1.0, -1.0,
            -1.0, 1.0, 1.0,
            -1.0, 1.0, -1.0,
            1.0, -1.0, 1.0,
            -1.0, -1.0, 1.0,
            -1.0, -1.0, -1.0,
            -1.0, 1.0, 1.0,
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, -1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0, 1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, -1.0,
            -1.0, 1.0, -1.0,
            1.0, 1.0, 1.0,
            -1.0, 1.0, -1.0,
            -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,
            1.0, -1.0, 1.0
        ];


    }
}


/**
 * Created by Vge on 13.2.2015.
 */

class Diamond {

    constuctor() {

    }

    vertices() {
        return [
            //ylapuol

            // Front face
            0.0, 1.0, 0.0,
            -1.0, 0.0, 1.0,
            1.0, 0.0, 1.0,

            // Right face
            0.0, 1.0, 0.0,
            1.0, 0.0, 1.0,
            1.0, 0.0, -1.0,

            // Back face
            0.0, 1.0, 0.0,
            1.0, 0.0, -1.0,
            -1.0, 0.0, -1.0,

            // Left face
            0.0, 1.0, 0.0,
            -1.0, 0.0, -1.0,
            -1.0, 0.0, 1.0,


            0.0, -1, 0.0,
            -1, 0, 1,
            1, 0, -1,

            0.0, -1, 0.0,
            1, 0, -1,
            1, 0, -1,

            0.0, -1, 0.0,
            1, 0, -1,
            -1, 0, -1,

            0.0, -1, 0.0,
            -1, 0, -1,
            -1, 0, 1


        ];


    }
}
