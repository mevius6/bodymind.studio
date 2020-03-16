/**
 * let accordion = new Collapse(element, { option: value }).init();
 *
 * Options - { option: defaultValue }
 * accordion: false,
 * initClass: 'collapse-init',
 * activeClass: 'panel-active',
 * heightClass: 'collapse-reading-height',
 *
 * Methods - accordion.method(panel)
 * open(panel)
 * close(panel)
 * toggle(panel)
 * openSinglePanel(panel) [AKA accordion mode]
 * openAll()
 * closeAll()
 *
 * Events - panel.addEventListener('event')
 * openingPanel
 * openedPanel
 * closingPanel
 * closedPanel
 */

class Collapse {
  constructor(container, options = {}) {
    let defaults = {
      accordion: true,
      initClass: 'collapse-init',
      activeClass: 'c-accordion__panel--active',
      heightClass: 'collapse-reading-height' };

    this.settings = Object.assign({}, defaults, options);

    this.container = container;
    this.panels = container.querySelectorAll("details");

    this.events = {
      openingPanel: new CustomEvent('openingPanel'),
      openedPanel: new CustomEvent('openedPanel'),
      closingPanel: new CustomEvent('closingPanel'),
      closedPanel: new CustomEvent('closedPanel') };
  }

  setPanelHeight(panel) {
    let contents = panel.querySelector("summary + *");

    contents.style.height = contents.scrollHeight + "px";
  }

  removePanelHeight(panel) {
    let contents = panel.querySelector("summary + *");

    contents.style.height = null;
  }

  // === Открытая панель
  open(panel) {
    panel.dispatchEvent(this.events.openingPanel);

    panel.open = true;
  }

  // Добавьте высоту и активный класс — это вызывает анимацию открытия
  afterOpen(panel) {
    this.setPanelHeight(panel);
    panel.classList.add(this.settings.activeClass);
  }

  // Убрать высоту в конце анимации, так как она больше не нужна
  endOpen(panel) {
    panel.dispatchEvent(this.events.openedPanel);

    this.removePanelHeight(panel);
  }

  // === Закройте панель, не переключая фактическое [open] значение!
  close(panel) {
    panel.dispatchEvent(this.events.closingPanel);
    this.afterClose(panel);
  }

  // Установите высоту, чуть подождите, а затем уберите высоту, чтобы запустить анимацию закрытия
  afterClose(panel) {
    this.setPanelHeight(panel);

    setTimeout(() => {
      panel.classList.remove(this.settings.activeClass);
      this.removePanelHeight(panel);
    }, 100); // это глючит
  }

  // На самом деле закрывает панель после завершения анимации
  endClose(panel) {
    panel.dispatchEvent(this.events.closedPanel);

    panel.open = false;
  }

  // === Переключатель
  toggle(panel) {
    panel.open ? this.close(panel) : this.open(panel);
  }

  // === Аккордеон закрывает все панели кроме текущей
  openSinglePanel(panel) {
    this.panels.forEach(element => {
      if (panel == element && !panel.open) {
        this.open(element);
      } else {
        this.close(element);
      }
    });
  }

  // Всё вместе
  attachEvents() {
    this.panels.forEach(panel => {
      let toggler = panel.querySelector("summary");
      let contents = panel.querySelector("summary + *");

      // На открытой панели
      panel.addEventListener("toggle", e => {
        let isReadingHeight = panel.classList.contains(this.settings.heightClass);

        if (panel.open && !isReadingHeight) {
          this.afterOpen(panel);
        }
      });

      toggler.addEventListener("click", e => {
        // Если аккордеон, остановить поведение по умолчанию
        if (this.settings.accordion) {
          this.openSinglePanel(panel);
          e.preventDefault();
        } else if (panel.open) {
            this.close(panel);
            e.preventDefault();
          }
      });

      let propToWatch = '';

      // На панели заканчиваем анимацию открытия / закрытия
      contents.addEventListener("transitionend", e => {
        // Игнорируем переходы от дочерних элементов
        if (e.target !== contents) {
          return;
        }

        // Установить свойство для просмотра при первом запуске
        if (!propToWatch) propToWatch = e.propertyName;

        // Если наблюдаемое свойство соответствует текущему анимирующему свойству
        if (e.propertyName == propToWatch) {
          let wasOpened = panel.classList.contains(this.settings.activeClass);
          wasOpened ? this.endOpen(panel) : this.endClose(panel);
        }
      });
    });
  }

  init() {
    // Функциональность
    this.attachEvents();

    // Если аккордеон, открой первую панель
    if (this.settings.accordion) {
      this.openSinglePanel(this.panels[0]);
    }

    // Стилизация
    this.container.classList.add(this.settings.initClass);

    return this;
  }
}

const accordions = document.querySelectorAll('.collapse');

for (const accordion of accordions) {
  new Collapse(accordion).init()
}
