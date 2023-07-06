import { RouteService } from '../utils/RouteService';
import validateComponent from '../utils/validateComponent';
import Button from './ui/Button';

export default function NavBar({ targetElement, documentPath }) {
  validateComponent(this, NavBar);
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.render = () => {
    targetElement.innerHTML = '';
    documentPath.slice(0, documentPath.length - 1)?.forEach(({ id, title }) => {
      const seperatorElement = document.createElement('span');
      seperatorElement.textContent = '/';
      const linkElement = document.createElement('button');
      targetElement.appendChild(seperatorElement);
      targetElement.appendChild(linkElement);
      new Button({
        targetElement: linkElement,
        textContent: title === '' ? '제목없음' : title,
        onClick: () => {
          const router = new RouteService();
          router.push(`/documents/${id}`);
        },
      });
    });
    if (targetElement.innerHTML === '') {
      targetElement.innerHTML = '/';
    }
  };

  this.init();
}
