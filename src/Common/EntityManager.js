function entity_manager_constructor() {

    let entities = [];
    let maxId = 0;

    let addNew = function (name) {

        maxId++;
        let ent = entity_constructor({id: maxId, name: name});


        entities.push(ent);
        return ent;


    };


    let getEntityByName = function (name) {
        for (let e = 0; e < entities.length; e++) {
            if (entities[e].name == name)
                return entities[e];
        }
    };


    let clearAll = function () {

        entities.length = 0;
        maxId = 0;
    };

    let subscribe = function () {

    }

    return Object.freeze({
        clearAll,
        getEntityByName,
        addNew,
        entities,
        init: function () {
        },
        subscribe
    });

}