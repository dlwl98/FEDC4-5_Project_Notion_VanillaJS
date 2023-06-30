import { request } from "../utils/api.js";
import { initRouter } from "../utils/router.js";
import NotionEditPage from "./NotionEditPage.js";
import NotionPage from "./NotionPage.js";

export default function App({ $target }) {
  const $notionPageContainer = document.createElement("div");
  const $notionEditPageContainer = document.createElement("div");
  $notionPageContainer.className = "notionPageContainer";
  $notionEditPageContainer.className = "notionEditPageContainer";

  const $addNewRootNotion = document.createElement("button");
  $addNewRootNotion.className = "addNewRootNotion";
  $addNewRootNotion.textContent = "+ 페이지 추가";

  $target.appendChild($notionPageContainer);
  $target.appendChild($notionEditPageContainer);
  $notionPageContainer.appendChild($addNewRootNotion);

  const notionPage = new NotionPage({
    $target: $notionPageContainer,
    initialState: [],
    onClick: (id) => {
      history.pushState(null, null, `/documents/${id}`);
      this.route();
    },
  });

  const editorPage = new NotionEditPage({
    $target: $notionEditPageContainer,
    initialState: null,
    // {
    //   title: "나영팀은 왜 이지경이 되었을까?",
    //   content: "내가 문제인가? 애들이 문제인가? 그것이 문제로다",
    // },
    // {
    //   notionId: "new",
    //   notion: {
    //     title: "제목없음",
    //     content: "",
    //   },
    // },
  });

  // 라우팅 처리
  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      notionPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , notionId] = pathname.split("/");
      editorPage.setState({ notionId });
    }
  };

  this.route();

  initRouter(() => this.route());

  // 페이지 추가 후 서버 저장
  const fetchAddNotion = async () => {
    const createdNotion = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "제목없음",
        parent: null,
      }),
    });
    history.replaceState(null, null, `/documents/${createdNotion.id}`);
    notionPage.render();
  };

  $addNewRootNotion.addEventListener("click", () => {
    fetchAddNotion();
  });
}
