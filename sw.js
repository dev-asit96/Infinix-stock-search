const cache_name = 'pages-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'offline.html',
  'images/handsom.jpg',
  'images/house99.png',
  'images/menu.png',
  'images/close.png',
  'images/zayn-malik.jpg',
  'images/special.jpg',
  'images/cristiano-ronaldo.jpg',
  'images/david-beckham.jpg',
  'images/footer-img.png',
  'images/pic-1.jpg',
  'images/pic-2.jpg',
  'images/pic-3.jpg',
  'images/pic-4.jpg',
  'images/house99-192.png',
  'images/house99-512.png',
];
const self = this;

self.addEventListener('install', (event) => {
  console.log('Install event');
  event.waitUntil(
    caches.open(cache_name).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache).catch((error) => {
        console.error('Error adding files to cache', error);
      });
    })
  );
  console.info('SW installed');
  self.skipWaiting();
});

//Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== cache_name) {
            console.log('Deleting old Cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

//Fetch
self.addEventListener('fetch', (event) => {
  console.info('SW fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
