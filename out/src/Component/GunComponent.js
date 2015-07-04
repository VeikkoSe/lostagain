function GunComponent() {
  var name = "GunComponent";
  var shooting = false;
  var activeWeapon = 1;
  return {
    name: name,
    setShooting: function(v) {
      shooting = v;
    },
    getShooting: function() {
      return shooting;
    },
    setActiveWeapon: function(v) {
      activeWeapon = v;
    },
    getActiveWeapon: function() {
      return activeWeapon;
    }
  };
}
