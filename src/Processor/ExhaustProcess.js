function exhaustprocess_constructor(sb) {
    //constructor() {
    //this.exhaustAmount = 200;
    //this.exhaustInterval = 50;
    //this.exhaustTrail = [];

    let lastTime = 0;
    let exhaustProgram = sm.init('exhaust');
    let elapsedTotal = 0;
    let gl = sb.getGL();

    let vertexPositionBuffer = gl.createBuffer();

    let texturePositionBuffer = gl.createBuffer();

    let camera = sb.getCamera();

    let init = function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
    }


    //}


    let pushArray = function (arr, arr2) {
        arr.push.apply(arr, arr2);
    }


    let updateTail = function (exhaustComponent, renderableComponent) {


        let re = renderableComponent;
        let ec = exhaustComponent;


        let posX = re.xPos;
        let posZ = re.zPos;

        let unitX = Math.cos(degToRad(re.angleY));
        let unitZ = Math.sin(degToRad(re.angleY));

        let rendX = (posX - (unitX * ec.offSetSideFromCenter)) - ((-1 * unitZ) * ec.offSetFromCenter);
        let rendZ = (posZ + (unitZ * ec.offSetSideFromCenter)) + (unitX * ec.offSetFromCenter);


        //drop from the end of array
        if ((ec.flow.length / 3) >= ec.length) {
            ec.flow.shift();
            ec.flow.shift();
            ec.flow.shift();
            for (let i = 0; i < 18; i++)
                ec.points.shift();

            for (let i = 0; i < 12; i++)
                ec.texturecoordinates.shift();

        }

        if (ec.flow.length == 0) {

            ec.flow.push(rendX);
            ec.flow.push(0);
            ec.flow.push(rendZ);

        }

        let xd = rendX - ec.flow[ec.flow.length - 3];
        let zd = rendZ - ec.flow[ec.flow.length - 1];
        let xdh = xd / 2;
        let zdh = zd / 2;
        let distance = Math.sqrt(xd * xd + zd * zd);


        //when to create new
        if (distance > ec.width) {


            if (ec.flow.length > 3) {

                //quarter of a turn. That means if blue = (x, y), red = (-y, x)


                let i = 0;
                //first triangle
                ec.square[i++] = ec.points[ec.points.length - 6];
                ec.square[i++] = 0;
                ec.square[i++] = ec.points[ec.points.length - 4];

                ec.square[i++] = zdh + rendX;
                ec.square[i++] = 0;
                ec.square[i++] = -1 * xdh + rendZ;

                ec.square[i++] = ec.points[ec.points.length - 3];
                ec.square[i++] = 0;
                ec.square[i++] = ec.points[ec.points.length - 1];


                //second triangle
                ec.square[i++] = ec.points[ec.points.length - 6];
                ec.square[i++] = 0;
                ec.square[i++] = ec.points[ec.points.length - 4];

                ec.square[i++] = -1 * zdh + rendX;
                ec.square[i++] = 0;
                ec.square[i++] = xdh + rendZ;

                ec.square[i++] = zdh + rendX;
                ec.square[i++] = 0;
                ec.square[i++] = -1 * xdh + rendZ;

                for (let i = 0; i < 18; i++) {
                    ec.points.push(ec.square[i]);
                }


                ec.flow.push(rendX);
                ec.flow.push(0);
                ec.flow.push(rendZ);

            }
            else {
                //first triangle
                ec.points.push(-1 * zdh + ec.flow[ec.flow.length - 3]);
                ec.points.push(0);
                ec.points.push(xdh + ec.flow[ec.flow.length - 1]);

                ec.points.push(zdh + rendX);
                ec.points.push(0);
                ec.points.push(-1 * xdh + rendZ);

                ec.points.push(zdh + ec.flow[ec.flow.length - 3]);
                ec.points.push(0);
                ec.points.push(-1 * xdh + ec.flow[ec.flow.length - 1]);

                //second triangle
                ec.points.push(-1 * zdh + ec.flow[ec.flow.length - 3]);
                ec.points.push(0);
                ec.points.push(xdh + ec.flow[ec.flow.length - 1]);

                ec.points.push(-1 * zdh + rendX);
                ec.points.push(0);
                ec.points.push(xdh + rendZ);

                ec.points.push(zdh + rendX);
                ec.points.push(0);
                ec.points.push(-1 * xdh + rendZ);


                ec.flow.push(rendX);
                ec.flow.push(0);
                ec.flow.push(rendZ);


            }

            ec.texturecoordinates.push(1);
            ec.texturecoordinates.push(0);

            ec.texturecoordinates.push(0);
            ec.texturecoordinates.push(1);

            ec.texturecoordinates.push(0);
            ec.texturecoordinates.push(0);


            ec.texturecoordinates.push(1);
            ec.texturecoordinates.push(0);

            ec.texturecoordinates.push(1);
            ec.texturecoordinates.push(1);

            ec.texturecoordinates.push(0);
            ec.texturecoordinates.push(1);


        }


    }

    let update = function (deltatime) {


        let timeNow = new Date().getTime();


        let elapsed = timeNow - lastTime;
        elapsedTotal += elapsed;

        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];


            if (le.components.ExhaustComponent) {

                updateTail(le.components.ExhaustComponent, le.components.Renderable);

            }

            if (le.components.MultiExhaustComponent) {
                for (let i = 0; i < le.components.MultiExhaustComponent.exhaustComponents.length; i++) {
                    this.updateTail(le.components.MultiExhaustComponent.exhaustComponents[i], le.components.Renderable);
                }
            }

        }


    }


    let drawTail = function (exhaustComponent) {
        let ec = exhaustComponent;
        //for (let i = 0; i < this.exhaustAmount; i++) {

        if (ec.points.length > 8) {
            sm.setProgram(exhaustProgram);

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            gl.disable(gl.DEPTH_TEST);

            gl.activeTexture(gl.TEXTURE0);

            gl.bindTexture(gl.TEXTURE_2D, ec.sprite);

            gl.uniform1i(exhaustProgram.samplerUniform, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
            gl.vertexAttribPointer(exhaustProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ec.texturecoordinates), gl.STATIC_DRAW);


            camera.mvPushMatrix();

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ec.points), gl.STATIC_DRAW);

            gl.vertexAttribPointer(exhaustProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

            gl.uniformMatrix4fv(exhaustProgram.uPMatrix, false, camera.pMatrix);
            gl.uniformMatrix4fv(exhaustProgram.uMVMatrix, false, camera.mvMatrix);
            //gl.drawArrays(gl.LINE_STRIP, 0, ec.points.length/3);
            gl.drawArrays(gl.TRIANGLES, 0, ec.points.length / 3);
            camera.drawCalls++;

            camera.mvPopMatrix();

            gl.enable(gl.DEPTH_TEST);
            gl.disable(gl.BLEND);

        }
    }

    let draw = function () {


        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if ((le.components.ExhaustComponent || le.components.MultiExhaustComponent) && le.components.HealthComponent.amount > 0) {


                if (le.components.ExhaustComponent) {
                    drawTail(le.components.ExhaustComponent);
                }
                if (le.components.MultiExhaustComponent) {

                    for (let i = 0; i < le.components.MultiExhaustComponent.exhaustComponents.length; i++)
                        drawTail(le.components.MultiExhaustComponent.exhaustComponents[i]);

                }


            }


        }

    }

    return {}


    //}


}