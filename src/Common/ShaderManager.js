class ShaderManager {
    constructor() {

        //particleProgram = this.initParticleShaders("particle");
        //simplestProgram = this.initSimplestShaders("simplest");
        //blurVerticalProgram = this.initBlurShaders("blurvertical");
        //blurHorizontalProgram = this.initBlurShaders("blurhorizontal");
        //shaderProgram = this.initShaders("per-fragment-lighting");
        //ambientProgram = this.initAmbientShaders('ambient');
        //fontProgram = this.initFontShaders('font');
        //starProgram = this.initStarShaders('star');

    }

    init(name) {
        switch (name) {
            case "particle":
                return this.initParticleShaders("particle");
                break;
            case "simplest":
                return this.initSimplestShaders("simplest");
                break;
            case "blurvertical":
                return this.initBlurShaders("blurhorizontal");
                break;
            case "blurvertical":
                return this.initBlurShaders("blurvertical");
                break;
            case "blurhorizontal":
                return this.initBlurShaders("blurhorizontal");
                break;
            case "per-fragment-lighting":
                return this.initShaders("per-fragment-lighting");
                break;
            case "ambient":
                return this.initAmbientShaders('ambient');
                break;
            case "font":
                return this.initFontShaders('font');
                break;
            case "star":
                return this.initStarShaders('star');
                break;
            case "particle3d":
                return this.initParticleShaders3d('particle3d');
                break;
            case "exhaust":
                return this.initExhaustShaders('exhaust');
                break;
            case "gui":
                return this.initGuiShader('gui');
                break;
        }


    }

    initExhaustShaders(id) {

        var program = gl.createProgram();

        this.getShader(id, program);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");

        program.samplerUniform = gl.getUniformLocation(program, "uSampler");

        return program;

    }

    initSimplestShaders(id) {

        var program = gl.createProgram();

        this.getShader(id, program);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");

        return program;

    }

    initVerticalBlurShaders(id) {

        var program = gl.createProgram();

        this.getShader(id, program);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);


        program.uResolution = gl.getUniformLocation(program, "uResolution");


        program.samplerUniform = gl.getUniformLocation(program, "uSampler");

        return program;

    }


    initBlurShaders(id) {

        var program = gl.createProgram();

        this.getShader(id, program);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

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

    }


    initAmbientShaders(id) {

        var program = gl.createProgram();

        this.getShader(id, program);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);


        program.aWorldCoordinates = gl.getAttribLocation(program, "aWorldCoordinates");
        gl.enableVertexAttribArray(program.aWorldCoordinates);


        program.aCubeNumber = gl.getAttribLocation(program, "aCubeNumber");
        gl.enableVertexAttribArray(program.aCubeNumber);


        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");

        program.uElapsed = gl.getUniformLocation(program, "uElapsed");

        //program.uNMatrix = gl.getUniformLocation(program, "uNMatrix");


        program.uVisibility = gl.getUniformLocation(program, "uVisibility");


        program.uCameraPos = gl.getUniformLocation(program, "uCameraPos");

        return program;

    }


    initParticleShaders(id) {

        var program = gl.createProgram();

        this.getShader(id, program);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        program.pointStartPositionAttribute = gl.getAttribLocation(program, "aStartPosition");
        gl.enableVertexAttribArray(program.pointStartPositionAttribute);

        program.positionUniform = gl.getUniformLocation(program, "uPosition");
        program.samplerUniform = gl.getUniformLocation(program, "sTexture");
        program.colorUniform = gl.getUniformLocation(program, "uColor");
        program.pointSize = gl.getUniformLocation(program, "uPointsize");

        return program;

    }


    initParticleShaders3d(id) {

        var program = gl.createProgram();

        this.getShader(id, program);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        //program.pointStartPositionAttribute = gl.getAttribLocation(program, "aStartPosition");
        //gl.enableVertexAttribArray(program.pointStartPositionAttribute);

        program.positionUniform = gl.getUniformLocation(program, "uPosition");
        program.samplerUniform = gl.getUniformLocation(program, "sTexture");
        program.colorUniform = gl.getUniformLocation(program, "uColor");
        program.pointSize = gl.getUniformLocation(program, "uPointsize");

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");


        return program;

    }


    initGuiShader(id) {

        var program = gl.createProgram();

        this.getShader(id, program);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }


        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);


        //program.positionUniform = gl.getUniformLocation(program, "uPosition");
        program.samplerUniform = gl.getUniformLocation(program, "uSampler");


        //program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");


        return program;

    }


    initStarShaders(id) {

        var program = gl.createProgram();

        this.getShader(id, program);

        gl.linkProgram(program);


        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }


        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.aPointSize = gl.getAttribLocation(program, "aPointSize");
        gl.enableVertexAttribArray(program.aPointSize);

        //program.aWorldCoordinates = gl.getAttribLocation(program, "aWorldCoordinates");
        //gl.enableVertexAttribArray(program.aWorldCoordinates);

        // program.aWorldCoordinates = gl.getAttribLocation(program, "aWorldCoordinates");
        // gl.enableVertexAttribArray(program.aWorldCoordinates);

        //gl.enableVertexAttribArray(starProgram.pointStartPositionAttribute);

        //program.centerPositionUniform = gl.getUniformLocation(program, "uCenterPosition");
        //program.colorUniform = gl.getUniformLocation(program, "uColor");
        //program.pointSize = gl.getUniformLocation(program, "uPointSize");

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        //program.uView = gl.getUniformLocation(program, "uView");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");
        //program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");


        return program;

    }


    initShaders(id) {

        var program = gl.createProgram();

        this.getShader(id, program);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

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
        //shaderProgram.uMaterialDiffuse = gl.getUniformLocation(shaderProgram, "uMaterialDiffuse");
        //shaderProgram.uMaterialSpecular = gl.getUniformLocation(shaderProgram, "uMaterialSpecular");


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

    }

    getShader(id, program) {

        var vs_source = null, fs_source = null;
        $.ajax({
            async: false,
            url: './shaders/' + id + '-vs.shader',
            success: function (data) {

                vs_source = data;
            },
            dataType: 'html'
        });

        $.ajax({
            async: false,
            url: './shaders/' + id + '-fs.shader',
            success: function (data) {

                fs_source = data;
            },
            dataType: 'html'
        });
        var vsshader;
        var fsshader;

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

    }


    initFontShaders(id) {

        var program = gl.createProgram();

        this.getShader(id, program);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");

        program.samplerUniform = gl.getUniformLocation(program, "uSampler");


        return program;

    }
}