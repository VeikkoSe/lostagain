/*
 * Loads assets
 */
function assetManager(pubsub, mesh, sprite) {
    'use strict';
    //  var sb = params;
    var meshes, sprites, textures, loadingAmount, loadingMax;

    var init = function() {

        meshes = [];
        textures = [];
        loadingAmount = 0;
        loadingMax = 0;
        sprites = [];

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

    var getSprite = function(name, noflip, repeat) {

        if (sprites[name]) {
            return sprites[name];
        }
        //loadingAmount++;
        //loadingMax++;

        //var params = {name,game};
        //var s = sprite;
        var s = sprite.load(name, noflip, repeat);
        console.log(s);
        sprites[name] = s;

        return sprites[name];
    };

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
    return Object.freeze({
        getMesh,
        getSprite,
        init

    });

}
