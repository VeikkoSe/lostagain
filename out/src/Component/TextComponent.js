var TextComponent = function TextComponent(level) {
  "use strict";
  this.name = "TextComponent";
  var t = new TextTimer();
  this.texts = t.getLevelText(level);
};
($traceurRuntime.createClass)(TextComponent, {}, {}, Component);
