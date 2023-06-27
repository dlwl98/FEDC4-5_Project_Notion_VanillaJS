export default function AddButton({ $target, onclick }) {
    const $addButton = document.createElement("button");

    $target.appendChild($addButton);

    this.render = () => {
        $addButton.innerHTML = `
            <button class="addList">+ 페이지 추가</button>
        `;
    }

    this.render();

    $addButton.addEventListener("click", () => {
        const $ul = document.getElementsByClassName("notion-list");
        onclick($ul);
    });
}