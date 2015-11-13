function gameState(sb, pubsub, processList, processListNoPause) {
    'use strict';

    var elapsedTotal = 0;
    var gl = sb.getGL();
    var camera = sb.getCamera();

    var frameCount = 0;
    var lastTime = 0;

    var material = sb.getMaterial();
    var program = material.useShader('screenquad');

    //var processList = [];
    //var processListNoPause = [];
    var pause = false;
    var startTime = null;
    var em = sb.getEntityManager();

    //var fb = null;
    var running = true;

    var frameBuffer;

    //var lastUsedHeap = 0;  // remember the heap size

    var ep, cp, pp;
    var screenQuadVBO;
    var rttTexture;

    var subscribe = function() {

    };

    var init = function() {



        //frameBuffer = gl.createFramebuffer();

        //pubsub.subscribe('movetoloadstate', function(name, wantedstate) {
        //   moveToLoadedStage(wantedstate);
        //});

        pubsub.subscribe('gameover', function() {
            running = false;
        });

        pubsub.subscribe('pause', function() {
            pause = !pause;
        });

        //processList = [];
        //fb = gl.createFramebuffer();

        //processList.push(processes);

        for (var i = 0; i < processListNoPause.length; i++) {
            processListNoPause[i].init();
        }

        for (var d = 0; d < processList.length; d++) {
            processList[d].init();
        }

        gl.viewport(0, 0, 512, 512);

        camera.setPerspective();

        startTime = new Date().getTime();

        sb.getAudio().startMusic(1, 0, true);
        sb.getAudio().playSound(8, 0, true);

        //setTimeout(checkMemory, 100); // test 10 times per second
        initTextureFramebuffer();

        var verts = [
            // First triangle:
            1.0, 1.0,
            -1.0, 1.0,
            -1.0, -1.0,
            // Second triangle:
            -1.0, -1.0,
            1.0, -1.0,
            1.0, 1.0
        ];
        screenQuadVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, screenQuadVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

    };

    var initTextureFramebuffer = function() {

        frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

        rttTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, rttTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        //gl.generateMipmap(gl.TEXTURE_2D);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 512, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        var renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 512, 512);

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rttTexture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

    // --- enter your code here ---
    //new Object();
    // --- end of your code ---

    //var diff = window.performance.memory.usedJSHeapSize - before;

    var checkMemory = function() {

        //if (window.performance.memory.usedJSHeapSize < lastUsedHeap)
        //console.log('Garbage collected!');
        //lastUsedHeap = window.performance.memory.usedJSHeapSize;
    };

    var update = function() {

        checkMemory();
        // console.time('Update');

        var timeNow = new Date().getTime();

        frameCount++;

        if (lastTime !== 0) {

            var totalElapsed = timeNow - startTime;
            var elapsed = timeNow - lastTime;
            elapsedTotal += elapsed;
            var plnopause = processListNoPause.length;
            //console.log(plnopause);
            for (var i = 0; i < plnopause; i++) {
                processListNoPause[i].update(elapsed, totalElapsed);
            }

            if (running && !pause) {

                //skip lost frames
                if (elapsed < 300) {
                    for (var d = 0; d < processList.length; d++) {
                        processList[d].update(elapsed, totalElapsed);
                    }
                }
                if (elapsedTotal % 100 === 0) {
                    checkMemory();
                }

                if (elapsedTotal >= 1000) {

                    var fps = frameCount;

                    frameCount = 0;
                    elapsedTotal -= 1000;

                    document.getElementById('fps').innerHTML = fps.toString();

                }
            }
        }
        lastTime = timeNow;
        //console.timeEnd('Update');
    };

    var draw = function() {

        var pMatrix = camera.getPMatrix();
        //console.time('Drawing');

        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        gl.viewport(0, 0, 512, 512);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mat4.perspective(60, 512 / 512, 0.1, 2000.0, pMatrix);
        gl.enable(gl.DEPTH_TEST);

        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        //gl.disable(gl.BLEND);

        gl.clearColor(0, 0, 1, 1); // red
        gl.clear(gl.COLOR_BUFFER_BIT);
        //gl.enable(gl.DEPTH_TEST);
        //gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);

        //gl.disable(gl.BLEND);

        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        // camera.resetDrawCalls();

        for (var i = 0; i < processListNoPause.length; i++) {
            processListNoPause[i].draw();
        }

        var pl = processList.length;
        var el = em.entities.length;
        for (var e = 0; e < el; e++) {
            for (var d = 0; d < pl; d++) {

                var le = em.entities[e];
                processList[d].draw(le);
            }
        }

        gl.bindTexture(gl.TEXTURE_2D, rttTexture);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);

        //console.log(rttTexture);
        material.setProgram(program);

        //WE RENDER THE CAPTURED TEXTURE

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        gl.viewport(0, 0, 512, 512);

        // gl.clearColor(0, 1, 0, 1); // red
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mat4.perspective(60, 512 / 512, 0.1, 2000.0, pMatrix);

        gl.activeTexture(gl.TEXTURE0);
        //  console.log(rttTexture);
        gl.uniform1i(program.samplerUniform, 0);
        gl.bindTexture(gl.TEXTURE_2D, rttTexture);

        gl.bindBuffer(gl.ARRAY_BUFFER, screenQuadVBO);
        gl.enableVertexAttribArray(program.vertexPositionNDC);
        gl.vertexAttribPointer(program.vertexPositionNDC, 2, gl.FLOAT, false, 0, 0);

        // Draw 6 vertexes => 2 triangles:
        gl.drawArrays(gl.TRIANGLES, 0, 6);

    };

    var cleanup = function() {

    };

    return Object.freeze({
        init,
        subscribe,
        draw,
        update,
        cleanup
    });

}