function mapProcess(sb) {
    'use strict';

    //constructor() {

    var vertexPositionBuffer = gl.createBuffer();
    var texturePositionBuffer = gl.createBuffer();
    var em = sb.getEntityManager();

    var mapProgram = sm.init('maps');

    var hexagon = game.map;
    var camera = sb.getCamera();

    var update = function() {
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.MapComponent) {
                var mc = le.components.MapComponent;

                hexagon.updateArea(mc.movingUp, mc.movingDown, mc.movingLeft, mc.movingRight, mc.selecting);

            }

            if (le.components.HexItem && le.components.RenderableComponent) {
                var re = le.components.RenderableComponent;
                re.xPos = hexagon.getPlayerPosXInWC();
                re.zPos = hexagon.getPlayerPosZInWC();
                //this.hexagon.setItemPos(le.components.HexItem.itemName);

            }

        }
    };

    var draw = function(le) {

        // for (var e = 0; e < em.entities.length; e++) {
        //     var le = em.entities[e];

        if (le.components.MapComponent) {
            //var mc = le.components.MapComponent;

            sm.setProgram(mapProgram);

            camera.mvPushMatrix();
            gl.uniformMatrix4fv(mapProgram.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(mapProgram.uMVMatrix, false, camera.getMVMatrix());

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hexagon.area), gl.STATIC_DRAW);
            gl.vertexAttribPointer(mapProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hexagon.textureCoordinates), gl.STATIC_DRAW);

            gl.vertexAttribPointer(mapProgram.aTextureCoord, 2, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, hexagon.texture);
            gl.uniform1i(mapProgram.samplerUniform, 0);

            gl.drawArrays(gl.TRIANGLES, 0, (hexagon.hexsizeX * (hexagon.hexsizeY)) * 12);

            camera.addDrawCall();
            camera.mvPopMatrix();
        }

        // }
    };
    return Object.freeze({
        update, draw, init: function() {
        }
    });

}
