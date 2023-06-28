import { request } from "../utils/api.js";
import { getItem, setItem } from "../utils/storage.js";
import Editor from "./Editor.js";

export default function NotionEditPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  const NOTION_SAVE_KEY = `notion-${this.state.notionId}`;

  const notion = getItem(NOTION_SAVE_KEY, {
    title: "제목없음",
    content: "",
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: notion,
    onEditing: (notion) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setItem(NOTION_SAVE_KEY, {
          ...notion,
          saveDate: new Date(),
        });
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.notionId !== nextState.notionId) {
      this.state = nextState;
      await fetchNotion();
      return;
    }
    this.state = nextState;
    this.render();

    editor.setState(this.state.notion);
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchNotion = async () => {
    const { notionId } = this.state;
    if (notionId !== "new") {
      const notion = await request(`/${notionId}`);

      this.setState({
        ...this.state,
        notion,
      });
    }
  };

  this.render();
}
