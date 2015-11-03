function loader(pubsub, entityCreator, entityManager) {
    'use strict';
    var loadingLevelName, loading, loadTotal, maxLoad;
    var wantedstate;
    var elapsedTotal;
    var lastTime;
    var rotationAngle;
    var loadPercent = 0;
    var ec = entityCreator;
    var em = entityManager;

    var getLoadingLevelName = function() {
        return loadingLevelName;
    };

    var subscribe = function() {

    };

    var init = function(sandbox) {
        //sb = sandbox;

        loadingLevelName = '';
        loading = false;
        loadTotal = 0;
        maxLoad = 0;

        //camera = sb.getCamera();

        //em = sb.getEntityManager();
        //am = sb.getAssetManager();

        //t = texture_constructor(sb);
        //sprite_loader = sprite_constructor(sb);

        pubsub.subscribe('loadassets', function(name, wantedState) {

            loadAllAssets(wantedState);

        });

        pubsub.subscribe('allassetsloaded', function(name, dummy) {

            var level = getLoadingLevelName();
            pubsub.publish('movetoloadstate', level);
            //sb.publish("movetoloadstate", assetname);
        });

        // sb.subscribe('loadLevel'), function(name,level)
        //{
        //     loadAllAssets(level);
        //}

    };

    var loadAllAssets = function(name) {

        //nextState = false;

        //sb.publish("loadingstarted
        loadingLevelName = name;

        loading = true;
        //clear all entities (not data)
        em.clearAll();
        switch (name) {
            case ('introstate'):

                ec.createIntro();

                break;
            case ('gamestate'):

                ec.createText();

                ec.createStars();

                var target = ec.createFuel(true);
                var mothership = ec.createMotherShip(target);
                var ship = ec.createShip();

                if (true) {
                    for (var i = 0; i < 3; i++) {
                        ec.createDestroyer(mothership);
                    }
                    //ec.createSatellite(mothership);

                    for (var i = 0; i < 10; i++) {
                        ec.createMine(mothership);
                    }

                    for (var i = 0; i < 5; i++) {
                        ec.createMirrorEnemy(mothership);
                    }
                }

                //var radar = ec.createRadar();
                //var currency = ec.createCurrency();

                ec.createLayout(mothership, ship);

                break;
            case ('levelupstate'):

                ec.createBareMotherShip();
                ec.createStars();
                //ec.createMap();
                //camera.setDistance(100);

                //ef.createEnemy();

                break;

            case ('third'):

                // camera.setDistance(200);
                // createAsteroidField();
                // createStars();
                // createMotherShip();
                //createShip();

                break;

        }

        //maxLoad = loadTotal;
        //loading = false;
    };

    var update = function() {

        var timeNow = new Date().getTime();

        if (lastTime !== 0) {

            var elapsed = timeNow - lastTime;
            elapsedTotal += elapsed;

            rotationAngle += (rotationSpeed * (elapsed / 1000));
            if (rotationAngle >= 360) {
                rotationAngle = 0;
            }

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

    var draw = function() {

        shadermanager.setProgram(program);

        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //gl.clearColor(0, 0, 0, 1.0);
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //points.push(-0.5, 0, 0);
        //points.push(0.5, 0, 0);

        var mvMatrix = camera.getMVMatrix();

        //camera.mvPushMatrix();

        mat4.rotate(mvMatrix, degToRad(rotationAngle), [0, 0, 1]);

        gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());
        gl.uniformMatrix4fv(program.uMVMatrix, false, mvMatrix);
        gl.uniform4f(program.uColor, 1.0, 1.0, 0.0, 1.0);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(program.aVertexPosition);
        gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.LINES, 0, 2);

        //camera.mvPopMatrix();

    };

    var loadinit = function(ws) {

        wantedstate = ws;
        points.push(-0.2, 0, 0);
        points.push(0.2, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

        //var mvMatrix = camera.getMVMatrix();
        elapsedTotal = 0;
        lastTime = 0;
        loadPercent = 0;
        // rotationSpeed = 50;
        rotationAngle = 0;

        gl.viewport(0, 0, sb.getResolutionWidth(), sb.getResolutionHeight());

        //camera.setPerspective();

        //gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        //camera.setPerspective();

        //mat4.identity(mvMatrix);
        //mat4.translate(mvMatrix, [0, 0, -10]);

        //sb.publish('loadassets', wantedstate);

        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    };

    return Object.freeze({

        loadAllAssets,
        init,
        subscribe,

        update,
        draw,
        loadinit,
        getLoading: function() {
            return loading;
        }

    });

}