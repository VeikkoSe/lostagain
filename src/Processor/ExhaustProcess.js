class ExhaustProcess extends Processor {
    constructor() {
        //this.exhaustAmount = 200;
        //this.exhaustInterval = 50;
        //this.exhaustTrail = [];

        this.lastTime = 0;
        this.exhaustProgram = sm.init('exhaust');
        this.elapsedTotal = 0;

        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);


        this.texturePositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);

    }


    pushArray(arr, arr2) {
        arr.push.apply(arr, arr2);
    }


    updateTail(exhaustComponent, renderableComponent) {


        var re = renderableComponent;
        var ec = exhaustComponent;


        var posX = re.xPos;
        var posZ = re.zPos;

        var unitX = Math.cos(helpers.degToRad(re.angleY));
        var unitZ = Math.sin(helpers.degToRad(re.angleY));

        var rendX = (posX - (unitX * ec.offSetSideFromCenter)) - ((-1 * unitZ) * ec.offSetFromCenter);
        var rendZ = (posZ + (unitZ * ec.offSetSideFromCenter)) + (unitX * ec.offSetFromCenter);


        //drop from the end of array
        if ((ec.flow.length / 3) >= ec.length) {
            ec.flow.shift();
            ec.flow.shift();
            ec.flow.shift();
            for (var i = 0; i < 18; i++)
                ec.points.shift();

            for (var i = 0; i < 12; i++)
                ec.texturecoordinates.shift();

        }

        if (ec.flow.length == 0) {

            ec.flow.push(rendX);
            ec.flow.push(0);
            ec.flow.push(rendZ);

        }

        var xd = rendX - ec.flow[ec.flow.length - 3];
        var zd = rendZ - ec.flow[ec.flow.length - 1];
        var xdh = xd / 2;
        var zdh = zd / 2;
        var distance = Math.sqrt(xd * xd + zd * zd);


        //when to create new
        if (distance > ec.width) {


            if (ec.flow.length > 3) {

                //quarter of a turn. That means if blue = (x, y), red = (-y, x)


                var i = 0;
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

                for (var i = 0; i < 18; i++) {
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

    update(deltatime) {


        var timeNow = new Date().getTime();


        var elapsed = timeNow - this.lastTime;
        this.elapsedTotal += elapsed;

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];


            if (le.components.ExhaustComponent) {

                this.updateTail(le.components.ExhaustComponent, le.components.Renderable);

            }

            if (le.components.MultiExhaustComponent) {
                for (var i = 0; i < le.components.MultiExhaustComponent.exhaustComponents.length; i++) {
                    this.updateTail(le.components.MultiExhaustComponent.exhaustComponents[i], le.components.Renderable);
                }
            }

        }


    }


    drawTail(exhaustComponent) {
        var ec = exhaustComponent;
        //for (var i = 0; i < this.exhaustAmount; i++) {

        if (ec.points.length > 8) {
            sm.setProgram(this.exhaustProgram);

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            gl.disable(gl.DEPTH_TEST);

            gl.activeTexture(gl.TEXTURE0);

            gl.bindTexture(gl.TEXTURE_2D, ec.sprite);

            gl.uniform1i(this.exhaustProgram.samplerUniform, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
            gl.vertexAttribPointer(this.exhaustProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ec.texturecoordinates), gl.STATIC_DRAW);


            camera.mvPushMatrix();

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ec.points), gl.STATIC_DRAW);

            gl.vertexAttribPointer(this.exhaustProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

            gl.uniformMatrix4fv(this.exhaustProgram.uPMatrix, false, camera.pMatrix);
            gl.uniformMatrix4fv(this.exhaustProgram.uMVMatrix, false, camera.mvMatrix);
            //gl.drawArrays(gl.LINE_STRIP, 0, ec.points.length/3);
            gl.drawArrays(gl.TRIANGLES, 0, ec.points.length / 3);
            camera.drawCalls++;

            camera.mvPopMatrix();

            gl.enable(gl.DEPTH_TEST);
            gl.disable(gl.BLEND);

        }
    }

    draw() {


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if ((le.components.ExhaustComponent || le.components.MultiExhaustComponent) && le.components.HealthComponent.amount > 0) {


                if (le.components.ExhaustComponent) {
                    this.drawTail(le.components.ExhaustComponent);
                }
                if (le.components.MultiExhaustComponent) {

                    for (var i = 0; i < le.components.MultiExhaustComponent.exhaustComponents.length; i++)
                        this.drawTail(le.components.MultiExhaustComponent.exhaustComponents[i]);

                }


            }


        }

    }


    //}


}