import AddButton from "./AddButton.js";

export default function NotionList({ $target, initialState, onSelect }) {
    const $notionList = document.createElement("div");
    $notionList.className = "notionList";
    $target.appendChild($notionList);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

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
                `
            }
        }
        
        $notionList.innerHTML = `
            <h2>Notion_List</h2>
            <ul class="notion-list">
            </ul>
            ${addList}
        `;
    };
    // 첫 화면 렌더링시 페이지 추가 버튼 나오게 하기!
    const addList = new AddButton({
        $target: $notionList,
        onClick: ($ul) => {
            const $li = document.createElement("li");
            $li.textContent = "제목없음";
            $ul.appendChild($li);
        }
    });

    this.render();
}