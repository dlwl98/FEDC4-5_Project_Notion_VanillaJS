import AddButton from "./AddButton.js";

export default function NotionList({ $target, initialState, onSelect }) {
  const $notionList = document.createElement("div");
  const addListContainer = document.createElement("div");
  $notionList.className = "notionList";
  $target.appendChild($notionList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { notionLists } = this.state;

    const showList = (data) => {
      if (data.documents.length > 0) {
        return `
                    <ul data-id="${data._id}">
                        ${showList(data.documents)}   
                    </ul>
                `;
      } else {
        return `
                    <li data-id="${data._id}" class="notion-item">
                        ${data.title}
                        <button class="add">+</button>
                    </li>
                `;
      }
    };

    $notionList.innerHTML = `
            <h3>Notion_List</h3>
            <ul class="notion-list">
            </ul>
        `;
    // 버튼 추가시 api로 서버에 페이지 등록 해야해
    new AddButton({
      $target: $notionList,
      onClick: ($ul, fetchCreateData) => {
        const $li = document.createElement("li");
        const $button = document.createElement("button");
        $li.textContent = fetchCreateData.title;
        $button.textContent = "+";
        $li.appendChild($button);
        $ul.appendChild($li);
      },
    });
  };

  this.render();
}
