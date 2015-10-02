function exhaustprocess_constructor(sb) {
    "use strict";

    //constructor() {
    //this.exhaustAmount = 200;
    //this.exhaustInterval = 50;
    //this.exhaustTrail = [];
    var shadermanager = sb.getShaderManager();
    var exhaustProgram = shadermanager.useShader("exhaust");
    var em = sb.getEntityManager();
    var lastTime = 0;
    //var exhaustProgram = sm.init('exhaust');
    var elapsedTotal = 0;
    var gl = sb.getGL();

    var vertexPositionBuffer = gl.createBuffer();

    var texturePositionBuffer = gl.createBuffer();

    var camera = sb.getCamera();

    var init = function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
    };


    //}


    var pushArray = function (arr, arr2) {
        arr.push.apply(arr, arr2);
    };


    var updateTail = function (exhaustComponent, renderableComponent) {


        var re = renderableComponent;
        var ec = exhaustComponent;


        var posX = re.xPos;
        var posZ = re.zPos;

        var unitX = Math.cos(degToRad(re.angleY));
        var unitZ = Math.sin(degToRad(re.angleY));

        var rendX = (posX - (unitX * ec.offSetSideFromCenter)) - ((-1 * unitZ) * ec.offSetFromCenter);
        var rendZ = (posZ + (unitZ * ec.offSetSideFromCenter)) + (unitX * ec.offSetFromCenter);

        var flow = ec.getFlow();
        var square = ec.getSquare();
        var points = ec.getPoints();
        var textureCoordinates = ec.getTexturecoordinates();

        //drop from the end of array
        if ((flow.length / 3) >= ec.length) {
            flow.shift();
            flow.shift();
            flow.shift();
            for (var i = 0; i < 18; i++)
                ec.getPoints().shift();

            for (var i = 0; i < 12; i++)
                ec.texturecoordinates.shift();

        }

        if (flow.length == 0) {

            flow.push(rendX);
            flow.push(0);
            flow.push(rendZ);

        }

        var xd = rendX - flow[flow.length - 3];
        var zd = rendZ - flow[flow.length - 1];
        var xdh = xd / 2;
        var zdh = zd / 2;
        var distance = Math.sqrt(xd * xd + zd * zd);


        //when to create new
        if (distance > ec.width) {


            if (flow.length > 3) {

                //quarter of a turn. That means if blue = (x, y), red = (-y, x)


                var i = 0;
                //first triangle
                square[i++] = points[points.length - 6];
                square[i++] = 0;
                square[i++] = points[points.length - 4];

                square[i++] = zdh + rendX;
                square[i++] = 0;
                square[i++] = -1 * xdh + rendZ;

                square[i++] = points[points.length - 3];
                square[i++] = 0;
                square[i++] = points[points.length - 1];


                //second triangle
                square[i++] = points[points.length - 6];
                square[i++] = 0;
                square[i++] = points[points.length - 4];

                square[i++] = -1 * zdh + rendX;
                square[i++] = 0;
                square[i++] = xdh + rendZ;

                square[i++] = zdh + rendX;
                square[i++] = 0;
                square[i++] = -1 * xdh + rendZ;

                for (var i = 0; i < 18; i++) {
                    points.push(square[i]);
                }


                flow.push(rendX);
                flow.push(0);
                flow.push(rendZ);

            }
            else {
                //first triangle
                points.push(-1 * zdh + flow[flow.length - 3]);
                points.push(0);
                points.push(xdh + flow[flow.length - 1]);

                points.push(zdh + rendX);
                points.push(0);
                points.push(-1 * xdh + rendZ);

                points.push(zdh + flow[flow.length - 3]);
                points.push(0);
                points.push(-1 * xdh + flow[flow.length - 1]);

                //second triangle
                points.push(-1 * zdh + flow[flow.length - 3]);
                points.push(0);
                points.push(xdh + flow[flow.length - 1]);

                points.push(-1 * zdh + rendX);
                points.push(0);
                points.push(xdh + rendZ);

                points.push(zdh + rendX);
                points.push(0);
                points.push(-1 * xdh + rendZ);


                flow.push(rendX);
                flow.push(0);
                flow.push(rendZ);


            }

            textureCoordinates.push(1);
            textureCoordinates.push(0);

            textureCoordinates.push(0);
            textureCoordinates.push(1);

            textureCoordinates.push(0);
            textureCoordinates.push(0);


            textureCoordinates.push(1);
            textureCoordinates.push(0);

            textureCoordinates.push(1);
            textureCoordinates.push(1);

            textureCoordinates.push(0);
            textureCoordinates.push(1);


        }


    };

    var update = function (deltatime) {


        var timeNow = new Date().getTime();


        var elapsed = timeNow - lastTime;
        elapsedTotal += elapsed;

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];


            if (le.components.ExhaustComponent) {

                updateTail(le.components.ExhaustComponent, le.components.RenderableComponent);

            }

            if (le.components.MultiExhaustComponent) {
                for (var i = 0; i < le.components.MultiExhaustComponent.exhaustComponents.length; i++) {
                    updateTail(le.components.MultiExhaustComponent.exhaustComponents[i], le.components.RenderableComponent);
                }
            }

        }


    };


    var drawTail = function (exhaustComponent) {
        var ec = exhaustComponent;
        //for (var i = 0; i < this.exhaustAmount; i++) {

        if (ec.getPoints().length > 8) {
            sm.setProgram(exhaustProgram);

            //gl.enable(gl.BLEND);
            //gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            //gl.disable(gl.DEPTH_TEST);

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

            gl.uniformMatrix4fv(exhaustProgram.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(exhaustProgram.uMVMatrix, false, camera.getMVMatrix());
            //gl.drawArrays(gl.LINE_STRIP, 0, ec.points.length/3);
            gl.drawArrays(gl.TRIANGLES, 0, ec.points.length / 3);
            camera.drawCalls++;

            camera.mvPopMatrix();

            //gl.enable(gl.DEPTH_TEST);
            //gl.disable(gl.BLEND);

        }
    };

    var draw = function () {


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if ((le.components.ExhaustComponent || le.components.MultiExhaustComponent) && le.components.HealthComponent.amount > 0) {


                if (le.components.ExhaustComponent) {
                    drawTail(le.components.ExhaustComponent);
                }
                if (le.components.MultiExhaustComponent) {

                    for (var i = 0; i < le.components.MultiExhaustComponent.exhaustComponents.length; i++)
                        drawTail(le.components.MultiExhaustComponent.exhaustComponents[i]);

                }


            }


        }

    };

    return {
        update, draw, init: function () {
        }
    };


    //}


}