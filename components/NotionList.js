import { request } from "../utils/api.js";

export default function NotionList({
  $target,
  initialState,
  onClick,
  // onAdd,
  onDelete,
}) {
  const $notionList = document.createElement("div");
  $notionList.className = "notionList";

  $target.appendChild($notionList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $notionList.innerHTML = `
      <ul class="notions">
        ${this.state
          .map(
            ({ id, title, document }) => `
          <li class="list" data-id="${id}">
            ${title}
            <button class="btn" data-id="${id}">x</button>
          </li>
          
        `
          )
          .join("")}
      </ul>
    `;
  };

  this.render();

  $notionList.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (e.target.className === "list") {
      onClick(id);
    } else {
      onDelete(id);
    }
  });
}
