const sessions = document.querySelectorAll('.c-session');

for (const session of sessions) {
  let output = session.querySelector('span.c-session__date');

  session.dataset.date = output.textContent;
}

const style = document.createElement('style');

style.setAttribute('id', 'cssFilter');
document.head.appendChild(style);

const inputs = document.querySelectorAll('.cal-date input');

for (const input of inputs) {
  input.addEventListener('change', e => {
    if (e.target.checked) {
      let filter = e.target.value.slice(7, 9);
      let css = filter ? `
        .c-session {
          display: none;
        }
        .c-session[data-date*="${filter}"] {
          display: block;
        }
        .c-session__card:first-child {
          margin-bottom: 1rem;
        }
      ` : ``;
      window.cssFilter.innerHTML = css;
    }
  })
};
