import { request } from "../utils/api.js";
import Editor from "./Editor.js";
import NotionList from "./NotionList.js";

export default function App({ $target }) {
  const $notionListContainer = document.createElement("div");
  const $editorContainer = document.createElement("div");

  $target.appendChild($notionListContainer);
  $target.appendChild($editorContainer);

  this.state = {
    notionLists: [],
    selectedNotion: null,
    editorContent: "",
  };

  this.setState = (nextState) => {
    this.state = nextState;
    notionList.setState({
      notionLists: this.state.notionLists,
    });
    this.render();
  };

  const editor = new Editor({
    $target: $editorContainer,
    initialState: {
      content: "",
    },
  });
  const notionList = new NotionList({
    $target: $notionListContainer,
    initialState: [],
    onSelect: () => {
      // show the editor
    },
  });

  this.render = () => {};

  const fetchNotionList = async () => {
    const notionListData = await request("/");
    this.setState({
      ...this.state,
      notionLists: notionListData,
    });
  };

  fetchNotionList();
}
