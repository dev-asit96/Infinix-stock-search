const CACHE_NAME = 'version-1';


//Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll([
        '/index.html',
        '/',
        '/icons/maskable_icon_x192.png',
        '/icons/stock.png',
        '/static/js/bundle.js',
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/static/js/vendors~main.chunk.js',
        'static/js/main.ba78385a.chunk.js',
        'static/js/2.778fcb14.chunk.js',
        'static/css/main.0e9bb890.chunk.css',
        'static/js/2.a296b9b9.chunk.js',
        'static/js/main.ab4f030f.chunk.js',
        'static/js/2.b70d1a75.chunk.js',
        'static/js/main.db88c4e7.chunk.js',
      ]);
    })
  );
});

//Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((result) => {
      if (result) {
        return result;
      }
    })
  );
});
