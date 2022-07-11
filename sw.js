const staticCatchName = 'pwa_static_catch_top_news';
const dynamicCatchName = 'pwa_dynamic_catche_top_news';
const assets = [
	'/',
	'/index.html',
	'/style/_headers/headers.css',
	'/style/_pages/accountSettings.css',
	'/style/_pages/assesments.css',
	'/style/_pages/career.css',
	'/style/_pages/competitions.css',
	'/style/_pages/courses.css',
	'/style/_pages/edit_profile.css',
	'/style/_pages/leaderBoard.css',
	'/style/_pages/my_profile.css',
	'/style/_pages/my_progress.css',
	'/style/_pages/myFeed.css',
	'/style/_pages/notification.css',
	'/style/_pages/topics.css',
	'/images/logo.png',
	'/images/logo.svg',
];
self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(staticCatchName).then(function (cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(assets);
		}),
	);
});
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			console.log(keys);
			return Promise.all(
				keys
					.filter((key) => key !== staticCatchName)
					.map((key) => caches.delete(key)),
			);
		}),
	);
});
self.addEventListener('fetch', (event) => {
	console.log(event.request.url);
	event.respondWith(
		caches.match(event.request).then((response) => {
			return (
				response ||
				fetch(event.request).then((fetchRes) => {
					return caches.open(dynamicCatchName).then((cache) => {
						cache.put(event.request.url, fetchRes.clone());
						return fetchRes;
					});
				})
			);
		}),
	);
});
