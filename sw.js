// const CACHE_NAME = 'version-1';
// const urlsToCache = ['./', './style', './images/logo.png', './assets'];

// const self = this;

// // Install SW
// self.addEventListener('install', (event) => {
// 	event.waitUntil(
// 		caches.open(CACHE_NAME).then((cache) => {
// 			console.log('Opened cache');

// 			return cache.addAll(urlsToCache);
// 		}),
// 	);
// });

// // Listen for requests
// self.addEventListener('fetch', (event) => {
// 	event.respondWith(
// 		caches.match(event.request).then(() => {
// 			return fetch(event.request)
// 		}),
// 	);
// });

// // Activate the SW
// self.addEventListener('activate', (event) => {
// 	const cacheWhitelist = [];
// 	cacheWhitelist.push(CACHE_NAME);

// 	event.waitUntil(
// 		caches.keys().then((cacheNames) =>
// 			Promise.all(
// 				// eslint-disable-next-line array-callback-return
// 				cacheNames.map((cacheName) => {
// 					if (!cacheWhitelist.includes(cacheName)) {
// 						return caches.delete(cacheName);
// 					}
// 				}),
// 			),
// 		),
// 	);
// });
const cacheName = 'cache1'; // Change value to force update

self.addEventListener('install', (event) => {
	// Kick out the old service worker
	self.skipWaiting();

	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll(['./', './style', './images/logo.png', './assets']);
		}),
	);
});

self.addEventListener('activate', (event) => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then((keys) => {
			Promise.all(
				keys.map((key) => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				}),
			);
		}),
	);
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data.
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.open(cacheName).then((cache) => {
			return cache.match(event.request).then((response) => {
				return (
					response ||
					fetch(event.request).then((networkResponse) => {
						cache.put(event.request, networkResponse.clone());
						return networkResponse;
					})
				);
			});
		}),
	);
});