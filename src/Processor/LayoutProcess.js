class LayoutProcess extends Processor {

    constructor() {
        this.program = sm.init('gui');

        var points = [];

        points.push(-50, 0, 0);
        points.push(20, 0, 0);

        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

// provide texture coordinates for the rectangle.

        this.texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0]), gl.STATIC_DRAW);


        this.vertBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);

        var pd = this.setRectangle(0, 0, 1,  1);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);









    }

    simpleWorldToViewX(x) {
        return x / resolutionWidth;
    }

    simpleWorldToViewY(y) {
        return y / resolutionHeight;
    }

    recursiveLayout(lloop,parent) {
        for (var i = 0; i < lloop.length; i++) {


            if(parent!=false)
            {
                //alert(parent.xPos);
                //alert(parent.yPos);
                //lloop[i].xPos = parent.xPos+(this.simpleWorldToViewX(1)*lloop[i].xPos);
                //lloop[i].yPos = parent.yPos+(this.simpleWorldToViewY(1)*lloop[i].yPos);
               // alert(lloop[i].yPos);
            }

            //console.log(lloop[i].super().xPos);
            //iloop[i].masterPos = parent



            if(lloop[i].sprite) {
                var x =  parent.xPos+(this.simpleWorldToViewX(1)*lloop[i].xPos);
                var y = parent.yPos+(this.simpleWorldToViewY(1)*lloop[i].yPos);
              this.render(lloop[i].sprite,x,y);
            }
            if (lloop[i].children.length > 0) {
                    this.recursiveLayout(lloop[i].children,lloop[i]);
            }
        }
    }


    setRectangle(x, y, x2, y2) {
        var x1 = x;
        var x2 = x2;
        var y1 = y;
        var y2 = y2;


        var ret =  [
            x2, y1,
            x1, y1,
            x1, y2,


            x2, y1,
            x1, y2,
            x2, y2,
        ];
        return ret;

    }



    render(sprite,x,y) {



        camera.mvPushMatrix();
        //mat4.scale(camera.mvMatrix, [0.2, 0.2, 0.2]);
        //sprite.width=64;
        //sprite.height=64;

        var y2 = y+(this.simpleWorldToViewY(1)*64);
        var x2 = x+this.simpleWorldToViewX(1)*64;
        var pd = this.setRectangle(x, y, x2,  y2);



        this.vertBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);



        gl.vertexAttribPointer(this.program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.vertexAttribPointer(this.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, sprite.loadedTexture);
        gl.uniform1i(this.program.samplerUniform, 0);

        //gl.uniformMatrix4fv(this.program.uPMatrix, false, camera.pMatrix);



        gl.drawArrays(gl.TRIANGLES, 0, 6);
        camera.drawCalls++;

        camera.mvPopMatrix();
    }


    draw() {



        gl.useProgram(this.program);



        this.recursiveLayout(lm,false);



    }


}