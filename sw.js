const CACHE_NAME = 'my-site-cache-v20';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/root.css',
  '/assets/css/404.css',
  '/assets/css/about.css',
  '/assets/css/blog.css',
  '/assets/css/contact.css',
  '/assets/css/content-pages.css',
  '/assets/css/critical.css',
  '/assets/css/dark.css',
  '/assets/css/global-styles.css',
  '/assets/css/local.css',
  '/assets/css/services.css',
  '/assets/css/tables.css',
  '/assets/js/dark.js',
  '/assets/js/nav.js',
  '/site.webmanifest',
  // Add paths to other static assets you want to cache
];

// Install the service worker and cache initial resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Listen for network requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return the cached response
        if (response) {
          return response;
        }

        // Not in cache - fetch from network
        return fetch(event.request).then(
          (response) => {
            // Check if response is valid
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cache the fetched response for future requests
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

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Clearing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});