function shaderManager(gl) {
    'use strict';

    var sb, allShaders, currentProgram;

    var init = function(sandbox) {
        //sb = sandbox;
        allShaders = [];
        currentProgram = null;

    };

    var setProgram = function(program) {

        if (currentProgram !== program.name) {
            gl.useProgram(program);
            currentProgram = program.name;
        }
        return true;
    };

    var possibleShaders = function(name) {
        var shaders = {
            'test': initTestShaders,
            'particle': initParticleShaders,
            'maps': initMapShaders,
            'simplest': initSimplestShaders,
            'blurvertical': initBlurShaders,
            'blurhorizontal': initBlurShaders,
            'per-fragment-lighting': initShaders,
            'ambient': initAmbientShaders,
            'font': initFontShaders,
            'font2d': initFontShaders2d,
            'star': initStarShaders,
            'particle3d': initParticleShaders3d,
            'trail': initTrailShaders,
            'gui': initGuiShader,
            'lifetimeparticle': initLifeTimeParticleShaders

        };
        return shaders[name];
    };

    var useShader = function(name) {
        if (allShaders[name]) {
            return allShaders[name];
        }

        allShaders[name] = possibleShaders(name)();
        return allShaders[name];

    };

    var createP = function(id) {
        var program = gl.createProgram();
        gl.createProgram();
        //makes ajax call, needs to be linked on
        // loading, now it's just "fast enough"
        getShader(id, program);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert('Could not initialise shaders');
        }

        program.name = id;

        return program;

    };

    var initTestShaders = function() {

        var program = createP('test');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(program.aVertexPosition);

        return program;

    };

    var initTrailShaders = function() {

        var program = createP('trail');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, 'aTextureCoord');
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
        program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');

        program.samplerUniform = gl.getUniformLocation(program, 'uSampler');

        return program;

    };

    var initMapShaders = function() {

        var program = createP('maps');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');
        gl.enableVertexAttribArray(program.aTextureCoord);

        program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
        program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');

        program.samplerUniform = gl.getUniformLocation(program, 'uSampler');

        return program;

    };

    var initSimplestShaders = function() {

        var program = createP('simplest');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
        program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');
        program.uColor = gl.getUniformLocation(program, 'uColor');

        return program;

    };

    var initBlurShaders = function() {

        var program = createP('blurhorizontal');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, 'aTextureCoord');
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.uResolution = gl.getUniformLocation(program, 'uResolution');

        if (id == 'blurhorizontal') {
            program.samplerUniform2 = gl.getUniformLocation(program, 'uSampler2');
        }
        program.samplerUniform = gl.getUniformLocation(program, 'uSampler');

        return program;

    };

    var initAmbientShaders = function() {

        var program = createP('ambient');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.aWorldCoordinates = gl.getAttribLocation(program, 'aWorldCoordinates');
        gl.enableVertexAttribArray(program.aWorldCoordinates);

        program.aCubeNumber = gl.getAttribLocation(program, 'aCubeNumber');
        gl.enableVertexAttribArray(program.aCubeNumber);

        program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
        program.uElapsed = gl.getUniformLocation(program, 'uElapsed');
        program.uVisibility = gl.getUniformLocation(program, 'uVisibility');
        program.uCameraPos = gl.getUniformLocation(program, 'uCameraPos');

        return program;

    };

    var initParticleShaders3d = function() {

        var program = createP('particle3d');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        program.pointWeights = gl.getAttribLocation(program, 'aWeight');
        //program.positionUniform = gl.getUniformLocation(program, "uPosition");
        program.samplerUniform = gl.getUniformLocation(program, 'sTexture');
        program.colorUniform = gl.getUniformLocation(program, 'uColor');
        program.pointSize = gl.getUniformLocation(program, 'uPointsize');
        program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
        program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');

        return program;

    };

    var initGuiShader = function() {

        var program = createP('gui');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, 'aTextureCoord');
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.samplerUniform = gl.getUniformLocation(program, 'uSampler');

        return program;

    };

    var initStarShaders = function() {

        var program = createP('star');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.aPointSize = gl.getAttribLocation(program, 'aPointSize');
        gl.enableVertexAttribArray(program.aPointSize);

        program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
        program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');

        return program;

    };

    var initShaders = function() {

        var program = createP('per-fragment-lighting');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, 'aTextureCoord');
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.aVertexNormal = gl.getAttribLocation(program, 'aVertexNormal');
        gl.enableVertexAttribArray(program.aVertexNormal);

        program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
        program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');
        program.uNMatrix = gl.getUniformLocation(program, 'uNMatrix');
        program.samplerUniform = gl.getUniformLocation(program, 'uSampler');

        program.uMaterialShininess = gl.getUniformLocation(program, 'uMaterialShininess');
        program.uAmbient = gl.getUniformLocation(program, 'uAmbient');

        program.uLightPosition = gl.getUniformLocation(program, 'uLightPosition');
        program.uLightAmbient = gl.getUniformLocation(program, 'uLightAmbient');
        program.uLightDiffuse = gl.getUniformLocation(program, 'uLightDiffuse');
        program.uLightSpecular = gl.getUniformLocation(program, 'uLightSpecular');

        program.uMaterialDiffuse = gl.getUniformLocation(program, 'uMaterialDiffuse');

        program.alphaUniform = gl.getUniformLocation(program, 'uAlpha');
        program.uUseLighting = gl.getUniformLocation(program, 'uUseLighting');
        program.uDrawColors = gl.getUniformLocation(program, 'uDrawColors');
        program.uDrawColor = gl.getUniformLocation(program, 'uDrawColor');

        return program;

    };

    var initParticleShaders = function() {

        var program = createP('particle');

        program.pointStartPositionAttribute = gl.getAttribLocation(program, 'aStartPosition');
        gl.enableVertexAttribArray(program.pointStartPositionAttribute);

        program.positionUniform = gl.getUniformLocation(program, 'uPosition');
        program.samplerUniform = gl.getUniformLocation(program, 'sTexture');
        program.colorUniform = gl.getUniformLocation(program, 'uColor');
        program.pointSize = gl.getUniformLocation(program, 'uPointsize');

        return program;

    };

    var initLifeTimeParticleShaders = function() {

        var program = createP('lifetimeparticle');

        program.pointLifetimeAttribute = gl.getAttribLocation(program, 'aLifetime');
        gl.enableVertexAttribArray(program.pointLifetimeAttribute);

        program.pointStartPositionAttribute = gl.getAttribLocation(program, 'aStartPosition');
        gl.enableVertexAttribArray(program.pointStartPositionAttribute);

        program.pointEndPositionAttribute = gl.getAttribLocation(program, 'aEndPosition');
        gl.enableVertexAttribArray(program.pointEndPositionAttribute);

        program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
        program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');

        program.samplerUniform = gl.getUniformLocation(program, 'sTexture');
        program.centerPositionUniform = gl.getUniformLocation(program, 'uCenterPosition');
        program.colorUniform = gl.getUniformLocation(program, 'uColor');
        program.timeUniform = gl.getUniformLocation(program, 'uTime');

        return program;

    };

    var initFontShaders = function() {

        var program = createP('font');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, 'aTextureCoord');
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
        program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');
        program.samplerUniform = gl.getUniformLocation(program, 'uSampler');

        return program;

    };

    var initFontShaders2d = function() {

        var program = createP('font2d');

        program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, 'aTextureCoord');
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
        program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');
        program.samplerUniform = gl.getUniformLocation(program, 'uSampler');

        return program;

    };

    var getShader = function(id, program) {

        var vsSource = null, fsSource = null;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                vsSource = xhttp.responseText;

            }
        };

        xhttp.open('GET', './shaders/' + id + '-vs.shader?' + Math.random(), false);
        xhttp.send();

        var xhttpF = new XMLHttpRequest();
        xhttpF.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                fsSource = xhttpF.responseText;
            }
        };

        xhttpF.open('GET', './shaders/' + id + '-fs.shader?' + Math.random(), false);
        xhttpF.send();

        var vsshader;
        var fsshader;

        fsshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fsshader, fsSource);
        gl.compileShader(fsshader);
        if (!gl.getShaderParameter(fsshader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(fsshader));
            return null;
        }

        vsshader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vsshader, vsSource);
        gl.compileShader(vsshader);
        if (!gl.getShaderParameter(vsshader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(vsshader));
            return null;
        }

        gl.attachShader(program, vsshader);
        gl.attachShader(program, fsshader);

    };
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
    return Object.freeze({
        useShader,
        setProgram,
        subscribe: function() {
        },
        init

    });

}
