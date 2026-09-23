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
          'frame-ancestors': ["'self'", 'https://paul-deveaux.fr', 'http://localhost:3000'],
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
