// Cache tylko statycznych zasobów; nigdy /api ani danych użytkownika.
const C = "sw-v1";
self.addEventListener("install", (e) => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin || u.pathname.startsWith("/api")) return;
  const stat = u.pathname.startsWith("/_next/static") || u.pathname.startsWith("/icons");
  e.respondWith(fetch(e.request).then((r) => { if (stat) { const c = r.clone(); caches.open(C).then((x) => x.put(e.request, c)); } return r; })
    .catch(() => caches.match(e.request).then((m) => m || new Response("Brak połączenia z internetem.", { status: 503 }))));
});
