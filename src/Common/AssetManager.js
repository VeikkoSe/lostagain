function asset_manager_constructor(sb) {
    //  let sb = params;
    let meshes = [];
    let textures = [];
    //let loading = 0;
    let loadingAmount = 0;
    let loadingMax = 0;


    let getMesh = function (name) {
        if (meshes[name])
            return meshes[name];

        loadingAmount++;
        loadingMax++;

        //console.log(loadingAmount);
        //let params = {name,game};
        let m = mesh_constructor(sb);
        m.loadMesh(name);

        meshes[name] = m;

        return meshes[name];
    };

    let getTexture = function (name) {
        /*
         if (textures[name])
         return textures[name];

         let m = new Texture(name);

         textures[name] = m;
         return m;*/
    };


    let subscribe = function () {
        sb.subscribe("assetload", function (name, assetname) {


            loadingAmount--;
            //console.log(loadingAmount);
            if (loadingAmount === 0) {

                sb.publish("allassetsloaded", true);
            }


        });
    }

    let init = function () {


    };


    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        getTexture,
        getMesh,
        init,
        subscribe,
        getLoadingAmount: function () {
            return loadingAmount;
        }


    });


}
