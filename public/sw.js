// Service Worker Version
const CACHE_VERSION = 'v1';
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;

// Dateien, die im Cache gespeichert werden sollen
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/404.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Installation des Service Workers
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache geöffnet');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktivierung des Service Workers
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Alte Caches löschen
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Abfangen von Fetch-Anfragen
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache-Hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            // Prüfen, ob wir eine gültige Antwort bekommen haben
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Antwort klonen (das Original wird für den Browser verwendet)
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
