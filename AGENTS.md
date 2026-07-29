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
- **Le reveal « drapé »** — bascule `rotateX` de 15° charnière en haut, arrivée amortie, cascade
  des éléments. Réversible dans les deux sens (`toggleActions`, jamais `scrub` — le scrub
  écraserait l'amorti). Le comportement réversible est **à l'essai** : la chaîne `toggleActions`
  est isolée dans une constante pour revenir à un déclenchement unique en une ligne.

  Il vit dans **`src/scripts/reveal.ts`** depuis le 24 juillet 2026, extrait de `PillarSection`
  quand `/product` en a eu besoin sur trois sections qui ne sont pas des piliers d'accueil. Son
  contrat tient en deux attributs : `[data-reveal-group]` sur la section, `[data-reveal]` sur les
  éléments **dans l'ordre de la cascade**. Aucune classe, aucun réglage par composant — c'est ce
  qui permet à plusieurs composants d'une même page de l'importer sans le dupliquer : un module ES
  ne s'exécute qu'une fois par document, quel que soit le nombre d'`import`.
  Utilisé par `PillarSection` (accueil) et par `ProductPillar` / `PlatformBand` / `ArgumentSection`
  (`/product`).
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

**Les marques sont des icônes Lucide, pas des glyphes texte** (décidé le 24 juillet 2026, sur
demande) : `circle-check` / `circle-x` sur les cartes — la même icône que les garanties de
l'accueil —, `check` / `minus` dans le comparatif, sans cercle parce que quatorze rangées de
pastilles cerclées feraient un mur. Le handoff décrivait une pastille pleine de 16px avec un ✓
blanc ; elle est abandonnée, un seul langage de tracé valant mieux sur tout le site. Toute
nouvelle icône doit être ajoutée à `include` dans `astro.config.mjs` — **un nom absent ne rend
rien et ne casse pas le build**, donc ça se vérifie en comptant les `<svg>` livrés.

**Deux teintes du handoff ont été corrigées pour le contraste**, jamais pour le goût : les
libellés de fonctions absentes montent d'un cran (`slate` sur blanc, `slate-on-ink` sur la carte
sombre) — ce sont de vraies informations produit, elles ne peuvent pas rester sous AA. Le vert
suit la règle déjà écrite dans `global.css` : `live-on-light` sur fond clair, `live` sur la
carte sombre où il reste lisible (5,3:1 contre 3,3:1). Depuis que la pastille est un contour et
non un disque plein, c'est le trait qui porte l'information. Les icônes de fonctions absentes,
elles, gardent leurs valeurs exactes : `aria-hidden` et doublées d'un texte masqué, donc
décoratives au sens strict.

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

## La page `/product`

Intégrée le 24 juillet 2026 d'après `docs/design_handoff_product/`. C'est la **fiche technique** :
elle ne vend pas la consolidation (c'est l'accueil) ni les plans (c'est `/pricing`), elle défait
une objection précise — *« un tout-en-un fait tout mal »* — en **publiant les vraies valeurs**.
Intervalles, comptes, noms de plateformes, limites. Les chiffres portent la persuasion, la prose
reste courte. Une section qui paraît maigre se corrige en mise en page, **jamais en rallongeant la
liste** : tout `src/data/product.ts` est vérifié contre le schéma de l'app, et au Canada une
indication trompeuse relève de la Loi sur la concurrence.

Ordre : héros → barre de saut → quatre piliers → Platform (`ink`) → The argument → liste
exhaustive → `FinalCta`. Le rail d'étapes est retiré (`rail={false}`), et **le repli de la pile de
l'accueil n'est pas rejoué** : c'est sa signature à elle.

**La taxonomie `Time → Activity → Clients → Knowledge` est celle du comparatif de `/pricing`**
(`COMPARISON_GROUPS`). Les deux pages doivent rester d'accord — c'est une source dupliquée à
surveiller, pas encore fusionnée.

**`ProductPillar` est le gabarit des dix futures pages par fonction**, et c'est pour ça qu'il ne
réutilise pas `PillarSection` : l'oeil-de-boeuf y vit *dans* la colonne de texte (il change donc de
côté avec elle), et la colonne porte en plus la liste de capacités et la bande de specs. Ce qui est
vraiment commun aux deux — le reveal — a été extrait dans `src/scripts/reveal.ts` plutôt que
recopié (voir « Animation »).

**La barre de saut porte un cache de 64 px au-dessus d'elle**, exactement comme l'en-tête collant du
comparatif de `/pricing`, et pour la même raison : la nav repliée en pastille rend son fond
transparent, donc sans cache le contenu défile à découvert entre la pastille et le filet de la
barre. Trois conséquences à ne pas défaire :

- La hauteur du cache et le `top` de l'accroche sortent de la même variable (`--stick`).
- La barre est en `z-index: 20`, **sous** la nav (30) : la pastille doit flotter par-dessus le cache.
- Le cache existe aussi au repos, où il recouvre les 64 px du bas du héros — d'où le `pb-16` de
  celui-ci (et non les 56 px du handoff), qui lui réserve exactement cette place. **Réduire ce
  padding, c'est faire mordre un rectangle opaque sur le bas des boutons.**

**Le dégagement des ancres passe par `Layout` et non par un `<style is:global>`.** La page empile
48 px de barre de saut sous 64 px de nav : `scrollPad="116px"` pose `--scroll-pad` en style inline
sur `<html>`, que `global.css` lit en `scroll-padding-top: var(--scroll-pad, 80px)`. Un style global
déclaré depuis une page peut se retrouver dans une feuille partagée au regroupement ; une variable
inline, non.

**Une piste de grille implicite se dimensionne sur son min-content** — mesuré à 410 px pour la
colonne d'un pilier, soit une barre horizontale garantie dès 360 px. Les grilles qui passent à une
colonne déclarent donc `grid-cols-1` explicitement (`minmax(0, 1fr)`, qui peut descendre sous le
min-content) au lieu de laisser la piste implicite décider. Vaut pour toute grille responsive du
projet.

**Trois écarts au handoff, tous documentés dans le code** : l'oeil-de-boeuf du héros passe en `ink`
(l'ambre y voisinerait le CTA, et il ne fait que 1,98:1 sur `paper` — c'est l'arbitrage déjà rendu
sur le héros de l'accueil) ; les flèches de la carte d'index sont `slate` au repos et ne passent à
l'ambre qu'au survol ; le bouton « Compare plans → » est le bouton secondaire du système (blanc,
filet `rule`, rayon 6) et non un contour ambre à 2,1:1.

**Reste à arbitrer avec Saïd** : le handoff met de l'ambre sur tous les oeils-de-boeuf de bande
claire (`01 / TIME`, `THE ARGUMENT`, `EVERYTHING, LISTED`, les cinq index de l'argument), ce qui
sort de la « One Amber Rule » de `DESIGN.md` et reste sous AA (1,98:1 sur `paper`, 1,83:1 sur warm).
C'est déjà la pratique livrée sur l'accueil — d'où le choix de suivre le handoff plutôt que de faire
de `/product` la page dissidente. Soit `DESIGN.md` accueille cette valeur, soit les quatre pages
changent ensemble. Deux tailles hors gamme viennent aussi du handoff : 17 px (corps de pilier) et
13,5 px (ligne de capacité).

## La section `/solutions` et la navigation

Intégrée le 27 juillet 2026 d'après `docs/prompts/solutions-pages-implementation.md` et les deux
briefs compagnons. Neuf pages — l'index plus huit secteurs — et **deux surfaces de navigation**.
Elle répare un vrai trou : l'accueil annonçait huit pages secteur qui **renvoyaient toutes un 404**,
et cinq d'entre elles étaient aussi liées depuis le pied de page.

**La page secteur n'est pas un gabarit rempli huit fois.** Huit pages générées d'un modèle avec le
nom de l'industrie permuté sont, à la lettre, la définition Google d'une **doorway page** — et
`docs/site-architecture.md` §3.2 a déjà rejeté les pages par ville pour cette raison. Trois défenses
structurelles, dans `src/data/solutions.ts` :

- **L'ordre des piliers change d'une page à l'autre.** Le dossier client mène chez les agences, le
  chronomètre chez les comptables, la preuve d'activité en conseil et en BPO. Ce n'est pas une
  astuce : un cabinet d'avocats et un plateau d'appels se soucient de moitiés différentes du produit.
  Les bandes (`BAND_CYCLE`), le ton de l'oeil-de-boeuf, le rang et le côté du visuel sont tous
  **dérivés du rang** — une page ne choisit pas son rythme, donc trois ou quatre piliers tombent
  juste sans qu'on y revienne.
- **Les trois points de douleur sont écrits dans le vocabulaire du secteur** (retainer, sprint,
  engagement, docket, SLA, mandat). Test d'acceptation : **permuter le nom du secteur doit rendre la
  page fausse.** Si les trois phrases se lisent aussi bien ailleurs, la page a échoué.
- **L'objection est propre au secteur** — le privilège en juridique, la confidentialité du matériel
  client en conseil, la culture d'ingénierie chez les devs.

**Aucune capacité ne s'écrit dans `solutions.ts`.** `capsOf()` SÉLECTIONNE dans `PRODUCT_PILLARS`
et **lève au build** si un libellé n'y figure pas. Les pages choisissent et ordonnent, elles ne
rédigent pas. C'est plus strict que le brief, qui autorisait une reformulation sectorielle : huit
pages sont huit occasions d'inventer une fonction, et au Canada une indication trompeuse relève de
la Loi sur la concurrence. De même, `SOLUTION_PAGES` est dérivé de `SECTORS` et **lève si un secteur
n'a pas de contenu** — c'est ce qui garantit qu'un lien de l'accueil ne peut plus pointer dans le vide.

**Construction et Staffing ont un périmètre resserré, et leurs pages le disent.** DocuFlow est un
agent bureau plus une application web : les ouvriers de chantier n'ont pas de poste, et les
contractuels placés travaillent sur le matériel du CLIENT, où installer un agent n'est souvent ni
permis ni autorisable par l'agence. Les deux pages sont donc écrites sur ce que le produit sert
vraiment — administration de projet et contrôle documentaire d'un côté, desk du recruteur de
l'autre — et **leur section « objection » énonce la limite au lieu de l'esquiver**. `SECTORS` n'est
pas touché ; seuls les deux `blurb` de l'accueil, brouillons non signés qui promettaient des heures
de chantier et le monitoring de contractuels placés, sont corrigés. **À faire signer par Masdouk.**

**L'index `/solutions` doit mériter son existence** face à l'index secteurs de l'accueil, qui liste
les mêmes huit entrées avec les mêmes blurbs. Ce qui l'en distingue : son propre H1 (« lequel est le
mien ? » plutôt que « à qui ça s'adresse ? »), la **sortie vers `/product`**, et surtout **l'axe par
cas d'usage** — six blocs de contenu qui MÈNENT AUX SIX PAGES (voir plus bas). Ils gardent leur `id` :
un fragment d'URL n'est JAMAIS envoyé au serveur, donc `/solutions#client-billing` ne peut être
redirigé par personne — l'ancre est le seul chemin de migration d'un lien déjà partagé, et elle ne
coûte rien.

L'entrée de l'index réglé vit dans `components/SectorEntry.astro`, partagée avec l'accueil : le
dessin tient dans ~90 lignes de CSS et deux exemplaires auraient divergé au premier réglage.

### Les six pages cas d'usage — `/solutions/{use-case}`

Ajoutées le 29 juillet 2026. **Le préfixe `/solutions/use-cases/…` arbitré le 27 juillet est
remplacé** par le niveau plat, à la demande de la direction et pour le référencement : les cas
d'usage visent les mêmes requêtes que les pages secteur et méritent la même profondeur d'URL.

**⚠️ Les deux listes partagent désormais UN SEUL espace de noms**, et c'est le vrai coût de la
décision. `src/data/solutions.ts` lève au build sur :

- un slug de cas d'usage identique à un slug de secteur — Astro générerait deux fois la même route
  et **ferait disparaître une page sans erreur** ;
- un slug réservé (`index`) — une route STATIQUE gagne sur la dynamique, silencieusement ;
- un slug vide ;
- un cas d'usage sans contenu — le méga-menu pointe vers `/solutions/{id}` sur toutes les pages.

Aucune vérification d'unicité n'existait avant, pas même sur les slugs de secteur.

**Le squelette DIFFÈRE de celui des pages secteur, et ce n'est pas cosmétique.** Quatorze pages
bâties sur un seul gabarit seraient exactement la doorway page que ce dépôt a déjà refusée pour les
pages par ville — et le référencement étant le motif de ces pages, un décalque les rendrait
contre-productives.

```
secteur      hero → problème  → 3-4 piliers → scénario → objection → frères → CTA
cas d'usage  hero → situation → QUI         → 2 piliers → scénario → objection → CTA
```

« Qui en souffre le plus » monte en TROISIÈME position : sur une page secteur le métier est déjà
dans l'oeil-de-boeuf du héros, alors que sur une page cas d'usage la première question du lecteur est
« est-ce que ça parle de moi ? », et la réponse est un nom de métier. Cela règle au passage la flèche
ambre au repos de `SectorEntry`, qui dans le viewport de la bande d'appel à l'action ferait quatre
ambres pour une seule action.

Rythme des bandes — `pillarsOf(blocks, 1)`, **offset 1 et non 0** :

```
paper → white     → paper → mint → warm → ink      → white     → hour
Hero    Situation   Qui     P.01   P.02   Scenario   Objection   Cta
```

L'offset n'est pas un réglage esthétique. Les quatre bandes étant distinctes deux à deux, l'adjacence
tiendrait à n'importe quel décalage — mais « The Band Rule » veut aussi la progression froid → chaud
→ ink, et `bg-band-warm` est la bande du pilier Knowledge. À offset 0 avec deux piliers, une page cas
d'usage n'atteint jamais le warm : **`/solutions/onboarding-documentation`, dont le sujet EST la
documentation, serait la seule page du site à ne jamais montrer la bande documentaire.** D'où aussi
la garde qui exige exactement DEUX piliers.

**Chaque page a SES deux dessins, et le registre le fait respecter.** `UseCaseArt.astro` est indexé
par slug ET par emplacement (`situation` / `objection`) et lève sur toute case manquante. Les huit
pages secteur partagent `FaultsArt` et `RedactedArt` légitimement — elles partagent un sujet. Les six
cas d'usage n'en partagent aucun : arrivé sur `/solutions/client-billing`, un lecteur doit voir qu'il
s'agit de facturation AVANT d'avoir lu une ligne. Deux fautes déjà commises et désormais impossibles :
le relevé troué générique en tête d'une page facturation, et une capture floutée en face d'une
objection qui ne parle pas de capture.

`PainPoints` et `ObjectionSection` ont donc un `<slot name="art">` dont le contenu par défaut est le
dessin secteur : les huit pages existantes sont inchangées.

**`getUseCase` est séparé de `getSolution`, délibérément.** Élargir `getSolution` pour avaler les cas
d'usage paraît propre, mais `RelatedSectors` lit `page.sector.icon / .name / .tag` — une page cas
d'usage n'a pas de `sector`. Un lookup permissif cesserait de lever et planterait au rendu.

### Le méga-menu — quatre pièges, tous silencieux

**Le déclencheur est un `<details>`/`<summary>` natif**, pas un lien ni un couple lien+bouton. Il
donne gratuitement `aria-expanded`, le clavier, le bon comportement tactile (le premier appui ouvre
au lieu de naviguer) et **un panneau qui fonctionne sans JavaScript**. Contrepartie assumée et
arbitrée : l'en-tête perd son `<a href="/solutions">`, la destination devient la première rangée du
panneau — qui est donc load-bearing. `aria-current` ne pouvant pas vivre sur un `<summary>`, le
`<summary>` porte `data-current` et le lien correspondant DANS le panneau porte `aria-current="page"`.

1. **`--pill-w` est MESURÉ, pas déclaré.** Rien de ce que déroulent les panneaux ne doit atteindre
   `measure()`. Trois protections : un `<details>` fermé ne rend pas son contenu, les deux panneaux
   sont `position: absolute` donc hors flux, et **`closeAll()` en tête de `measure()`** — la
   troisième existe parce que les deux premières sont des propriétés qu'une modification future peut
   retirer sans s'en apercevoir. Corollaire : **les métriques du déclencheur sont identiques ouvert
   et fermé.** Seuls changements autorisés à l'ouverture : la couleur du libellé et la rotation du
   chevron. Une graisse, un glyphe ou un padding en plus corromprait la largeur mesurée sans rien
   casser de visible.
2. **Fermer le menu à CHAQUE changement d'état de la barre.** Le morph A ↔ B anime `max-width`,
   `margin-left` et `padding` sur 280 ms : un panneau ouvert pendant cette fenêtre dérive, et un
   `measure()` déclenché en plein morph lit n'importe quoi. Accroché aux **trois gestionnaires qui
   existaient déjà** — `sync()`, l'écouteur de la media query `wide`, le `resize` throttlé — jamais
   à un écouteur de défilement supplémentaire.
3. **`prefers-reduced-motion` n'atteint PAS la Web Animations API.** Le bloc global de `global.css`
   n'écrase que `animation-duration` et `transition-duration` ; un `.animate()` s'exécute à pleine
   durée quoi qu'il arrive. Le script branche donc explicitement avant chaque appel, exactement
   comme `PricingFaq`.
4. **`overflow: hidden` reste interdit**, y compris pour un verrou de défilement mobile : il crée un
   conteneur de défilement et casse le `sticky` de la nav. Le tiroir est opaque et pleine hauteur,
   donc un défilement d'arrière-plan est invisible, et `overscroll-behavior: contain` empêche le
   chaînage. Décision assumée, pas un oubli.

**Le panneau est `position: absolute`, jamais `fixed`.** `--edge-side` est bâti sur `100%` et une
custom property se résout à son site d'usage : une boîte `fixed` résoudrait `100%` contre le
viewport, barre de défilement comprise, et le bord gauche du panneau se désynchroniserait de toutes
les sections **sur Windows et Linux seulement** — le défaut de ~8 px que le système de bord partagé
existe pour empêcher, et qui survit à une relecture parce qu'il est invisible sur macOS.
Vérifié au navigateur : bord gauche du panneau à 376,5 px, bord de contenu d'une section
`container-wide` à 376,5 px, avec une barre de défilement classique de 15 px.

**Et le panneau ne porte AUCUN `z-index`, délibérément.** `.nav-header` est déjà un contexte
d'empilement (`z-30`), donc un descendant en `z-index: auto` peint au-dessus de `.nav-shell`,
au-dessus de la barre de saut de `/product` et du rail (20), et sous le lien d'évitement (50). La
prochaine personne voudra ajouter `z-index: 40` : **c'est le bug, pas le correctif.**

**⚠️ Le bloc conteneur du panneau CHANGE entre les deux états, et ce n'est pas un choix.**
`.is-pill .nav-shell` porte `backdrop-filter: blur(10px)`, et une valeur autre que `none` sur
`filter`/`backdrop-filter` crée un bloc conteneur pour les descendants `absolute`. Vérifié :
`panel.offsetParent` vaut `.nav-header` en état A et `.nav-shell` en état B. Trois conséquences,
toutes déclinées en `.is-pill` :

- `--page-w` (largeur du document, barre exclue) est posée par `measure()`. Dans la pastille, `100%`
  ne vaut plus que la largeur de la pastille (496 px mesurés) et le panneau se réduirait à ~420 px
  au lieu de 1040. Sans JS la variable est absente et `100%` fait le même travail — l'état B
  n'existe pas sans script.
- Le `top` de l'état B vaut `calc(100% + 11px)` et non `+1px` : ici `100%` s'arrête au bas de la
  PASTILLE. Sans ce rattrapage le panneau est collé sous elle (mesuré à 0 px d'écart).
- Le centrage se fait en `left: 50%` + `transform: translateX(-50%)`, et l'animation d'arrivée en
  **`translate`** (propriété indépendante) : animer `transform` écraserait le centrage.

**La barre ne tenait plus à 561 px.** La barre complète tenait à 561 px pile, sans un pixel de
marge ; le chevron du déclencheur (14 px + 4 px de gouttière) l'a fait déborder de 12 px — donc une
barre de défilement horizontale au point de bascule exact entre le tiroir et la barre. Corrigé par
`--nav-gap: 16px` entre 561 et 700 px : **la gouttière cède, jamais un libellé.**

### Le tiroir mobile — sous 561 px il n'y avait rien

`.nav-links` est en `display: none` et le repli en pastille est désactivé sous 561 px : Product,
Solutions et Pricing n'étaient atteignables **que par le pied de page**. Un second `<details>` après
le CTA, même technique, autre boîte. `Sign in` y déménage — c'est cette largeur-là qui fait tenir la
barre à 360 px (mesuré : 210 px de contenu pour 297 px de place, et le CTA raccourcit à « Start
free » sous 400 px). Confinement du focus par `inert` sur `<main>` et `<footer>` ; le panneau de
bureau n'en met jamais — **c'est un menu, pas une boîte de dialogue**, on doit pouvoir en sortir en
tabulant. L'accordéon Solutions imbriqué est en flux et c'est sans danger : il vit dans un panneau
hors flux, lui-même `display: none` au-dessus de 561 px.

### Détail de compilation à connaître

**Astro rogne l'espace en tête du contenu d'un élément.** `Start free<span> trial</span>` s'est
livré en « Start freetrial ». Un `&nbsp;` n'est pas rogné.

## Les illustrations de section (`src/components/art/`)

Ajoutées le 27 juillet 2026. Six dessins qui remplissent la colonne droite des en-têtes de section,
laissée vide jusque-là : `/solutions` était la seule page de la famille dont le héros n'avait pas de
visuel, alors que ses huit enfants en ont tous un.

**Ce sont des SVG inline, géométriques, aux tokens du site.** Le registre a été arbitré contre deux
alternatives, le 27 juillet :

- **Un jeu d'illustrations générées** (`~/Téléchargements/saas_illustrations_svg`) : quatre fichiers
  `.svg` qui sont en réalité un seul PNG de 1254×1254 encapsulé — zéro `<path>`, 1,0 à 1,2 Mo pièce,
  personnages, plantes, mugs, une palette bleue absente des tokens, des chiffres inventés à l'écran
  (« 84% avg », « Deal won $48k ») et du texte cuit dans l'image, donc intraduisible en phase FR.
  C'est l'inverse point par point de `docs/prompts/stack-card-illustrations-generation.md`, la
  spécification que le dépôt contient DÉJÀ pour ce jeu d'assets et qui n'a jamais servi.
- **Lottie** : `lottie-web` embarque un second moteur d'animation (~150–250 Ko livrés) pour un
  travail que GSAP, déjà chargé sur ces pages par `reveal.ts`, fait à zéro octet.

Résultat mesuré : **8,1 Ko de SVG pour les trois illustrations de `/solutions`**, 5 Ko pour les trois
d'une page secteur — contre 1,0 Mo pour UNE image du jeu écarté.

**Aucun texte dans les dessins, jamais.** C'est la règle qui fait tout tenir : rien à retraduire
quand le FR arrivera, aucune statistique inventée à l'écran (une image ment aussi bien qu'une
phrase, et la Loi sur la concurrence ne fait pas la différence), et rien d'illisible pour un lecteur
d'écran — les six sont `aria-hidden` et `role="presentation"`.

**Chaque dessin dit ce que sa section dit.** Ce ne sont pas des remplissages : le registre de huit
rangées dont une est trouvée EST la question « Which of these is you? » ; la grille 4×4 dont la case
pleine change de colonne à chaque rangée EST « every trade loses money somewhere different » ; le
relevé troué de trois marques ambre EST les trois points de douleur numérotés juste en dessous.

### Quatre pièges

0. **⚠️ Une illustration qui empile ses enfants DOIT créer son propre contexte
   d'empilement.** Le carrousel du héros donne `z-index: 30 / 20 / 10` à ses trois
   cartes. Sans `z-index: 0` sur leur conteneur, ces valeurs vivent dans le
   contexte RACINE et entrent en concurrence avec `.nav-header`, qui vaut aussi
   `z-30` — et à égalité c'est l'ordre du DOM qui tranche, or `<main>` vient après
   `<header>`. Résultat constaté : la pastille de nav passait DERRIÈRE les cartes
   une fois repliée. `z-index: 0` sur le conteneur enferme tout et la pile ne
   compte plus que pour un plan.
   C'est le miroir exact de la règle du panneau du méga-menu, et les deux
   coexistent sans se contredire : le panneau ne doit porter AUCUN `z-index`
   parce qu'il n'est qu'un descendant d'un contexte existant ; le carrousel doit
   en porter un parce qu'il CONTIENT des enfants empilés.

1. **Des barres grises uniformes en rangées, c'est un squelette de chargement.** La première version
   du dessin du héros se lisait « la page n'a pas fini de charger » — au-dessus de la ligne de
   flottaison, le pire endroit possible. Corrigé en donnant à chaque rangée une MARQUE différente
   (cercle, carré, anneau, losange…) et en retirant la puce de trois rangées : un squelette n'a
   jamais de glyphes distincts ni d'irrégularité. Vaut pour tout futur dessin fait de barres.
2. **Ne PAS mettre `data-reveal` sur l'enveloppe d'une illustration.** `reveal.ts` et `art.ts` se
   composent techniquement, mais ça fait deux ScrollTrigger pour un seul travail : l'enveloppe reste
   à `opacity: 0` pendant que ses enfants jouent leur cascade à vide. Constaté à l'écran sur
   « By use case ». **La cascade interne EST l'arrivée du dessin.**
3. **Les dessins d'en-tête disparaissent sous 901px** (`hidden min-[901px]:block`). Ils sont
   décoratifs : les garder empilés repousserait le contenu d'un écran entier sur téléphone. Celui du
   héros de `/solutions` reste, lui, à toutes les largeurs — comme les maquettes des héros secteur.
   ⚠️ Une media query mesure le viewport **barre de défilement comprise**, alors que `100%` et
   `clientWidth` l'excluent : tester ce point de rupture dans un iframe redimensionné donne un
   résultat faux de la largeur de la barre.

`src/scripts/art.ts` porte le contrat complet — `[data-art]` sur le `<svg>`, puis `data-art-in` /
`-grow` / `-draw` / `-pop` sur les enfants. Mêmes propriétés de sûreté que `reveal.ts` : l'état
masqué est posé par `gsap.set()` et jamais par une règle CSS (sans JS les six dessins sont entiers,
vérifié), et `prefers-reduced-motion` coupe l'animation entièrement plutôt que de la raccourcir.

## À faire

- [ ] **Faire signer la copy des neuf pages `/solutions`** par Masdouk : les huit H1, les vingt-quatre
      points de douleur, les scénarios, les objections, **les six pages cas d'usage entières** (H1,
      dix-huit symptômes, scénarios, objections) — et surtout les
      **deux `blurb` corrigés** de Construction et Staffing dans `site.ts`.
- [ ] **Remplacer les chiffres de la bande de preuve** (`src/data/site.ts`, `PROOF_STATS`) par
      les valeurs réelles de la base. Bloquant avant toute mise en ligne.
- [ ] **Faire signer la copy neuve de `/product`** par Masdouk : le H2 de Knowledge, le libellé
      « THE ARGUMENT » et les cinq phrases de `PRODUCT_ARGUMENT` (signalées dans `product.ts`).
- [ ] Arbitrer l'ambre des oeils-de-boeuf sur bande claire (voir « La page `/product` ») — décision
      de site, pas de page.
- [ ] **Corriger le débordement horizontal de `/pricing` à 360 px** — 7 px, **préexistant** et
      découvert en balayant les largeurs le 27 juillet 2026. Le `<table>` du comparatif demande
      343 px dans un conteneur de 312 px (`ComparisonTable.astro`). Ni l'accueil, ni `/product`, ni
      aucune des neuf pages `/solutions` ne débordent, à aucune des huit largeurs testées.
- [ ] Arbitrer le domaine et mettre à jour `site` dans `astro.config.mjs` (actuellement `docuflow.ca`)
- [x] ~~Décider EN seul ou bilingue FR/EN~~ — **EN seul**, tranché le 27 juillet 2026 avant d'ajouter
      les neuf pages Solutions : huit 404 en ligne coûtaient plus cher que le rétrofit i18n.
      `src/data/solutions.ts` est façonné pour accueillir une clé de locale (`CONTENT[slug][locale]`)
      sans restructuration, et aucun composant ne porte de texte en dur — c'est cette dernière
      propriété qui rend la promesse tenable, et c'est elle qu'on casse en premier.
- [ ] Gabarits restants : **comparative** (voir `docs/site-architecture.md`). Le gabarit secteur et
      le méga-menu sont livrés ; les dix pages par fonction réutilisent `ProductPillar` et lisent
      `src/data/product.ts`.
- [ ] Vérifier le rendu mobile réel (points de rupture posés, pas testés visuellement) — fait
      pour `/pricing` (620 / 560 / 360 px), `/product` (900 / 561 / 360 px) et les neuf pages
      `/solutions` (1440 / 1240 / 901 / 720 / 620 / 561 / 480 / 360 px), reste l'accueil

## Documents de référence

| Fichier | Contenu |
|---|---|
| `docs/design-brief.md` | Brief initial — ⚠️ décrit l'ancien concept « journée de travail » |
| `docs/landing-corrections.md` | Le delta qui a corrigé le concept — **c'est la version qui fait foi** |
| `docs/site-architecture.md` | Arborescence complète, matrice SEO, fondations techniques |
| `docs/design-handoff/` | Maquettes HTML de référence — ouvrir dans un navigateur |
| `docs/design_handoff_pricing_cards/` | Cartes cornées de `/pricing` — **remplace `Pricing.dc.html`** |
| `docs/design_handoff_product/` | Fiche technique de `/product` + `docs/prompts/product-page-design-brief.md` |
| `docs/design_handoff_sectors/` | Index secteurs éditorial de l'accueil — **implémenter l'option `3c` seule** |
| `docs/prompts/solutions-pages-implementation.md` | Le mandat de la section Solutions : contenu, menu, tiroir |
| `docs/prompts/solutions-mega-menu-design-brief.md` | Dessin du panneau et du tiroir mobile |
| `docs/prompts/solutions-sector-page-design-brief.md` | Dessin de la page secteur, avec la page Agences écrite en entier |

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
