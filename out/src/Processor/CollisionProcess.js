function collisionprocess_constructor(sb) {
  var collisions = [];
  var gl = sb.getGL();
  var em = sb.getEntityManager();
  var subscribe = function() {
    pub.subscribe("bulletcollision", function(name, collisionComponent) {
      var enemy = collisionComponent;
      var enemyEntity = enemy.entity;
      var hc = enemyEntity.components.HealthComponent;
      hc.amount--;
      if (hc.amount > 0) {
        pub.publish("explosion", enemyEntity.components.RenderableComponent);
      } else {
        hc.amount = 0;
        pub.publish("bigexplosion", enemyEntity.components.RenderableComponent);
      }
    });
    pub.subscribe("collision", function(name, collisionComponents) {
      if (collisionComponents[0].group == 'enemy') {
        try {
          throw undefined;
        } catch (enemy) {
          {
            enemy = collisionComponents[0];
          }
        }
      } else if (collisionComponents[1].group == 'enemy') {
        try {
          throw undefined;
        } catch (enemy) {
          {
            enemy = collisionComponents[1];
          }
        }
      }
      var enemyEntity = enemy.entity;
      var hc = enemyEntity.components.HealthComponent;
      hc.amount--;
      if (hc.amount > 0) {
        pub.publish("explosion", enemyEntity.components.RenderableComponent);
      } else {
        hc.amount = 0;
        pub.publish("bigexplosion", enemyEntity.components.RenderableComponent);
      }
      if (collisionComponents[0].group == 'player') {
        try {
          throw undefined;
        } catch (player) {
          {
            player = collisionComponents[0];
          }
        }
      } else if (collisionComponents[1].group == 'player') {
        try {
          throw undefined;
        } catch (player) {
          {
            player = collisionComponents[1];
          }
        }
      }
      var playerEntity = player.entity;
      var hc = playerEntity.components.HealthComponent;
      var sc = playerEntity.components.ShieldComponent;
      var pc = playerEntity.components.RenderableComponent;
      if (sc.amount > 0)
        sc.amount--;
      else
        hc.amount--;
      if (hc.amount > 0) {
        pub.publish("explosion", pc);
      } else {
        if (playerEntity.name == 'mothership') {
          pub.publish("gameover", true);
        }
        hc.amount = 0;
        pub.publish("bigexplosion", pc);
      }
    });
  };
  var update = function() {
    collisions.length = 0;
    {
      try {
        throw undefined;
      } catch ($e) {
        {
          $e = 0;
          for (; $e < em.entities.length; $e++) {
            try {
              throw undefined;
            } catch (e) {
              {
                e = $e;
                try {
                  try {
                    throw undefined;
                  } catch (le) {
                    {
                      le = em.entities[$traceurRuntime.toProperty(e)];
                      if (le.components.CollisionComponent) {
                        try {
                          throw undefined;
                        } catch (r) {
                          try {
                            throw undefined;
                          } catch (c) {
                            {
                              if (le.components.HealthComponent && le.components.HealthComponent.amount < 1) {
                                continue;
                              }
                              c = le.components.CollisionComponent;
                              r = le.components.RenderableComponent;
                              c.xPos = r.xPos;
                              c.yPos = r.yPos;
                              c.zPos = r.zPos;
                              c.xWidth = r.xWidth;
                              c.yWidth = r.yWidth;
                              c.zWidth = r.zWidth;
                              c.entity = le;
                              collisions.push(c);
                            }
                          }
                        }
                      }
                    }
                  }
                } finally {
                  $e = e;
                }
              }
            }
          }
        }
      }
    }
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < collisions.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  {
                    try {
                      throw undefined;
                    } catch ($j) {
                      {
                        $j = 0;
                        for (; $j < collisions.length; $j++) {
                          try {
                            throw undefined;
                          } catch (j) {
                            {
                              j = $j;
                              try {
                                if (j != i && collisions[$traceurRuntime.toProperty(i)].xPos - collisions[$traceurRuntime.toProperty(i)].xWidth > collisions[$traceurRuntime.toProperty(j)].xPos - collisions[$traceurRuntime.toProperty(j)].xWidth && collisions[$traceurRuntime.toProperty(i)].xPos - collisions[$traceurRuntime.toProperty(i)].xWidth < collisions[$traceurRuntime.toProperty(j)].xPos + collisions[$traceurRuntime.toProperty(j)].xWidth && collisions[$traceurRuntime.toProperty(i)].zPos - collisions[$traceurRuntime.toProperty(i)].zWidth > collisions[$traceurRuntime.toProperty(j)].zPos - collisions[$traceurRuntime.toProperty(j)].zWidth && collisions[$traceurRuntime.toProperty(i)].zPos - collisions[$traceurRuntime.toProperty(i)].zWidth < collisions[$traceurRuntime.toProperty(j)].zPos + collisions[$traceurRuntime.toProperty(j)].zWidth && collisions[$traceurRuntime.toProperty(i)].group != collisions[$traceurRuntime.toProperty(j)].group) {
                                  sb.publish("collision", [collisions[$traceurRuntime.toProperty(i)], collisions[$traceurRuntime.toProperty(j)]]);
                                }
                              } finally {
                                $j = j;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
  };
  return {
    update: update,
    draw: function() {},
    init: function() {}
  };
}
