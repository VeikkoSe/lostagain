function HealthComponent(amount, sprite) {
    "use strict";

    //constructor(amount, sprite = null) {

    var name = "HealthComponent";
    var amount = amount;

    var sprite = sprite;


    //}
    return {
        getName: function () {
            return name;
        },
        getSprite: function () {
            return sprite;
        },
        getAmount: function () {
            return amount;
        },
        setAmount: function (v) {
            amount = v;
        }
    }


}