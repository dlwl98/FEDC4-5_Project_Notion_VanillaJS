export default function Editor({ $target, initialState }) {
    const $editor = document.createElement("div");
    $editor.contentEditable = "true";
    $target.appendChild($editor);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
    }

    this.render();
}