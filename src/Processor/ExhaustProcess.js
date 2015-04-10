class ExhaustProcess extends Processor {
    constructor() {
        this.exhaustAmount = 200;
        this.exhaustInterval = 50;
        this.exhaustTrail = [];
        //this.bulletShot = 0;
        this.lastTime = 0;
        //this.particleProgram = sm.init('particle');
        this.exhaustProgram = sm.init('exhaust');
        //this.bulletMesh = new Mesh('bigbullet');
        this.elapsedTotal = 0;


        //this.points.push(-50, 0, 0);
        //this.points.push(20, 0, 0);

        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);

        /*

         1,0,
         0,0,
         0,1,


         1,0,
         1,1,
         0,1,

         */


        this.texturecoordinates = [];



        this.texturePositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);

        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points), gl.STATIC_DRAW);




    }




    pushArray(arr, arr2) {
        arr.push.apply(arr, arr2);
    }

    update(deltatime) {








        //actionMapper.handleKeys();


        var timeNow = new Date().getTime();


        var elapsed = timeNow - this.lastTime;
        this.elapsedTotal += elapsed;

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.ExhaustComponent) {

                var ec = le.components.ExhaustComponent;
                var rendX = le.components.Renderable.xPos;
                var rendZ = le.components.Renderable.zPos;

                //drop from the end of array


                //var posX =  Math.cos(helpers.degToRad(le.components.Renderable.xPos.angleY));
                //var posZ =  Math.sin(helpers.degToRad(le.components.Renderable.zPos.angleY));


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


                //console.log(this.points[this.points.length-2]);
                //console.log(this.points[this.points.length-1]);

                //when to create new
                if (distance > 30) {


                    if (ec.flow.length > 3) {

                        //var lastX = this.flow[this.points.length-3];
                        //var lastZ = this.flow[this.points.length-1];

                        //quarter of a turn. That means if blue = (x, y), red = (-y, x)


                        var tp = [];


                        //first triangle

                        tp.push(ec.points[ec.points.length - 6]);
                        tp.push(0);
                        tp.push(ec.points[ec.points.length - 4]);

                        tp.push(zdh + rendX);
                        tp.push(0);
                        tp.push(-1 * xdh + rendZ);

                        tp.push(ec.points[ec.points.length - 3]);
                        tp.push(0);
                        tp.push(ec.points[ec.points.length - 1]);


                        //second triangle
                        tp.push(ec.points[ec.points.length - 6]);
                        tp.push(0);
                        tp.push(ec.points[ec.points.length - 4]);

                        tp.push(-1 * zdh + rendX);
                        tp.push(0);
                        tp.push(xdh + rendZ);

                        tp.push(zdh + rendX);
                        tp.push(0);
                        tp.push(-1 * xdh + rendZ);

                        //tp.push.apply(ec.points, tp);

                        ec.points.push.apply(ec.points, tp);




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


                        //console.log(ec.flow);
                        //console.log(ec.points);

                    }

                    this.texturecoordinates.push(1);
                    this.texturecoordinates.push(0);

                    this.texturecoordinates.push(0);
                    this.texturecoordinates.push(1);

                    this.texturecoordinates.push(0);
                    this.texturecoordinates.push(0);



                    this.texturecoordinates.push(1);
                    this.texturecoordinates.push(0);

                    this.texturecoordinates.push(1);
                    this.texturecoordinates.push(1);

                    this.texturecoordinates.push(0);
                    this.texturecoordinates.push(1);


                }


            }

        }


    }


    draw() {


        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.ExhaustComponent) {

                var ec = le.components.ExhaustComponent;
                //for (var i = 0; i < this.exhaustAmount; i++) {

                gl.useProgram(this.exhaustProgram);

                if (ec.points.length > 8) {


                    //var points = [];

                    //points.push(-50, 0, 0);
                    //points.push(20, 0, 0);

                    // var timeNow = new Date().getTime();


                    //if (this.lastTime != 0) {


                    //var elapsed = timeNow - this.lastTime;
                    //this.elapsedTotal += elapsed;

                    // points = this.railXY(-1500);


                    // gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

                    gl.activeTexture(gl.TEXTURE0);

                    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

                    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);


                    gl.bindTexture(gl.TEXTURE_2D, ec.sprite);






                    gl.uniform1i(this.exhaustProgram.samplerUniform, 0);

                    gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
                    gl.vertexAttribPointer(this.exhaustProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texturecoordinates), gl.STATIC_DRAW);
                    //console.log(this.points);

                    camera.mvPushMatrix();

                    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);

                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ec.points), gl.STATIC_DRAW);

                    gl.vertexAttribPointer(this.exhaustProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                    gl.uniformMatrix4fv(this.exhaustProgram.uPMatrix, false, camera.pMatrix);
                    gl.uniformMatrix4fv(this.exhaustProgram.uMVMatrix, false, camera.mvMatrix);
                    //gl.drawArrays(gl.LINE_STRIP, 0, ec.points.length/3);
                    gl.drawArrays(gl.TRIANGLES, 0, ec.points.length / 3);

                    camera.mvPopMatrix();


                }


            }


        }
    }

    //gl.enable(gl.DEPTH_TEST);
    //gl.disable(gl.BLEND);
    //}


}