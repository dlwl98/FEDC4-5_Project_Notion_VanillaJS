import Editor from "./Editor.js";
import { getItem, setItem } from "../utils/storage.js";
import { request } from "../utils/api.js";

export default function NotionEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = "notionEditPage";

  this.state = initialState;

  this.setState = async (nextState) => {
    if (this.state.notionId !== nextState.notionId) {
      notionLocalSaveKey = `tmp-notion-${nextState.notionId}`;
      this.state = nextState;
      await fetchNotion();
      return;
    }
    this.state = nextState;
    this.render();
    editor.setState(
      this.state.notion || {
        title: "제목없음",
        content: "",
      }
    );
  };

  let notionLocalSaveKey = `tmp-notion-${this.state.notionId}`;

  const notion = getItem(notionLocalSaveKey, {
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
      timer = setTimeout(async () => {
        await request(`/documents/${this.state.notionId}`, {
          method: "PUT",
          body: {},
        });
      }, 2000);
    },
  });

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchNotion = async () => {
    const { notionId } = this.state;

    if (notionId !== "new") {
      const notion = await request(`/documents/${notionId}`);

      this.setState({
        ...this.state,
        notion,
      });
    }
  };

  this.render();
}
