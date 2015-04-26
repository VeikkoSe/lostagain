var CollisionProcess = function CollisionProcess() {
  "use strict";
  this.collisions = [];
  var that = this;
  pub.subscribe("collision", function(name, collisionComponents) {
    if (collisionComponents[0].group == 'enemy') {
      var enemy = collisionComponents[0];
    } else if (collisionComponents[1].group == 'enemy') {
      var enemy = collisionComponents[1];
    }
    var enemyEntity = enemy.entity;
    var hc = enemyEntity.components.HealthComponent;
    var ec = enemyEntity.components.EnemyComponent;
    hc.amount--;
    if (hc.amount > 0) {
      pub.publish("explosion", enemyEntity.components.Renderable);
    } else {
      hc.amount = 0;
      pub.publish("bigexplosion", enemyEntity.components.Renderable);
    }
    if (collisionComponents[0].group == 'player') {
      var player = collisionComponents[0];
    } else if (collisionComponents[1].group == 'player') {
      var player = collisionComponents[1];
    }
    var playerEntity = player.entity;
    var hc = playerEntity.components.HealthComponent;
    var pc = playerEntity.components.Renderable;
    hc.amount--;
    if (hc.amount > 0) {
      pub.publish("explosion", pc);
    } else {
      hc.amount = 0;
      pub.publish("bigexplosion", pc);
    }
  });
};
($traceurRuntime.createClass)(CollisionProcess, {update: function() {
    "use strict";
    this.collisions = [];
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.CollisionComponent) {
        if (le.components.HealthComponent && le.components.HealthComponent.amount < 1) {
          continue;
        }
        var c = le.components.CollisionComponent;
        var r = le.components.Renderable;
        c.xPos = r.xPos;
        c.yPos = r.yPos;
        c.zPos = r.zPos;
        c.xWidth = r.xWidth;
        c.yWidth = r.yWidth;
        c.zWidth = r.zWidth;
        c.entity = le;
        this.collisions.push(c);
      }
    }
    for (var i = 0; i < this.collisions.length; i++) {
      for (var j = 0; j < this.collisions.length; j++) {
        if (j != i && this.collisions[$traceurRuntime.toProperty(i)].xPos - this.collisions[$traceurRuntime.toProperty(i)].xWidth > this.collisions[$traceurRuntime.toProperty(j)].xPos - this.collisions[$traceurRuntime.toProperty(i)].xWidth && this.collisions[$traceurRuntime.toProperty(i)].xPos - this.collisions[$traceurRuntime.toProperty(i)].xWidth < this.collisions[$traceurRuntime.toProperty(j)].xPos + this.collisions[$traceurRuntime.toProperty(j)].xWidth && this.collisions[$traceurRuntime.toProperty(i)].zPos - this.collisions[$traceurRuntime.toProperty(i)].zWidth > this.collisions[$traceurRuntime.toProperty(j)].zPos - this.collisions[$traceurRuntime.toProperty(i)].zWidth && this.collisions[$traceurRuntime.toProperty(i)].zPos - this.collisions[$traceurRuntime.toProperty(i)].zWidth < this.collisions[$traceurRuntime.toProperty(j)].zPos + this.collisions[$traceurRuntime.toProperty(j)].zWidth && this.collisions[$traceurRuntime.toProperty(i)].group != this.collisions[$traceurRuntime.toProperty(j)].group) {
          pub.publish("collision", [this.collisions[$traceurRuntime.toProperty(i)], this.collisions[$traceurRuntime.toProperty(j)]]);
        }
      }
    }
  }}, {}, Processor);
