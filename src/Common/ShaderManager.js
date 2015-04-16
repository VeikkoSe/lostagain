class ShaderManager {
    constructor() {
        this.allShaders = [];
        this.currentProgram = null;
    }

    setProgram(program) {
        if (this.currentProgram != null && this.currentProgram.name == program.name) {
            return true;
        }
        else {
            gl.useProgram(program);
        }

    }

    init(name) {
        if (this.allShaders[name]) {
            return this.allShaders[name];
        }

        switch (name) {
            case "particle":
                this.allShaders[name] = this.initParticleShaders("particle");
                break;
            case "simplest":
                this.allShaders[name] = this.initSimplestShaders("simplest");
                break;
            case "blurvertical":
                this.allShaders[name] = this.initBlurShaders("blurvertical");
                break;
            case 'blurhorizontal':
                this.allShaders[name] = this.initBlurShaders("blurhorizontal");
                break;
            case 'per-fragment-lighting':
                this.allShaders[name] = this.initShaders("per-fragment-lighting");
                break;
            case 'ambient':
                this.allShaders[name] = this.initAmbientShaders('ambient');
                break;
            case 'font':
                this.allShaders[name] = this.initFontShaders('font');
                break;
            case "star":
                this.allShaders[name] = this.initStarShaders('star');
                break;
            case "particle3d":
                this.allShaders[name] = this.initParticleShaders3d('particle3d');
                break;
            case "exhaust":
                this.allShaders[name] = this.initExhaustShaders('exhaust');
                break;
            case "gui":
                this.allShaders[name] = this.initGuiShader('gui');
                break;
        }
        return this.allShaders[name];

    }

    createP(id) {
        var program = gl.createProgram();
        gl.createProgram();
        //makes ajax call, needs to be linked on loading, now it's just "fast enough"
        this.getShader(id, program);
        gl.linkProgram(program);
        return program;

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        program.name = id;

    }

    initExhaustShaders(id) {

        var program = this.createP(id);


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

        var program = this.createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");

        return program;

    }

    initVerticalBlurShaders(id) {

        var program = this.createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);


        program.uResolution = gl.getUniformLocation(program, "uResolution");


        program.samplerUniform = gl.getUniformLocation(program, "uSampler");

        return program;

    }


    initBlurShaders(id) {

        var program = this.createP(id);

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

        var program = this.createP(id);

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

        var program = this.createP(id);

        program.pointStartPositionAttribute = gl.getAttribLocation(program, "aStartPosition");
        gl.enableVertexAttribArray(program.pointStartPositionAttribute);

        program.positionUniform = gl.getUniformLocation(program, "uPosition");
        program.samplerUniform = gl.getUniformLocation(program, "sTexture");
        program.colorUniform = gl.getUniformLocation(program, "uColor");
        program.pointSize = gl.getUniformLocation(program, "uPointsize");

        return program;

    }


    initParticleShaders3d(id) {

        var program = this.createP(id);

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

        var program = this.createP(id);

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

        var program = this.createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.aPointSize = gl.getAttribLocation(program, "aPointSize");
        gl.enableVertexAttribArray(program.aPointSize);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");

        return program;

    }


    initShaders(id) {

        var program = this.createP(id);

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
        //program.useLightingUniform = gl.getUniformLocation(program, "uUseLighting");

        program.alphaUniform = gl.getUniformLocation(program, "uAlpha");
        program.uUseLighting = gl.getUniformLocation(program, "uUseLighting");
        program.uDrawColors = gl.getUniformLocation(program, "uDrawColors");
        program.uDrawColor = gl.getUniformLocation(program, "uDrawColor");
        return program;

    }

    initFontShaders(id) {

        var program = this.createP(id);

        program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.aVertexPosition);

        program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
        program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");
        program.samplerUniform = gl.getUniformLocation(program, "uSampler");

        return program;

    }

    getShader(id, program) {

        var vs_source = null, fs_source = null;
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


}