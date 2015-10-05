function collisionprocess_constructor(sb) {
    'use strict';

    //constructor() {
    var collisions = [];
    var em = sb.getEntityManager();
    var sb = sb;

    //var that = this;
    var init = function() {

        sb.subscribe('bulletcollision', function(name, collisionComponent) {

            var enemy = collisionComponent;

            var enemyEntity = enemy.getEntity();
            var hc = enemyEntity.components.HealthComponent;

            hc.setAmount(hc.getAmount() - 1);
            if (hc.getAmount() > 0) {

                sb.publish('explosion', enemyEntity.components.RenderableComponent);
            }
            else {

                hc.setAmount(0);

                sb.publish('bigexplosion', enemyEntity.components.RenderableComponent);
            }
        });

        sb.subscribe('enemylasercollision', function(name, target) {

            //var enemy = collisionComponent;

            //var enemyEntity = enemy.getEntity();
            var hc = target.components.HealthComponent;

            hc.setAmount(hc.getAmount() - 1);
            if (hc.getAmount() > 0) {
                //console.log('b');
                sb.publish('smallexplosion', target.components.RenderableComponent);
            }
            else {

                em.removeEntityByName(target.getName());
                sb.publish('bigexplosion', target.components.RenderableComponent);
            }
        });

        sb.subscribe('collision', function(name, collisionComponents) {

            var enemy = null;

            if (collisionComponents[0].getGroup() === 'enemy') {
                enemy = collisionComponents[0];
            }
            else {
                enemy = collisionComponents[1];
            }
            var enemyEntity = enemy.getEntity();
            var hc = enemyEntity.components.HealthComponent;

            hc.setAmount(hc.getAmount() - 1);
            if (hc.getAmount() > 0) {

                sb.publish('explosion', enemyEntity.components.RenderableComponent);
            }
            else {
                hc.setAmount(0);

                sb.publish('bigexplosion', enemyEntity.components.RenderableComponent);

            }
            var player = null;

            if (collisionComponents[0].getGroup() == 'player') {
                player = collisionComponents[0];
            }
            else {
                player = collisionComponents[1];
            }
            var playerEntity = player.getEntity();
            var hc = playerEntity.components.HealthComponent;
            var sc = playerEntity.components.ShieldComponent;
            //renderable contains xyz of object so we know where to explode
            var pc = playerEntity.components.RenderableComponent;

            if (sc.getAmount() > 0)
                sc.setAmount(sc.getAmount() - 1);
            else
                hc.setAmount(hc.getAmount() - 1);

            if (hc.getAmount() > 0) {

                sb.publish('explosion', pc);
            }
            else {

                if (playerEntity.name == 'mothership') {

                    sb.publish('gameover', true);
                }
                hc.setAmount(0);
                sb.publish('bigexplosion', pc);
            }

        });

    };

    //}

    var update = function() {

        collisions.length = 0;
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.CollisionComponent) {
                //object is dead. no need to check for collisions
                if (le.components.HealthComponent && le.components.HealthComponent.amount < 1) {
                    continue;
                }

                var c = le.components.CollisionComponent;
                var r = le.components.RenderableComponent;

                c.setXPos(r.getXPos());
                c.setYPos(r.getYPos());
                c.setZPos(r.getZPos());
                c.setXWidth(r.getXWidth());
                c.setYWidth(r.getYWidth());
                c.setZWidth(r.getZWidth());
                c.setEntity(le);

                collisions.push(c);

            }
        }

        for (var i = 0; i < collisions.length; i++) {
            for (var j = 0; j < collisions.length; j++) {
                if (j != i &&
                    collisions[i].getXPos() - collisions[i].getXWidth() > collisions[j].getXPos() - collisions[j].getXWidth() &&
                    collisions[i].getXPos() - collisions[i].getXWidth() < collisions[j].getXPos() + collisions[j].getXWidth() &&
                    collisions[i].getZPos() - collisions[i].getZWidth() > collisions[j].getZPos() - collisions[j].getZWidth() &&
                    collisions[i].getZPos() - collisions[i].getZWidth() < collisions[j].getZPos() + collisions[j].getZWidth()
                    && collisions[i].getGroup() != collisions[j].getGroup()) {

                    sb.publish("collision", [collisions[i], collisions[j]]);

                }
            }

        }
    };

    return {
        update, draw: function() {
        }, init
    };
}