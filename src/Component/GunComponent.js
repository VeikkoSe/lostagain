function GunComponent() {
    //constructor() {
    let name = "GunComponent";
    let shooting = false;
    let activeWeapon = 1;


    //}
    return {
        name,
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