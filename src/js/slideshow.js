// import Cursor from './cursor';
import Showcase from './Showcase';
import Slides from './Slides';
import image1 from 'url:../images/1.jpg';
import image2 from 'url:../images/2.jpg';
import image3 from 'url:../images/3.jpg';
import image4 from 'url:../images/4.jpg';
import image5 from 'url:../images/5.jpg';
import image6 from 'url:../images/6.jpg';
import image1_mod from 'url:../images/1.webp';
import image2_mod from 'url:../images/2.webp';
import image3_mod from 'url:../images/3.webp';
import image4_mod from 'url:../images/4.webp';
import image5_mod from 'url:../images/5.webp';
import image6_mod from 'url:../images/6.webp';

const container = document.getElementById('app');
const webp = document.documentElement.classList.contains('webp');

const slidesData = [
  {
    image: webp ? image1_mod : image1,
    title: 'Студия',
    cta: 'about',
  },
  {
    image: webp ? image2_mod : image2,
    title: 'Направления',
    cta: 'workout',
  },
  {
    image: webp ? image3_mod : image3,
    title: 'Расписание',
    cta: 'schedule',
  },
  {
    image: webp ? image4_mod : image4,
    title: 'Инструкторы',
    cta: 'coaches',
  },
  {
    image: webp ? image5_mod : image5,
    title: 'Стоимость',
    cta: 'pricing',
  },
  {
    image: webp ? image6_mod : image6,
    title: 'Контакты',
    cta: 'contact',
  },
];

// const cursor = new Cursor(document.querySelector('.cursor'));
const slides = new Slides(slidesData);
const showcase = new Showcase(slidesData, {
  onActiveIndexChange: (activeIndex) => {
    slides.onActiveIndexChange(activeIndex);
  },
  onIndexChange: (index) => {
    slides.onMove(index);
  },
  onZoomOutStart: ({ activeIndex }) => {
    // cursor.enter();
    slides.appear();
  },
  onZoomOutFinish: ({ activeIndex }) => {},
  onFullscreenStart: ({ activeIndex }) => {
    // cursor.leave();
    slides.disperse(activeIndex);
  },
  onFullscreenFinish: ({ activeIndex }) => {},
});

showcase.mount(container);
slides.mount(container);
showcase.render();

window.addEventListener('resize', () => showcase.onResize());

window.addEventListener('mousemove', (ev) => showcase.onMouseMove(ev));
