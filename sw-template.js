/* MAAR BUSINESS LEVEL 2 BTEC – offline service worker.
   the build plugin in vite.config.ts replaces the two placeholders below at build time, so every
   build lists exactly the files it produced. Nothing here needs editing when content changes. */
const BUILD_ID = '__BUILD_ID__'
const CACHE = 'maar-btec-' + BUILD_ID
const PRECACHE = /*__PRECACHE__*/[]

const scopeUrl = (p) => new URL(p, self.registration.scope).href

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE.map((u) => new Request(scopeUrl(u), { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('maar-btec-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => clients.forEach((c) => c.postMessage({ type: 'OFFLINE_READY', build: BUILD_ID, files: PRECACHE.length }))),
  )
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'STATUS') {
    caches.has(CACHE).then((ok) => event.source && event.source.postMessage({ type: ok ? 'OFFLINE_READY' : 'OFFLINE_PENDING', build: BUILD_ID, files: PRECACHE.length }))
  }
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  // Page loads: serve the app shell straight from the cache (instant, works offline). Routing is hash-based.
  if (req.mode === 'navigate') {
    // Only the site root (or index.html) is the app. Any other path is a mistyped address: show the 404 page.
    const scopePath = new URL(self.registration.scope).pathname
    const rel = url.pathname.startsWith(scopePath) ? url.pathname.slice(scopePath.length) : url.pathname
    if (rel !== '' && rel !== 'index.html') {
      event.respondWith(
        caches.match(scopeUrl('./404.html'))
          .then((hit) => hit ? hit.text().then((t) => new Response(t, { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } })) : fetch(req))
          .catch(() => fetch(req)),
      )
      return
    }
    event.respondWith(
      caches.match(scopeUrl('./index.html')).then((hit) => hit || fetch(req)).catch(() => caches.match(scopeUrl('./index.html'))),
    )
    return
  }

  // Everything else: cache first, then network (and remember what the network returned).
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit
      return fetch(req).then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)) }
        return res
      })
    }),
  )
})
