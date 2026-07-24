// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // TODO: remplacer par le domaine réel une fois arbitré avec Masdouk.
  // Alimente les URL canoniques, l'Open Graph et le sitemap.
  site: 'https://docuflow.ca',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    sitemap(),
    // Icônes Lucide inlinées en SVG à la compilation : zéro JS, zéro requête
    // tierce, et seuls les glyphes réellement utilisés atterrissent dans le HTML.
    // `include` fige la liste — sans lui, tout le jeu Lucide devient importable
    // et le budget dérive sans que personne le voie.
    icon({
      include: {
        lucide: [
          // `circle-check` sert deux fois : les garanties de l'accueil et les
          // fonctions incluses des cartes tarifaires. `circle-x` est son inverse.
          'circle-check',
          'circle-x',
          // Comparatif de /pricing : la coche nue et le tiret des cases vides.
          // Sans cercle — dix-huit rangées de pastilles cerclées feraient un mur.
          'check',
          'minus',
          // Un par secteur, dans l'ordre de SECTORS (src/data/site.ts).
          'palette',
          'code-xml',
          'presentation',
          'calculator',
          'scale',
          'headset',
          'hard-hat',
          'user-search',
        ],
      },
    }),
  ],
});