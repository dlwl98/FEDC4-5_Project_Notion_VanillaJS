import { VITE_USERNAME, editDocumentMessages } from '../../constants';
import { request } from '../../domain/api';
import { push } from '../../domain/router';
import { createDocument, deleteDocument } from '../../domain/apiCall';
import SidebarDocumentTree from './SidebarDocumentTree';
import SidebarHeader from './SidebarHeader';
import { validateComponent } from '../../utils/validation';

export default function SidebarDocumentPage({ $target }) {
  validateComponent(new.target);

  const $sidebarDocumentPage = document.createElement('div');
  $sidebarDocumentPage.classList.add('sidebar-document');

  // 사이드바 헤더
  new SidebarHeader({
    $target: $sidebarDocumentPage,
    initialState: {
      user: `${VITE_USERNAME}`,
    },
  });

  // 사이드바 문서 트리의 초기상태, 삭제, 추가 처리
  const sidebarDocumentTree = new SidebarDocumentTree({
    $target: $sidebarDocumentPage,
    initialState: [],
    deleteDocument,
    addDocument: async (id, className) => {
      if (className === 'add-button') {
        const document = {
          title: `${editDocumentMessages.INITIAL_DOCUMENT_TITLE}`,
          parent: id,
        };
        const newDocument = await createDocument(document);
        push(`/documents/${newDocument.id}`);
        this.render();
      }
    },
  });

  // 문서 tree 가져옴
  const fetchDocumentTree = async () => {
    const data = await request('/documents');
    sidebarDocumentTree.setState(data);
  };

  // 페이지 렌더링
  this.render = async () => {
    await fetchDocumentTree();
    $target.appendChild($sidebarDocumentPage);
  };

  this.render();
}