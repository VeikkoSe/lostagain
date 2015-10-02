function ShieldComponent(amount, sprite) {
    "use strict";

    //constructor(amount, sprite = null) {
    var name = "ShieldComponent";
    var amount = amount;
    var sprite = sprite;


    //}

    return {
        getName: function () {
            return name;
        },
        getAmount: function () {
            return amount;
        },
        setAmount: function (v) {
            amount = v;
        },
        getSprite: function (v) {
            return sprite;
        },
    }


}