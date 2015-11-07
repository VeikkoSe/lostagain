function audio() {
    'use strict';
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    var loadedBuffer = null;
    var bufferLoader;
    var destination = audioCtx.destination;

    var masterGain = audioCtx.createGain();
    var musicGain = audioCtx.createGain();
    var effectGain = audioCtx.createGain();
    var muteGain = audioCtx.createGain();

    var finishedLoading = function(buffer) {

        loadedBuffer = buffer;
    };

    var loadAllSounds = function(callback) {

        bufferLoader = new BufferLoader(
            audioCtx,
            [
                './resources/sound/music/150413_Processed_Results---free_download.ogg',
                './resources/sound/music/150413_Crime_Lab---free_download.ogg',
                './resources/sound/music/150413_Weird_Electro---free_download.ogg',
                './resources/sound/music/150413_World_Spinning---free_download.ogg',
                './resources/sound/music/150413_Victory_Gaze---free_download.ogg',
                './resources/sound/effect/cut_248293__chocobaggy__weird-laser-gun_gainmodified.ogg',
                './resources/sound/effect/174459__yottasounds__laser-003.ogg',
                './resources/sound/effect/28917__junggle__btn107.ogg',
                './resources/sound/effect/mothership_loop.ogg',
                './resources/sound/effect/80401__steveygos93__explosion2_gainmodified.ogg'
            ],
            finishedLoading
        );

        bufferLoader.load();

    };

    var startMusic = function(index, pos, loop) {

        var loopSound = ( typeof loop === 'undefined') ? false : loop;

        if (loadedBuffer === null) {
            return false;
        }

        var source = audioCtx.createBufferSource();

        source.buffer = loadedBuffer[index];

        source.connect(musicGain);
        if (loopSound) {
            source.loop = true;
        }
        source.start(pos);

    };

    var setMasterVolume = function(level) {
        masterGain.gain.value = level;
    };
    var setMusicVolume = function(level) {
        musicGain.gain.value = level;
    };
    var setEffectsVolume = function(level) {
        effectGain.gain.value = level;
    };

    var useSound = function(onoff) {
        muteGain.gain.value = 0;
        if(onoff===1) {
            muteGain.gain.value = 1;

        }
        console.log(muteGain.gain.value);
    };

    var  processAudio = function(e) {
        var buffer = e.inputBuffer.getChannelData(0);

        var isClipping = false;
        // Iterate through buffer to check if any of the |values| exceeds 1.
        for (var i = 0; i < buffer.length; i++) {
            var absValue = Math.abs(buffer[i]);
            if (absValue >= 1) {
                isClipping = true;
                break;
            }
        }
        console.log(isClipping);
    }


    var playSound = function(index, pos, loop) {

        var loopSound = ( typeof loop === 'undefined') ? false : loop;

        //if(loadedBuffer===null) {
        //  return false;
        //}

        var source = audioCtx.createBufferSource();
        //var source2 = context.createBufferSource();

        source.buffer = loadedBuffer[index];
        //source2.buffer = bufferList[1];

        //var gainNode = audioCtx.createGain();
        //audioCtx.destination
        source.connect(effectGain);
        //source2.connect(context.destination);
        if (loopSound) {
            source.loop = true;
        }
        source.start(pos);
    };

    var init = function() {

        loadAllSounds();

        var meter = audioCtx.createScriptProcessor(2048, 1, 1);
        meter.onaudioprocess = processAudio;


        muteGain.connect(destination);
        masterGain.connect(muteGain);
        musicGain.connect(masterGain);
        effectGain.connect(masterGain);

        muteGain.connect(meter);
        meter.connect(destination);


    };
    return Object.freeze({
        setEffectsVolume,
        setMusicVolume,
        useSound,
        startMusic,
        playSound,
        setMasterVolume,
        init, start: function() {
        }
    });
}


