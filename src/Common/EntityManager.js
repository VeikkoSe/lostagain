class EntityManager {
    constructor() {
        this.entities = [];
        this.maxId = 0;


    }

    addNew(name = false) {
        this.maxId++;
        var ent = new Entity(this.maxId, name);

        this.entities.push(ent);
        return ent;

    }


    getEntityByName(name) {
        for (var e = 0; e < this.entities.length; e++) {
            if (this.entities[e].name == name)
                return this.entities[e];
        }
    }

    clearAll() {
        this.entities = [];
        this.maxId = 0;
    }


}