function asset_manager_constructor() {
    //  let sb = params;
    let meshes, textures, loadingAmount, loadingMax, sb;

    let init = function (sandbox) {

        sb = sandbox;

        meshes = [];
        textures = [];
        loadingAmount = 0;
        loadingMax = 0;

    }

    let start = function () {
        sb.subscribe("assetload", function (name, assetname) {


            loadingAmount--;
            //console.log(loadingAmount);
            if (loadingAmount === 0) {

                sb.publish("allassetsloaded", true);
            }


        });
    }

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

    }


    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        getTexture,
        getMesh,
        init,
        subscribe,
        start,
        getLoadingAmount: function () {
            return loadingAmount;
        }


    });


}
