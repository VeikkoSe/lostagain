/*
 * Loads assets
 */
function assetManager() {
    'use strict';
    //  var sb = params;
    var meshes, sprites, textures, loadingAmount, loadingMax, sb;

    var init = function(sandbox) {

        sb = sandbox;

        meshes = [];
        textures = [];
        loadingAmount = 0;
        loadingMax = 0;
        sprites = [];

    };

    var start = function() {
        sb.subscribe('assetload', function() {

            loadingAmount--;

            if (loadingAmount === 0) {

                sb.publish('allassetsloaded', true);
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
        var m = mesh(sb);
        m.loadMesh(name);

        meshes[name] = m;

        return meshes[name];
    };

    var getSprite = function(name, noflip, repeat) {
        if (sprites[name]) {
            return sprites[name];
        }
        //loadingAmount++;
        //loadingMax++;

        //var params = {name,game};
        var s = sprite(sb);
        s.load(name, noflip, repeat);

        sprites[name] = s;

        return sprites[name];
    };

    var subscribe = function() {

    };
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
    return Object.freeze({
        getMesh,
        getSprite,
        init,
        subscribe,
        start
    });

}
