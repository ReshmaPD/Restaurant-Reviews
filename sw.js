const appName = "Restaurant-Reviews"
const staticCacheName = appName + "-v1.0";
const contentImgsCache = appName + "-images";
var allCaches = [
    staticCacheName,
    contentImgsCache
];

//TODO: Install a service worker- Open a cache named "Restaurant-Reviews-v1.0"
//TODO: Cache all static assets - add to cache, the following urls
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/', // alias for index.html
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

//TODO: Activate Service Worker
//TODO: Delete previous caches, if any
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

//TODO: ServiceWoker create Custom responses to fetch requests
self.addEventListener('fetch', function (event) {
    const requestUrl = new URL(event.request.url);

    if (requestUrl.origin === location.origin) {
        /**
         * TODO:respond to requests for the root page with
         * the page from the cache ignore the search params
         * just respondWith restaurant.html if pathname startsWith '/restaurant.html'
         */
        if (requestUrl.pathname.startsWith('/restaurant.html')) {
            event.respondWith(caches.match('/restaurant.html'));
            return;
        }

        // If the request pathname starts with /img, then we need to handle images.
        if (requestUrl.pathname.startsWith('/img')) {
            event.respondWith(serveImage(event.request));
            return;
        }
    }
    /**
     * TODO: respond with an entry from cache if there is one,ignore the search params
     * if there isn't an entry in cache,fetch from network,cache a clone, then return network response
     * TODO: provide a default fallback if network is not available or offline
     * ref-https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#The_premise_of_service_workers
     */
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


/**
 * TODO: cache Responsive images
 * reference-cache images
 * https://classroom.udacity.com/courses/ud899/lessons/6381510082/concepts/63774101810923
 */
function serveImage(request) {
    let imageStorageUrl = request.url;

    imageStorageUrl = imageStorageUrl.replace(/-small\.\w{3}|-medium\.\w{3}|-large\.\w{3}/i, '');

    return caches.open(contentImgsCache).then(function (cache) {
        return cache.match(imageStorageUrl).then(function (response) {
            //TODO: respond with an image entry from cache if there is one,
            //if there isn't an image entry in cache,fetch from network,cache a clone, then return network response
            return response || fetch(request).then(function (networkResponse) {
                cache.put(imageStorageUrl, networkResponse.clone());
                return networkResponse;
            });
        });
    });
}