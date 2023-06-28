import { request } from "../utils/api.js";
import NotionList from "./NotionList.js";

export default function NotionPage({ $target }) {
  const $page = document.createElement("div");

  const notionList = new NotionList({
    $target: $page,
    initialState: [],
    onSelect: () => {
      // show the editor
    },
  });

  const fetchNotionList = async () => {
    const notionListData = await request("/");
    notionList.setState(notionListData);
  };

  this.render = async () => {
    await fetchNotionList();
    $target.appendChild($page);
  };
}
