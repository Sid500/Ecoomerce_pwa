var urlsToCache = [
  '/',
  '/css/style.css',
  '/js/script.js',
  '/index.html'
 
];
self.addEventListener('install', (event) => {
  console.log("service worker installted")
  event.waitUntil(
    caches.open('static')
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('activate', event => {
  console.log("service worker is register")
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // The responce is in the cache
        if (response) {
          return response;
        }
        // No cache match, we attempt to fetch it from the network
        return fetch(event.request);
      }
      )
  );
});