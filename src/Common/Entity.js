function entity_constructor(id, name) {
    "use strict";

    //var {id, name} = params;
    // this.id = id;
    //  this.name = name;
    var id = id;
    var name = name;
    var components = [];
    var componentCount = 0;

    var getName = function() {
        return name;
    }

    var hasComponent = function (name) {

        for (var i = 0; i < 5; i++) {

            if (components[name] !== undefined) {

                return true;
                break;
            }

        }
        return false;
    }

    var addComponent = function (component) {
        componentCount++;
        components[component.getName()] = component;
    };



    return { // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        addComponent,
        hasComponent,
        id,
        getName,
        components

    };
}
