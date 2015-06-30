function loadstate_constructor(sb) {
    //let {game,wantedState} = params;

    let gl = sb.getGL();

    let elapsedTotal = 0;
    let lastTime = 0;
    let loadPercent = 0;
    let rotationSpeed = 0.5;
    let rotationAngle = 0;

    let camera = sb.getCamera();

    let shadermanager = sb.getShaderManager();
    let shaderprogram = shadermanager.init("simplest");
    let wantedstate = '';


    let points = [];

    let vertexPositionBuffer = gl.createBuffer();
    let am = asset_manager_constructor(sb);


    //let loadmanager = loadmanager_costructor(sb);


    //let loadmanager = game.loadmanager();

    let currentLevel = 0;
    let wantedstate = '';

    let init = function (ws) {


        //console.log(ws);
        //we init callback listeners
        am.init();
        wantedstate = ws;
        points.push(-0.2, 0, 0);
        points.push(0.2, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);


        elapsedTotal = 0;
        lastTime = 0;
        loadPercent = 0;
        // rotationSpeed = 50;
        rotationAngle = 0;

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


        camera.setPerspective();

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        camera.setPerspective();

        mat4.identity(camera.getMVMatrix());
        mat4.translate(camera.getMVMatrix(), [0, 0, -10]);


        sb.publish("loadassets", wantedstate);


    }


    let subscribe = function () {

    }


    let draw = function () {


        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        shadermanager.setProgram(shaderprogram);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //gl.clearColor(0, 0, 0, 1.0);
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        //points.push(-0.5, 0, 0);
        //points.push(0.5, 0, 0);


        //camera.mvPushMatrix();


        mat4.rotate(camera.getMVMatrix(), degToRad(rotationAngle), [0, 0, 1]);


        gl.uniformMatrix4fv(shaderprogram.uPMatrix, false, camera.getPMatrix());
        gl.uniformMatrix4fv(shaderprogram.uMVMatrix, false, camera.getMVMatrix());
        gl.uniform4f(shaderprogram.uColor, 1.0, 1.0, 0.0, 1.0);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(shaderprogram.aVertexPosition);
        gl.vertexAttribPointer(shaderprogram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


        gl.drawArrays(gl.LINES, 0, 2);

        //camera.mvPopMatrix();


    };
    let cleanup = function () {

    }

    let update = function () {


        let timeNow = new Date().getTime();


        if (lastTime != 0) {

            let elapsed = timeNow - lastTime;
            elapsedTotal += elapsed;

            rotationAngle += (rotationSpeed * (elapsed / 1000));
            if (rotationAngle >= 360)
                rotationAngle = 0;

            //if (elapsedTotal >= 200) {
            /*
             if (loadmanager.loadTotal == 0) {
             alert('b');
             game.event.publish("loadstate", wantedstate);
             //game.stateengine.changeState('gamestate');
             }
             else {
             */
            //loadPercent = 0.1;//100 - ( loadmanager.loadTotal / loadmanager.maxLoad * 100);
            // rotationSpeed += loadPercent;
            //}
            elapsedTotal -= 200;

            //}
        }
        lastTime = timeNow;


    };


    return {
        init,
        draw,
        update,
        cleanup,
        subscribe
    };


}