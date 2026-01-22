const CACHE_NAME = "eonline-cache-v1";
const urlsToCache = [
  "/",
  "https://eadryc.github.io/eonline-pwa/manifest.json",
  // weka images na CSS muhimu hapa
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
