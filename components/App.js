import { initRouter } from "../utils/router.js";
import NotionEditPage from "./NotionEditPage.js";
import NotionPage from "./NotionPage.js";

export default function App({ $target }) {
  const $notionPageContainer = document.createElement("div");
  const $notionEditPageContainer = document.createElement("div");
  $notionPageContainer.className = "notionPageContainer";
  $notionEditPageContainer.className = "notionEditPageContainer";

  $target.appendChild($notionPageContainer);
  $target.appendChild($notionEditPageContainer);

  const notionPage = new NotionPage({
    $target: $notionPageContainer,
    initialState: [],
  });

  const editorPage = new NotionEditPage({
    $target: $notionEditPageContainer,
    initialState: {
      notionId: "new",
      notion: {
        title: "제목없음",
        content: "",
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    console.log(pathname);

    if (pathname === "/") {
      notionPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , notionId] = pathname.split("/");
      console.log(notionId);
      editorPage.setState({ notionId });
    }
  };

  this.route();
  initRouter(() => this.route());
}
