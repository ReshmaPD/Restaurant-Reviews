if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }


//MY VERSION
// Register service worker
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then(function(reg) {
      console.log('ServiceWorker registration successful');
    }).catch(function(err) {
      console.log('ServiceWorker registration failed', err);
    });
  }

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('mysite-static-v3').then(function(cache) {
        return cache.addAll([
          '/css/whatever-v3.css',
          '/css/imgs/sprites-v6.png',
          '/css/fonts/whatever-v8.woff',
          '/js/all-min-v4.js'
          // etc
        ]);
      })
    );
  });


  /** At Service Worker Install time, cache all static assets */
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll([
          '/', // this caches index.html
          '/restaurant.html',
          '/css/styles.css',
          // add other css files here if you followed the mobile first approach
          '/js/dbhelper.js',
          '/js/secret.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          'js/register-sw.js', // In the video I forgot to add this newly created file
          'data/restaurants.json'
          // add other static assets here like logos, svg icons or any
          // other asset needed for your app UI
          // (Don't add restaurant images, as they are not part of your
          // application's UI)
        ]);
      })
    );
  });

  /** At Service Worker Activation, Delete previous caches, if any */
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith(appName) &&
                   !allCaches.includes(cacheName);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  })

  /** Hijack fetch requests and respond accordingly */
self.addEventListener('fetch', function(event) {

    // Default behavior: respond with cached elements, if any, falling back to network.
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });

//   steps skiped javascript file modification for maps

/** Hijack fetch requests and respond accordingly */
self.addEventListener('fetch', function(event) {
    const requestUrl = new URL(event.request.url);

    // only highjack request made to our app (not mapbox maps or leaflet, for example)
    if (requestUrl.origin === location.origin) {

      // Since requests made to restaurant.html have search params (like ?id=1), the url can't be used as the
      // key to access the cache, so just respondWith restaurant.html if pathname startsWith '/restaurant.html'
      if (requestUrl.pathname.startsWith('/restaurant.html')) {
        event.respondWith(caches.match('/restaurant.html'));
        return; // Done handling request, so exit early.
      }
    }

    // Default behavior: respond with cached elements, if any, falling back to network.
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });


  /** Hijack fetch requests and respond accordingly */
self.addEventListener('fetch', function(event) {
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
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });

  function serveImage(request) {
    let imageStorageUrl = request.url;

    // Make a new URL with a stripped suffix and extension from the request url
    // i.e. /img/1-medium.jpg  will become  /img/1
    // we'll use this as the KEY for storing image into cache
    imageStorageUrl = imageStorageUrl.replace(/-small\.\w{3}|-medium\.\w{3}|-large\.\w{3}/i, '');

    return caches.open(contentImgsCache).then(function(cache) {
      return cache.match(imageStorageUrl).then(function(response) {
        // if image is in cache, return it, else fetch from network, cache a clone, then return network response
        return response || fetch(request).then(function(networkResponse) {
          cache.put(imageStorageUrl, networkResponse.clone());
          return networkResponse;
        });
      });
    });
  }


//6 sal ver
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request, {ignoreSearch:true})
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }

          var fetchRequest = event.request.clone();

          return fetch(fetchRequest).then(
              function(response) {
                  // Check if we received a valid response
                  if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                  }
                  var responseToCache = response.clone();

                  caches.open(staticCacheName)
                    .then(function(cache) {
                      cache.put(event.request, responseToCache);
                    });
                  return response;
              }
          )
        }
      )
    );
  });

  //7
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      }).catch(error => {
        return new Response('Not connected to the internet', {
          status: 404,
          statusText: "Not connected to the internet"
        });
        console.log(error, 'no cache entry for:', event.request.url);
      })
    );
  });
  if (event.request.url.indexOf('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}') == 0) {
    event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request);
        }).catch(error => {
          return new Response('Not connected to the internet', {
            status: 404,
            statusText: "Not connected to the internet"
          });

        })
      // Handle Maps API requests in a generic fashion,
      // by returning a Promise that resolves to a Response.
  })
  if (event.request.url.indexOf('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}') == 0) {
    event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request);
        }).catch(error => {
          return new Response('Not connected to the internet', {
            status: 404,
            statusText: "Not connected to the internet"
          });
          console.warn(error, 'no cache entry for:', event.request.url);
        })

        api.tiles.mapbox.com



        event.respondWith(
            caches.match(event.request).then(response => {
              return response || fetch(event.request);
            }).catch(error() {
              return new Response('Not connected to the internet', {
                status: 404,
                statusText: "Not connected to the internet"
              });
              console.log('no cache entry for:', error);
            })
          );


          event.respondWith(
            caches.match(event.request).then(response => {
              return response || fetch(event.request);
            }).catch(function() {
              return new Response('Not connected internet', {
                status: 404,
                statusText: "Not connected internet"
              });
            })
        );
    });

    if (requestUrl.hostname == 'https://api.tiles.mapbox.com/v4/mapbox.streets/16/19303/24648.jpg70?access_token=pk.eyJ1IjoicmF2ZW5iIiwiYSI6ImNqbnZkMHRpeTE5eDYzcXBqbDhwNXF5Z20ifQ.QumZTPDgwPABAZJxU_G_5Q', { credentials :'include'}) {
        event.respondWith(serveMap(event.request));
            return;
    }
    // Default behavior: respond with cached elements, if any, falling back to network.
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
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

function serveMap(request){
    return caches.match(request).then(function(response) {
        if(response) {
            return response;
        }

    return fetch('/offline.html')
    .then(res => {
      if(res.ok) {
        return res;
      } else {
        throw Error(`Request rejected with status ${res.status}`);
      }
    })
    .catch(console.error)
})

}

//tHIS WORKED WITH LINE 1 ERROR
event.respondWith(
  caches.match(event.request).then(function(response) {

      if (response) {
          return response;
      }

      else {
          return fetch(event.request)
              .then(function(response) {
                  const responseClone = response.clone();
                  caches.open(staticCacheName).then(function(cache) {
                      cache.put(event.request, responseClone);
                  })
                  return response;
              })
              .catch(function(err) {
                  console.log('error ', err);
              });
      }
  })
);

event.respondWith(
  caches.match(event.request).then(function(resp) {
    return resp || fetch(event.request).then(function(response) {
      let responseClone = response.clone();
      caches.open('v1').then(function(cache) {
        cache.put(event.request, responseClone);
      });

      return response;
    });
  }).catch(function() {
    return caches.match('/sw-test/gallery/myLittleVader.jpg');
  })
);



//mozilla
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        caches.open('-v1.0').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/img/Offline.jpg');
      });
    }
  }));
});

//my ver working
/ Default behavior: respond with cached elements, if any, falling back to network.
    event.respondWith(
        caches.match(event.request,{ignoreSearch:true}).then(function(resp) {
            return resp || fetch(event.request).then(function(response) {
              let responseClone = response.clone();
              caches.open("-v1.0").then(function(cache) {
                cache.put(event.request, responseClone);
              });

              return response;
            });
          }).catch(function() {
            return caches.match('/img/Offline.jpg');
          })
    );

});
