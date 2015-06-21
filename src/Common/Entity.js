function entity_constructor(params) {
    let {id, name} = params;
    // this.id = id;
    //  this.name = name;
    let components = {};


    let addComponent = function (component) {
        components[component.name] = component;
    };


    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        addComponent,
        id,
        name,
        components

    });
}
