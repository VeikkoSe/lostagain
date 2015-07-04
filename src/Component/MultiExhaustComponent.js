function MultiExhaustComponent() {
    //constructor() {
    let name = "MultiExhaustComponent";
    let exhaustComponents = [];


    //}

    let addExhaust = function (exhaustComponent) {
        exhaustComponents.push(exhaustComponent);
    }

    return {name, exhaustComponents, addExhaust}

}