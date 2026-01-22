const CACHE_NAME = "eonline-cache-v1";
const urlsToCache = [
  "/",
  "https://eadryc.github.io/eonline-pwa/manifest.json",
  "https://i.imgur.com/Q1S35fF.png",  // 192px icon
  "https://i.imgur.com/2HWmn7K.png"   // 512px icon
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

