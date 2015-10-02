function GunComponent() {
    "use strict";

    var name = "GunComponent";
    var shooting = false;
    var activeWeapon = 1;


    //}
    return {
        getName: function () {
            return name;
        },
        setShooting: function (v) {
            shooting = v;
        },
        getShooting: function () {
            return shooting;
        },
        setActiveWeapon: function (v) {
            activeWeapon = v;
        },
        getActiveWeapon: function () {
            return activeWeapon;
        }
    }

}