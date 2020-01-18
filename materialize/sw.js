var CACHE_NAME = 'my-site-cache-v2';
var urlsToCache = [
    '/',
    '/css/materialize.css',
    '/css/materialize.min.css',
    '/img/gmb1.jpg',
    '/img/gmb2.jpg',
    '/img/gmb3.jpg',
    '/img/gmb4.jpg',
    '/img/gmb5.jpg',
    '/img/gmb6.jpg',
    '/img/gmb7.jpg',
    '/img/gmb8.jpg',
    '/img/img1.jpg',
    '/img/img2.jpg',
    '/img/img3.jpg',
    '/img/img4.jpg',
    '/img/img5.png',
    '/js/materialize.js',
    '/js/materialize.min.js'
];

//install service worker
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('in install serviceWorker.... cache opened');
            return cache.addAll(urlsToCache);
        })
    );
});

// fetch
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        }
        )
    );
});


// activate
self.addEventListener('activate', function (event) {
    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName != CACHE_NAME
                }).map(function (cacheName) {
                    return caches.delete(cacheName)
                })
            );
        })
    );
});

