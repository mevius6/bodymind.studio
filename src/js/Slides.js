import { appendNode, createNode, createNodeWithClass } from './utils';

export default class Slides {
  constructor(data) {
    this.data = data;
    this.container = createNodeWithClass('div', 'slides');
    this.currentIdx = 0;
    this.slides = this.data.map((entry, index) => {
      const slide = createNodeWithClass('div', 'slide');
      const title = createNodeWithClass('h1', 'h0 slide__title');
      const cta = createNodeWithClass('a', 'slide__cta');
      slide.classList.add(index !== 0 ? 'slide--next' : 'slide--show');
      title.innerText = entry.title;
      cta.setAttribute('role', 'button');
      cta.href = entry.cta;
      cta.innerText = 'Узнать больше';
      for (let i = 0; i < 4; i++) {
        let clip = createNode('span');
        appendNode(cta, clip);
      }
      for (let i = 0; i < 4; i++) {
        let text = createNode('p');
        text.setAttribute('aria-hidden', 'true');
        text.innerText = 'Узнать больше';
        appendNode(cta, text);
      }
      appendNode(slide, title);
      appendNode(slide, cta);
      appendNode(this.container, slide);
      return slide;
    });
  }
  mount(container) {
    appendNode(container, this.container);
  }
  onActiveIndexChange(activeIndex) {
    this.currentIdx = activeIndex;
    for (let i = 0; i < this.slides.length; i++) {
      if (activeIndex === i) {
        this.slides[i].classList.remove('slide--next');
        this.slides[i].classList.remove('slide--prev');
      } else {
        if (activeIndex > i) {
          this.slides[i].classList.remove('slide--next');
          this.slides[i].classList.add('slide--prev');
        } else {
          this.slides[i].classList.add('slide--next');
          this.slides[i].classList.remove('slide--prev');
        }
      }
    }
  }
  onMove(indexFloat) {
    this.container.style.transform = `translateY(${
      (indexFloat * 100) / this.slides.length
    }%)`;
  }
  appear() {
    this.container.classList.add('scrolling');
    this.slides[this.currentIdx].classList.remove('slide--show');
  }
  disperse(activeIndex) {
    // this.currentIdx = activeIndex;
    this.slides[this.currentIdx].classList.add('slide--show');
    this.container.classList.remove('scrolling');
    for (let index = 0; index < this.data.length; index++) {
      if (index > activeIndex) {
        this.slides[index].classList.add('slide--next');
        this.slides[index].classList.remove('slide--prev');
      } else if (index < activeIndex) {
        this.slides[index].classList.remove('slide--next');
        this.slides[index].classList.add('slide--prev');
      } else {
        this.slides[index].classList.remove('slide--next');
        this.slides[index].classList.remove('slide--prev');
      }
    }
  }
}
