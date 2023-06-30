import NotionList from "./NotionList.js";
import { request } from "../utils/api.js";
import { push } from "../utils/router.js";

export default function NotionPage({ $target, initialState, onClick }) {
  const $page = document.createElement("div");
  $page.className = "notionPage";

  $target.appendChild($page);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const notionList = new NotionList({
    $target: $page,
    initialState: this.state,
    onClick,
    // onAdd: () => {},
    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      // previous history로 넘어가기
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

  this.render();
}
