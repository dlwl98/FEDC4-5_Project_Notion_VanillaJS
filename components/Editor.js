export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";

  $target.appendChild($editor);

  this.state = initialState;

  let isInitialize = false;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInitialize) {
      $editor.innerHTML = `
      <input type="text" name="title" value="${this.state.title}" />
      <div class="content" contentEditable="true" name="content">${this.state.content}</div>
    `;
      isInitialize = true;
    }
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;

    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.setState(nextState);
    }
    onEditing(this.state);
  });
}
