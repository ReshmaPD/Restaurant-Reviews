// ALEX
// Register service worker only if supported
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then(function(reg) {
      console.log("Service Worker has been registered successfully!");
    }).catch((e) => {
      console.log("Couldn't register service worker... \n", e);
    });
  }



// GO
//   Installing Service Worker.
 if ('serviceWorker' in navigator) {    //https://developers.google.com/web/fundamentals/primers/service-workers/
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
}

// CG
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('../sw.js').then(function(reg) {
      console.log('registered!');
    }).catch(function(err) {
      console.log('error ', err);
    });
  }

// MC
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/service-worker.js')
    .catch(function(err) {
      console.error(err);
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


  //google ver
// Register service worker
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