const CACHE_NAME = "offers-cache-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./prices.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  );
});
const CACHE_NAME = "crm-cache-v2";

const urlsToCache = [
    "./",
    "./index.html",
    "./prices.json",
    "./manifest.json"
];


// // INSTALL
// self.addEventListener("install", event => {

//     event.waitUntil(

//         caches.open(CACHE_NAME)
//         .then(cache => cache.addAll(urlsToCache))

//     );

// });


// // ACTIVATE
// self.addEventListener("activate", event => {

//     event.waitUntil(

//         caches.keys().then(cacheNames => {

//             return Promise.all(

//                 cacheNames.map(cache => {

//                     if (cache !== CACHE_NAME) {

//                         return caches.delete(cache);

//                     }

//                 })

//             );

//         })

//     );

// });


// // FETCH
// self.addEventListener("fetch", event => {

//     event.respondWith(

//         caches.match(event.request)
//         .then(response => {

//             return response || fetch(event.request);

//         })

//     );

// });


// self.addEventListener("install", e => {
//     e.waitUntil(
//         caches.open("crm-cache").then(cache => {
//             return cache.addAll([
//                 "./",
//                 "./index.html",
//                 "./prices.json"
//             ]);
//         })
//     );
// });

// self.addEventListener("fetch", e => {
//     e.respondWith(
//         caches.match(e.request).then(r => r || fetch(e.request))
//     );
// });
