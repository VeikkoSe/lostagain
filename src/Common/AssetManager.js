class AssetManager {
    constructor() {
        this.meshes = [];
        this.textures = [];
    }

    getOrAddMesh(name, mesh) {
        if (this.meshes[name])
            return this.meshes[name];

        var m = new Mesh(name);

        this.meshes[name] = m;
        return m;
    }

    getOrAddTexture(name) {
        if (this.textures[name])
            return this.textures[name];

        var m = new Texture(name);

        this.textures[name] = m;
        return m;
    }


    handleLoaded() {

    }


}
