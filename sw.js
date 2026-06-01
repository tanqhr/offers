
const CACHE_NAME = "crm-cache-v5";

// файлове за кеширане
const FILES_TO_CACHE = [
  "./",
  "./index.html"
  
];

// INSTALL
self.addEventListener("install", (event) => {
  self.skipWaiting(); // 🔥 веднага активира новия SW

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 🔥 чисти старите версии
          }
        })
      )
    )
  );

  self.clients.claim(); // 🔥 новият SW поема контрол веднага
});

// FETCH (stale-while-revalidate)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // обновява кеша в background
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(() => cached);

      // връща кеша веднага, ако има
      return cached || fetchPromise;
    })
  );
});
