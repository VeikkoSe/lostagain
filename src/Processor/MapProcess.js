function mapprocess_constructor(sb) {
    //constructor() {

    let vertexPositionBuffer = gl.createBuffer();
    let texturePositionBuffer = gl.createBuffer();

    let mapProgram = sm.init('maps');


    let hexagon = game.map;
    let camera = sb.getCamera();


    //}

    let randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    let update = function () {
        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.MapComponent) {
                let mc = le.components.MapComponent;

                hexagon.updateArea(mc.movingUp, mc.movingDown, mc.movingLeft, mc.movingRight, mc.selecting);

            }

            if (le.components.HexItem && le.components.Renderable) {
                let re = le.components.Renderable;
                re.xPos = hexagon.getPlayerPosXInWC();
                re.zPos = hexagon.getPlayerPosZInWC();
                //this.hexagon.setItemPos(le.components.HexItem.itemName);

            }


        }
    }

    let draw = function () {

        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.MapComponent) {
                let mc = le.components.MapComponent;

                sm.setProgram(this.mapProgram);


                camera.mvPushMatrix();
                gl.uniformMatrix4fv(this.mapProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(this.mapProgram.uMVMatrix, false, camera.mvMatrix);


                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.hexagon.area), gl.STATIC_DRAW);
                gl.vertexAttribPointer(this.mapProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.hexagon.textureCoordinates), gl.STATIC_DRAW);

                gl.vertexAttribPointer(this.mapProgram.aTextureCoord, 2, gl.FLOAT, false, 0, 0);


                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.hexagon.texture);
                gl.uniform1i(this.mapProgram.samplerUniform, 0);


                gl.drawArrays(gl.TRIANGLES, 0, (this.hexagon.hexsizeX * (this.hexagon.hexsizeY)) * 12);
                //gl.drawArrays(gl.TRIANGLES, 0,12);
                camera.drawCalls++;

                camera.mvPopMatrix();
            }

        }
    }
    return {}

}
