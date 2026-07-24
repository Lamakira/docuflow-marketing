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
- **`PlanCards`** — arrivée des cartes tarifaires, décalée de 90 ms de l'une à l'autre : la
  carte se pose (18 px, `opacity` de 0.25 à 1), puis son coin se tourne avec un léger
  dépassement. **En CSS pur, sans une ligne de JS** (voir « La page `/pricing` »). Le fondu
  part de 0.25 et non de 0 : un élément à `opacity: 0` est ignoré par la mesure du LCP, et
  les cartes sont le plus gros bloc au-dessus de la ligne de flottaison.
- Micro-interactions : carte du héros au survol, lignes de la fiche, cartes secteurs,
  fondu croisé des deux tarifs à la bascule mensuel/annuel, **coin de la carte tarifaire qui
  se soulève au survol** (le handoff disait « card hover: none » et `DESIGN.md` interdit le
  déplacement au survol — les deux ont été levés sur demande, le 24 juillet 2026).

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

## La page `/pricing`

Intégrée le 24 juillet 2026 d'après `docs/design_handoff_pricing_cards/`. Quatre sections :
`PlanCards`, `ComparisonTable`, `PricingFaq`, puis le `FinalCta` partagé — désormais paramétré
(`title`, `note`) parce que chaque page appelle à l'action avec ses mots.

Tout y est en CSS **sauf le dépliage de la FAQ**, qui embarque le seul script propre à la page
(voir plus bas). Le reste — bascule des tarifs, pli des cartes, survol — ne coûte pas un octet
de JS, et la règle de fond tient partout : **rien n'attend le script pour être lisible**.

**La bascule mensuel/annuel est en CSS pur.** Deux boutons radio masqués visuellement et un
`:has()` sur la section : les flèches du clavier fonctionnent sans code, et le tarif mensuel
est rendu côté serveur. Le bloc annuel est un doublon complet du bloc mensuel, pas un contenu
que le script révélerait — d'où la seule dérogation apparente à la règle « aucun état masqué
en CSS statique » : sans `:has()`, la page reste sur le mensuel, entière et lisible. Corollaire :
l'en-tête condensé et la grille vivent dans **un seul composant**, sinon les radios et les prix
qu'ils commandent n'ont plus d'ancêtre commun.

**La carte cornée sort de plusieurs règles de `DESIGN.md`, et c'est le handoff qui les lève** :
rayon 18 px (hors échelle 1/3/6/8), CTA en pastille (« no pill buttons anywhere »), filet
tireté hors du reçu, et une ombre portée sur la carte Growth. Le `clip-path` rogne tout le
rendu de l'élément, ombre comprise : celle-ci vit donc sur une enveloppe, en `drop-shadow`,
ce qui lui fait suivre la silhouette cornée au lieu de retracer un rectangle — même technique
que le reçu. À arbitrer avec Saïd : soit `DESIGN.md` accueille ces valeurs, soit la carte
rentre dans le rang.

**Trois teintes du handoff ont été corrigées pour le contraste**, jamais pour le goût : le vert
qui porte le ✓ passe en `live-on-light` (règle déjà écrite dans `global.css`), et les libellés
de fonctions absentes montent d'un cran (`slate` sur blanc, `slate-on-ink` sur la carte sombre)
— ce sont de vraies informations produit, elles ne peuvent pas rester sous AA. Les pastilles et
le tiret du tableau, eux, gardent leurs valeurs exactes : ils sont `aria-hidden` et doublés d'un
texte masqué, donc décoratifs au sens strict.

Le rail d'étapes est **retiré** de cette page (`<Layout rail={false}>`) : `LEAD → COMPLETED`
décrit le cycle d'un mandat client, pas une grille tarifaire.

**Le comparatif est en `border-collapse: separate` avec `border-spacing: 0`** — rendu identique
à l'oeil, mais c'est ce qui rend son en-tête collant utilisable. En `collapse`, les filets
appartiennent au TABLEAU et non aux cellules : peints par le tableau, au-dessus du fond des
cellules et hors de leur contexte d'empilement. Deux défauts en découlaient, et un seul réglage
les corrige : le filet de l'en-tête restait accroché à la position d'origine de la rangée (il
« disparaissait » au décollage), et les filets des rangées en cours de défilement traversaient
l'en-tête, qui semblait alors transparent malgré son fond blanc. Vaut pour toute cellule
`position: sticky` de ce projet.

**Et l'en-tête porte un cache de 64px au-dessus de lui** (`thead th::before`), parce que la nav
repliée en pastille rend son fond transparent — c'est le principe de la pastille, elle flotte —
et laisse donc la hauteur d'une barre de nav à découvert, dans laquelle les rangées défilaient
à la vue de tous. Le cache est un enfant de la cellule collante : il voyage avec elle et
n'existe qu'à l'endroit où il sert. Deux conséquences à ne pas défaire : la hauteur du cache et
le `top` de l'accroche sortent de la même variable (`--stick`), et le `<h2>` de la section prend
un `z-index` supérieur — sans lui, le cache blanchirait la moitié basse du titre au moment où le
tableau arrive sous la nav. **Toute section qui rendra un en-tête collant sous cette nav aura le
même problème.**

**Le dépliage de la FAQ demande du JS — quatre pistes CSS ont été essayées et aucune ne
s'anime** (transition sur `::details-content`, `height` physique, `grid-template-rows:
0fr → 1fr`, `@starting-style`). La cause est commune aux quatre : le contenu d'un `<details>`
fermé **n'est pas rendu**, donc il n'a aucun état de départ à interpoler. La seule méthode
fiable est d'animer la hauteur du `<details>` lui-même, qui est un élément normal, en le
gardant ouvert pendant la fermeture. Conséquences assumées :

- L'attribut `name` (accordéon exclusif natif) a dû partir : le navigateur referme les frères
  sèchement, en plein milieu de l'animation. L'exclusivité est gérée par le script. Sans JS,
  les panneaux deviennent indépendants — plusieurs ouverts à la fois, ce qui reste lisible.
- Le script est un **enrichissement** : sans lui, `<details>` fonctionne nativement. La règle
  « le contenu ne dépend jamais du JS » tient toujours.
- Vérification : un onglet en arrière-plan suspend `requestAnimationFrame`, donc l'ouverture
  s'y fige à mi-chemin. Ce n'est pas un bug — mais ça rend tout test d'animation invérifiable
  dans un onglet masqué. Allonger la durée et regarder, comme pour le pli des cartes.

**Le pli d'arrivée et le fondu des tarifs sont en CSS pur.** Deux points de méthode qui
expliquent leur forme :

- **Jamais la forme raccourcie `animation:` dans ce projet.** Une déclaration sans nom
  d'animation — `animation: 520ms ease backwards` — est renormalisée en `animation: none`
  par Lightning CSS au build. Le nom posé par une règle suivante survit, la durée non :
  l'animation s'exécute en 0 s, donc invisible, et **rien n'échoue nulle part** — ni au
  build, ni dans la console. Longhands uniquement (`animation-name`, `-duration`, …).
  Corollaire de méthode : une animation se vérifie sur le **CSS livré** (`dist/_astro/*.css`)
  et à l'écran, jamais en injectant les valeurs manquantes depuis la console — c'est
  exactement ce qui a laissé passer le bug une première fois.
- Le pli anime **ensemble** l'encoche du `clip-path` et l'échelle du rabat, depuis le même
  coin et au même rythme : le rabat épouse donc la coupe à chaque image et l'encoche n'est
  jamais un trou. Découpler les deux, c'est voir la page trouée avant d'être pliée. Les deux
  séries de pourcentages (`0/42/78/100 %`) doivent rester identiques, et l'échelle du
  dépassement vaut exactement le rapport des deux coupes (1.2 ↔ 36 px pour 30 px).
  Contrepartie assumée : `clip-path` repeint hors compositeur, quatre cartes pendant ~1,2 s
  au chargement, puis une carte à la fois au survol.
- Le bloc d'animation est sous `prefers-reduced-motion: no-preference`, pas seulement sous la
  règle globale qui écrase les durées : celle-ci ne touche pas `animation-delay`, et une carte
  dépliée figée 290 ms avant de claquer serait pire que pas d'animation du tout.
- Les deux tarifs partagent **une seule cellule de grille** (`opacity` + `visibility`, jamais
  `display`) : c'est ce qui permet le fondu croisé, ça sort toujours le tarif caché de l'arbre
  d'accessibilité, et la carte est dimensionnée en permanence sur le plus large des deux — la
  bascule ne peut donc rien décaler. Une transition ne se déclenchant pas au premier calcul de
  style, rien ne clignote au chargement.

## À faire

- [ ] **Remplacer les chiffres de la bande de preuve** (`src/data/site.ts`, `PROOF_STATS`) par
      les valeurs réelles de la base. Bloquant avant toute mise en ligne.
- [ ] Arbitrer le domaine et mettre à jour `site` dans `astro.config.mjs` (actuellement `docuflow.ca`)
- [ ] Décider EN seul ou bilingue FR/EN — structure tout le routing, à trancher avant d'ajouter des pages
- [ ] Gabarits restants : page produit, secteur, comparative, méga-menu (voir `docs/site-architecture.md`)
- [ ] Vérifier le rendu mobile réel (points de rupture posés, pas testés visuellement) — fait
      pour `/pricing` (620 / 560 / 360 px), reste l'accueil

## Documents de référence

| Fichier | Contenu |
|---|---|
| `docs/design-brief.md` | Brief initial — ⚠️ décrit l'ancien concept « journée de travail » |
| `docs/landing-corrections.md` | Le delta qui a corrigé le concept — **c'est la version qui fait foi** |
| `docs/site-architecture.md` | Arborescence complète, matrice SEO, fondations techniques |
| `docs/design-handoff/` | Maquettes HTML de référence — ouvrir dans un navigateur |
| `docs/design_handoff_pricing_cards/` | Cartes cornées de `/pricing` — **remplace `Pricing.dc.html`** |

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
