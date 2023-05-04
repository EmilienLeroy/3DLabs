import './style.css';
import '@google/model-viewer';
import { ModelViewerElement } from '@google/model-viewer';

const models = Object.keys(import.meta.glob('../public/*.glb', { as: 'url'}));
const viewer = document.querySelector('#viewer') as ModelViewerElement;
const previews = document.querySelector('#models') as HTMLDivElement;

function getUrl(path: string) {
  const names = path.split('/');
  return `/${names[names.length - 1]}`;
}

models.forEach((path) => {
  const url = getUrl(path);
  const preview = new ModelViewerElement();

  preview.src = url;
  preview.addEventListener('click', () => viewer.src = url);

  previews.append(preview);
});