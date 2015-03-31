var MultiRenderable = function MultiRenderable(renderables) {
  "use strict";
  this.name = 'MultiRenderable';
  this.renderables = renderables;
};
($traceurRuntime.createClass)(MultiRenderable, {}, {}, Component);
