self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", './style', './images/logo.png','./assets']);
        })
    )
    // console.log("Install!")
})
self.addEventListener("fetch", e => {
    // console.log(e.request.url)
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request);
        })
    )
})