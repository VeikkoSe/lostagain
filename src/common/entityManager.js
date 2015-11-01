function entityManager() {
    'use strict';

    var entities = [];
    var maxId = 0;

    var addNew = function(name) {

        maxId++;

        var ent = entity(maxId, name);

        entities.push(ent);
        return ent;

    };
    var removeEntityByName = function(name) {
        for (var e = 0; e < entities.length; e++) {
            if (entities[e].getName() == name)
                entities.splice(e, 1);

        }

    };

    var removeEntityById = function(id) {
        for (var e = 0; e < entities.length; e++) {
            if (entities[e].getId() == id)
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
        removeEntityById,
        getEntityByName,
        addNew,
        entities,
        init: function() {
        },

        subscribe
    });

}