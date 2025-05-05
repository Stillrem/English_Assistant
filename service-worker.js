self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('v4').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/translator.html?v=4',
        '/css/style.css',
        '/js/translator.v4.js',
        '/manifest.json'
      ]);
    })
  );
});
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});