const cards = document.querySelectorAll('.c-session__card');

for (const card of cards) {
  let output = card.querySelector('span.c-session__date');

  card.dataset.date = output.textContent;
}

const filters = document.querySelectorAll('.cal-date input');

for (const filter of filters) {
  filter.addEventListener('change', e => {
    if (e.target.checked) {
      let date = e.target.value.slice(7, 9);
      let css = date ? `
        .c-session__card {
          display: none;
        }
        .c-session__card[data-date*="${date}"] {
          display: block;
        }
      ` : ``;
      window.cssFilter.innerHTML = css;
    }
  })
};
