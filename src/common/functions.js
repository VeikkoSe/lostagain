document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    try {
        //game resolution
        var w = 512;
        var h = 512;

        //publish/subscribe provider
        var pubsub = new PubSub();
        //helper functions
        var helpf = helpers();

        //core for some injections
        //can do without in the future perhaps
        var CORE = core(w, h);
        CORE.init();

        var gl = CORE.getGL();

        //handles entity creation
        var em = entityManager();

        //assetmanager for mesh and textures
        //texture loading
        var tc = new Texture(gl);
        var am = assetManager(pubsub, mesh(gl, pubsub), tc);

        CORE.setEntityManagerModule(em);

        CORE.setAssetManagerModule(am);
        CORE.setActionMapperModule(actionMapper(pubsub));
        CORE.setCameraModule(camera(w, h, helpf));
        CORE.setTextModule(text(w, h, helpf));

        CORE.setMaterialModule(material(gl, am));

        CORE.setEntityCreatorModule(entityCreator(gl, em, am, helpf));
        CORE.setAudioModule(audio(helpf));

        CORE.startModules(function() {

            //after modules have been started we start
            //audio off
            //some initial volumes
            CORE.getAudio().useSound(0);
            CORE.getAudio().setEffectsVolume(parseFloat(document.getElementById('effectsVolume').value));
            CORE.getAudio().setMusicVolume(parseFloat(document.getElementById('musicVolume').value));
            CORE.getAudio().setMasterVolume(parseFloat(document.getElementById('masterVolume').value));

            //gamestate processlist
            //order matters because minimizing shader changes is preferred
            var gSP = [];

            gSP.push(gameLogicProcess(CORE, pubsub));

            gSP.push(chaseProcess(CORE));
            gSP.push(faceProcess(CORE));
            gSP.push(pulseGunProcess(CORE, pubsub, helpf));
            gSP.push(movementProcess(CORE, pubsub, helpf));

            gSP.push(trailProcess(CORE, helpf));
            gSP.push(collisionProcess(CORE, pubsub, helpf));
            gSP.push(timedTextProcess(CORE));
            gSP.push(scoreProcess(CORE));

            gSP.push(textProcess(CORE));
            gSP.push(starProcess(CORE));

            //simplest shader
            gSP.push(teleportProcess(CORE, helpf));
            gSP.push(laserProcess(CORE, pubsub, helpf));
            gSP.push(primitiveProcess(CORE));

            //gui shader
            gSP.push(text2dProcess(CORE));
            gSP.push(layoutProcess(CORE));

            //per-fragment shader
            gSP.push(exhaustProcess(CORE, helpf));
            gSP.push(renderProcess(CORE, helpf));

            gSP.push(shieldProcess(CORE));

            //gSP.push(postProcess(CORE));

            //game state processes that don't pause when pause is pressed
            var gSPNoPause = [];
            gSPNoPause.push(explosionProcess(CORE, pubsub));
            gSPNoPause.push(cameraControllerProcess(CORE, pubsub));
            gSPNoPause.push(pauseProcess(CORE));

            //load state processes
            var lSP = [];
            lSP.push(renderProcess(CORE, helpf));
            lSP.push(menuProcess(CORE, pubsub));
            var hg = hexagon(4);
            lSP.push(levelupProcess(CORE, hg));

            lSP.push(starMoveProcess(CORE));

            //intro state processes
            var iSP = [];
            iSP.push(renderProcess(CORE, helpf));
            iSP.push(menuProcess(CORE, pubsub));

            //we pass the states to statemanager that handles changes
            var states = {
                'gamestate': gameState(CORE, pubsub, gSP, gSPNoPause),
                'introstate': introState(CORE, iSP),
                'levelupstate': levelupState(CORE, lSP)

            };
            var se = stateEngine(pubsub, states, loader(pubsub, CORE.getEntityCreator(), CORE.getEntityManager()));
            //we start the game
            se.init();

        });

        //VOLUME CONTROLS
        //TODO: create opengl gui for these
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

