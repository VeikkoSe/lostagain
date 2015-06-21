function MultiExhaustComponent() {
  var name = "MultiExhaustComponent";
  var exhaustComponents = [];
  var addExhaust = function(exhaustComponent) {
    exhaustComponents.push(exhaustComponent);
  };
  return {
    name: name,
    exhaustComponents: exhaustComponents
  };
}
