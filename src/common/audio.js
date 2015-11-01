function audio() {
    'use strict';
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    var source;
    //https://ourmusicbox.com/
    //TODO: Add correct copyright notices
    var sountrack = ['./sound/music/150413_Processed_Results---free_download.ogg',
        './sound/music/150413_Crime_Lab---free_download.ogg',
        './sound/music/150413_Weird_Electro---free_download.ogg',
        './sound/music/150413_World_Spinning---free_download.ogg',
        './sound/music/150413_Victory_Gaze---free_download.ogg'];
    var url = sountrack[randomIntFromInterval(0, 4)];

    var getData = function() {
        source = audioCtx.createBufferSource();
        var request = new XMLHttpRequest();

        request.open('GET', url, true);

        request.responseType = 'arraybuffer';

        request.onload = function() {
            var audioData = request.response;

            audioCtx.decodeAudioData(audioData, function(buffer) {
                    source.buffer = buffer;

                    source.connect(audioCtx.destination);
                    source.loop = true;
                    source.start(0);
                },

                function(e) {
                    alert('Error with decoding audio data' + e.err);
                });

        };

        request.send();
    };

    var setMasterVolume = function(percent) {

        if (percent === 0) {
            if (typeof source !== 'undefined') {
                source.stop();
            }
        }
        else {

            getData();

        }
    }

    var init = function() {
        //getData();

        //source.start(0);
    };
    return Object.freeze({
        setMasterVolume,
        init, start: function() {
        }
    });
}


