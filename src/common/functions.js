document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    try {

        var w = 1024;
        var h = 768;

        var pubsub = new PubSub();
        var helpf = helpers();

        //var modules = [];

        var CORE = core(w, h);
        CORE.init();


        var gl = CORE.getGL();

        var em = entityManager();
        var tc = textureCreator(gl);
        var am = assetManager(pubsub, mesh(gl, pubsub, tc), sprite(gl, tc));
        //var tc = textureCreator(gl);

        CORE.setEntityManagerModule(em);

        CORE.setAssetManagerModule(am);
        CORE.setActionMapperModule(actionMapper(pubsub));
        CORE.setCameraModule(camera(w, h,helpf));
        CORE.setTextModule(text(w, h,helpf));

        // modules.push(loader());
        CORE.setShaderManagerModule(shaderManager(gl));

        CORE.setEntityCreatorModule(entityCreator(gl, em, am, helpf));
        CORE.setAudioModule(audio(helpf));

        CORE.startModules(function() {
            CORE.setAudioMasterVolume(0);
            var states = {
                'gamestate': gameState(CORE, pubsub,helpf),
                'introstate': introState(CORE, pubsub,helpf),
                'levelupstate': levelupState(CORE, pubsub,helpf)

            };
            //introState(CORE),levelUpState(CORE) menuState(CORE)endState(CORE)
            var se = stateEngine(pubsub, states, loader(pubsub, CORE.getEntityCreator(), CORE.getEntityManager()));
            se.init();

        });

        document.getElementById('soundtoggle').onclick = function() {
            helpf.swap('soundtoggle', CORE);
        };

    }
    catch (err) {
        throw err;
        //var err = new Error();
        //console.log(err.stack);
    }


});