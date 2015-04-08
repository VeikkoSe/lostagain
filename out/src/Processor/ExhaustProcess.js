var ExhaustProcess = function ExhaustProcess() {
  "use strict";
  this.exhaustAmount = 200;
  this.exhaustInterval = 50;
  this.exhaustTrail = [];
  this.lastTime = 0;
  this.simplestProgram = sm.init('simplest');
  this.elapsedTotal = 0;
  this.vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
};
($traceurRuntime.createClass)(ExhaustProcess, {
  dropPoints: function(ec) {
    "use strict";
    if (ec.points.length > 180) {
      ec.points.shift();
      ec.points.shift();
      ec.points.shift();
      ec.points.shift();
      ec.points.shift();
      ec.points.shift();
      ec.points.shift();
      ec.points.shift();
      ec.points.shift();
    }
  },
  pushArray: function(arr, arr2) {
    "use strict";
    arr.push.apply(arr, arr2);
  },
  update: function(deltatime) {
    "use strict";
    var timeNow = new Date().getTime();
    var elapsed = timeNow - this.lastTime;
    this.elapsedTotal += elapsed;
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.ExhaustComponent) {
        var ec = le.components.ExhaustComponent;
        this.dropPoints(ec);
        if (ec.flow.length == 0) {
          ec.flow.push(le.components.Renderable.xPos);
          ec.flow.push(0);
          ec.flow.push(le.components.Renderable.zPos);
        }
        var xd = le.components.Renderable.xPos - ec.flow[$traceurRuntime.toProperty(ec.flow.length - 3)];
        var zd = le.components.Renderable.zPos - ec.flow[$traceurRuntime.toProperty(ec.flow.length - 1)];
        var xdh = xd / 2;
        var zdh = zd / 2;
        var distance = Math.sqrt(xd * xd + zd * zd);
        if (distance > 30) {
          if (ec.flow.length > 3) {
            var tp = [];
            tp.push(ec.points[$traceurRuntime.toProperty(ec.points.length - 6)]);
            tp.push(0);
            tp.push(ec.points[$traceurRuntime.toProperty(ec.points.length - 4)]);
            tp.push(ec.points[$traceurRuntime.toProperty(ec.points.length - 3)]);
            tp.push(0);
            tp.push(ec.points[$traceurRuntime.toProperty(ec.points.length - 1)]);
            tp.push(zdh + le.components.Renderable.xPos);
            tp.push(0);
            tp.push(-1 * xdh + le.components.Renderable.zPos);
            tp.push(ec.points[$traceurRuntime.toProperty(ec.points.length - 6)]);
            tp.push(0);
            tp.push(ec.points[$traceurRuntime.toProperty(ec.points.length - 4)]);
            tp.push(-1 * zdh + le.components.Renderable.xPos);
            tp.push(0);
            tp.push(xdh + le.components.Renderable.zPos);
            tp.push(zdh + le.components.Renderable.xPos);
            tp.push(0);
            tp.push(-1 * xdh + le.components.Renderable.zPos);
            tp.push.apply(ec.points, tp);
            ec.points.push.apply(ec.points, tp);
            ec.flow.push(le.components.Renderable.xPos);
            ec.flow.push(0);
            ec.flow.push(le.components.Renderable.zPos);
          } else {
            ec.points.push(-1 * zdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 3)]);
            ec.points.push(0);
            ec.points.push(xdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 1)]);
            ec.points.push(zdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 3)]);
            ec.points.push(0);
            ec.points.push(-1 * xdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 1)]);
            ec.points.push(zdh + le.components.Renderable.xPos);
            ec.points.push(0);
            ec.points.push(-1 * xdh + le.components.Renderable.zPos);
            ec.points.push(-1 * zdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 3)]);
            ec.points.push(0);
            ec.points.push(xdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 1)]);
            ec.points.push(-1 * zdh + le.components.Renderable.xPos);
            ec.points.push(0);
            ec.points.push(xdh + le.components.Renderable.zPos);
            ec.points.push(zdh + le.components.Renderable.xPos);
            ec.points.push(0);
            ec.points.push(-1 * xdh + le.components.Renderable.zPos);
            ec.flow.push(le.components.Renderable.xPos);
            ec.flow.push(0);
            ec.flow.push(le.components.Renderable.zPos);
            console.log(ec.points);
          }
        }
      }
    }
  },
  draw: function() {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.ExhaustComponent) {
        var ec = le.components.ExhaustComponent;
        gl.useProgram(this.simplestProgram);
        if (ec.points.length > 8) {
          camera.mvPushMatrix();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ec.points), gl.STATIC_DRAW);
          gl.vertexAttribPointer(this.simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
          gl.uniformMatrix4fv(this.simplestProgram.uPMatrix, false, camera.pMatrix);
          gl.uniformMatrix4fv(this.simplestProgram.uMVMatrix, false, camera.mvMatrix);
          gl.drawArrays(gl.TRIANGLES, 0, ec.points.length / 3);
          camera.mvPopMatrix();
        }
      }
    }
  }
}, {}, Processor);
