/*
 * Loads assets
 */
function assetManager(pubsub, mesh, textureCreator) {
    'use strict';
    //  var sb = params;
    var meshes, textures, textures, loadingAmount, loadingMax;

    var init = function() {

        meshes = [];
        textures = [];
        loadingAmount = 0;
        loadingMax = 0;
        textures = [];

        pubsub.subscribe('assetload', function() {

            loadingAmount--;

            if (loadingAmount === 0) {
                pubsub.publish('allassetsloaded', true);
            }

        });

    };

    var getMesh = function(name) {
        if (meshes[name]) {
            return meshes[name];
        }

        loadingAmount++;
        loadingMax++;

        //var params = {name,game};
        //console.log(name);
        var m = mesh.load(name);

        meshes[name] = m;
        return m;
        // return meshes[name];
    };

    var getTexture = function(name, noflip, repeat) {

        if (textures[name]) {
            return textures[name];
        }
        //loadingAmount++;
        //loadingMax++;

        //var params = {name,game};
        //var s = sprite;

        var s = textureCreator.load(name, noflip, repeat);

        textures[name] = s;

        return textures[name];
    };

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
    return Object.freeze({
        getMesh,
        getTexture,
        init

    });

}
