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
- **GSAP + ScrollTrigger** — uniquement pour le repli de la pile piloté au défilement,
  importé dans ce seul composant (voir « Contraintes techniques »)
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

Formes : rayons 4–8 px, filets 1 px plutôt qu'ombres portées,
bandes de section unies — **jamais de dégradé**.

### Le bord droit partagé — la page n'est plus centrée

Le contenu **n'est plus une colonne centrée de 1200 px**. Il part du bord gauche qu'aurait
une colonne de 1200 px centrée, et s'étend à droite jusqu'à un bord commun défini par la
carte du héros. La page est volontairement asymétrique : marge gauche large, marge droite
étroite. Décision prise le 22 juillet 2026, en connaissance de la règle qu'elle remplace.

Deux utilitaires dans `src/styles/global.css` :

| Utilitaire | Usage |
|---|---|
| `container-page` | Colonne centrée 1200 px. Conservé pour un usage ponctuel — **aucune section ne s'en sert**. |
| `container-wide` | Le conteneur réel du site : même bord gauche, bord droit repoussé de `--edge-extra`. |

```
--edge-side  = max(0px, (100% - 1200px) / 2)             ← bord gauche, inchangé
--edge-extra = min(180px, max(0px, --edge-side - 24px))  ← débord droit, plafonné
```

Trois règles à ne pas casser :

1. **Tout en `100%`, jamais en `vw`.** `100%` est relatif au `<body>`, barre de défilement
   exclue ; `vw` l'inclut. Mélanger les deux désaligne le bord gauche d'environ 8 px —
   exactement le défaut que ce système corrige.
2. **La carte du héros n'a plus de marge négative.** C'est `container-wide` qui porte le
   débord ; la carte remplit simplement sa colonne. Une seule source de vérité.
3. **Son débord peint dépasse le bord de ~7,8 px** : c'est le coin de l'inclinaison de 1,6°,
   pas un désalignement. Sa boîte de mise en page est exacte.

Un bloc dont le contenu ne remplit pas sa colonne (les chiffres de la bande de preuve)
doit être dimensionné sur son contenu et calé à droite — sinon la section paraît courte
alors que son conteneur, lui, est bien aligné.

## Règles de contenu

- Toute la copy à l'écran est **en anglais**. Une version française viendra en phase 2 ;
  l'architecture i18n n'est pas encore en place.
- La copy vient du handoff validé. Toute modification repasse par Masdouk.
- Voix active, phrases courtes, sentence case. Bannis : *revolutionary*, *seamless*,
  *powerful*, *cutting-edge*, *unlock*, *supercharge*, *game-changing*.
- **Aucune statistique ni logo client inventés.** DocuFlow n'a pas encore de clients externes ;
  au Canada les indications trompeuses relèvent de la *Loi sur la concurrence*.

## Animation

**C'est une landing page, pas une brochure : le mouvement est attendu.** Le plafond
« une seule animation majeure » qui figurait ici venait du brief initial, écrit pour le
concept « journée de travail » abandonné depuis. Il est levé (23 juillet 2026). L'ampleur
et le nombre d'animations relèvent de la direction artistique — ce sont des décisions de
Saïd, pas des règles techniques.

**GSAP + ScrollTrigger sont la boîte à outils du site.** Sur la page d'accueil ils sont déjà
chargés, donc toute animation supplémentaire y coûte zéro octet. Les importer dans un
composant partagé est autorisé. Seul point de vigilance : un composant qui importe GSAP
l'emmènera avec lui sur les futures pages produit — arbitrer à ce moment-là, pas avant.

Animations en place :

- **`StackFold`** — repli de la pile, piloté au défilement, section épinglée, `scrub`. Deux
  temps morts volontaires dans la timeline (lecture au début, résolution à la fin) : **ne pas
  les raccourcir**, ce sont eux qui laissent comprendre la comparaison.
- **`Nav`** — repli de la barre en pastille flottante.
- **`PillarSection`** — reveal « drapé » : bascule `rotateX` de 15° charnière en haut, arrivée
  amortie, cascade des trois éléments. Réversible dans les deux sens (`toggleActions`, jamais
  `scrub` — le scrub écraserait l'amorti). Le comportement réversible est **à l'essai** : la
  chaîne `toggleActions` est isolée dans une constante pour revenir à un déclenchement unique
  en une ligne.
- Micro-interactions : carte du héros au survol, lignes de la fiche, cartes secteurs.

## Contraintes techniques

Ces quatre points ne sont pas négociables — ils ne relèvent pas du goût.

- **Le contenu ne dépend jamais du JS pour être visible.** Tout état masqué doit être posé
  *par* le script (`gsap.set()`, classe sur `<html>`), jamais par une règle CSS statique. Script
  absent ou en échec → la page reste lisible. À vérifier en désactivant JS dans les devtools.
- **`prefers-reduced-motion` respecté partout**, via `gsap.matchMedia()`. Pas d'animation
  raccourcie : pas d'animation du tout, et contenu à son état final.
- **CLS ≈ 0.** Seuls `opacity` et `transform` s'animent. Hauteurs réservées sur les zones dont
  le contenu change (inspecteur du héros).
- **Jamais de barre de défilement horizontale.** Si une transformation déborde, `overflow-x: clip`
  — jamais `overflow: hidden`, qui crée un conteneur de défilement et casse le sticky de la nav.

Et deux règles de fond qui restent :

- La comparaison de `StackFold` doit survivre **sans** l'animation : sous 901 px, en pointeur
  grossier, en mouvement réduit ou sans JS, les quatre cartes, le total 38 $ et DocuFlow à 14 $
  restent tous visibles simultanément. L'animation enjolive l'argument, elle ne le porte jamais seule.
- La progression du rail s'écrit **directement dans le DOM**, throttlée en `requestAnimationFrame`.
  Ne jamais la router par de l'état framework : ça re-rend la page à chaque pixel.

Cible de performance : Lighthouse ≥ 95 sur les quatre axes, LCP < 2 s. C'est un budget à
surveiller, pas un prétexte pour refuser une animation.

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
