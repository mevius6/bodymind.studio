self.addEventListener('install', event => {
  console.log('👷', 'install', event);
  self.skipWaiting();
  // event.waitUntil(
  //   caches.open("shell").then(cache => {
  //     return cache.addAll([
  //       "/",
  //       "/index.html",
  //       "/index.js"
  //     ]).then(() => self.skipWaiting());
  //   })
  // );
});

self.addEventListener('activate', event => {
  console.log('👷', 'activate', event);
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  // console.log('👷', 'fetch', event);
  event.respondWith(fetch(event.request));
  // event.respondWith(
  //   caches.match(e.request).then(response => {
  //     return response || fetch(e.request);
  //   })
  // );
});
