# Corrections — les maquettes des pages cas d'usage

> Revue de direction du 30 juillet 2026, sur **les six pages `/solutions/{cas d'usage}`**. Ce
> document est le delta : il enregistre ce qui a été refusé, pourquoi, et la règle qui en sort.
> **Il fait foi sur le style des maquettes**, au-dessus de tout ce qui a été livré avant cette date.
>
> Il existe parce que la revue a porté une dizaine de fois sur le même défaut sous des formes
> différentes. Le défaut est nommé une fois ci-dessous, et tout le reste en découle.

---

## Le défaut, nommé une fois

> « Elles ressemblent plus à des cartes génériques qu'à des cartes qui enrichissent vraiment le texte
> ou la section qu'elles sont censées éclaircir visuellement. »
>
> « Les relevés sont abstraits. On ne sent pas que c'est le relevé des journées. »
>
> « Je ne veux plus de wireframes abstraits où le contenu ressemble à un gabarit. »

Une maquette qui montre **un chiffre posé sur une texture** ne dit rien. Vingt-quatre barres anonymes,
huit vignettes rayées vides, trois durées empilées : rien là-dedans ne se compte, ne se situe, ni ne
se reconnaît. Le lecteur de ces pages est un opérateur méfiant à qui on a déjà vendu des tableaux de
bord — **il ne croit pas une texture.**

### Le test d'acceptation

Une maquette est bonne quand elle passe les **quatre** :

1. **Elle se compte.** Des jours nommés, des heures, un total. Si le lecteur ne peut rien
   additionner, il n'a rien à vérifier, donc rien à croire.
2. **Elle dit ce que SA section dit.** Pas le sujet général de la page — la phrase d'à côté.
3. **Elle ne CONTREDIT pas sa section.** Ajoutée après coup, et c'est la faute la plus grave
   rencontrée : `InvoiceArt` dessinait une ligne joliment tracée jusqu'à ses tâches au-dessus de
   trois points de douleur qui disent « la ligne est assemblée à la main, pas générée depuis le
   dossier ». Une illustration de section « problème » doit montrer le PROBLÈME.
4. **Elle ne se répète pas.** Deux maquettes du même genre sur une page disent au lecteur qu'il a
   déjà vu cette page.

Corollaire du test 1, appliqué partout : **tout total est DÉRIVÉ, jamais retapé.** Les cinq journées
du héros de `remote-teams` font `38 h` par calcul ; les quatre lignes de `VarianceMock` font `320 h`,
`249 h` et `78 %`. Un total écrit à côté de lignes qui ne l'atteignent pas est la faute que le calcul
rend impossible — et elle était **déjà en production** : `IdleMock` affichait `0:06:20` en face d'un
texte disant « 6 min ». Personne ne l'avait vu.

---

## L'état final

Chaque page rend maintenant quatre maquettes distinctes et deux dessins qui lui sont propres.

| page | héros | pilier 01 | pilier 02 | scénario | situation | objection |
|---|---|---|---|---|---|---|
| `client-billing` | `record` | **`attach`** | `timer` | `query` | **`HandAssembled`** | `Disclosure` |
| `remote-teams` | **`week`** | **`device`** | `timer` | **`silence`** | `ThinWeek` | `OwnRecord` |
| `hybrid-teams` | **`week`** | `timer` | **`device`** | **`reconcile`** | **`DisagreeingTotals`** | `HoursWindow` |
| `employee-productivity` | **`windows`** | `score` | `timer` | **`idle`** | **`LoudMetric`** | `OpenMeasure` |
| `project-profitability` | `record` | **`project`** | `timer` | **`variance`** | `MarginDrift` | `ProjectNotPerson` |
| `onboarding-documentation` | `source` | **`library`** | `record` | **`route`** | `PageTree` | **`SourceAge`** |

**En gras : neuf `kind` neufs et quatre dessins remplacés.** Avant la revue, trois pages rendaient la
même carte **trois fois** (`hybrid-teams` trois chronomètres, `project-profitability` trois fiches,
`onboarding-documentation` trois réponses citées) et les trois autres la rendaient deux fois.

---

## Ce qui a été refusé — ne pas le reproposer

### L'amincissement au score

Faire pâlir la grille et l'histogramme à mesure que le score baisse. **Diagnostic juste, remède
faux** : des vignettes en tireté et un histogramme qui s'éteint en filet donnent le squelette de
chargement contre lequel `AGENTS.md` met déjà en garde.

> Un relevé interrompu n'est pas un relevé pâle. C'est un relevé qui **s'arrête**, à un moment nommé,
> et dont la suite est retenue quelque part. Ça demande un autre dessin, pas une opacité.

### Les huit vignettes rayées

`ScoreMock` posait son chiffre au-dessus d'une grille de grands rectangles rayés vides. Reproche reçu
**deux fois**. La texture 45° reste légitime — elle est dans `DESIGN.md` — mais à petite échelle et
RATTACHÉE À QUELQUE CHOSE : deux vignettes sous un jour nommé, pas huit dalles flottantes. Elles sont
remplacées par la couverture en clair, qui répond à la seule question qu'un score pose : *d'où sort
ce chiffre ?*

### Trois barres proportionnelles pour trois valeurs proches

`DisagreeingTotalsArt` donnait à chaque source une barre relative au plus grand total. 36:30 / 31:45 /
28:20 donnent 100 %, 87 %, 78 % — trois barres qui se ressemblent, donc un dessin qui fait paraître
les sources **d'accord** alors que la section dit qu'elles ne le sont pas. Remplacé par un axe commun
où les trois marques ne s'alignent pas, et où le segment ambre a la longueur exacte de l'écart.

### La grille de soixante carrés d'un bloc

Se lit comme un graphe de contributions. Découpée en quatre quarts d'heure étiquetés `:00 :15 :30
:45`, elle devient une horloge : le ralenti se situe, et le compte de soixante se vérifie.

### La quatrième rangée de barres vertes

Le pouls du poste était dessiné en barres. La page en portait déjà trois rangées. Devenu un **tracé** :
un trait continu dit « signal », des barres disent « quantité ».

### La grande boîte pour les jours retenus

Une face bordée pleine largeur avec deux mots au centre : le conteneur générique que ce dessin existe
pour éviter. Devenue une **pile décalée**, qui dit « plusieurs jours, mis de côté, encore là » par sa
forme.

### La recopie de la liste de capacités

`DeviceMock` listait d'abord les six capacités affichées dans sa propre colonne. **Une maquette montre
un objet, pas un inventaire.**

### Le filet latéral de 2 px

Sur le bloc hors ligne de `ReconcileMock`. `DESIGN.md` en autorise un (les chiffres de la bande de
preuve), donc ce n'était pas interdit — mais c'est un signal faible pour « retenu » et c'est le tic de
carte générique que cette revue passe son temps à retirer. Remplacé par une teinte `paper-chip`.

### Une taille inventée pour faire « fort »

16 px sur les compteurs de `LoudMetricArt`. Hors gamme, donc un one-off de plus, ce que `DESIGN.md`
interdit explicitement. Ramené à 13 px (`Meta`) : la force vient de la graisse et du contraste.

### Un ton de substrat employé comme donnée

Les barres de `DisagreeingTotalsArt` étaient en `paper-layer`, la couleur des FEUILLES DE CALAGE
derrière une carte. Invisible sur la piste, et faux dans le système.

---

## Règles qui en sortent

1. **Un `kind` par métier, jamais un réglage.** Ajouter une variante à l'union `Mockup` coûte moins
   cher qu'un drapeau sur une maquette existante, et le miroir typé `kinds` de `SectorMockup` casse
   le build si une variante n'a pas sa branche. Un `kind` neuf ne touche aucune page existante.
2. **Tout total est dérivé.** Compte de jours, somme d'heures, intervalle, pourcentage.
3. **Un chiffre seul ne se vérifie pas ; un intervalle, si.** « 4 days queued » est devenu
   « 4 days queued · TUE – FRI » parce que le lecteur qui compte les jours pâles doit retrouver
   quatre.
4. **Un axe se centre sur ses cellules.** Étiquettes calées à gauche, une coupure à 34 % paraît collée
   à la frontière du jour suivant. Invisible en relecture de code, fatal à l'écran.
5. **Le jour d'une coupure compte comme perdu**, et il lui faut son propre état visuel.
6. **Le verdict faible est ambre** (`hour`, texte `ink`) : ni vert (réservé au confirmé), ni `ink`
   (un badge noir se lit comme du chrome et ne prévient de rien). Vaut sur `ScoreMock`, `WeekMock`,
   `SilenceMock` et `ThinWeekArt`.
7. **⚠️ CHANGER UNE MAQUETTE OBLIGE À RELIRE LES DESSINS DE LA MÊME PAGE.** La règle la plus chère de
   cette revue : elle a été apprise **quatre fois**. Le dessin ne bouge pas, c'est la maquette voisine
   qui prend son sujet. `IdlePromptArt`, `TwoPlacesArt`, `CitedAnswerArt` et `InvoiceArt` sont tous
   morts de ça. Faire le contrôle de collision **avant** de construire, pas après.
8. **Une absence se dessine, elle ne s'omet pas.** Une colonne « per-person figure » avec un tiret sur
   chaque rangée dit ce qu'un libellé « aucun chiffre par personne » ne fait que promettre. Idem pour
   « Before 09:00 and after 18:00 · nothing recorded » et les emplacements vides de `ThinWeekArt`.
9. **Aucun chiffre de productivité inventé.** `20 seconds`, `$740`, `6 min` sont dans la copy des
   sections. Une durée inventée sur une page marketing n'est pas une maquette, c'est une allégation —
   au Canada, Loi sur la concurrence. La route bloquée de `RouteMock` ne porte donc AUCUNE durée.
10. **Vérifier une animation demande de la neutraliser.** Un onglet non focalisé suspend
    `requestAnimationFrame`, donc GSAP se fige à mi-timeline et toute capture ment. Poser une feuille
    `opacity:1 !important; transform:none !important` sur les crochets `[data-art-*]` /
    `[data-reveal]` avant de juger une mise en page.

### Deux pièges d'implémentation rencontrés plusieurs fois

- **L'ordre du DOM dans une grille.** Un enfant en `grid-column: 1 / -1` occupe une rangée entière et
  pousse ses frères suivants à la rangée d'après. Mettre le libellé ET sa valeur AVANT la barre qui
  s'étale. Rencontré sur `DisagreeingTotalsArt` puis sur `VarianceMock`.
- **Le serveur de dev sert du CSS périmé.** Un changement de `<style>` peut ne pas être repris par
  `astro dev` : les règles sont correctes dans `dist/` et absentes à l'écran. Si un rendu paraît cassé
  sur `:4321` mais juste dans le build, **redémarrer le serveur** — un rechargement ne suffit pas.

---

## À arbitrer avec Saïd

- **Deux ambres dans la bande `ink`.** L'oeil-de-boeuf « Tuesday » de `ScenarioBand` est ambre, et le
  badge `WEAK` l'est maintenant aussi. Le badge est le signal, l'oeil-de-boeuf n'est qu'une étiquette
  de section : si l'un cède, c'est lui.
- **Les tirets hors du reçu.** `DESIGN.md` les réserve à `/pricing`. Plusieurs maquettes cas d'usage
  en utilisent — sémantiquement juste, un tiret marque là où le papier se sépare.
- **Le texte dans les illustrations.** `AGENTS.md` dit « aucun texte dans les dessins, jamais ». La
  règle visait les six SVG géométriques d'en-tête ; les maquettes cas d'usage en sont pleines.
- **Le sidecar d'impeccable.** `.impeccable/design.json` précède l'ajout du rôle `Score` à
  `DESIGN.md`, donc le détecteur signale 36 px sur quatre composants conformes. ⚠️ `/impeccable
  document` **régénère `DESIGN.md` depuis le code** et écraserait 37 Ko de règles écrites à la main :
  ne pas le lancer. `/impeccable doctor` le signale sans le réparer.

---

## Copy à faire signer par Masdouk

Aucun mot apparu à l'écran pendant cette revue n'est validé.

| Page | Maquettes concernées |
|---|---|
| `client-billing` | `attach` (quatre natures, `57 items`), `HandAssembledArt` (sources, « reconciled by hand », `0`) |
| `remote-teams` | `week` (jours, `38 h`), `device` (`WS-2291`…), `silence` (`4 days queued`, `TUE – FRI`), `ThinWeek`, `OwnRecord` |
| `hybrid-teams` | `week` (`OFFICE`/`HOME`, `37 h`), `device`, `reconcile` (`1 block merged`), `DisagreeingTotals`, `HoursWindow` |
| `employee-productivity` | `windows` (`60 windows`), `idle` (étapes, `Prompted, not deduced`), `LoudMetric`, `OpenMeasure` |
| `project-profitability` | `project` (états de tâches), `variance` (postes), `MarginDrift`, `ProjectNotPerson` |
| `onboarding-documentation` | `library` (`60 indexed`), `route` (deux routes), `PageTree` (`Levels down`), `SourceAge` |

Les valeurs produit (3–15 min, 60 s, 3 plateformes, file hors ligne, révocation, étapes
`LEAD → COMPLETED`) viennent de `src/data/product.ts` et ne sont pas à réécrire — seulement leur
formulation.

---

## Reste à faire

**Les pages SECTEUR portent le même défaut et n'ont pas été revues.** `digital-agencies` et
`bpo-call-centers` rendent chacune une carte de score identique en héros et en pilier. Elles ont reçu
la correction de `ScoreMock` (couverture en clair au lieu des vignettes vides) parce qu'elle était
site-wide, mais pas le contrôle de doublon ni le test d'acceptation.
