function entity_manager_constructor() {
    'use strict';

    var entities = [];
    var maxId = 0;

    var addNew = function(name) {

        maxId++;

        var ent = entity_constructor(maxId, name);

        entities.push(ent);
        return ent;

    };
    var removeEntityByName = function(name) {
        for (var e = 0; e < entities.length; e++) {
            if (entities[e].getName() == name)
                entities.splice(e, 1);

        }

    };

    var getEntityByName = function(name) {
        for (var e = 0; e < entities.length; e++) {
            if (entities[e].getName() == name)
                return entities[e];
        }
    };

    var clearAll = function() {

        entities.length = 0;
        maxId = 0;
    };

    var subscribe = function() {

    };

    return Object.freeze({
        clearAll,
        removeEntityByName,
        getEntityByName,
        addNew,
        entities,
        init: function() {
        },
        start: function() {
        },
        subscribe
    });

}