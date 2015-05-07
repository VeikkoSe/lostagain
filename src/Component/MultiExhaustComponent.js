class MultiExhaustComponent extends Component {
    constructor() {
        this.name = "MultiExhaustComponent";
        this.exhaustComponents = [];



    }
    addExhaust(exhaustComponent) {
        this.exhaustComponents.push(exhaustComponent);
    }


}