function collisionprocess_constructor(sb) {
    //constructor() {
    let collisions = [];
    let gl = sb.getGL();
    let em = sb.getEntityManager();


    //let that = this;

    let subscribe = function () {
        pub.subscribe("bulletcollision", function (name, collisionComponent) {
            let enemy = collisionComponent;

            let enemyEntity = enemy.entity;
            let hc = enemyEntity.components.HealthComponent;


            hc.amount--;
            if (hc.amount > 0) {
                pub.publish("explosion", enemyEntity.components.RenderableComponent);
            }
            else {
                hc.amount = 0;
                pub.publish("bigexplosion", enemyEntity.components.RenderableComponent);
            }
        });

        pub.subscribe("collision", function (name, collisionComponents) {


            if (collisionComponents[0].group == 'enemy') {
                let enemy = collisionComponents[0];
            }
            else if (collisionComponents[1].group == 'enemy') {
                let enemy = collisionComponents[1];
            }
            let enemyEntity = enemy.entity;
            let hc = enemyEntity.components.HealthComponent;


            hc.amount--;
            if (hc.amount > 0) {
                pub.publish("explosion", enemyEntity.components.RenderableComponent);
            }
            else {
                hc.amount = 0;
                pub.publish("bigexplosion", enemyEntity.components.RenderableComponent);

            }

            if (collisionComponents[0].group == 'player') {
                let player = collisionComponents[0];
            }
            else if (collisionComponents[1].group == 'player') {
                let player = collisionComponents[1];
            }
            let playerEntity = player.entity;
            let hc = playerEntity.components.HealthComponent;
            let sc = playerEntity.components.ShieldComponent;
            //renderable contains xyz of object so we know where to explode
            let pc = playerEntity.components.RenderableComponent;

            if (sc.amount > 0)
                sc.amount--;
            else
                hc.amount--;

            if (hc.amount > 0) {

                pub.publish("explosion", pc);
            }
            else {

                if (playerEntity.name == 'mothership') {
                    pub.publish("gameover", true);
                }
                hc.amount = 0;
                pub.publish("bigexplosion", pc);
            }


        });
    }


    //}

    let update = function () {
        collisions.length = 0;
        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];
            if (le.components.CollisionComponent) {
                //object is dead. no need to check for collisions
                if (le.components.HealthComponent && le.components.HealthComponent.amount < 1) {

                    continue;
                }

                let c = le.components.CollisionComponent;
                let r = le.components.RenderableComponent;
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


        for (let i = 0; i < collisions.length; i++) {
            for (let j = 0; j < collisions.length; j++) {
                if (j != i &&
                    collisions[i].xPos - collisions[i].xWidth > collisions[j].xPos - collisions[j].xWidth &&
                    collisions[i].xPos - collisions[i].xWidth < collisions[j].xPos + collisions[j].xWidth &&
                    collisions[i].zPos - collisions[i].zWidth > collisions[j].zPos - collisions[j].zWidth &&
                    collisions[i].zPos - collisions[i].zWidth < collisions[j].zPos + collisions[j].zWidth
                    && collisions[i].group != collisions[j].group) {


                    sb.publish("collision", [collisions[i], collisions[j]]);

                }
            }


        }
    }


    return {
        update, draw: function () {
        }, init: function () {
        }
    }
}