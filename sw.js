const CACHE_NAME = 'moody-v49';
const ASSETS = [
  './',
  './index.html',
  './settings.html',
  './css/style.css',
  './js/config.js',
  './js/errors.js',
  './js/app.js',
  './js/storage.js',
  './js/sheets.js',
  './manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only cache GET requests for our own static assets
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Cache-first with background update for static assets
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => cached);
      return cached || fetched;
    }),
  );
});

