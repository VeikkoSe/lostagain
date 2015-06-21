function loadstate_constructor(sb) {
  var gl = sb.getGL();
  var elapsedTotal = 0;
  var lastTime = 0;
  var loadPercent = 0;
  var rotationSpeed = 0.5;
  var rotationAngle = 0;
  var camera = sb.getCamera();
  var shadermanager = sb.getShaderManager();
  var shaderprogram = shadermanager.init("simplest");
  var wantedstate = '';
  var points = [];
  var vertexPositionBuffer = gl.createBuffer();
  var am = asset_manager_constructor(sb);
  var currentLevel = 0;
  var wantedstate = '';
  var init = function(ws) {
    am.init();
    wantedstate = ws;
    points.push(-0.2, 0, 0);
    points.push(0.2, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    elapsedTotal = 0;
    lastTime = 0;
    loadPercent = 0;
    rotationAngle = 0;
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.setPerspective();
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.setPerspective();
    mat4.identity(camera.getMVMatrix());
    mat4.translate(camera.getMVMatrix(), [0, 0, -10]);
    sb.publish("loadassets", wantedstate);
  };
  var subscribe = function() {};
  var draw = function() {
    shadermanager.setProgram(shaderprogram);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4.rotate(camera.getMVMatrix(), degToRad(rotationAngle), [0, 0, 1]);
    gl.uniformMatrix4fv(shaderprogram.uPMatrix, false, camera.getPMatrix());
    gl.uniformMatrix4fv(shaderprogram.uMVMatrix, false, camera.getMVMatrix());
    gl.uniform4f(shaderprogram.uColor, 1.0, 1.0, 0.0, 1.0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(shaderprogram.aVertexPosition);
    gl.vertexAttribPointer(shaderprogram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINES, 0, 2);
  };
  var cleanup = function() {};
  var update = function() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
      try {
        throw undefined;
      } catch (elapsed) {
        {
          elapsed = timeNow - lastTime;
          elapsedTotal += elapsed;
          rotationAngle += (rotationSpeed * (elapsed / 1000));
          if (rotationAngle >= 360)
            rotationAngle = 0;
          elapsedTotal -= 200;
        }
      }
    }
    lastTime = timeNow;
  };
  return {
    init: init,
    draw: draw,
    update: update,
    cleanup: cleanup,
    subscribe: subscribe
  };
}
