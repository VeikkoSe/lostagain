class Entity {
    constructor(id, name = false) {
        this.id = id;
        this.name = name;
        this.components = {};
    }

    addComponent(component) {
        this.components[component.name] = component;
    }


}
