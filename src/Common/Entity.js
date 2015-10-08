function entity_constructor(id, name) {
    'use strict';

    //var {id, name} = params;
    // this.id = id;
    //  this.name = name;
    //var id = id;
    //var name = name;
    var components = [];
    var componentCount = 0;

    var getName = function() {
        return name;
    };

    var hasComponent = function(name) {

        for (var i = 0; i < 5; i++) {

            if (components[name] !== undefined) {
                return true;
            }

        }
        return false;
    };

    var addComponent = function(component) {
        componentCount++;
        components[component.getName()] = component;
    };

    return {
        addComponent,
        hasComponent,
        id,
        getName,
        components

    };
}
