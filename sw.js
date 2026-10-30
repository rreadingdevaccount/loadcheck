// Load Check offline cache. To push an update to phones: change CACHE below, upload, then open the app twice.
var CACHE = 'loadcheck-v4.1';
var FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
// install: always download fresh copies (cache:'reload' skips the browser's HTTP cache, which GitHub Pages keeps for 10 minutes)
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES.map(function (f) { return new Request(f, { cache: 'reload' }); })); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (n) { return n !== CACHE; }).map(function (n) { return caches.delete(n); })); })); self.clients.claim(); });
// the app page: network first when online (so an update shows at once), offline copy when there is no signal; icons etc.: offline copy first
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  if (r.mode === 'navigate' || /\/(index\.html)?$/.test(new URL(r.url).pathname)) {
    e.respondWith(fetch(r, { cache: 'no-cache' }).then(function (resp) {
      if (resp && resp.ok) { var cp = resp.clone(); caches.open(CACHE).then(function (c) { c.put('index.html', cp); }); }
      return resp;
    }).catch(function () { return caches.match('index.html').then(function (m) { return m || caches.match('./'); }); }));
    return;
  }
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(function (m) { return m || fetch(r); }));
});
