import { Showcase } from "./Showcase";
import { Slides } from "./Slides";
import { Cursor } from "./Cursor";
import image1 from 'url:../img/1.jpg';
import image2 from 'url:../img/2.jpg';
import image3 from 'url:../img/3.jpg';
import image4 from 'url:../img/4.jpg';
import image5 from 'url:../img/5.jpg';
import image6 from 'url:../img/6.jpg';
import image1_mod from 'url:../img/1.webp';
import image2_mod from 'url:../img/2.webp';
import image3_mod from 'url:../img/3.webp';
import image4_mod from 'url:../img/4.webp';
import image5_mod from 'url:../img/5.webp';
import image6_mod from 'url:../img/6.webp';

const container = document.getElementById('app');
const cursor = new Cursor(document.querySelector('.cursor'));

Modernizr.on('webp', function(result) {
  const slidesData = [
    {
      image: (result) ? image1_mod : image1,
      title: "Студия",
      cta: "/about"
    },
    {
      image: (result) ? image2_mod : image2,
      title: "Направления",
      cta: "/workout"
    },
    {
      image: (result) ? image3_mod : image3,
      title: "Расписание",
      cta: "/schedule"
    },
    {
      image: (result) ? image4_mod : image4,
      title: "Инструкторы",
      cta: "/coaches"
    },
    {
      image: (result) ? image5_mod : image5,
      title: "Стоимость",
      cta: "/pricing"
    },
    {
      image: (result) ? image6_mod : image6,
      title: "Контакты",
      cta: "/contact"
    }
  ];

  const slides = new Slides(slidesData);
  const showcase = new Showcase(slidesData, {
    onActiveIndexChange: activeIndex => {
      slides.onActiveIndexChange(activeIndex);
    },
    onIndexChange: index => {
      slides.onMove(index);
    },
    onZoomOutStart: ({ activeIndex }) => {
      cursor.enter();
      slides.appear();
    },
    onZoomOutFinish: ({ activeIndex }) => {
    },
    onFullscreenStart: ({ activeIndex }) => {
      cursor.leave();
      slides.disperse(activeIndex);
    },
    onFullscreenFinish: ({ activeIndex }) => {
    }
  });

  showcase.mount(container);
  slides.mount(container);
  showcase.render();

  window.addEventListener("resize", function() {
    showcase.onResize();
  });

  window.addEventListener("mousemove", function(ev) {
    showcase.onMouseMove(ev);
  });

  [...document.querySelectorAll("a")].forEach(link => {
    link.addEventListener("mouseover", () => cursor.over())
    link.addEventListener("mouseleave", () => cursor.leave())
  });
});
