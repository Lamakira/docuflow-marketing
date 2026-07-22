# DocuFlow — site vitrine

Site marketing statique de **DocuFlow**, la plateforme d'opérations tout-en-un de TECHMA
(CRM, temps, monitoring, documentation, assistant IA).

L'application elle-même vit dans un repo séparé : `../techma-documentation-platform`.
**Ce repo ne contient que le site public** — aucun code applicatif, aucun accès à la base.

## Stack

- **Astro 7** en sortie statique — le site est du contenu, rien de dynamique à rendre
- **Tailwind 4** via `@tailwindcss/vite` — configuration CSS-first dans `src/styles/global.css`,
  il n'y a **pas** de `tailwind.config.js`
- `@astrojs/react` pour d'éventuels îlots interactifs, `@astrojs/sitemap` pour le SEO
- Polices auto-hébergées dans `public/fonts` — **aucune requête vers un domaine tiers**

## Le concept de la page — à ne pas perdre

**La page d'accueil est un mandat client**, pas une journée de travail.

Le rail vertical à gauche suit les vraies étapes du CRM du produit :
`LEAD → WON → IN PROGRESS → IN REVIEW → COMPLETED`. Ce n'est pas décoratif : dans le schéma
de l'app, `crmProjects` est la table pivot à laquelle se rattachent les heures, les tâches,
les captures, les notes et la documentation. Le projet client est ce qui unifie les quatre piliers.

Une première version organisait la page autour des heures d'une journée (`08:12`, `09:40`…).
Elle a été rejetée : elle faisait passer DocuFlow pour un simple outil de time tracking, alors
que **le regroupement est l'argument de vente**. Détail dans `docs/landing-corrections.md`.

Conséquence pratique : **un pilier, une section**, et le time tracking n'est qu'un pilier
sur quatre. Toute nouvelle section doit respecter cet équilibre.

## Tokens

Définis dans `@theme` (`src/styles/global.css`). **Noms figés par le brief — ne pas renommer.**

| Token | Valeur | Usage |
|---|---|---|
| `ink` | `#0F1524` | bandes sombres, titres |
| `paper` | `#F3F5F7` | fond de page |
| `hour` | `#E9A23B` | accent, étape courante |
| `live` | `#1F9D6B` | statut actif, validations |
| `slate` | `#59657A` | texte courant |
| `rule` | `#D8DEE6` | filets 1 px |

Typo : **Cabinet Grotesk** (display), **Switzer** (corps), **JetBrains Mono** (tout chiffre,
durée, prix ou badge).

Formes : rayons 4–8 px, filets 1 px plutôt qu'ombres portées, contenu max 1200 px,
bandes de section unies — **jamais de dégradé**.

## Règles de contenu

- Toute la copy à l'écran est **en anglais**. Une version française viendra en phase 2 ;
  l'architecture i18n n'est pas encore en place.
- La copy vient du handoff validé. Toute modification repasse par Masdouk.
- Voix active, phrases courtes, sentence case. Bannis : *revolutionary*, *seamless*,
  *powerful*, *cutting-edge*, *unlock*, *supercharge*, *game-changing*.
- **Aucune statistique ni logo client inventés.** DocuFlow n'a pas encore de clients externes ;
  au Canada les indications trompeuses relèvent de la *Loi sur la concurrence*.

## Contraintes techniques

- Une seule animation majeure sur la page : le repli de la pile d'outils
  (`src/components/sections/StackFold.astro`). Rien d'autre que des micro-interactions au survol.
- La progression du rail s'écrit **directement dans le DOM**, throttlée en `requestAnimationFrame`.
  Ne jamais la router par de l'état framework : ça re-rend la page à chaque pixel.
- `prefers-reduced-motion` respecté partout.
- Hauteurs réservées sur les zones dont le contenu change (inspecteur du héros) pour garder CLS ≈ 0.
- Cible : Lighthouse ≥ 95 sur les quatre axes, LCP < 2 s.

## À faire

- [ ] **Remplacer les chiffres de la bande de preuve** (`src/data/site.ts`, `PROOF_STATS`) par
      les valeurs réelles de la base. Bloquant avant toute mise en ligne.
- [ ] Arbitrer le domaine et mettre à jour `site` dans `astro.config.mjs` (actuellement `docuflow.ca`)
- [ ] Décider EN seul ou bilingue FR/EN — structure tout le routing, à trancher avant d'ajouter des pages
- [ ] Gabarits restants : page produit, secteur, comparative, méga-menu (voir `docs/site-architecture.md`)
- [ ] Page `/pricing` — maquette dans `docs/design-handoff/Pricing.dc.html`, pas encore intégrée
- [ ] Vérifier le rendu mobile réel (points de rupture posés, pas testés visuellement)

## Documents de référence

| Fichier | Contenu |
|---|---|
| `docs/design-brief.md` | Brief initial — ⚠️ décrit l'ancien concept « journée de travail » |
| `docs/landing-corrections.md` | Le delta qui a corrigé le concept — **c'est la version qui fait foi** |
| `docs/site-architecture.md` | Arborescence complète, matrice SEO, fondations techniques |
| `docs/design-handoff/` | Maquettes HTML de référence — ouvrir dans un navigateur |

---

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
