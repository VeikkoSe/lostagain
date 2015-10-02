function entity_manager_constructor() {
    "use strict";

    var entities = [];
    var maxId = 0;

    var addNew = function (name) {


        maxId++;

        var ent = entity_constructor(maxId, name);


        entities.push(ent);
        return ent;


    };


    var getEntityByName = function (name) {
        for (var e = 0; e < entities.length; e++) {
            if (entities[e].name == name)
                return entities[e];
        }
    };


    var clearAll = function () {

        entities.length = 0;
        maxId = 0;
    };

    var subscribe = function () {

    };

    return Object.freeze({
        clearAll,
        getEntityByName,
        addNew,
        entities,
        init: function () {
        },
        start: function () {
        },
        subscribe
    });

}