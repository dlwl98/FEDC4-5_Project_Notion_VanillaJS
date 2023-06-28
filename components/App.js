import { request } from "../utils/api.js";
import { setItem } from "../utils/storage.js";
import Editor from "./Editor.js";
import NotionEditPage from "./NotionEditPage.js";
import NotionPage from "./NotionPage.js";

export default function App({ $target }) {
  const notionPage = new NotionPage({ $target });

  notionPage.render();

  const notionEditPage = new NotionEditPage({
    $target,
    initialState: {
      notionId: "new",
    },
  });

  notionEditPage.setState({
    notionId: 1,
  });
}
