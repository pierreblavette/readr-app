import { defaultCache } from "@serwist/turbopack/worker";
import { Serwist } from "serwist";

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: /^https:\/\/readr-vision\.pierreblavette\.workers\.dev\//,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "readr-vision",
        expiration: { maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 },
      },
    },
    {
      matcher: /^https:\/\/books\.google\.com\/books\/(content|publisher)/,
      handler: "CacheFirst",
      options: {
        cacheName: "book-covers-gb",
        expiration: { maxEntries: 500, maxAgeSeconds: 90 * 24 * 60 * 60 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      matcher: /^https:\/\/covers\.openlibrary\.org\/b\//,
      handler: "CacheFirst",
      options: {
        cacheName: "book-covers-ol",
        expiration: { maxEntries: 500, maxAgeSeconds: 90 * 24 * 60 * 60 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
  ],
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
