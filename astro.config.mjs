// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: remplacer par le domaine réel une fois arbitré avec Masdouk.
  // Alimente les URL canoniques, l'Open Graph et le sitemap.
  site: 'https://docuflow.ca',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()]
});