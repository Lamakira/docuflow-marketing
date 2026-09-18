// @ts-check
import { defineConfig, envField } from 'astro/config';

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

  // L'application vit dans un autre repo et sur un autre hôte (ADR-0002), et cet
  // hôte change d'un environnement à l'autre : l'environnement parallèle
  // aujourd'hui, un domaine de production le jour de la bascule. Les appels à
  // l'action passent tous par `src/data/app.ts`, qui lit cette valeur — aucune
  // URL d'application n'est écrite dans un composant.
  //
  // Le défaut est l'environnement parallèle, parce que c'est le seul hôte qui
  // existe aujourd'hui et qu'un site qui se construit sans `.env` doit mener
  // quelque part de réel. Pointer ailleurs se fait en posant `APP_URL` au
  // build, sans toucher au balisage. `url: true` arrête au build une valeur
  // qui n'est pas une URL, plutôt qu'en produisant des liens cassés.
  env: {
    schema: {
      APP_URL: envField.string({
        context: 'server',
        access: 'public',
        url: true,
        default: 'https://docuflow-masdouk1.replit.app',
      }),
    },
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
          // Cartes de la bande Platform de /product, dans l'ordre de
          // PLATFORM_CARDS (src/data/product.ts). `share-2` porte le serveur
          // MCP : trois noeuds reliés, c'est le seul glyphe Lucide qui dessine
          // un protocole plutôt qu'un objet.
          'shield-check',
          'users',
          'bell',
          'refresh-cw',
          'lock',
          'share-2',
          // Navigation : le chevron du déclencheur Solutions, et le burger /
          // la croix du tiroir mobile. `chevron-down` tourne de 180° à
          // l'ouverture — c'est le SEUL changement de métrique autorisé sur le
          // déclencheur, dont la largeur est mesurée au runtime.
          'chevron-down',
          'menu',
          'x',
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