export default function Editor({ $target, initialState }) {
    const $editor = document.createElement("div");
    $target.appendChild($editor);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $editor.innerHTML = `
            <div contenteditable="true"></div>
        `
    }

    this.render();
}