class TextComponent extends Component {
    constructor(level) {
        this.name = "TextComponent";

        var t = new TextTimer();
        this.texts = t.getLevelText(level);
    }
}

