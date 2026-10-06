import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/manifesto/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
  async redirects() {
    // Indirizzi facili da dire a voce o da stampare sui materiali
    return [
      { source: "/la-mia-radice", destination: "/lamiaradice", permanent: true },
      { source: "/mostra", destination: "/mostra-peppino-impastato", permanent: true },
      { source: "/radici-libere", destination: "/mostra-peppino-impastato", permanent: true },
      { source: "/bambini", destination: "/famiglie", permanent: true },
      { source: "/ora", destination: "/adesso", permanent: true },
      { source: "/qr", destination: "/adesso", permanent: false },
      { source: "/come-arrivare", destination: "/info#come-arrivare", permanent: true },
      { source: "/manifesto", destination: "/festival#il-manifesto", permanent: true },
      // le tre giornate, per i materiali stampati e i social
      { source: "/mafia", destination: "/giornate/mafia", permanent: true },
      { source: "/donne", destination: "/giornate/donne", permanent: true },
      { source: "/immigrazione", destination: "/giornate/immigrazione", permanent: true },
      // appuntamenti tolti o accorpati il 6 ottobre
      {
        source: "/programma/laboratorio-santa-briganti",
        destination: "/programma/a-colpi-di-mantice",
        permanent: true,
      },
      {
        source: "/programma/le-seminatrici-di-oggi",
        destination: "/programma/monologo-sulle-donne",
        permanent: true,
      },
      { source: "/programma/rito-della-luce", destination: "/programma", permanent: true },
    ];
  },
};

export default nextConfig;
