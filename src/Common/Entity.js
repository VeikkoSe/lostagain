function entity_constructor(id, name) {
    'use strict';

    //var {id, name} = params;
    // this.id = id;
    //  this.name = name;
    var id = id;
    //var name = name;
    var components = [];
    var componentCount = 0;

    var getName = function() {
        return name;
    };

    var getId = function() {
        return id;
    };

    var hasComponent = function(name) {


        if (components[name] !== undefined) {
            return true;
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
        components,
            getId

    };
}
