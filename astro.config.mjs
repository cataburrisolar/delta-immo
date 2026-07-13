// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import { defaultLang } from './src/i18n/utils';

// https://astro.build/config
export default defineConfig({
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
});
