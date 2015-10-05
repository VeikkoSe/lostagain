function layoutprocess_constructor(sb) {
    'use strict';

    //constructor() {
    // var program = sb.getProgram('gui');

    var gl = sb.getGL();
    var resolutionWidth = sb.getResolutionWidth();
    var resolutionHeight = sb.getResolutionHeight();

    var shadermanager = sb.getShaderManager();
    var program = shadermanager.useShader('gui');

    var points = [];
    var vertexPositionBuffer = gl.createBuffer();
    var texCoordBuffer = gl.createBuffer();

    var vertBuffer = gl.createBuffer();
    var em = sb.getEntityManager();

    var camera = sb.getCamera();

    var init = function() {

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
        return x / resolutionWidth;
    };

    var simpleWorldToViewY = function(y) {
        return y / resolutionHeight;
    };

    var calculatePd = function(x, y, xminus, yminus, layout) {

        var rh = resolutionHeight / 256;

        var y2 = y + (simpleWorldToViewY(1) * layout.size * rh);
        var x2 = x + (simpleWorldToViewX(1) * layout.size * rh);

        if (yminus) {

            var y2 = y - (simpleWorldToViewY(1) * layout.size * rh);
            var tmp = y;
            y = y2;
            y2 = tmp;
        }
        if (xminus) {
            var x2 = x - (simpleWorldToViewX(1) * layout.size * rh);
            var tmp = x;
            x = x2;
            x2 = tmp;
        }
        return setRectangle(x, y, x2, y2);
    };

    var recursiveLayout = function(lloop, parent) {
        for (var i = 0; i < lloop.length; i++) {

            if (lloop[i].component) {
                var rh = resolutionHeight / 256;

                //right side of the screen, we minus so we get correct coordinates regardless of window size
                var x = (parent.xPos) + ((simpleWorldToViewX(1) * lloop[i].xPos) * rh);
                var y = (parent.yPos) + ((simpleWorldToViewY(1) * lloop[i].yPos) * rh);
                var xminus = false;
                var yminus = false;
                if (parent.xPos == 1) {
                    var x = (parent.xPos) - ((simpleWorldToViewX(1) * lloop[i].xPos) * rh);
                    xminus = true;
                }
                if (parent.yPos == 1) {
                    var y = (parent.yPos) - ((simpleWorldToViewY(1) * lloop[i].yPos) * rh);
                    yminus = true;
                }

                var loop = 1;
                if (lloop[i].component.amount && lloop[i].component.amount > 0) {
                    loop = lloop[i].component.amount;
                }
                else {
                    loop = 0;
                }

                if (loop > 0) {
                    for (var h = 0; h < loop; h++) {
                        var add = h * (simpleWorldToViewY(1) * lloop[i].size * rh);

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

        camera.mvPushMatrix();

        vertBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);

        gl.vertexAttribPointer(program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, layout.component.sprite.texture);
        gl.uniform1i(program.samplerUniform, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        camera.drawCalls++;

        camera.mvPopMatrix();

    };

    var draw = function() {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.LayoutComponent) {
                shadermanager.setProgram(program);

                recursiveLayout(le.components.LayoutComponent.layout, false);
            }
        }

    };
    return {
        update: function() {
        }, draw, init: function() {
        }
    };

}