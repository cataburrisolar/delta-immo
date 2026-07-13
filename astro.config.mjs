// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

import tailwindcss from '@tailwindcss/vite';

import { defaultLang } from './src/i18n/utils';

// https://astro.build/config
export default defineConfig({
  site: "https://delta-immo.swiss",
  output: "static",
  i18n: {
    locales: ['fr', 'de'],
    defaultLocale: defaultLang,
    routing: {
      prefixDefaultLocale: true,
    },
  },
  redirects: {
    '/': `/${defaultLang}/`,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap()
  ]
});
