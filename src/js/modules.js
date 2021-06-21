const parsedUrl = new URL(window.location.href);

// const modules = {
//   form: import('./form.js'),
//   map: import('./map.js'),
// };

// async function loadModule(name) {
//   const module = await modules[name]
//     .then(() => console.log(`модуль ${name} импортирован 💫`));
//   return module;
// }

// https://github.com/tc39/proposal-dynamic-import
// https://github.com/parcel-bundler/parcel/issues/1401

/* eslint-disable no-unused-vars */
(async () => {
  if (parsedUrl.pathname === '/') {
    const loader = await import('./loader.js');
    const slideshow = await import('./slideshow.js');
  }
  if (
    parsedUrl.pathname === '/workout' ||
    parsedUrl.pathname === '/workout.html'
  ) {
    const collapse = await import('./collapse.js');
    // const lazyload = await import('./lazy-load.js');
  }
  if (
    parsedUrl.pathname === '/coaches' ||
    parsedUrl.pathname === '/coaches.html'
  ) {
    const vp = await import('../video/lite-vimeo-embed.js');
  }
  if (
    parsedUrl.pathname === '/pricing' ||
    parsedUrl.pathname === '/pricing.html'
  ) {
    const tabs = await import('./tabs.js');
  }
})();
/* eslint-enable no-unused-vars */
