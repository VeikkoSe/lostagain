function RenderableComponent() {
  var angleX = 0;
  var angleY = 0;
  var angleZ = 0;
  var xPos = 0;
  var yPos = 0;
  var zPos = 0;
  var scale = 1;
  var xWidth = 1;
  var yWidth = 1;
  var zWidth = 1;
  var name = "RenderableComponent";
  return {
    name: name,
    getXPos: function() {
      return xPos;
    },
    setXPos: function(v) {
      xPos = v;
    },
    getYPos: function() {
      return yPos;
    },
    setYPos: function(v) {
      yPos = v;
    },
    getZPos: function() {
      return zPos;
    },
    setZPos: function(v) {
      zPos = v;
    },
    getScale: function() {
      return scale;
    },
    setScale: function(v) {
      scale = v;
    },
    getAngleX: function() {
      return angleX;
    },
    setAngleX: function(v) {
      angleX = v;
    },
    getAngleY: function() {
      return angleY;
    },
    setAngleY: function(v) {
      angleY = v;
    },
    getAngleZ: function() {
      return angleZ;
    },
    setAngleZ: function(v) {
      angleZ = v;
    },
    getXWidth: function() {
      return xWidth;
    },
    setXWidth: function(v) {
      xWidth = v;
    },
    getYWidth: function() {
      return yWidth;
    },
    setYWidth: function(v) {
      yWidth = v;
    },
    getZWidth: function() {
      return zWidth;
    },
    setZWidth: function(v) {
      zWidth = v;
    }
  };
}
