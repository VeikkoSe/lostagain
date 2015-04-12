var GuiComponent = function GuiComponent(sprites) {
  "use strict";
  this.name = "GuiComponent";
  this.sprites = sprites;
};
($traceurRuntime.createClass)(GuiComponent, {}, {}, Component);
