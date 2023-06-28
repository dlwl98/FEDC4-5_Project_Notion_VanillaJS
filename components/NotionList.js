import { request } from "../utils/api.js";
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

  this.render = () => {
    const { notionLists } = this.state;
    
    if (notionLists) {
      $notionList.innerHTML = `
      <ul class="notion-list">
        ${notionLists.map(({id, title, document}) => 
          `<li data-id="${id}">
            ${title}
            <button>+</button>
          </li>`
        ).join("")}
      </ul>
    `;
    }
  }

    // const showList = (data) => {
    //   if (data.documents.length > 0) {
    //     return `
    //                 <ul data-id="${data._id}">
    //                     ${showList(data.documents)}   
    //                 </ul>
    //             `;
    //   } else {
    //     return `
    //                 <li data-id="${data._id}" class="notion-item">
    //                     ${data.title}
    //                     <button class="add">+</button>
    //                 </li>
    //             `;
    //   }
    // };

    
    
    new AddButton({
      $target,
      onClick: async ({$ul, createDataTitle, parent}) => {
        const $li = document.createElement("li");
        const $button = document.createElement("button");

        const createData = await request("/", {
          method: "POST",
          body: JSON.stringify({
            title: createDataTitle,
            parent: parent,
          }),
        });
        $li.textContent = createData.title;
        $button.textContent = "+";
        $li.appendChild($button);
        $ul.appendChild($li);
      },
    });
    this.render();
}