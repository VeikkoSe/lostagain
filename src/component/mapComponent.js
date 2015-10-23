function mapComponent() {
    'use strict';

    var name = 'MapComponent';

    var xGridWorldPos = 0;
    var yGridWorldPos = 0;
    var xPlayerPos = 0;
    var yPlayerPos = 0;
    var width = 0;
    var height = 0;
    var visited = {};
    var holes = {};
    var xEndBoss = 5;
    var yEndBoss = 5;
    //this.texture = texture;

    var movingUp = 0;
    var movingDown = 0;
    var movingLeft = 0;
    var movingRight = 0;
    var selecting = false;
    var selectMap = false;

    return Object.freeze({
        getName: function() {
            return name;
        }
    });

}
