class Camera {
    constructor() {
        /*

         $('#slider-x').slider({
         value: 0.0,
         min: -100,
         max: 100,
         step: 0.1,
         slide: updateLightPosition,
         change: updateLightPosition
         });
         $('#slider-y').slider({
         value: 0.0,
         min: -100,
         max: 100,
         step: 0.1,
         slide: updateLightPosition,
         change: updateLightPosition
         });
         $('#slider-z').slider({
         value: 0,
         min: -100,
         max: 100,
         step: 0.1,
         slide: updateLightPosition,
         change: updateLightPosition
         });

         $('#cslider-x').slider({
         value: 0,
         min: -100,
         max: 100,
         step: 0.1,
         slide: updateCameraPosition,
         change: updateCameraPosition
         });
         $('#cslider-y').slider({
         value: 0,
         min: -100,
         max: 100,
         step: 0.1,
         slide: updateCameraPosition,
         change: updateCameraPosition
         });
         $('#cslider-z').slider({
         value: -100,
         min: -100,
         max: 200,
         step: 0.1,
         slide: updateCameraPosition,
         change: updateCameraPosition
         });

         $('#rslider-x').slider({value: 0, min: 0, max: 360, step: 0.1, slide: updateRotation, change: updateRotation});

         */

        this.mvMatrix = mat4.create();
        this.pMatrix = mat4.create();
        this.cMatrix = mat4.create();

        this.pvMatrix = mat4.create();
        this.pvMatrixInverse = mat4.create();

        this.mvMatrixStack = [];
        this.eye = vec3.create([0, 0, 0]);  // negation of actual eye position
        this.clickPosition = null;

        //initial pos
        this.x = 0;
        this.y = 0;
        this.z = -120;
        this.rotation = helpers.degToRad(0);

        this.slideLeft = false;
        this.slideRight = false;
        this.slideUp = false;
        this.slideDown = false;
        this.rotation = helpers.degToRad(60);
        //this.rotation = 0;
        this.centerPosition = false;

        this.home = [this.x, this.y, this.z];

        mat4.identity(this.mvMatrix);
        mat4.translate(this.mvMatrix, this.home);

        //Initialize Camera matrix as the inverse of the Model-View Matrix
        mat4.identity(this.cMatrix);
        mat4.inverse(this.mvMatrix, this.cMatrix);

        //Initialize Perspective matrix
        mat4.identity(this.pMatrix);


    }

    setPerspective() {
        mat4.perspective(80, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, this.pMatrix);
    }

    slideCameraLeft(xAddition) {
        this.x += xAddition;
    }

    slideCameraRight(xDecrease) {
        this.x -= xDecrease;
    }

    slideCameraUp(zAddition) {
        this.z += zAddition;

    }

    slideCameraDown(zDecrease) {
        this.z -= zDecrease;

    }


    move() {

        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 5000.0, this.pMatrix);
        var determineCenter = false;
        if (this.slideLeft) {
            this.slideCameraLeft(0.1);
            determineCenter = true;
        }
        if (this.slideRight) {
            this.slideCameraRight(0.1);
            determineCenter = true;
        }
        if (this.slideUp) {
            this.slideCameraUp(0.1);
            determineCenter = true;

        }
        if (this.slideDown) {
            this.slideCameraDown(0.1);
            determineCenter = true;
        }


        //Light uniforms
        if ($('#controlCamera').prop('checked')) {

            this.x = $('#cslider-x').slider("value");
            this.y = $('#cslider-y').slider("value");
            this.z = $('#cslider-z').slider("value");
            this.rotation = helpers.degToRad($('#rslider-x').slider("value"));

            printMessage(this.x);


        }

        if (determineCenter) {
            //var cp = actionMapper.getCenterPosition();

            //console.log(cp);
            //var block = blockManager.getBlockFromXY(cp[0], cp[2]);

            //if (block != -1)
            //    blockManager.setCurrentBlock(block);

            //console.log(block);

        }


        mat4.translate(this.mvMatrix, [this.x, this.y, this.z]);
        mat4.rotate(this.mvMatrix, this.rotation, [1, 0, 0]);
        //mat4.multiply(this.pMatrix, this.mvMatrix, this.pvMatrix);

    }


    mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(this.mvMatrix, copy);
        this.mvMatrixStack.push(copy);
    }


    mvPopMatrix() {
        if (this.mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        this.mvMatrix = this.mvMatrixStack.pop();
    }


}