if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(() => {
    console.log('Сервисный работник зарегистрирован');
  });
}

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
// addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // addBtn.style.display = 'block';
  addBtn.classList.toggle('hidden', false);

  addBtn.addEventListener('click', (e) => {
    // addBtn.style.display = 'none';

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Пользователь принял a2hs запрос');
      } else {
        console.log('Пользователь отклонил a2hs запрос');
      }
      deferredPrompt = null;
      addBtn.classList.toggle('hidden', true);
    });
  });
});

window.addEventListener('appinstalled', (evt) => {
  console.log('a2hs установлен');
});
