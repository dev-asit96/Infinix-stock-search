const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html'];

//Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

//Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => console.log('Device is offline'));
    })
  );
});

//Activate the service worker
self.addEventListener('actiavte', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
