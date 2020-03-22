const cards = document.querySelectorAll('.c-session__card');

for (const card of cards) {
  let output = card.querySelector('span.c-session__date');

  card.dataset.date = output.textContent;
}

const inputs = document.querySelectorAll('.cal-date input');

for (const input of inputs) {
  input.addEventListener('change', e => {
    if (e.target.checked) {
      let filter = e.target.value.slice(7, 9);
      let css = filter ? `
        .c-session__card {
          display: none;
        }
        .c-session__card[data-date*="${filter}"] {
          display: block;
        }
      ` : ``;
      window.cssFilter.innerHTML = css;
    }
  })
};
