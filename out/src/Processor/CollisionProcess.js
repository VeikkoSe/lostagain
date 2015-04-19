var CollisionProcess = function CollisionProcess() {
  "use strict";
  this.collisions = [];
};
($traceurRuntime.createClass)(CollisionProcess, {update: function() {
    "use strict";
    this.collisions = [];
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.CollisionComponent) {
        var c = le.components.CollisionComponent;
        var r = le.components.Renderable;
        c.xPos = r.xPos;
        c.yPos = r.yPos;
        c.zPos = r.zPos;
        c.xWidth = r.xWidth;
        c.yWidth = r.yWidth;
        c.zWidth = r.zWidth;
        this.collisions.push(c);
      }
    }
    for (var i = 0; i < this.collisions.length; i++) {
      for (var j = 0; j < this.collisions.length; j++) {
        if (j != i && this.collisions[$traceurRuntime.toProperty(i)].xPos - this.collisions[$traceurRuntime.toProperty(i)].xWidth > this.collisions[$traceurRuntime.toProperty(j)].xPos - this.collisions[$traceurRuntime.toProperty(i)].xWidth && this.collisions[$traceurRuntime.toProperty(i)].xPos - this.collisions[$traceurRuntime.toProperty(i)].xWidth < this.collisions[$traceurRuntime.toProperty(j)].xPos + this.collisions[$traceurRuntime.toProperty(j)].xWidth && this.collisions[$traceurRuntime.toProperty(i)].zPos - this.collisions[$traceurRuntime.toProperty(i)].zWidth > this.collisions[$traceurRuntime.toProperty(j)].zPos - this.collisions[$traceurRuntime.toProperty(i)].zWidth && this.collisions[$traceurRuntime.toProperty(i)].zPos - this.collisions[$traceurRuntime.toProperty(i)].zWidth < this.collisions[$traceurRuntime.toProperty(j)].zPos + this.collisions[$traceurRuntime.toProperty(j)].zWidth) {
          pub.publish("collision", [this.collisions[$traceurRuntime.toProperty(i)], this.collisions[$traceurRuntime.toProperty(j)]]);
        }
      }
    }
  }}, {}, Processor);
