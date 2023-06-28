import AddButton from "./AddButton.js";

export default function NotionList({ $target, initialState, onSelect }) {
  const $notionList = document.createElement("div");
  $notionList.className = "notionList";
  $target.appendChild($notionList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const $newNotionButton = document.createElement("button");
  $newNotionButton.textContent = "+ 페이지 추가";
  $target.appendChild($newNotionButton);

  this.render = () => {
    $notionList.innerHTML = `
            <h3>Notion_List</h3>
            <ul class="notion-list">
              ${this.state
                .map(
                  (notion) => `
                <li data-id="${notion.id}">${notion.title}</li>
              `
                )
                .join("")}
            </ul>
        `;
    // 버튼 추가시 api로 서버에 페이지 등록 해야해
    // new AddButton({
    //   $target: $notionList,
    //   onClick: ($ul, fetchCreateData) => {
    //     const $li = document.createElement("li");
    //     const $button = document.createElement("button");
    //     $li.textContent = fetchCreateData.title;
    //     $button.textContent = "+";
    //     $li.appendChild($button);
    //     $ul.appendChild($li);
    //   },
    // });
  };

  this.render();
}
