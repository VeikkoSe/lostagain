function HealthComponent(amount) {
  var sprite = arguments[1] !== (void 0) ? arguments[1] : null;
  var name = "HealthComponent";
  var amount = amount;
  var sprite = sprite;
  return {
    name: name,
    getSprite: function() {
      return sprite;
    },
    getAmount: function() {
      return amount;
    },
    setAmount: function(v) {
      amount = v;
    }
  };
}
