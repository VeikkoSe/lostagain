class MeshManager {
    constructor() {
        this.meshes = [];


    }
    getOrAdd(name,mesh) {
        if(this.meshes[name])
        return this.meshes[name];

        var m = new Mesh(name);
        this.meshes[name] = m;
        return m;
    }

}
