// Service Worker Version
const CACHE_VERSION = 'v2';
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;

// Dateien, die im Cache gespeichert werden sollen
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/404.html'
  // Wir lassen die Icons bewusst weg, bis sie erstellt wurden
];

// Installation des Service Workers
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache geöffnet');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Cache-Fehler beim Installieren:', error);
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
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip Google Analytics requests
  if (event.request.url.includes('google-analytics.com') || 
      event.request.url.includes('googletagmanager.com')) {
    return;
  }

  // Handle API requests
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache-Hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Don't cache non-GET requests
            if (event.request.method !== 'GET') {
              return response;
            }

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch(error => {
                console.error('Fehler beim Cachen:', error);
              });

            return response;
          })
          .catch(error => {
            console.error('Fetch-Fehler:', error);
            // Optionally return a custom offline page here
          });
      })
  );
});
