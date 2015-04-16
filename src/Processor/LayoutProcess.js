class LayoutProcess extends Processor {

    constructor() {
        this.program = sm.init('gui');

        var points = [];

        points.push(-50, 0, 0);
        points.push(20, 0, 0);

        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);


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

        var pd = this.setRectangle(0, 0, 1, 1);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);

    }

    simpleWorldToViewX(x) {
        return x / resolutionWidth;
    }

    simpleWorldToViewY(y) {
        return y / resolutionHeight;
    }

    calculatePd(x, y, xminus, yminus, layout) {

        var rh = resolutionHeight / 256;

        var y2 = y + (helpers.simpleWorldToViewY(1) * layout.size * rh);
        var x2 = x + (helpers.simpleWorldToViewX(1) * layout.size * rh);

        if (yminus) {

            var y2 = y - (helpers.simpleWorldToViewY(1) * layout.size * rh);
            var tmp = y;
            y = y2;
            y2 = tmp;
        }
        if (xminus) {
            var x2 = x - (helpers.simpleWorldToViewX(1) * layout.size * rh);
            var tmp = x;
            x = x2;
            x2 = tmp;
        }
        return this.setRectangle(x, y, x2, y2);
    }

    recursiveLayout(lloop, parent) {
        for (var i = 0; i < lloop.length; i++) {

            if (lloop[i].component) {
                var rh = resolutionHeight / 256;

                //right side of the screen, we minus so we get correct coordinates regardless of window size
                var x = (parent.xPos) + ((this.simpleWorldToViewX(1) * lloop[i].xPos) * rh);
                var y = (parent.yPos) + ((this.simpleWorldToViewY(1) * lloop[i].yPos) * rh);
                var xminus = false;
                var yminus = false;
                if (parent.xPos == 1) {
                    var x = (parent.xPos) - ((this.simpleWorldToViewX(1) * lloop[i].xPos) * rh);
                    xminus = true;
                }
                if (parent.yPos == 1) {
                    var y = (parent.yPos) - ((this.simpleWorldToViewY(1) * lloop[i].yPos) * rh);
                    yminus = true;
                }

                var loop = 1;
                if (lloop[i].component.amount) {

                    loop = lloop[i].component.amount;

                }
                for (var h = 0; h < loop; h++) {
                    var add = h * (helpers.simpleWorldToViewY(1) * lloop[i].size * rh);

                    var pd = this.calculatePd(x + add, y, xminus, yminus, lloop[i]);
                    this.render(lloop[i], pd);
                    var lastpd = pd;
                }


            }
            if (lloop[i].children.length > 0) {
                this.recursiveLayout(lloop[i].children, lloop[i]);
            }
        }
    }


    setRectangle(x, y, x2, y2) {
        var x1 = x;
        var x2 = x2;
        var y1 = y;
        var y2 = y2;


        var ret = [
            x2, y1,
            x1, y1,
            x1, y2,


            x2, y1,
            x1, y2,
            x2, y2,
        ];
        return ret;

    }


    render(layout, pd) {


        camera.mvPushMatrix();

        this.vertBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);

        gl.vertexAttribPointer(this.program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.vertexAttribPointer(this.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, layout.component.sprite.texture);
        gl.uniform1i(this.program.samplerUniform, 0);


        gl.drawArrays(gl.TRIANGLES, 0, 6);
        camera.drawCalls++;

        camera.mvPopMatrix();


    }


    draw() {


        sm.setProgram(this.program);


        this.recursiveLayout(lm, false);


    }


}