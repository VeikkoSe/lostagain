function HealthComponent(amount, sprite = null) {
    //constructor(amount, sprite = null) {

    let name = "HealthComponent";
    let amount = amount;

    let sprite = sprite;


    //}
    return {name, getSprite: function() {return sprite},getAmount(){return  amount},setAmount:function (v){amount = v;}
    }


}