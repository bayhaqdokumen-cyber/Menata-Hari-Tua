const CACHE_NAME = 'menata-hari-tua-v1';
const URLS = [
  './',
  './index.html',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(URLS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => {
    if (k !== CACHE_NAME) return caches.delete(k);
  }))));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request).then(fresh => {
      const copy = fresh.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
      return fresh;
    }).catch(() => caches.match('./index.html')))
  );
});