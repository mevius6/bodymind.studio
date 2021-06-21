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
      activeClass: 'accordion__panel--active',
      heightClass: 'collapse-reading-height',
    };

    this.settings = Object.assign({}, defaults, options);

    this.container = container;
    this.panels = container.querySelectorAll('details');

    this.events = {
      openingPanel: new CustomEvent('openingPanel'),
      openedPanel: new CustomEvent('openedPanel'),
      closingPanel: new CustomEvent('closingPanel'),
      closedPanel: new CustomEvent('closedPanel'),
    };
  }

  setPanelHeight(panel) {
    let contents = panel.querySelector('summary + *');

    contents.style.height = contents.scrollHeight + 'px';
  }

  removePanelHeight(panel) {
    let contents = panel.querySelector('summary + *');

    contents.style.height = null;
  }

  open(panel) {
    panel.dispatchEvent(this.events.openingPanel);
    panel.open = true;
  }

  afterOpen(panel) {
    this.setPanelHeight(panel);
    panel.classList.add(this.settings.activeClass);
  }

  endOpen(panel) {
    panel.dispatchEvent(this.events.openedPanel);
    this.removePanelHeight(panel);
  }

  close(panel) {
    panel.dispatchEvent(this.events.closingPanel);
    this.afterClose(panel);
  }

  afterClose(panel) {
    this.setPanelHeight(panel);

    setTimeout(() => {
      panel.classList.remove(this.settings.activeClass);
      this.removePanelHeight(panel);
    }, 100);
  }

  endClose(panel) {
    panel.dispatchEvent(this.events.closedPanel);
    panel.open = false;
  }

  toggle(panel) {
    panel.open ? this.close(panel) : this.open(panel);
  }

  openSinglePanel(panel) {
    this.panels.forEach((element) => {
      if (panel == element && !panel.open) {
        this.open(element);
      } else {
        this.close(element);
      }
    });
  }

  attachEvents() {
    this.panels.forEach((panel) => {
      let toggle = panel.querySelector('summary');
      let contents = panel.querySelector('summary + *');

      panel.addEventListener('toggle', () => {
        let isReadingHeight = panel.classList.contains(
          this.settings.heightClass
        );

        if (panel.open && !isReadingHeight) {
          this.afterOpen(panel);
        }
      });

      toggle.addEventListener('click', (e) => {
        if (this.settings.accordion) {
          this.openSinglePanel(panel);
          e.preventDefault();
        } else if (panel.open) {
          this.close(panel);
          e.preventDefault();
        }
      });

      let propToWatch = '';

      contents.addEventListener('transitionend', (e) => {
        if (e.target !== contents) {
          return;
        }
        if (!propToWatch) propToWatch = e.propertyName;
        if (e.propertyName == propToWatch) {
          let wasOpened = panel.classList.contains(this.settings.activeClass);

          wasOpened ? this.endOpen(panel) : this.endClose(panel);
        }
      });
    });
  }

  init() {
    this.attachEvents();

    if (this.settings.accordion) {
      this.openSinglePanel(this.panels[0]);
    }

    this.container.classList.add(this.settings.initClass);

    return this;
  }
}

const accordions = document.querySelectorAll('.collapse');

for (const accordion of accordions) {
  new Collapse(accordion).init();
}
