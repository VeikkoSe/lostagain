//http://www.html5rocks.com/en/tutorials/webaudio/intro/
function BufferLoader(context, urlList, callback) {
    'use strict';
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
    'use strict';
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    var loader = this;

    request.onload = function() {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            function(buffer) {
                if (!buffer) {
                    throw new Error('error decoding file data: ' + url);

                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount === loader.urlList.length) {
                    loader.onload(loader.bufferList);
                }
            },
            function(error) {
                throw new Error('decodeAudioData error', error);
            }
        );
    };

    request.onerror = function() {
        throw new Error('BufferLoader: XHR error');
    };

    request.send();
};

BufferLoader.prototype.load = function() {
    'use strict';
    for (var i = 0; i < this.urlList.length; ++i) {
        this.loadBuffer(this.urlList[i], i);
    }
};

