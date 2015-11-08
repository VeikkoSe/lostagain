function collisionProcess(sb, pubsub, helpers) {
    'use strict';

    var collisions = [];
    var em = sb.getEntityManager();

    var init = function() {

        pubsub.subscribe('bulletcollision', function(name, enemy) {

            var enemyEntity = enemy.getEntity();
            var hc = enemyEntity.components.HealthComponent;
            var sc = enemyEntity.components.ShieldComponent;

            helpers.createHit(hc, sc);

            if (hc.getAmount() > 0) {
                pubsub.publish('explosion', enemyEntity.components.RenderableComponent);
            }
            else {

                //hc.setAmount(0);
                pubsub.publish('enemyDeath', enemyEntity);
                pubsub.publish('bigexplosion', enemyEntity.components.RenderableComponent);
            }
        });
        /*
         sb.subscribe('enemycollision', function(name, collders) {

         var collider = collisionComponent[0];
         var enemy = collisionComponent[1];

         //var enemyEntity = enemy.getEntity();
         var hc = collider.components.HealthComponent;
         var sc = collider.components.ShieldComponent;

         var enemyHc = enemy.components.HealthComponent;
         var enemySc = enemy.components.ShieldComponent;

         helpers.createHit(hc, sc);
         helpers.createHit(enemyHc, enemySc);


         //hc.setAmount(hc.getAmount() - 1);
         if (hc.getAmount() > 0) {
         sb.publish('smallexplosion', collider.components.RenderableComponent);
         }
         else {
         sb.publish('bigexplosion', collider.components.RenderableComponent);
         }

         if (enemyHc.getAmount() > 0) {
         sb.publish('smallexplosion', enemy.components.RenderableComponent);
         }
         else {
         sb.publish('bigexplosion', enemy.components.RenderableComponent);
         }
         });

         */

        pubsub.subscribe('enemyhit', function(name, target) {

            //var enemy = collisionComponent;

            //var enemyEntity = enemy.getEntity();
            var hc = target.components.HealthComponent;
            var sc = target.components.ShieldComponent;

            helpers.createHit(hc, sc);

            //hc.setAmount(hc.getAmount() - 1);
            if (hc.getAmount() > 0) {
                pubsub.publish('smallexplosion', target.components.RenderableComponent);
            }
            else {

                hc.setAmount(0);
                pubsub.publish('bigexplosion', target.components.RenderableComponent);
                if (target.getName() === 'mothership') {
                    //em.removeEntityByName(target.getName());
                    pubsub.publish('gameover', true);
                }
                if (target.getName() === 'ship') {
                    pubsub.publish('respawn', true);
                }

            }
        });

        pubsub.subscribe('collision', function(name, cComponents) {

            var enemy = (cComponents[0].getGroup() === 'enemy') ? cComponents[0] : cComponents[1];

            var enemyEntity = enemy.getEntity();
            var hc = enemyEntity.components.HealthComponent;
            var sc = enemyEntity.components.ShieldComponent;

            helpers.createHit(hc, sc);
            //hc.setAmount(hc.getAmount() - 1);

            if (hc.getAmount() > 0) {
                pubsub.publish('explosion', enemyEntity.components.RenderableComponent);
            }
            else {
                hc.setAmount(0);
                pubsub.publish('enemyDeath', enemyEntity);
                pubsub.publish('bigexplosion', enemyEntity.components.RenderableComponent);
            }

            var player = (cComponents[0].getGroup() === 'player') ? cComponents[0] : cComponents[1];

            var playerEntity = player.getEntity();
            var hcp = playerEntity.components.HealthComponent;
            var scp = playerEntity.components.ShieldComponent;
            //renderable contains xyz of object so we know where to explode
            var pc = playerEntity.components.RenderableComponent;

            helpers.createHit(hcp, scp);

            //we don't explode the ship when shield take damage

            if (scp.getAmount() < 1 && hcp.getAmount() > 0) {

                pubsub.publish('explosion', pc);
            }
            else if (scp.getAmount() < 1 && hcp.getAmount() < 1) {

                hcp.setAmount(0);
                if (playerEntity.getName() === 'mothership') {
                    em.removeEntityByName(playerEntity.name);
                    pubsub.publish('gameover', true);
                }
                if (playerEntity.getName() === 'ship') {
                    pubsub.publish('respawn', true);
                }
                pubsub.publish('bigexplosion', pc);
            }

        });

    };

    var update = function() {

        collisions.length = 0;
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.CollisionComponent) {
                //object is dead. no need to check for collisions
                if (le.components.HealthComponent && le.components.HealthComponent.getAmount() < 1) {
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
                if (j !== i &&

                    collisions[i].getXPos() < collisions[j].getXPos() + collisions[j].getXWidth() &&
                    collisions[i].getXPos() + collisions[i].getXWidth() > collisions[j].getXPos() &&
                    collisions[i].getZPos() < collisions[j].getZPos() + collisions[j].getZWidth() &&
                    collisions[i].getZWidth() + collisions[i].getZPos() > collisions[j].getZPos() &&
                    collisions[i].getGroup() !== collisions[j].getGroup()) {

                    pubsub.publish('collision', [collisions[i], collisions[j]]);

                }
            }

        }
    };

    return Object.freeze({
        update,
        draw: function() {
        },
        init
    });
}