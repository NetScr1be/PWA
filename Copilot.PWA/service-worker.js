// service-worker.js

/*
In this code:

The install event is used to open a cache and store your app's fundamental resources.

This ensures that your app can work offline, as it has all the necessary resources cached.

The fetch event is used to serve cached resources instead of requesting them from the network.

If a resource isn't in the cache, the service worker fetches it from the network.

The activate event is used to clean up old caches.
*/
var CACHE_NAME = 'my-cache';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js',
  // add other urls to cache...
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['my-cache'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});