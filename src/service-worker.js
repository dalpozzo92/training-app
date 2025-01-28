/* eslint-disable no-restricted-globals */
// Nome della cache (puoi cambiarlo)
const CACHE_NAME = 'training-app-cache-v1';

// Le risorse da cache-are
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/static/js/main.af8193a1.js',
  '/static/css/main.e5f2b522.css',
  '/static/js/488.53960171.chunk.js',
  '/static/js/952.dfe2349f.chunk.js',
  '/static/css/main.e5f2b522.css'
];

// Installazione del Service Worker e caching delle risorse
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching delle risorse');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Attivazione del Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            // Elimina le vecchie versioni della cache
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Gestione delle richieste
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Se la risorsa è nella cache, restituiscila
      if (cachedResponse) {
        return cachedResponse;
      }
      // Altrimenti, fai la richiesta di rete
      return fetch(event.request);
    })
  );
});


