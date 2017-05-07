const BASE_PATH = '/mainAss/';
const CACHE_NAME = 'gih-cache-v6';
const CACHED_URLS = [
    // Our HTML
    BASE_PATH + 'main.html',
    BASE_PATH + 'news.html',
    BASE_PATH + 'registration.html',

    // Images for favicons
    BASE_PATH + 'images/android-logo36x36.png',
    BASE_PATH + 'images/android-logo48x48.png',
    BASE_PATH + 'images/android-logo72x72.png',
    BASE_PATH + 'images/android-logo96x96.png',
    BASE_PATH + 'images/android-logo144x144.png',
    BASE_PATH + 'images/android-logo192x192.png',
    BASE_PATH + 'images/fav-logo32x32.png',

    //Images for page
    BASE_PATH + 'images/offlinemap.jpg',
    BASE_PATH + 'images/books.jpg',
    BASE_PATH + 'images/fav-logo.ico',
    BASE_PATH + 'images/fav-logo16x16.png',
    BASE_PATH + 'images/fav-logo32x32.png',
    BASE_PATH + 'images/fav-logo96x96.png',
    BASE_PATH + 'images/ms-logo70x70.png',
    BASE_PATH + 'images/ms-logo144x144.png',
    BASE_PATH + 'images/ms-logo150x150.png',
    BASE_PATH + 'images/ms-logo310x310.png',
    BASE_PATH + 'images/movies.png',
    BASE_PATH + 'images/hangman.png',
    BASE_PATH + 'images/sounds.png',
    BASE_PATH + 'images/tables.png',
    BASE_PATH + 'images/twitter.png',
    BASE_PATH + 'images/cars.png',
    BASE_PATH + 'images/fish.png',
    BASE_PATH + 'images/animation.png',
    BASE_PATH + 'images/registration.png',
    BASE_PATH + 'images/snake.png',
    BASE_PATH + 'images/burgerIcon.png',

    // JavaScript
    BASE_PATH + 'offline-map.js',
    BASE_PATH + 'manifest.json',
    BASE_PATH + 'scripts.js',
    BASE_PATH + 'events.js',
    BASE_PATH + 'events.css',
    BASE_PATH + 'events.json',

  // CSS and fonts
    'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&lang=en',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    // BASE_PATH + 'min-style.css',
    BASE_PATH + 'styles.css'
];

const googleMapsAPIJS = 'https://maps.googleapis.com/maps/api/js?key=45b3aaa612fd4093bd7b28986c66bc97&callback=initMap';

self.addEventListener('install', function(event) {
  // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  let requestURL = new URL(event.request.url);
  // Handle requests for index.html
  if (requestURL.pathname === BASE_PATH + 'main.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('main.html').then(function(cachedResponse) {
          let fetchPromise = fetch('main.html').then(function(networkResponse) {
            cache.put('main.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
 // Handle requests for Google Maps JavaScript API file
  } else if (requestURL.href === googleMapsAPIJS) {
    event.respondWith(
      fetch(
        googleMapsAPIJS+'&'+Date.now(),
        { mode: 'no-cors', cache: 'no-store' }
      ).catch(function() {
        return caches.match('offline-map.js');
      })
    );
      // Handle requests for events JSON file
  } else if (requestURL.pathname === BASE_PATH + 'events.json') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(function() {
          return caches.match(event.request);
        });
      })
    );
  // Handle requests for event images.
  } else if (requestURL.pathname.includes('/eventsimages/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(cacheResponse) {
          return cacheResponse||fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          }).catch(function() {
            return cache.match('appimages/event-default.png');
          });
        });
      })
    );

  } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
    );
  }
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
