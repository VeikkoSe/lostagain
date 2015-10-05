function loadstate_constructor(sb) {
    'use strict';

    //var {game,wantedState} = params;

    var sb = sb;
    var gl = sb.getGL();

    var elapsedTotal = 0;
    var lastTime = 0;
    var loadPercent = 0;
    var rotationSpeed = 0.5;
    var rotationAngle = 0;

    var camera = sb.getCamera();

    var shadermanager = sb.getShaderManager();
    var shaderprogram = shadermanager.useShader('simplest');
    //var wantedstate = '';

    var points = [];

    var vertexPositionBuffer = gl.createBuffer();
    //var am = asset_manager_constructor(sb);

    //var loadmanager = loadmanager_costructor(sb);

    //var loadmanager = game.loadmanager();

    var currentLevel = 0;
    var wantedstate = '';

    var init = function(ws) {

        wantedstate = ws;
        points.push(-0.2, 0, 0);
        points.push(0.2, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

        var mvMatrix = camera.getMVMatrix();
        elapsedTotal = 0;
        lastTime = 0;
        loadPercent = 0;
        // rotationSpeed = 50;
        rotationAngle = 0;

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

        //camera.setPerspective();

        //gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        //camera.setPerspective();

        //mat4.identity(mvMatrix);
        //mat4.translate(mvMatrix, [0, 0, -10]);

        sb.publish('loadassets', wantedstate);

        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    };

    var subscribe = function() {

    };

    var draw = function() {

        shadermanager.setProgram(shaderprogram);

        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //gl.clearColor(0, 0, 0, 1.0);
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //points.push(-0.5, 0, 0);
        //points.push(0.5, 0, 0);

        var mvMatrix = camera.getMVMatrix();

        camera.mvPushMatrix();

        mat4.rotate(mvMatrix, degToRad(rotationAngle), [0, 0, 1]);

        gl.uniformMatrix4fv(shaderprogram.uPMatrix, false, camera.getPMatrix());
        gl.uniformMatrix4fv(shaderprogram.uMVMatrix, false, mvMatrix);
        gl.uniform4f(shaderprogram.uColor, 1.0, 1.0, 0.0, 1.0);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(shaderprogram.aVertexPosition);
        gl.vertexAttribPointer(shaderprogram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.LINES, 0, 2);

        camera.mvPopMatrix();

    };
    var cleanup = function() {

    };

    var update = function() {

        var timeNow = new Date().getTime();

        if (lastTime != 0) {

            var elapsed = timeNow - lastTime;
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