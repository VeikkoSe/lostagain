var EntityManager = function EntityManager() {
  "use strict";
  this.entities = [];
  this.maxId = 0;
};
($traceurRuntime.createClass)(EntityManager, {addNew: function() {
    "use strict";
    this.maxId++;
    var ent = new Entity(this.maxId);
    this.entities.push(ent);
    return ent;
  }}, {});
