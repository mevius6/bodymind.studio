const createEleWithClass = (tag, className) => {
  const ele = document.createElement(tag);
  ele.className = className;
  return ele;
};

class Slides {
  constructor(data) {
    this.data = data;
    this.container = createEleWithClass("div", "slides");
    this.currentIdx = 0;
    this.slides = this.data.map((entry, index) => {
      const slide = createEleWithClass("div", "slide");
      const title = createEleWithClass("h1", "slide__title fs-h1");
      const cta = createEleWithClass("a", "slide__cta fs-bs");
      slide.classList.add(index !== 0 ? "slide--next" : "slide--show");
      title.innerHTML = entry.title;
      cta.setAttribute("role", "button");
      cta.href = entry.cta;
      cta.innerHTML = "Узнать больше!";
      for (let i = 0; i < 4; i++) {
        let clip = document.createElement("span");
        cta.appendChild(clip);
      }
      for (let i = 0; i < 4; i++) {
        let text = createEleWithClass("p", "fs-bs");
        text.setAttribute("aria-hidden", "true");
        text.innerHTML = "Узнать больше!";
        cta.appendChild(text);
      }
      slide.appendChild(title);
      slide.appendChild(cta);
      this.container.appendChild(slide);
      return slide;
    });
  }
  mount(container) {
    container.appendChild(this.container);
  }
  onActiveIndexChange(activeIndex) {
    this.currentIdx = activeIndex;
    for (let i = 0; i < this.slides.length; i++) {
      if (activeIndex === i) {
        this.slides[i].classList.remove("slide--next");
        this.slides[i].classList.remove("slide--prev");
      } else {
        if (activeIndex > i) {
          this.slides[i].classList.remove("slide--next");
          this.slides[i].classList.add("slide--prev");
        } else {
          this.slides[i].classList.add("slide--next");
          this.slides[i].classList.remove("slide--prev");
        }
      }
    }
  }
  onMove(indexFloat) {
    this.container.style.transform = `translateY(${(indexFloat * 100) / this.slides.length}%)`;
  }
  appear() {
    this.container.classList.add("scrolling");
    this.slides[this.currentIdx].classList.remove("slide--show");
  }
  disperse(activeIndex) {
    //this.currentIdx = activeIndex;
    this.slides[this.currentIdx].classList.add("slide--show");
    this.container.classList.remove("scrolling");
    for (let index = 0; index < this.data.length; index++) {
      if (index > activeIndex) {
        this.slides[index].classList.add("slide--next");
        this.slides[index].classList.remove("slide--prev");
      } else if (index < activeIndex) {
        this.slides[index].classList.remove("slide--next");
        this.slides[index].classList.add("slide--prev");
      } else {
        this.slides[index].classList.remove("slide--next");
        this.slides[index].classList.remove("slide--prev");
      }
    }
  }
}

export { Slides };
