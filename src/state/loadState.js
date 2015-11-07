function oldLoadState(sb) {
    'use strict';

    var gl = sb.getGL();

    var elapsedTotal = 0;
    var lastTime = 0;
    var loadPercent = 0;
    var rotationSpeed = 0.5;
    var rotationAngle = 0;

    var camera = sb.getCamera();

    var material = sb.getMaterial();
    var shaderprogram = material.useShader('simplest');
    //var wantedstate = '';

    var points = [];

    var vertexPositionBuffer = gl.createBuffer();
    //var am = asset_manager_constructor(sb);

    //var loadmanager = loadmanager_costructor(sb);

    //var loadmanager = game.loadmanager();

    var currentLevel = 0;
    var wantedstate = '';

    var subscribe = function() {

    };

    var cleanup = function() {

    };

    return {
        init,
        draw,
        update,
        cleanup,
        subscribe
    };

}