import './style.css';
import '@google/model-viewer';
import { ModelViewerElement } from '@google/model-viewer';

const models = Object.keys(import.meta.glob('../public/*.glb', { as: 'url'}));
const viewer = document.querySelector('#viewer') as ModelViewerElement;
const previews = document.querySelector('#models') as HTMLDivElement;
const download = document.querySelector('#download') as HTMLButtonElement;

function getUrl(path: string) {
  const names = path.split('/');
  return `/${names[names.length - 1]}`;
}

function getFileName(url: string) {
  const splited = url.split('/');

  return splited[splited.length - 1];
}

models.forEach((path) => {
  const url = getUrl(path);
  const preview = new ModelViewerElement();

  preview.src = url;
  preview.addEventListener('click', () => viewer.src = url);

  previews.append(preview);
});

download.addEventListener('click', async () => {
  const glTF = await viewer.exportScene();
  const file = new File([glTF], getFileName(viewer.src || ''));
  const link = document.createElement("a");

  link.download = file.name;
  link.href = URL.createObjectURL(file);
  link.click();
});