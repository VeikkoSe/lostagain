function layoutprocess_constructor(sb) {
    'use strict';

    //constructor() {
    // var program = sb.getProgram('gui');

    var gl = sb.getGL();

    var shadermanager = sb.getShaderManager();
    var program = shadermanager.useShader('gui');

    var points = [];
    var vertexPositionBuffer;
    var texCoordBuffer;
    var vertBuffer;
    // var camera = sb.getCamera();

    var em = sb.getEntityManager();

    //var camera = sb.getCamera();

    var init = function() {

        vertexPositionBuffer = gl.createBuffer();
        texCoordBuffer = gl.createBuffer();
        vertBuffer = gl.createBuffer();

        points.push(-50, 0, 0);
        points.push(20, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0]), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);

        var pd = setRectangle(0, 0, 1, 1);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);

    };

    var simpleWorldToViewX = function(x) {
        return x / sb.getResolutionWidth();
    };

    var simpleWorldToViewY = function(y) {
        return y / sb.getResolutionHeight();
    };

    var calculatePd = function(x, y, xminus, yminus, layout) {

        var rh = sb.getResolutionHeight() / 256;

        var y2 = y + (simpleWorldToViewY(1) * layout.getSize() * rh);
        var x2 = x + (simpleWorldToViewX(1) * layout.getSize() * rh);

        if (yminus) {

            var y2 = y - (simpleWorldToViewY(1) * layout.getSize() * rh);
            var tmp = y;
            y = y2;
            y2 = tmp;
        }
        if (xminus) {
            var x2 = x - (simpleWorldToViewX(1) * layout.getSize() * rh);
            var tmp = x;
            x = x2;
            x2 = tmp;
        }
        return setRectangle(x, y, x2, y2);
    };

    var recursiveLayout = function(lloop, parent) {
        'use strict';

        for (var i = 0; i < lloop.length; i++) {

            if (lloop[i].getComponent()) {
                var rh = sb.getResolutionHeight() / 256;

                //right side of the screen, we minus so we get correct coordinates regardless of window size
                var x = (parent.getXPos()) + ((simpleWorldToViewX(1) * lloop[i].getXPos()) * rh);
                var y = (parent.getYPos()) + ((simpleWorldToViewY(1) * lloop[i].getYPos()) * rh);
                var xminus = false;
                var yminus = false;
                if (parent.getXPos() == 1) {
                    x = parent.getXPos() - ((simpleWorldToViewX(1) * lloop[i].getXPos()) * rh);
                    xminus = true;
                }
                if (parent.getYPos() == 1) {
                    y = parent.getYPos() - ((simpleWorldToViewY(1) * lloop[i].getYPos()) * rh);
                    yminus = true;
                }

                var loop = 1;
                if (lloop[i].getComponent().getAmount() && lloop[i].getComponent().getAmount() > 0) {
                    loop = lloop[i].getComponent().getAmount();
                }
                else {
                    loop = 0;
                }

                if (loop > 0) {
                    for (var h = 0; h < loop; h++) {
                        var add = h * (simpleWorldToViewY(1) * lloop[i].getSize() * rh);

                        var pd = calculatePd(x + add, y, xminus, yminus, lloop[i]);
                        render(lloop[i], pd);

                    }
                }

            }
            if (lloop[i].getChildren().length > 0) {
                recursiveLayout(lloop[i].getChildren(), lloop[i]);
            }
        }
    };

    var setRectangle = function(x, y, x2, y2) {
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

    };

    var render = function(layout, pd) {

        //camera.mvPushMatrix();

        vertBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);

        gl.vertexAttribPointer(program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

        var texture = layout.getComponent().getSprite().getTexture();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(program.samplerUniform, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

    };

    var draw = function(le) {

        if (le.components.LayoutComponent) {

            shadermanager.setProgram(program);

            recursiveLayout(le.components.LayoutComponent.getLayout(), false);
        }

    };
    return {
        update: function() {
        },
        draw, init
    };

}