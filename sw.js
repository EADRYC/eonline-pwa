/* SERVICE WORKER - E-ONLINE BUSINESS EDITION */
const CACHE_NAME = "eonline-cache-v2"; // Badilisha v1 iwe v2 kila ukifanya update
const urlsToCache = [
  "/",
  "https://www.e-online.co.tz/?utm_source=pwa",
  "https://eadryc.github.io/eonline-pwa/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      // Hapa unaweza kuweka page ya Offline kama ukitengeneza
      return caches.match("/");
    })
  );
});
