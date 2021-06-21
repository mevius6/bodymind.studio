import Cursor from './cursor';
// eslint-disable-next-line no-unused-vars
import * as Nav from './nav';
import {
  checkBrowser,
  checkWebpFeature,
  checkSystem,
  isMobileDevice,
  selectAll,
} from './utils';

const os = checkSystem();
const browser = checkBrowser();

const doc = document,
      root = doc.documentElement,
      body = doc.body;

root.setAttribute('data-theme-style', 'light');

let imageFormat = '';
checkWebpFeature('lossy')
  .then(() => {
    imageFormat = 'webp';
    root.classList.add(imageFormat);
  })
  .catch(() => {
    imageFormat = 'no-webp';
    root.classList.add(imageFormat);
  });

isMobileDevice()
  .then(() => (root.dataset.device = 'mobile'))
  .catch(() => {
    const cursor = new Cursor(doc.querySelector('.cursor'));

    [...selectAll('a, button, input')].forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.emit('enter'));
      el.addEventListener('mouseleave', () => cursor.emit('leave'));
    });

    root.dataset.device = 'desktop';
  });

window.addEventListener('load', () => {
  root.classList.remove('no-js');
  root.classList.add('js');
  root.dataset.browser = browser;
  root.dataset.os = os;
  body.classList.remove('page--loading');
  body.classList.add('page--loaded');
});
