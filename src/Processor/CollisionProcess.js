class CollisionProcess extends Processor {
    constructor() {
        this.collisions = [];


        var that = this;
        pub.subscribe("collision", function (name, collisionComponents) {

            if (collisionComponents[0].group == 'enemy')
            {
                var enemy = collisionComponents[0];
            }
            else if(collisionComponents[1].group == 'enemy')
            {
                var enemy = collisionComponents[1];
            }
            var enemyEntity = enemy.entity;
            var hc = enemyEntity.components.HealthComponent;
            var ec = enemyEntity.components.EnemyComponent;

            hc.amount--;
            if(hc.amount>0) {

                pub.publish("explosion", enemyEntity.components.Renderable);
            }
            else {

                hc.amount=0;
                pub.publish("bigexplosion", enemyEntity.components.Renderable);
            }
            //that.createNewExplosion(that, collisionComponents[0].xPos, collisionComponents[0].zPos);



            if (collisionComponents[0].group == 'player')
            {
                var player = collisionComponents[0];
            }
            else if(collisionComponents[1].group == 'player')
            {
                var player = collisionComponents[1];
            }
            var playerEntity = player.entity;
            var hc = playerEntity.components.HealthComponent;
            //renderable contains xyz of object so we know where to explode
            var pc = playerEntity.components.Renderable;

            hc.amount--;
            if(hc.amount>0) {

                pub.publish("explosion", pc);
            }
            else {

                hc.amount=0;
                pub.publish("bigexplosion", pc);
            }





        });












    }

    update() {
        this.collisions =[];
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.CollisionComponent) {
                //object is dead. no need to check for collisions

                if(le.components.HealthComponent && le.components.HealthComponent.amount<1) {

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
                if (j!=i &&
                    this.collisions[i].xPos - this.collisions[i].xWidth > this.collisions[j].xPos - this.collisions[i].xWidth &&
                    this.collisions[i].xPos - this.collisions[i].xWidth < this.collisions[j].xPos + this.collisions[j].xWidth &&
                    this.collisions[i].zPos - this.collisions[i].zWidth > this.collisions[j].zPos - this.collisions[i].zWidth &&
                    this.collisions[i].zPos - this.collisions[i].zWidth < this.collisions[j].zPos + this.collisions[j].zWidth
                    && this.collisions[i].group!= this.collisions[j].group) {


                    pub.publish("collision", [this.collisions[i],this.collisions[j]]);

                }
            }


            //console.log(this.collisions);

        }
    }
}