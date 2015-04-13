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

    recursiveLayout(lloop) {
        for (var i = 0; i < lloop.length; i++) {


/*
            if(lloop[i].xPos<1 && lloop[i].yPos<1 && lloop[i].rootX == null && lloop[i].rootY == null) {
                lloop.rootX = simpleWorldToViewX(lloop[i].xPos);
                lloop.rootY = simpleWorldToViewX(lloop[i].yPos);
            }
            else {
                return false;

            }
*/


            if(lloop[i].sprite) {





              this.render(lloop[i].sprite,lloop.xPos,lloop.yPos);
            }
            if (lloop[i].children.length > 0) {
                    this.recursiveLayout(lloop[i].children);
            }
        }
    }


    setRectangle(x, y, x2, y2) {
        var x1 = x;
        var x2 = x2;
        var y1 = y;
        var y2 = y2;


        return [
            x2, y1,
            x1, y1,
            x1, y2,


            x2, y1,
            x1, y2,
            x2, y2,
        ];

    }



    render(sprite,x,y) {




        camera.mvPushMatrix();
        //mat4.scale(camera.mvMatrix, [0.2, 0.2, 0.2]);
        //sprite.width=64;
        //sprite.height=64;
        var pd = this.setRectangle(-1, -1, 1,  1);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);



        gl.vertexAttribPointer(this.program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.vertexAttribPointer(this.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, sprite.texture);
        gl.uniform1i(this.program.samplerUniform, 0);

        gl.uniformMatrix4fv(this.program.uPMatrix, false, camera.pMatrix);



        gl.drawArrays(gl.TRIANGLES, 0, 6);
        camera.drawCalls++;

        camera.mvPopMatrix();
    }


    draw() {

        mat4.identity(camera.mvMatrix);
        mat4.translate(camera.mvMatrix, [0, 0, -10]);

        gl.useProgram(this.program);

        if(lm.length>0) {

        this.recursiveLayout(lm);

        }

    }


}