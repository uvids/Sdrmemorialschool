const CACHE_NAME = "sdr-school-v2";
const ASSETS = ["./", "./index.html", "./style.css", "./script.js", "./logo.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
