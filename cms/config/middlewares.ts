// Origins allowed to embed CMS content (e.g. certification PDFs) in an <iframe>.
// Extra origins can be added via FRAME_ANCESTORS (comma-separated).
const frameAncestors = [
  "'self'",
  'https://paul-deveaux.fr',
  'https://www.paul-deveaux.fr',
  'http://localhost:3000',
  ...(process.env.FRAME_ANCESTORS || '').split(',').map((o) => o.trim()).filter(Boolean),
];

module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://market-assets.strapi.io'],
          'media-src': ["'self'", 'data:', 'blob:'],
          'frame-ancestors': frameAncestors,
          upgradeInsecureRequests: null,
        },
      },
      // Allow the PDF viewer (certifications) to be embedded in an <iframe> from the frontend.
      // frame-ancestors above supersedes this in modern browsers; disabled as a fallback too.
      frameguard: false,
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  {
    name: 'strapi::session',
    config: {
      cookie: {
        secure: true,
        sameSite: 'none',
      },
    },
  },
  'strapi::favicon',
  'strapi::public',
];
