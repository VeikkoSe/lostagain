function entity_manager_constructor() {
  var entities = [];
  var maxId = 0;
  var addNew = function(name) {
    maxId++;
    var ent = entity_constructor({
      id: maxId,
      name: name
    });
    entities.push(ent);
    return ent;
  };
  var getEntityByName = function(name) {
    {
      try {
        throw undefined;
      } catch ($e) {
        {
          $e = 0;
          for (; $e < entities.length; $e++) {
            try {
              throw undefined;
            } catch (e) {
              {
                e = $e;
                try {
                  if (entities[$traceurRuntime.toProperty(e)].name == name)
                    return entities[$traceurRuntime.toProperty(e)];
                } finally {
                  $e = e;
                }
              }
            }
          }
        }
      }
    }
  };
  var clearAll = function() {
    entities.length = 0;
    maxId = 0;
  };
  var subscribe = function() {};
  return Object.freeze({
    clearAll: clearAll,
    getEntityByName: getEntityByName,
    addNew: addNew,
    entities: entities,
    init: function() {},
    start: function() {},
    subscribe: subscribe
  });
}
