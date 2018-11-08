const appName = "Restaurant-Reviews"
const staticCacheName = appName + "-v1.0";
const contentImgsCache = appName + "-images";
var allCaches = [
    staticCacheName,
    contentImgsCache
];

//2
/** At Service Worker Install time, cache all static assets */
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/', // this caches index.html
                '/restaurant.html',
                '/css/styles.css',
                '/css/mediaSmall.css',
                '/css/mixedMedia.css',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                '/js/dbhelper.js',
                '/js/secret.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/img/Offline.jpg',
                '/favicon.ico',
                'data/restaurants.json'
            ]);
        })
    );
});

//3
/** At Service Worker Activation, Delete previous caches, if any */
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith(appName) &&
                        !allCaches.includes(cacheName);
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

//4
/** Hijack fetch requests and respond accordingly */
self.addEventListener('fetch', function (event) {
    const requestUrl = new URL(event.request.url);

    // only highjack request made to our app (not mapbox maps or leaflet, for example)
    if (requestUrl.origin === location.origin) {

        // Since requests made to restaurant.html have search params (like ?id=1), the url can't be used as the
        // key to access the cache, so just respondWith restaurant.html if pathname startsWith '/restaurant.html'
        if (requestUrl.pathname.startsWith('/restaurant.html')) {
            event.respondWith(caches.match('/restaurant.html'));
            return; // Done handling request, so exit early.
        }

        // If the request pathname starts with /img, then we need to handle images.
        if (requestUrl.pathname.startsWith('/img')) {
            event.respondWith(serveImage(event.request));
            return; // Done handling request, so exit early.
        }
    }

    // Default behavior: respond with cached elements, if any, falling back to network.
    event.respondWith(
        caches.match(event.request,{ignoreSearch:true}).then(function(resp) {
            return resp || fetch(event.request).then(function(response) {
              let responseClone = response.clone();
              caches.open(appName + "-v1.0").then(function(cache) {
                cache.put(event.request, responseClone);
              });

              return response;
            });
          }).catch(function() {
            return caches.match('/img/Offline.jpg');
          })
    );

});




function serveImage(request) {
    let imageStorageUrl = request.url;

    // Make a new URL with a stripped suffix and extension from the request url
    // i.e. /img/1-medium.jpg  will become  /img/1
    // we'll use this as the KEY for storing image into cache
    imageStorageUrl = imageStorageUrl.replace(/-small\.\w{3}|-medium\.\w{3}|-large\.\w{3}/i, '');

    return caches.open(contentImgsCache).then(function (cache) {
        return cache.match(imageStorageUrl).then(function (response) {
            // if image is in cache, return it, else fetch from network, cache a clone, then return network response
            return response || fetch(request).then(function (networkResponse) {
                cache.put(imageStorageUrl, networkResponse.clone());
                return networkResponse;
            });
        });
    });
}