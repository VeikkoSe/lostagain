/*
 *
 * audio tests
 */
/*
 (function() {

 var context;
 var source, sourceJs;
 var analyser;
 var buffer;
 var url = './sound/music/adompotd.ogg';
 var array = new Array();

 try {
 if(typeof webkitAudioContext === 'function' || 'webkitAudioContext' in window) {
 context = new webkitAudioContext();
 }
 else {
 context = new AudioContext();
 }
 }
 catch(e) {
 $('#info').text('Web Audio API is not supported in this browser');
 }


 var request = new XMLHttpRequest();
 request.open('GET', url, true);
 request.responseType = "arraybuffer";

 request.onload = function() {
 context.decodeAudioData(
 request.response,
 function(buffer) {
 if(!buffer) {
 // Error decoding file data
 return;
 }

 sourceJs = context.createScriptProcessor(2048, 1, 1);
 sourceJs.buffer = buffer;
 sourceJs.connect(context.destination);
 analyser = context.createAnalyser();
 analyser.smoothingTimeConstant = 0.6;
 analyser.fftSize = 512;

 source = context.createBufferSource();
 source.buffer = buffer;

 source.connect(analyser);
 analyser.connect(sourceJs);
 source.connect(context.destination);

 sourceJs.onaudioprocess = function(e) {
 array = new Uint8Array(analyser.frequencyBinCount);
 analyser.getByteFrequencyData(array);
 };

 source.start(0);
 },

 function(error) {
 // Decoding error
 }
 );
 };

 request.send();

 })();

 */