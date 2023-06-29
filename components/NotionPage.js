import NotionList from "./NotionList.js";
import { request } from "../utils/api.js";
import { push } from "../utils/router.js";

export default function NotionPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = "notionPage";

  const $addNewRootNotion = document.createElement("button");
  $addNewRootNotion.className = "addNewRootNotion";
  $addNewRootNotion.textContent = "+ 페이지 추가";

  $target.appendChild($page);
  $page.appendChild($addNewRootNotion);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const notionList = new NotionList({
    $target: $page,
    initialState,
    onClick: (id) => {
      push(`/documents/${id}`);
    },
    onAdd: () => {},
    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      this.render();
    },
  });

  this.render = () => {
    fetchNotionList();
  };

  const fetchNotionList = async () => {
    const storedNotions = await request("/documents");
    notionList.setState(storedNotions);
  };

  const fetchAddNotion = async () => {
    await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "제목없음",
        parent: null,
      }),
    });
    this.render();
  };

  this.render();

  $addNewRootNotion.addEventListener("click", () => {
    fetchAddNotion();
  });
}
