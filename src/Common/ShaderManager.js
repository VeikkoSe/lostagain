function shader_manager_constuctor(gl) {
    //constructor() {
    let allShaders = [];
    let currentProgram = null;

    //let gl = sb.getGl();
    // }

    let setProgram = function (program) {

        if (currentProgram != null && currentProgram.name == program.name) {
            return true;
        }
        else {
            gl.useProgram(program);
        }

    };

    let subscribe = function () {

    }


    let init = function (name) {
        if (allShaders[name]) {
            return allShaders[name];
        }

        switch (name) {
            case "particle":
                allShaders[name] = initParticleShaders(name);
                break;
            case "maps":
                allShaders[name] = initMapShaders(name);
                break;
            case "simplest":
                allShaders[name] = initSimplestShaders(name);
                break;
            case "blurvertical":
                allShaders[name] = initBlurShaders(name);
                break;
            case 'blurhorizontal':
                allShaders[name] = initBlurShaders(name);
                break;
            case 'per-fragment-lighting':
                allShaders[name] = initShaders(name);
                break;
            case 'ambient':
                allShaders[name] = initAmbientShaders(name);
                break;
            case 'font':
                allShaders[name] = initFontShaders(name);
                break;
            case 'font2d':
                allShaders[name] = initFontShaders2d(name);
                break;
            case "star":
                allShaders[name] = initStarShaders(name);
                break;
            case "particle3d":
                allShaders[name] = initParticleShaders3d(name);
                break;
            case "exhaust":
                allShaders[name] = initExhaustShaders(name);
                break;
            case "gui":
                allShaders[name] = initGuiShader(name);
                break;
            case "lifetimeparticle":
                allShaders[name] = initLifeTimeParticleShaders(name);
                break;
        }
        return allShaders[name];

    };

    let createP = function (id) {
        let program = gl.createProgram();
        gl.createProgram();
        //makes ajax call, needs to be linked on loading, now it's just "fast enough"
        getShader(id, program);
        gl.linkProgram(program);


        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        program.name = id;

        return program;

    };

    let initExhaustShaders = function (id) {

        let program = createP(id);


        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");

        program.samplerUniform = gl.getUniformLocation(program, "uSampler");

        return program;

    };

    let initMapShaders = function (id) {

        let program = createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.aTextureCoord = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.aTextureCoord);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");

        program.samplerUniform = gl.getUniformLocation(program, "uSampler");
        //program.uColor = gl.getUniformLocation(program, "uColor");


        return program;

    };

    let initSimplestShaders = function (id) {

        let program = createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");
        //program.uColor = gl.getUniformLocation(program, "uColor");

        return program;

    };

    let initVerticalBlurShaders = function (id) {

        let program = createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);


        program.uResolution = gl.getUniformLocation(program, "uResolution");


        program.samplerUniform = gl.getUniformLocation(program, "uSampler");

        return program;

    };

    let initBlurShaders = function (id) {

        let program = createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.uResolution = gl.getUniformLocation(program, "uResolution");

        if (id == 'blurhorizontal') {
            program.samplerUniform2 = gl.getUniformLocation(program, "uSampler2");
        }
        program.samplerUniform = gl.getUniformLocation(program, "uSampler");

        return program;

    };

    let initAmbientShaders = function (id) {

        let program = createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.aWorldCoordinates = gl.getAttribLocation(program, "aWorldCoordinates");
        gl.enableVertexAttribArray(program.aWorldCoordinates);

        program.aCubeNumber = gl.getAttribLocation(program, "aCubeNumber");
        gl.enableVertexAttribArray(program.aCubeNumber);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uElapsed = gl.getUniformLocation(program, "uElapsed");
        program.uVisibility = gl.getUniformLocation(program, "uVisibility");
        program.uCameraPos = gl.getUniformLocation(program, "uCameraPos");

        return program;

    };

    let initParticleShaders = function (id) {

        let program = createP(id);

        program.pointStartPositionAttribute = gl.getAttribLocation(program, "aStartPosition");
        gl.enableVertexAttribArray(program.pointStartPositionAttribute);

        program.positionUniform = gl.getUniformLocation(program, "uPosition");
        program.samplerUniform = gl.getUniformLocation(program, "sTexture");
        program.colorUniform = gl.getUniformLocation(program, "uColor");
        program.pointSize = gl.getUniformLocation(program, "uPointsize");

        return program;

    };

    let initParticleShaders3d = function (id) {

        let program = createP(id);

        program.positionUniform = gl.getUniformLocation(program, "uPosition");
        program.samplerUniform = gl.getUniformLocation(program, "sTexture");
        program.colorUniform = gl.getUniformLocation(program, "uColor");
        program.pointSize = gl.getUniformLocation(program, "uPointsize");
        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");

        return program;

    };

    let initGuiShader = function (id) {

        let program = createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.samplerUniform = gl.getUniformLocation(program, "uSampler");

        return program;

    };

    let initStarShaders = function (id) {

        let program = createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.aPointSize = gl.getAttribLocation(program, "aPointSize");
        gl.enableVertexAttribArray(program.aPointSize);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");

        return program;

    };

    let initShaders = function (id) {

        let program = createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.aVertexNormal = gl.getAttribLocation(program, "aVertexNormal");
        gl.enableVertexAttribArray(program.aVertexNormal);


        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");
        program.uNMatrix = gl.getUniformLocation(program, "uNMatrix");
        program.samplerUniform = gl.getUniformLocation(program, "uSampler");

        program.uMaterialShininess = gl.getUniformLocation(program, "uMaterialShininess");
        program.uAmbient = gl.getUniformLocation(program, "uAmbient");

        program.uLightPosition = gl.getUniformLocation(program, "uLightPosition");
        program.uLightAmbient = gl.getUniformLocation(program, "uLightAmbient");
        program.uLightDiffuse = gl.getUniformLocation(program, "uLightDiffuse");
        program.uLightSpecular = gl.getUniformLocation(program, "uLightSpecular");

        program.uMaterialDiffuse = gl.getUniformLocation(program, "uMaterialDiffuse");

        program.alphaUniform = gl.getUniformLocation(program, "uAlpha");
        program.uUseLighting = gl.getUniformLocation(program, "uUseLighting");
        program.uDrawColors = gl.getUniformLocation(program, "uDrawColors");
        program.uDrawColor = gl.getUniformLocation(program, "uDrawColor");

        return program;

    };

    let initParticleShaders = function (id) {

        let program = createP(id);

        program.pointStartPositionAttribute = gl.getAttribLocation(program, "aStartPosition");
        gl.enableVertexAttribArray(program.pointStartPositionAttribute);

        program.positionUniform = gl.getUniformLocation(program, "uPosition");
        program.samplerUniform = gl.getUniformLocation(program, "sTexture");
        program.colorUniform = gl.getUniformLocation(program, "uColor");
        program.pointSize = gl.getUniformLocation(program, "uPointsize");

        return program;

    };

    let initLifeTimeParticleShaders = function (id) {

        let program = createP(id);

        program.pointLifetimeAttribute = gl.getAttribLocation(program, "aLifetime");
        gl.enableVertexAttribArray(program.pointLifetimeAttribute);

        program.pointStartPositionAttribute = gl.getAttribLocation(program, "aStartPosition");
        gl.enableVertexAttribArray(program.pointStartPositionAttribute);

        program.pointEndPositionAttribute = gl.getAttribLocation(program, "aEndPosition");
        gl.enableVertexAttribArray(program.pointEndPositionAttribute);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");

        program.samplerUniform = gl.getUniformLocation(program, "sTexture");
        program.centerPositionUniform = gl.getUniformLocation(program, "uCenterPosition");
        program.colorUniform = gl.getUniformLocation(program, "uColor");
        program.timeUniform = gl.getUniformLocation(program, "uTime");


        return program;

    };

    let initFontShaders = function (id) {

        let program = createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");
        program.samplerUniform = gl.getUniformLocation(program, "uSampler");

        return program;

    };

    let initFontShaders2d = function (id) {

        let program = createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");
        program.samplerUniform = gl.getUniformLocation(program, "uSampler");

        return program;

    };

    let getShader = function (id, program) {

        let vs_source = null, fs_source = null;
        $.ajax({
            async: false,
            url: './shaders/' + id + '-vs.shader?' + Math.random(),
            success: function (data) {

                vs_source = data;
            },
            dataType: 'html'
        });

        $.ajax({
            async: false,
            url: './shaders/' + id + '-fs.shader?' + Math.random(),
            success: function (data) {

                fs_source = data;
            },
            dataType: 'html'
        });
        let vsshader;
        let fsshader;

        fsshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fsshader, fs_source);
        gl.compileShader(fsshader);
        if (!gl.getShaderParameter(fsshader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(fsshader));
            return null;
        }

        vsshader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vsshader, vs_source);
        gl.compileShader(vsshader);
        if (!gl.getShaderParameter(vsshader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(vsshader));
            return null;
        }

        gl.attachShader(program, vsshader);
        gl.attachShader(program, fsshader);

    };
    return { // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        init,
        setProgram,
        subscribe
    };

}