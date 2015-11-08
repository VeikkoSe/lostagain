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
        var tc = new Texture(gl);
        //var s = new Sprite(gl, tc);

        var am = assetManager(pubsub, mesh(gl, pubsub, tc), tc);
        //var tc = textureCreator(gl);

        CORE.setEntityManagerModule(em);

        CORE.setAssetManagerModule(am);
        CORE.setActionMapperModule(actionMapper(pubsub));
        CORE.setCameraModule(camera(w, h, helpf));
        CORE.setTextModule(text(w, h, helpf));

        // modules.push(loader());
        CORE.setMaterialModule(material(gl, am));

        CORE.setEntityCreatorModule(entityCreator(gl, em, am, helpf));
        CORE.setAudioModule(audio(helpf));

        CORE.startModules(function() {

            CORE.getAudio().useSound(0);
            CORE.getAudio().setEffectsVolume(parseFloat(document.getElementById('effectsVolume').value));
            CORE.getAudio().setMusicVolume(parseFloat(document.getElementById('musicVolume').value));
            CORE.getAudio().setMasterVolume(parseFloat(document.getElementById('masterVolume').value));

            var states = {
                'gamestate': gameState(CORE, pubsub, helpf),
                'introstate': introState(CORE, pubsub, helpf),
                'levelupstate': levelupState(CORE, pubsub, helpf)

            };
            //introState(CORE),levelUpState(CORE) menuState(CORE)endState(CORE)
            var se = stateEngine(pubsub, states, loader(pubsub, CORE.getEntityCreator(), CORE.getEntityManager()));
            se.init();

        });

        document.getElementById('soundtoggle').onclick = function() {
            var e = document.getElementById('soundtoggle');

            if (e.className === 'soundon') {
                e.className = 'soundoff';
                CORE.getAudio().useSound(0);

            }
            else {
                e.className = 'soundon';
                CORE.getAudio().useSound(1);
            }
        };

        document.getElementById('masterVolume').onchange = function(e) {

            CORE.getAudio().setMasterVolume(parseFloat(this.value));
        };
        document.getElementById('musicVolume').onchange = function(e) {

            CORE.getAudio().setMusicVolume(parseFloat(this.value));
        };

        document.getElementById('effectsVolume').onchange = function(e) {

            CORE.getAudio().setEffectsVolume(parseFloat(this.value));
        };

    }
    catch (err) {
        throw err;
        //var err = new Error();
        console.log(err.stack);
    }

});

