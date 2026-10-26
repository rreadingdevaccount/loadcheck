// Load Check offline cache. To push an update to phones: change CACHE below, upload, then open the app twice.
var CACHE = 'loadcheck-v1';
var FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (n) { return n !== CACHE; }).map(function (n) { return caches.delete(n); })); })); self.clients.claim(); });
self.addEventListener('fetch', function (e) { e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || fetch(e.request); })); });
