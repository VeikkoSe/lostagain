class CollisionProcess extends Processor {
    constructor() {
        this.collisions = [];

    }

    update() {
        //TODO: afaik this is really slow
        this.collisions.length = 0;
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
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
                if (j!=i &&
                    this.collisions[i].xPos - this.collisions[i].xWidth > this.collisions[j].xPos - this.collisions[i].xWidth &&
                    this.collisions[i].xPos - this.collisions[i].xWidth < this.collisions[j].xPos + this.collisions[j].xWidth &&
                    this.collisions[i].zPos - this.collisions[i].zWidth > this.collisions[j].zPos - this.collisions[i].zWidth &&
                    this.collisions[i].zPos - this.collisions[i].zWidth < this.collisions[j].zPos + this.collisions[j].zWidth
                    && this.collisions[i].group!= this.collisions[j].group) {
                    //pub.publish( "inbox/newMessage", "hello world!" );
                    pub.publish("collision", [this.collisions[i],this.collisions[j]]);

                }
            }


            //console.log(this.collisions);

        }
    }
}