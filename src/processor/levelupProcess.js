function levelupProcess(sb) {
    'use strict';

    var gl = sb.getGL();

    var vertexPositionBuffer = gl.createBuffer();
    var texturePositionBuffer = gl.createBuffer();
    var em = sb.getEntityManager();
    var shadermanager = sb.getShaderManager();
    var program = shadermanager.useShader('maps');
    var hg;
    var am = sb.getAssetManager();

    var camera = sb.getCamera();

    var init = function() {
        hg = hexagon(4, am.getSprite('maptiles'));
        hg.init();
    };

    var update = function() {
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.MapComponent) {
                var mc = le.components.MapComponent;

                hg.updateArea(mc.getMovingUp(), mc.getMovingDown(), mc.getMovingLeft(), mc.getMovingRight(), mc.getSelecting());

            }

            if (le.components.HexItem && le.components.RenderableComponent) {
                var re = le.components.RenderableComponent;
                re.setXPos(hg.getPlayerPosXInWC());
                re.setZPos(hg.getPlayerPosZInWC());
                //hg.setItemPos(le.components.HexItem.itemName);

            }

        }
    };

    var draw = function(le) {

        if (le.components.MapComponent) {

            shadermanager.setProgram(program);

            camera.mvPushMatrix();
            gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(program.uMVMatrix, false, camera.getMVMatrix());

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hg.getArea()), gl.STATIC_DRAW);
            gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hg.getTextureCoordinates()), gl.STATIC_DRAW);

            gl.vertexAttribPointer(program.aTextureCoord, 2, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, hg.getTexture().getTexture());
            gl.uniform1i(program.samplerUniform, 0);

            gl.drawArrays(gl.TRIANGLES, 0, (hg.getHexsizeX() * (hg.getHexsizeY())) * 12);

            camera.addDrawCall();
            camera.mvPopMatrix();
        }

    };
    return Object.freeze({
        update, draw, init
    });

}
