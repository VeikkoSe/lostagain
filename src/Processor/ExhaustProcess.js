class ExhaustProcess extends Processor {
    constructor() {
        this.exhaustAmount = 200;
        this.exhaustInterval = 50;
        this.exhaustTrail = [];
        //this.bulletShot = 0;
        this.lastTime = 0;
        //this.particleProgram = sm.init('particle');
        this.simplestProgram = sm.init('simplest');
        //this.bulletMesh = new Mesh('bigbullet');
        this.elapsedTotal = 0;




        //this.points.push(-50, 0, 0);
        //this.points.push(20, 0, 0);

        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points), gl.STATIC_DRAW);


/*
        var exhaust;
        for (var i = 0; i < this.exhaustAmount; i++) {
            var exhaust = new PhotonTorpedo();
            exhaust.visible = 1;
            //bullet.bulletModel = this.bulletMesh;
            this.exhaustTrail.push(exhaust);
        }
       */
    }
/*
    shootBullet(renderable) {
        var timeNow = new Date().getTime();

        if (timeNow - this.bulletReloadSpeed > this.bulletShot) {


            for (var i = 0; i < this.bulletsAmount; i++) {

                if (this.bullets[i].visible == 0) {

                    this.bulletShot = timeNow;
                    this.bullets[i].visible = 1;
                    this.bullets[i].birthTime = timeNow;
                    this.bullets[i].angle = renderable.angleY;
                    this.bullets[i].xPos = renderable.xPos;
                    this.bullets[i].zPos = renderable.zPos;
                    break;
                }
            }
        }
    }
*/

    dropPoints(ec) {
        if(ec.points.length>180) {
            ec.points.shift();
            ec.points.shift();
            ec.points.shift();

            ec.points.shift();
            ec.points.shift();
            ec.points.shift();

            ec.points.shift();
            ec.points.shift();
            ec.points.shift();
        }
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

                //drop from the end of array
                this.dropPoints(ec);




                //var posX =  Math.cos(helpers.degToRad(le.components.Renderable.xPos.angleY));
                //var posZ =  Math.sin(helpers.degToRad(le.components.Renderable.zPos.angleY));


                if(ec.flow.length==0)
                {

                    ec.flow.push(le.components.Renderable.xPos);
                    ec.flow.push(0);
                    ec.flow.push(le.components.Renderable.zPos);
                }

                var xd = le.components.Renderable.xPos-ec.flow[ec.flow.length-3];
                var zd = le.components.Renderable.zPos-ec.flow[ec.flow.length-1];
                var xdh = xd/2;
                var zdh = zd/2;
                var distance = Math.sqrt(xd*xd + zd*zd);


                    //console.log(this.points[this.points.length-2]);
                    //console.log(this.points[this.points.length-1]);


                    if(distance>30) {


                        if(ec.flow.length>3) {

                        //var lastX = this.flow[this.points.length-3];
                        //var lastZ = this.flow[this.points.length-1];

                        //quarter of a turn. That means if blue = (x, y), red = (-y, x)


                        var tp = [];


                        //first triangle
                        tp.push(ec.points[ec.points.length-6]);
                        tp.push(0);
                        tp.push(ec.points[ec.points.length-4]);

                        tp.push(ec.points[ec.points.length-3]);
                        tp.push(0);
                        tp.push(ec.points[ec.points.length-1]);


                        tp.push(zdh + le.components.Renderable.xPos);
                        tp.push(0);
                        tp.push(-1 *  xdh+le.components.Renderable.zPos);
                            //console.log(tp.points);


                            //console.log(ec.points);



                        //second triangle
                            tp.push(ec.points[ec.points.length-6]);
                            tp.push(0);
                            tp.push(ec.points[ec.points.length-4]);

                            tp.push(-1 * zdh +le.components.Renderable.xPos);
                            tp.push(0);
                            tp.push(xdh+le.components.Renderable.zPos);

                            tp.push(zdh +le.components.Renderable.xPos);
                            tp.push(0);
                            tp.push(-1 * xdh+le.components.Renderable.zPos);

                            tp.push.apply(ec.points,tp);

                            ec.points.push.apply(ec.points,tp);

                            ec.flow.push(le.components.Renderable.xPos);
                            ec.flow.push(0);
                            ec.flow.push(le.components.Renderable.zPos);





                    }
                    else {
                            //first triangle
                            ec.points.push(-1 * zdh + ec.flow[ec.flow.length-3]);
                            ec.points.push(0);
                            ec.points.push(xdh+ ec.flow[ec.flow.length-1]);

                            ec.points.push(zdh + ec.flow[ec.flow.length-3]);
                            ec.points.push(0);
                            ec.points.push(-1 * xdh+ec.flow[ec.flow.length-1]);


                            ec.points.push(zdh + le.components.Renderable.xPos);
                            ec.points.push(0);
                            ec.points.push(-1 *  xdh+le.components.Renderable.zPos);



                            //second triangle
                            ec.points.push(-1 * zdh + ec.flow[ec.flow.length-3]);
                            ec.points.push(0);
                            ec.points.push(xdh+ ec.flow[ec.flow.length-1]);

                            ec.points.push(-1 * zdh +le.components.Renderable.xPos);
                            ec.points.push(0);
                            ec.points.push(xdh+le.components.Renderable.zPos);

                            ec.points.push(zdh +le.components.Renderable.xPos);
                            ec.points.push(0);
                            ec.points.push(-1 * xdh+le.components.Renderable.zPos);



                            ec.flow.push(le.components.Renderable.xPos);
                            ec.flow.push(0);
                            ec.flow.push(le.components.Renderable.zPos);
                            //console.log(ec.flow);
                            console.log(ec.points);

                        }
                }




            }

        }
            //if (timeNow - this.exhaustInterval > this.exhaust) {
/*
            if (this.elapsedTotal >= 500) {


                for (var i = 0; i < this.exhaustAmount; i++) {

                    if (this.exhaustTrail[i].visible == 0) {

                        this.bulletShot = timeNow;
                        this.exhaustTrail[i].visible = 1;
                        this.exhaustTrail[i].birthTime = timeNow;
                        this.exhaustTrail[i].angle = le.components.Renderable.angleY;
                        this.exhaustTrail[i].xPos = le.components.Renderable.xPos;
                        this.exhaustTrail[i].zPos = le.components.Renderable.zPos;
                        break;
                    }
                }


                this.elapsedTotal -= 500;

            }



        }

*/


           // if (le.components.GunComponent && le.components.GunComponent.shooting && le.components.GunComponent.activeWeapon == 1) {
            //    this.shootBullet(le.components.Renderable);
           // }
/*
        for (var i = 0; i < this.exhaustAmount; i++) {

            if (timeNow - this.exhaustTrail[i].deathtime > this.exhaustTrail[i].birthTime) {
                this.exhaustTrail[i].visible = 0;
            }
            else {
                var posX = this.exhaustTrail[i].speed * ( deltatime / 1000.0 ) * Math.cos(helpers.degToRad(this.exhaustTrail[i].angle));
                var posZ = this.exhaustTrail[i].speed * ( deltatime / 1000.0 ) * Math.sin(helpers.degToRad(this.exhaustTrail[i].angle));

                //this.exhaustTrail[i].xPos += posX;
                //this.exhaustTrail[i].zPos -= posZ;
            }

        }
        */

    }


    draw() {





        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.ExhaustComponent) {

                var ec=  le.components.ExhaustComponent;
                //for (var i = 0; i < this.exhaustAmount; i++) {

                gl.useProgram(this.simplestProgram);

                if(ec.points.length>8) {


                //var points = [];

                //points.push(-50, 0, 0);
                //points.push(20, 0, 0);

                // var timeNow = new Date().getTime();


                //if (this.lastTime != 0) {


                //var elapsed = timeNow - this.lastTime;
                //this.elapsedTotal += elapsed;

               // points = this.railXY(-1500);





                    // gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
                    /*
                     gl.bindTexture(gl.TEXTURE_2D, this.texture);
                     gl.generateMipmap(gl.TEXTURE_2D);
                     gl.bindTexture(gl.TEXTURE_2D, null);
                     */


                    //console.log(this.points);

                    camera.mvPushMatrix();

                    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);

                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ec.points), gl.STATIC_DRAW);

                    gl.vertexAttribPointer(this.simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                    gl.uniformMatrix4fv(this.simplestProgram.uPMatrix, false, camera.pMatrix);
                    gl.uniformMatrix4fv(this.simplestProgram.uMVMatrix, false, camera.mvMatrix);
                    //gl.drawArrays(gl.LINE_STRIP, 0, ec.points.length/3);
                    gl.drawArrays(gl.TRIANGLES, 0, ec.points.length/3);

                    camera.mvPopMatrix();




                }





















                   // alert('d');
                  //  if (this.bullets[i].visible != 1) {
                    //    continue;
                    //}

//                    console.log(this.bullets[i]);

                    /*
                    var bc = le.components.ExhaustComponent;
                    gl.uniform1f(this.particleProgram3d.pointSize, 12.0);
                    camera.mvPushMatrix();
                    //mat4.scale(camera.mvMatrix, [6, 6, 6]);
                    //console.log(this.bullets[i].xPos);
                    ///console.log(this.bullets[i].zPos);

                    //mat4.multiplyVec3(camera.mvMatrix, [this.]);

                    gl.uniform3f(this.particleProgram3d.positionUniform, this.exhaustTrail[i].xPos, 0, this.exhaustTrail[i].zPos);
                    gl.bindBuffer(gl.ARRAY_BUFFER, bc.sprite.pointStartPositionsBuffer);
                    gl.vertexAttribPointer(this.particleProgram3d.pointStartPositionAttribute, bc.sprite.pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);


                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D, bc.sprite.texture);
                    gl.uniform1i(this.particleProgram3d.samplerUniform, 0);

                    gl.uniform4f(this.particleProgram3d.colorUniform, 1, 1, 1, 1);


                    gl.uniformMatrix4fv(this.particleProgram3d.uPMatrix, false, camera.pMatrix);
                    gl.uniformMatrix4fv(this.particleProgram3d.uMVMatrix, false, camera.mvMatrix);


                    //gl.drawArrays(gl.POINTS, 0, 1);
                    gl.drawArrays(gl.LINES, 0, 2);


                    camera.mvPopMatrix(); */
                }


            }
        }
        //gl.enable(gl.DEPTH_TEST);
        //gl.disable(gl.BLEND);
    //}


}