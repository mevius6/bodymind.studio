const sessions = document.querySelectorAll('.c-session');

for (const session of sessions) {
  let span = session.querySelector('.c-session__date');

  session.dataset.date = span.textContent;
}

const style = document.createElement('style');

style.setAttribute('id', 'cssFilter');
document.head.appendChild(style);

const inputs = document.querySelectorAll('[name="calendar_date"]');

for (const input of inputs) {
  input.addEventListener('change', e => {
    if (e.target.checked) {
      let filter = e.target.value.slice(7, 9);
      let css = filter ? `
        .time-slot { display: none; }
        .c-session { display: none; }
        .c-session[data-date$="${filter}"] { display: grid; }
        .c-session__card:first-child { row-gap: 1rem; }
      ` : ``;
      window.cssFilter.innerHTML = css;
    }
  })
};
