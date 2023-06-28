import { request } from "../utils/api.js";

export default function AddButton({ $target, onClick }) {
  const $addButton = document.createElement("button");
  $addButton.textContent = "+ 페이지 추가";
  $addButton.className = "addList";

  $target.appendChild($addButton);

  $addButton.addEventListener("click", async () => {
    const $ul = document.getElementsByClassName("notion-list")[0];
    await onClick({
      $ul,
      createDataTitle: "제목없음",
      parent: null,
    });
  });
}
