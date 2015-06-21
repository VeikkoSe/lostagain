function entity_constructor(params) {
  var $__0 = $traceurRuntime.assertObject(params),
      id = $__0.id,
      name = $__0.name;
  var components = {};
  var addComponent = function(component) {
    $traceurRuntime.setProperty(components, component.name, component);
  };
  return Object.freeze({
    addComponent: addComponent,
    id: id,
    name: name,
    components: components
  });
}
