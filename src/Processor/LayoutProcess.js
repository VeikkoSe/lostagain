function layoutprocess_constructor(sb) {

    //constructor() {
    // let program = sb.getProgram('gui');

    let gl = sb.getGL();
    let resolutionWidth = sb.getResolutionWidth();
    let resolutionHeight = sb.getResolutionHeight();

    let shadermanager = sb.getShaderManager();
    let program = shadermanager.useShader("gui");

    let points = [];
    let vertexPositionBuffer = gl.createBuffer();
    let texCoordBuffer = gl.createBuffer();

    let vertBuffer = gl.createBuffer();
    let em = sb.getEntityManager();

    let camera = sb.getCamera();


    let init = function () {


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


        let pd = setRectangle(0, 0, 1, 1);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);

    }


    let simpleWorldToViewX = function (x) {
        return x / resolutionWidth;
    }

    let simpleWorldToViewY = function (y) {
        return y / resolutionHeight;
    }

    let calculatePd = function (x, y, xminus, yminus, layout) {

        let rh = resolutionHeight / 256;

        let y2 = y + (simpleWorldToViewY(1) * layout.size * rh);
        let x2 = x + (simpleWorldToViewX(1) * layout.size * rh);

        if (yminus) {

            let y2 = y - (simpleWorldToViewY(1) * layout.size * rh);
            let tmp = y;
            y = y2;
            y2 = tmp;
        }
        if (xminus) {
            let x2 = x - (simpleWorldToViewX(1) * layout.size * rh);
            let tmp = x;
            x = x2;
            x2 = tmp;
        }
        return setRectangle(x, y, x2, y2);
    }

    let recursiveLayout = function (lloop, parent) {
        for (let i = 0; i < lloop.length; i++) {

            if (lloop[i].component) {
                let rh = resolutionHeight / 256;

                //right side of the screen, we minus so we get correct coordinates regardless of window size
                let x = (parent.xPos) + ((simpleWorldToViewX(1) * lloop[i].xPos) * rh);
                let y = (parent.yPos) + ((simpleWorldToViewY(1) * lloop[i].yPos) * rh);
                let xminus = false;
                let yminus = false;
                if (parent.xPos == 1) {
                    let x = (parent.xPos) - ((simpleWorldToViewX(1) * lloop[i].xPos) * rh);
                    xminus = true;
                }
                if (parent.yPos == 1) {
                    let y = (parent.yPos) - ((simpleWorldToViewY(1) * lloop[i].yPos) * rh);
                    yminus = true;
                }

                let loop = 1;
                if (lloop[i].component.amount && lloop[i].component.amount > 0) {
                    loop = lloop[i].component.amount;
                }
                else {
                    loop = 0;
                }

                if (loop > 0) {
                    for (let h = 0; h < loop; h++) {
                        let add = h * (simpleWorldToViewY(1) * lloop[i].size * rh);

                        let pd = calculatePd(x + add, y, xminus, yminus, lloop[i]);
                        render(lloop[i], pd);

                    }
                }


            }
            if (lloop[i].getChildren().length > 0) {
                recursiveLayout(lloop[i].getChildren(), lloop[i]);
            }
        }
    }


    let setRectangle = function (x, y, x2, y2) {
        let x1 = x;
        let x2 = x2;
        let y1 = y;
        let y2 = y2;


        let ret = [
            x2, y1,
            x1, y1,
            x1, y2,


            x2, y1,
            x1, y2,
            x2, y2,
        ];
        return ret;

    }


    let render = function (layout, pd) {


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


    }


    let draw = function () {

        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.LayoutComponent) {
                shadermanager.setProgram(program);


                recursiveLayout(le.components.LayoutComponent.layout, false);
            }
        }

    }
    return {
        update: function () {
        }, draw, init: function () {
        }
    }


}