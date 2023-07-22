import { validateComponent, validateInputData } from '../../utils/validation';

const DOCUMENT = {
  INITIAL_TITLE: '제목 없음',
  TITLE_PLACEHOLDER: '제목을 입력하세요',
  CONTENT_PLACEHOLDER: '내용을 입력하세요',
};

export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  editDocument,
}) {
  validateComponent(new.target);

  const $editor = document.createElement('div');
  $editor.classList.add('editor');
  $target.appendChild($editor);

  validateInputData(initialState);
  this.state = initialState;

  // 초기 상태에서 메시지가 표시되고, 클릭 시 해당 메시지가 사라지도록 처리
  const handleTitleInputClick = (e) => {
    console.log(e.target.value);
    if (e.target.value === `${DOCUMENT.INITIAL_TITLE}`) {
      e.target.value = '';
    }
  };

  this.setState = (nextState) => {
    this.state = nextState;
    const { title, content } = this.state;
    $editor.querySelector('[name=title]').value = title;
    $editor.querySelector('[name=content]').value = content;
  };

  this.render = () => {
    const { title, content } = this.state;
    const titleValue = title === `${DOCUMENT.INITIAL_TITLE}` ? '' : title;
    $editor.innerHTML = `
      <input class="editor-title" type="text" name="title" placeholder='${DOCUMENT.TITLE_PLACEHOLDER}' value="${titleValue}">
      <textarea class="editor-content" name="content" placeholder='${DOCUMENT.CONTENT_PLACEHOLDER}'>${content}</textarea>
    `;
  };

  this.render();

  $editor.querySelector('[name=title]').addEventListener('click', handleTitleInputClick);
  $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = { ...this.state, title: e.target.value };
    this.setState(nextState);
    editDocument(this.state);
  });

  $editor.querySelector('[name=content]').addEventListener('input', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.value,
    };
    this.setState(nextState);
    editDocument(this.state);
  });
}
