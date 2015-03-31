var EntityManager = function EntityManager() {
  "use strict";
  this.entities = [];
  this.maxId = 0;
};
($traceurRuntime.createClass)(EntityManager, {
  addNew: function() {
    "use strict";
    var name = arguments[0] !== (void 0) ? arguments[0] : false;
    this.maxId++;
    var ent = new Entity(this.maxId, name);
    this.entities.push(ent);
    return ent;
  },
  getEntityByName: function(name) {
    "use strict";
    for (var e = 0; e < this.entities.length; e++) {
      if (this.entities[$traceurRuntime.toProperty(e)].name == name)
        return this.entities[$traceurRuntime.toProperty(e)];
    }
  },
  clearAll: function() {
    "use strict";
    this.entities = [];
    this.maxId = 0;
  }
}, {});
