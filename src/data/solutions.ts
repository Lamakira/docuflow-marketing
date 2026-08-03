/**
 * Contenu des huit pages `/solutions/[slug]` et de l'index `/solutions`.
 *
 * ─── La règle qui gouverne ce fichier ───────────────────────────────────────
 *
 * Huit pages générées d'un gabarit avec le nom du secteur permuté, c'est la
 * définition Google d'une **doorway page** — et `docs/site-architecture.md` §3.2
 * a déjà rejeté les pages par ville pour cette raison exacte. Trois défenses
 * structurelles, dans l'ordre d'importance :
 *
 *   1. **L'ORDRE DES PILIERS CHANGE d'une page à l'autre.** Le dossier client
 *      mène chez les agences, le chronomètre chez les comptables, la preuve
 *      d'activité en conseil et en BPO. Ce n'est pas une astuce de mise en page :
 *      un cabinet d'avocats et un plateau d'appels se soucient sincèrement de
 *      moitiés différentes du produit.
 *   2. **Les trois points de douleur sont écrits dans le vocabulaire du secteur**
 *      (retainer / sprint / engagement / docket / SLA / mandat). Test d'acceptation :
 *      permuter le nom du secteur doit rendre la page FAUSSE. Si les trois phrases
 *      se lisent aussi bien sur une autre page, la page a échoué et se réécrit.
 *   3. **L'objection est propre au secteur** — le privilège pour le juridique,
 *      la confidentialité du matériel client en conseil, « les captures sont une
 *      culture d'ingénierie toxique » pour les équipes de dev.
 *
 * ─── Les capacités ne s'écrivent pas ici ────────────────────────────────────
 *
 * `capsOf()` SÉLECTIONNE dans `PRODUCT_PILLARS` (`src/data/product.ts`) et
 * **lève au build** si un libellé n'y figure pas. Aucune capacité ne peut donc
 * être inventée depuis ce fichier : il choisit et ordonne, il ne rédige pas.
 * C'est délibérément plus strict que le brief, qui autorisait une reformulation
 * sectorielle — au Canada une indication trompeuse relève de la Loi sur la
 * concurrence, et huit pages sont huit occasions de déraper. La spécificité vit
 * dans le H1, les douleurs, le scénario et l'objection ; les puces restent la
 * source vérifiée.
 *
 * Les chiffres des scénarios (48 000 $, 62 %, 3,4 h) sont des **illustrations
 * narratives**, jamais des résultats produit : aucune amélioration chiffrée,
 * aucun client nommé, aucun témoignage. Même registre que le reçu de l'accueil.
 *
 * ─── Construction et Staffing : périmètre resserré, décision du 27 juillet ──
 *
 * DocuFlow est un agent bureau plus une application web. Les ouvriers de chantier
 * n'ont pas de poste, et les contractuels placés travaillent sur le matériel du
 * CLIENT, où installer un agent n'est souvent ni permis ni autorisable par
 * l'agence. Les deux pages sont donc **écrites sur ce que le produit sert
 * vraiment** — l'administration de projet et le contrôle documentaire d'un côté,
 * le desk du recruteur de l'autre — et leur section « objection » ÉNONCE la
 * limite au lieu de l'esquiver. `SECTORS` (noms, tags, hrefs) n'est pas touché.
 * Seuls les deux `blurb` de l'accueil, brouillons non signés qui promettaient des
 * heures de chantier, sont corrigés — voir le commentaire dans `site.ts`.
 *
 * ─── Bilingue ──────────────────────────────────────────────────────────────
 *
 * EN seul (décision du 27 juillet 2026), mais la forme accueille une locale sans
 * restructuration : `CONTENT[slug][locale]`. Ajouter le français = ajouter une
 * clé `fr` à côté de chaque `en`, plus un `LOCALE` qui vient de la route. Aucun
 * composant ne porte de texte en dur — s'ils s'y mettent, la promesse tombe.
 */
import { PRODUCT_PILLARS, type Capability, type PillarId, type Spec } from "./product";
import { SECTORS, type MegaMenu } from "./site";

/** Une seule locale aujourd'hui. Le jour où `/fr/…` existe, cette valeur vient
 *  de la route et non d'une constante — c'est le seul changement de forme. */
export type Locale = "en";
const LOCALE: Locale = "en";

/* ─────────────────────────── Types de contenu ─────────────────────────────── */

/** Un chiffre dans la narration : rendu en mono et en blanc sur la bande `ink`.
 *  Une phrase est donc un tableau de fragments plutôt qu'une chaîne — le balisage
 *  ne se devine pas depuis du texte, et personne n'a à écrire de HTML ici. */
export type Figure = { fig: string };
export type Line = (string | Figure)[];
export const fig = (value: string): Figure => ({ fig: value });

/** Les maquettes schématiques, paramétrées. Union discriminée : chaque
 *  variante ne porte que ses propres champs, et `SectorMockup.astro` ne peut pas
 *  rendre un dessin dont les données manquent. Dessinées en éléments de page —
 *  jamais d'illustration, jamais de capture d'écran. */
export type Mockup =
  /** Le dossier CRM : identité, jauge de budget, étiquettes. */
  | {
      kind: "record";
      title: string;
      chip: string;
      people?: boolean;
      meter?: { label: string; value: string; percent: number; read: string };
      foot?: string;
      tags?: string[];
    }
  /** Le chronomètre en cours, plus la feuille de temps du jour. */
  | {
      kind: "timer";
      running: { project: string; task: string; elapsed: string };
      entries: { task: string; duration: string }[];
      foot: string;
    }
  /** Une ligne de facture contestée, rapprochée des tâches qui la justifient. */
  | {
      kind: "query";
      client: string;
      invoice: string;
      amount: string;
      tasks: { name: string; hours: string }[];
      foot: string;
    }
  /** Le score de qualité de la preuve. Note le RELEVÉ, jamais la personne. */
  | {
      kind: "score";
      label: string;
      score: number;
      grade: string;
      /** CE QUE LE SCORE A NOTÉ. Obligatoire, et c'est le point.
       *
       *  La carte affichait le chiffre au-dessus de huit vignettes rayées
       *  vides : un score asséné, appuyé sur des rectangles de gabarit. C'est
       *  la définition du wireframe abstrait que la revue refuse.
       *
       *  Un score de complétude se justifie par ce qu'il a compté. Ces lignes
       *  sont donc des faits produit — captures, fenêtres, prompts, postes —
       *  et elles se lisent, se comptent et se vérifient. */
      coverage: { label: string; value: string }[];
      foot: string;
    }
  /** LA SEMAINE ENREGISTRÉE, jour par jour — le relevé qu'on peut compter.
   *
   *  Distinct de `score`, qui montre le même chiffre au-dessus de vingt-quatre
   *  fenêtres anonymes et de huit vignettes identiques. C'était le reproche, et
   *  il était juste : rien là-dedans ne ressemble au relevé DE JOURNÉES. Un
   *  histogramme sans axe est une texture ; on ne peut ni le compter, ni s'y
   *  reconnaître, et un opérateur méfiant ne croit pas une texture.
   *
   *  Ici les jours sont nommés, chacun porte ses heures, son activité et ses
   *  captures, et le total se DÉDUIT des journées. Le score cesse d'être un
   *  chiffre posé sur un décor : il note une semaine que le lecteur vient de
   *  compter lui-même. */
  | {
      kind: "week";
      label: string;
      score: number;
      grade: string;
      /** `hours` en `H:MM`. Le total de la semaine en est dérivé — il ne
       *  s'écrit nulle part, donc il ne peut pas mentir.
       *
       *  `tag` est optionnel et porte le LIEU de la journée (`OFFICE`, `HOME`).
       *  Il n'existe que pour `/solutions/hybrid-teams`, dont le H1 — « The desk
       *  and the kitchen table on one timesheet » — tient entièrement dans le
       *  fait qu'une seule feuille couvre deux endroits. Une page qui ne parle
       *  pas de lieu ne le passe pas, et la colonne disparaît. */
      days: { day: string; hours: string; activity: number; shots: number; tag?: string }[];
      foot: string;
    }
  /** CE QUI S'ATTACHE AU DOSSIER — heures, tâches, notes, documents.
   *
   *  Le pilier « The line » de `client-billing` dit : « Hours, tasks, notes and
   *  documents ATTACH TO THE CLIENT PROJECT as work happens. At month end, the
   *  invoice becomes A VIEW OF THAT RECORD. » Quatre natures nommées, et la
   *  carte y rendait la fiche `record` du héros, aux mêmes valeurs.
   *
   *  Le total est dérivé : c'est ce qui rend « one record » vérifiable au lieu
   *  d'être une figure de style. */
  | {
      kind: "attach";
      title: string;
      note: string;
      rows: { label: string; count: number; unit: string }[];
      foot: string;
    }
  /** LA BIBLIOTHÈQUE — ce qui est écrit, ce qui est dit, et le fait que les deux
   *  se cherchent.
   *
   *  Le pilier « The library » d'`onboarding-documentation` dit :
   *  « Search covers WHAT WAS SAID AND TYPED. » C'est la seule promesse de la
   *  page qu'aucune autre surface ne porte — et la carte y rendait une TROISIÈME
   *  copie de la réponse citée, identique au héros et au scénario, question et
   *  sources comprises.
   *
   *  Le total indexé est dérivé : deux natures de contenu, un seul index. */
  | {
      kind: "library";
      label: string;
      /** `spoken` distingue ce qui a été DIT de ce qui a été TAPÉ. C'est l'axe
       *  entier de la carte. */
      shelves: { name: string; note: string; count: number; spoken?: boolean }[];
      foot: string;
    }
  /** DEUX ROUTES POUR UNE MÊME QUESTION — celle qui bloque, celle qui répond.
   *
   *  Le scénario s'appelle « How a question stops being an interruption », et
   *  son arc est un CONTRASTE : l'ancienne route passe par une personne
   *  occupée, la nouvelle par la recherche. Une carte de réponse citée ne
   *  montre que la seconde — elle ne peut pas montrer ce qu'on évite.
   *
   *  ⚠️ Aucune durée inventée : `20 seconds` et `$740` sont dans la copy de la
   *  section, `March 6` aussi. Une carte qui chiffrerait un gain de
   *  productivité non écrit serait une allégation, pas une maquette. */
  | {
      kind: "route";
      label: string;
      routes: { name: string; steps: string[]; outcome: string; blocked?: boolean }[];
      foot: string;
    }
  /** LE PROJET COMME OBJET — étapes, tâches, mises à jour.
   *
   *  Le pilier « The project » de `/solutions/project-profitability` décrit un
   *  CONTENANT : « Every project carries its budget, stages and tasks. » La
   *  carte `record` y montrait la même jauge que le héros, aux mêmes valeurs —
   *  le budget consommé, pas la structure qui le porte.
   *
   *  Les étapes sont celles du produit (`LEAD → COMPLETED`), c'est-à-dire le
   *  rail de l'accueil : la page secteur et l'accueil décrivent le même cycle,
   *  ils ne peuvent pas le nommer différemment. */
  | {
      kind: "project";
      title: string;
      chip: string;
      /** Le cycle de vie, dans l'ordre. `at` marque l'étape courante. */
      stages: string[];
      at: number;
      /** Comptes par état de tâche. Le total est dérivé. */
      tasks: { state: string; count: number }[];
      foot: string;
    }
  /** BUDGET CONTRE RÉEL, LIGNE PAR LIGNE — et la ligne qui déborde.
   *
   *  Le scénario dit « the hours are already attributed, so THE CAUSE IS ON THE
   *  SAME SCREEN ». Une jauge à 78 % ne montre aucune cause : elle montre un
   *  pourcentage. Il faut les lignes, et il faut qu'elles s'additionnent.
   *
   *  ⚠️ Les deux totaux et le pourcentage sont DÉRIVÉS des lignes. C'est ce qui
   *  rend la carte vérifiable : le lecteur peut additionner la colonne et
   *  retrouver les `320 h` et `249 h` que cite le texte. Un total retapé
   *  au-dessus de lignes qui ne tombent pas juste, sur une page dont le H1 est
   *  « Every job was profitable until somebody added it up », serait la faute la
   *  plus embarrassante du site. */
  | {
      kind: "variance";
      title: string;
      period: string;
      /** `budget` et `actual` en heures entières. */
      lines: { label: string; budget: number; actual: number }[];
      foot: string;
    }
  /** LES FENÊTRES DE 60 SECONDES — l'atome de la mesure, comptable.
   *
   *  Le lede d'`employee-productivity` ouvre sur « activity is measured in
   *  60-second windows ». La grille montre donc UNE HEURE, soit soixante
   *  fenêtres qu'on peut littéralement compter à l'écran. C'est la réponse la
   *  plus directe au reproche fait aux cartes de score : un histogramme de
   *  vingt-quatre barres anonymes ne se compte pas, soixante carrés si.
   *
   *  L'indicateur visible est SUR la carte, pas en légende : sur une page dont
   *  le H1 est « Measure openly », la visibilité de la mesure doit être une
   *  chose qu'on voit, pas une chose qu'on lit. */
  | {
      kind: "windows";
      label: string;
      /** Le libellé de l'indicateur visible — « Recording », jamais un verbe
       *  passif. C'est la garantie no 1 de la page. */
      indicator: string;
      /** Une valeur d'activité par fenêtre. `null` = fenêtre au ralenti, qui a
       *  déclenché un prompt. Leur nombre est affiché et DÉRIVÉ. */
      cells: (number | null)[];
      foot: string;
    }
  /** UN RALENTI, PAS À PAS — l'événement que le produit ne déduit jamais.
   *
   *  Le scénario d'`employee-productivity` s'appelle « How an idle stretch is
   *  handled » : c'est un ENCHAÎNEMENT, pas un état. Chaque étape porte son
   *  heure, et la durée non comptée se DÉDUIT de la première et de la dernière
   *  — le chiffre qui rassure ne peut donc pas être arrondi en faveur du
   *  produit.
   *
   *  Distinct de `windows`, qui montre la mesure en continu : ici on est zoomé
   *  sur un seul événement. Même écart de focale qu'entre `week` et `silence`
   *  sur `remote-teams`, et c'est ce qui empêche les deux cartes d'une même
   *  page de se ressembler. */
  | {
      kind: "idle";
      label: string;
      steps: { at: string; event: string; note?: string }[];
      /** Ce qu'il advient du temps. Le libellé est écrit, la durée du ralenti
       *  est dérivée des étapes — donc elle ne peut pas flatter le produit. */
      outcome: string;
      foot: string;
    }
  /** LA JOURNÉE COUPÉE EN DEUX QUI SE RECOLLE — deux lieux, une feuille.
   *
   *  Le miroir de `silence`, et c'est voulu : là-bas une coupure qui ne se
   *  referme jamais, ici une coupure qui se referme. Les deux pages parlent
   *  d'un trou dans un relevé, mais elles n'en disent pas la même chose —
   *  `remote-teams` dit « le trou s'annonce », `hybrid-teams` dit « le trou se
   *  comble sans compter deux fois ». Un même dessin sur les deux mentirait sur
   *  l'une des deux.
   *
   *  Le total est DÉRIVÉ des segments : c'est ce qui prouve à l'oeil qu'aucune
   *  heure n'a été comptée deux fois, ce qui est l'objection exacte du
   *  scénario. */
  | {
      kind: "reconcile";
      label: string;
      /** Les blocs de la journée, dans l'ordre. `offline` marque ceux qui ont
       *  été mis en file au lieu d'être envoyés tout de suite. */
      blocks: { at: string; place: string; task: string; hours: string; offline?: boolean }[];
      /** L'heure de reconnexion. La bascule du dessin tombe dessus. */
      reconnected: string;
      foot: string;
    }
  /** LE POSTE qui produit le relevé — enregistré, vivant, révocable.
   *
   *  Distinct de `score`, qui montre le RÉSULTAT. Les deux se disputaient la
   *  même page : le héros de `/solutions/remote-teams` et son premier pilier
   *  rendaient la même carte de score, aux mêmes valeurs, à un écran d'écart.
   *  Deux dessins identiques ne disent rien deux fois — ils disent au lecteur
   *  qu'il a déjà vu cette page.
   *
   *  Le partage est net : le héros porte le chiffre qu'on LIT (« you can read
   *  the record »), le pilier porte la MACHINE qui le fabrique, ce qui est
   *  exactement ce que son corps énumère — agent de bureau, fenêtres de 60 s,
   *  file hors ligne, registre révocable. Et c'est ce poste-là que le scénario
   *  fait taire deux sections plus bas : le lecteur l'a vu battre avant de le
   *  voir s'arrêter. */
  | {
      kind: "device";
      label: string;
      name: string;
      platform: string;
      status: string;
      /** Les trois plateformes de l'agent. `active` marque celle du poste. */
      platforms: { short: string; active?: boolean }[];
      rows: { label: string; value: string }[];
      foot: string;
    }
  /** La semaine QUI S'ARRÊTE — un relevé coupé net, et la suite retenue.
   *
   *  Variante distincte de `score` et non un réglage de celle-ci. Un relevé
   *  interrompu n'est pas un relevé pâle : baisser l'opacité d'un histogramme
   *  donne « la page charge », pas « le poste s'est tu mardi ». Il faut trois
   *  choses qu'un graphique de score ne porte pas — un AXE DE TEMPS pour que
   *  « mardi » existe à l'écran, une COUPURE nette, et les jours manquants
   *  dessinés comme RETENUS plutôt que comme vides. */
  | {
      kind: "silence";
      label: string;
      score: number;
      grade: string;
      /** Les jours de la semaine, dans l'ordre. Ils portent l'axe. */
      days: string[];
      /** Position de la coupure en pourcentage de la semaine. Elle DOIT tomber
       *  dans le jour que nomme `lastEvent` — c'est ce qui rend le dessin
       *  vérifiable : à 34 % sur cinq jours, la coupure est dans le deuxième
       *  jour, donc mardi. Le nombre de jours retenus en est DÉRIVÉ, jamais
       *  écrit à la main : déplacer la coupure ne peut pas faire mentir
       *  l'étiquette. */
      cut: number;
      lastEvent: string;
      foot: string;
    }
  /** La réponse de l'assistant, avec ses sources citées. */
  | { kind: "source"; question: string; answer: string; sources: string[] };

/** Un bloc pilier d'une page secteur. `ref` désigne le pilier produit — il donne
 *  l'ancre `/product#…`, la bande de specs et la liste dans laquelle `caps` est
 *  choisi. `index`, `band`, `eyebrowTone` et le côté du visuel sont DÉRIVÉS du
 *  rang plus bas : une page ne décide pas de son propre rythme de bandes. */
interface PillarBlock {
  ref: PillarId;
  /** Oeil-de-boeuf, en capitales : « THE CLIENT », « THE DOCKET »… C'est le mot
   *  du secteur pour le pilier, pas le nom du pilier. */
  label: string;
  heading: string;
  body: string;
  caps: Capability[];
  mock: Mockup;
}

interface SectorCopy {
  h1: string;
  lede: string;
  hero: Mockup;
  problem: {
    heading: string;
    points: { title: string; body: string }[];
  };
  pillars: PillarBlock[];
  scenario: {
    eyebrow: string;
    heading: string;
    lines: Line[];
    mock: Mockup;
  };
  objection: {
    eyebrow: string;
    heading: string;
    body: string;
    /** Le second paragraphe : l'argument PROPRE au secteur, celui qui retourne
     *  l'objection. C'est lui qu'on ne peut pas recopier d'une page à l'autre. */
    argument: string;
    guarantees: string[];
  };
  /** Trois secteurs frères, par slug. Maillage interne — `site-architecture.md` §7. */
  related: string[];
  cta: { title: string; note?: string };
  /** `<title>` et meta description. Uniques par page, ≤ 60 / ≤ 155 caractères. */
  meta: { title: string; description: string };
}

/**
 * Une page CAS D'USAGE — `/solutions/{use-case}`, au même niveau d'URL que les
 * huit pages secteur (décision de la direction, elle remplace le préfixe
 * `/solutions/use-cases/…` arbitré le 27 juillet 2026).
 *
 * ⚠️ SA STRUCTURE DIFFÈRE DE `SectorCopy`, ET C'EST LE POINT. Quatorze pages
 * sous `/solutions` bâties sur un seul squelette, c'est la doorway page que la
 * règle en tête de ce fichier existe pour empêcher — la raison invoquée pour
 * créer ces pages étant le référencement, un gabarit recopié les rendrait
 * contre-productives.
 *
 * Une page secteur raconte UN MÉTIER à travers quatre piliers. Une page cas
 * d'usage fait la coupe inverse : UN PROBLÈME à travers les métiers.
 *
 *   secteur                          cas d'usage
 *   ─────────────────────────────    ─────────────────────────────────────────
 *   `problem`  3 douleurs du métier  `situation`  3 symptômes transverses
 *   `pillars`  3 ou 4 piliers        `pillars`    1 ou 2 piliers, EN PROFONDEUR
 *   `related`  3 secteurs frères     `audience`   3 secteurs + POURQUOI chacun
 *
 * Test d'acceptation, jumeau de celui des secteurs : **permuter le nom du cas
 * d'usage doit rendre la page fausse.** Si « remote teams » et « hybrid teams »
 * peuvent échanger leur H1, ce n'est qu'une page.
 */
interface UseCaseCopy {
  h1: string;
  lede: string;
  /** Oeil-de-boeuf du héros. Les cas d'usage n'ont pas de `tag` de domaine :
   *  c'est le pilier qui répond qui sert de repère (`ACTIVITY`, `TIME`…). */
  eyebrow: string;
  hero: Mockup;
  /** L'équivalent de `problem`, mais transverse : ces symptômes doivent se
   *  reconnaître dans plusieurs métiers, sinon la page double un secteur. */
  situation: {
    heading: string;
    points: { title: string; body: string }[];
  };
  /** UN ou DEUX piliers seulement, traités à fond. Trois ou quatre feraient de
   *  la page un décalque de page secteur. */
  pillars: PillarBlock[];
  scenario: {
    eyebrow: string;
    heading: string;
    lines: Line[];
    mock: Mockup;
  };
  objection: {
    eyebrow: string;
    heading: string;
    body: string;
    argument: string;
    guarantees: string[];
  };
  /** « Qui en souffre le plus » : trois slugs de SECTEUR, chacun avec la raison
   *  qui lui est propre. C'est ce qui remplace les `blurb` génériques du
   *  `related` des pages secteur — et c'est le maillage interne que
   *  `docs/site-architecture.md` §7 réclame. */
  audience: { slug: string; reason: string }[];
  audienceHeading: string;
  cta: { title: string; note?: string };
  meta: { title: string; description: string };
}

/* ───────────────────────── Sélection des capacités ────────────────────────── */

/** Choisit des puces DANS `PRODUCT_PILLARS` et lève si l'une n'y est pas.
 *
 *  C'est la garantie structurelle : une capacité inventée ne se glisse pas dans
 *  huit pages, elle casse le build à la ligne près. Le libellé doit être copié
 *  au caractère près depuis `src/data/product.ts` — c'est voulu, une correspondance
 *  approximative rouvrirait la porte qu'on ferme ici. */
const capsOf = (id: PillarId, bullets: string[]): Capability[] => {
  const pillar = PRODUCT_PILLARS.find((entry) => entry.id === id);
  if (!pillar) throw new Error(`[solutions] pilier inconnu : ${id}`);

  return bullets.map((text) => {
    const cap = pillar.caps.find((entry) => entry.text === text);
    if (!cap) {
      throw new Error(
        `[solutions] "${text}" n'est pas une capacité du pilier ${id}. ` +
          `Les capacités se déclarent dans src/data/product.ts, jamais ici.`
      );
    }
    return cap;
  });
};

const specOf = (id: PillarId): Spec[] => {
  const pillar = PRODUCT_PILLARS.find((entry) => entry.id === id);
  if (!pillar) throw new Error(`[solutions] pilier inconnu : ${id}`);
  return pillar.spec;
};

/* ──────────────────────────────── Le contenu ──────────────────────────────── */

/** La ligne mono sous les boutons, identique sur les neuf pages : la répéter
 *  dans chaque bloc de copy en ferait huit endroits où elle peut diverger. */
export const FINE_PRINT = "No credit card. Desktop app for Windows, macOS and Linux.";

const CONTENT: Record<string, Record<Locale, SectorCopy>> = {
  /* ══ Agences — mène par le DOSSIER CLIENT : la consommation du forfait ══ */
  "digital-agencies": {
    en: {
      h1: "See the retainer burn while you can still do something about it.",
      lede: "Contacts, budget, hours, tasks and documents all sit on the same client project - so budget consumed is a live number, not a month-end reconstruction. When a retainer starts running hot, you find out in week two.",
      hero: {
        kind: "record",
        title: "Northwind Systems",
        chip: "In progress",
        meter: { label: "Budget", value: "$48,000", percent: 62, read: "62% used" },
        foot: "Day 11 of 30",
        tags: ["retainer", "Q2"],
      },
      problem: {
        heading: "The retainer is fixed. The scope isn't.",
        points: [
          {
            title: "Work expands in small favours nobody logs.",
            body: "A quick extra round, a deck that wasn't in the statement of work, a call that ran long. None of it is worth arguing about on its own. Together they are the margin.",
          },
          {
            title: "The tracker knows the hours. It doesn't know the client.",
            body: "Thirty-eight hours were logged last week. Which account they belonged to, and which of them were in scope, lives in someone's head or in a different tool.",
          },
          {
            title: "Profitability is something you reconstruct.",
            body: "Two exports, a spreadsheet, an afternoon of reconciliation, and a number that is already three weeks old by the time anyone acts on it.",
          },
        ],
      },
      pillars: [
        {
          ref: "clients",
          label: "The client",
          heading: "Budget consumed, as it is consumed.",
          body: "Every hour, task, screenshot and document files itself against the client project it was created in. Budget spent stops being a monthly calculation and becomes a number on the record.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Budgeted vs actual hours, live",
            "Notes with @mentions that notify",
            "Reminders with due dates, in-app and email",
            "Custom modules and fields - 12 field types",
          ]),
          mock: {
            kind: "record",
            title: "Northwind Systems",
            chip: "In progress",
            people: true,
            meter: { label: "Budget", value: "$48,000", percent: 62, read: "62% used" },
            tags: ["retainer", "Q2"],
          },
        },
        {
          ref: "time",
          label: "The hours",
          heading: "Hours that arrive already attributed.",
          body: "The timer runs against a task inside a client project, so nobody writes a timesheet from memory on Friday afternoon. It survives multiple browser tabs and pauses itself when the screen goes idle.",
          caps: capsOf("time", [
            "Time logged against a task in a client project",
            "Multi-tab safe - one tab leads, no double counting",
            "Automatic pause past the idle threshold",
            "Timesheets and entry history, editable",
            "Payroll-ready CSV export",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Northwind · Ledger rebuild", task: "Migration scripts", elapsed: "1:47:12" },
            entries: [
              { task: "Northwind · Client call", duration: "0:48:20" },
              { task: "Acme · Second round of edits", duration: "1:12:05" },
              { task: "Northwind · Deck for Thursday", duration: "2:03:40" },
            ],
            foot: "Timesheet · today · editable",
          },
        },
        {
          ref: "knowledge",
          label: "The paper trail",
          heading: "The statement of work, where the work is.",
          body: "Briefs, scopes and meeting notes live inside the client project, and recorded calls are transcribed as they happen. When a client asks whether something was in scope, the answer has a source.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Video embeds - YouTube, Loom, Fathom",
            "Automatic video transcription, indexed",
            "Full-text search across everything",
            "AI assistant over semantic search, cited",
          ]),
          mock: {
            kind: "source",
            question: "was the reporting module in the Ledger scope?",
            answer: "No. The signed statement of work covers migration only. Reporting was raised on the April 3 call and left for a separate quote.",
            sources: ["doc · Ledger SOW", "call · Apr 3"],
          },
        },
      ],
      scenario: {
        eyebrow: "Day 11",
        heading: "How it actually goes.",
        lines: [
          [
            "Northwind is on a ",
            fig("$48,000"),
            " retainer. On the 11th the budget meter reads ",
            fig("62%"),
            ", which is high for the date - so you open the record before the standup instead of after the invoice.",
          ],
          [
            "The hours are already attributed: ",
            fig("38.5 h"),
            " on the Ledger rebuild, ",
            fig("21 h"),
            " on client calls. The call time is the anomaly. Two of those calls have transcripts, and both are about a reporting module that isn't in the statement of work.",
          ],
          [
            "That is a scope conversation you can have on the 11th, with the document open - not a write-off you absorb on the 30th.",
          ],
        ],
        mock: {
          kind: "record",
          title: "Northwind Systems",
          chip: "In progress",
          meter: { label: "Budget", value: "$48,000", percent: 62, read: "62% used" },
          foot: "Day 11 of 30",
        },
      },
      objection: {
        eyebrow: "Transparency",
        heading: "Your team will ask what's being recorded.",
        body: "So tell them, and let them check. DocuFlow shows a visible indicator whenever the timer is running, screenshots can be blurred so content is never legible, capture can be limited to working hours, and anyone can open and review their own data.",
        argument:
          "Used this way, the record protects the team as much as the account. Evidence that a request was out of scope is what lets you bill for it - instead of absorbing it as an unpaid evening.",
        guarantees: [
          "A visible indicator shows the team exactly when the timer is running",
          "Screenshots can be blurred so content is never legible",
          "Capture is scheduled to working hours only",
          "Anyone can open and review their own recorded data",
        ],
      },
      related: ["consulting-firms", "software-teams", "staffing-agencies"],
      cta: { title: "Start with your next retainer.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for digital agencies - see the retainer burn",
        description:
          "Hours, tasks, screenshots and documents on the same client project, so budget consumed is a live number. Built for agencies working fixed-fee retainers.",
      },
    },
  },

  /* ══ Équipes de dev — mènent par les HEURES : estimation contre réel ══ */
  "software-teams": {
    en: {
      h1: "The estimate said forty hours. The sprint says sixty-one.",
      lede: "The timer runs against a task inside the client project, so estimate against actual is something you read mid-sprint rather than argue about at the retro. When a change request lands, the record already says whether it was in scope.",
      hero: {
        kind: "timer",
        running: { project: "Atlas · Sprint 14", task: "DF-482 Auth refactor", elapsed: "2:14:38" },
        entries: [
          { task: "DF-477 · Rate limiter", duration: "3:12:40" },
          { task: "DF-482 · Auth refactor", duration: "6:48:05" },
          { task: "Sprint 14 · Ceremonies", duration: "1:20:00" },
        ],
        foot: "Timesheet · sprint 14 · editable",
      },
      problem: {
        heading: "Estimates are guesses. Actuals are evidence.",
        points: [
          {
            title: "The change request arrives without a paper trail.",
            body: "It is asked for in a thread, agreed to on a call, and built the same afternoon. Two weeks later nobody can say whether it was in the original ticket.",
          },
          {
            title: "Hours land on the tracker, not on the ticket.",
            body: "A tracker records that someone worked. It doesn't record which ticket, in which project, for which client - so estimate against actual has to be assembled by hand.",
          },
          {
            title: "The retro is the first time anyone sees the number.",
            body: "By then the sprint is closed, the invoice is out, and the next estimate gets made from memory rather than from what the last one cost.",
          },
        ],
      },
      pillars: [
        {
          ref: "time",
          label: "The hours",
          heading: "Time that lands on the ticket.",
          body: "The timer runs against a task inside a client project, never a free-text label, so hours reach the ticket that asked for them. It leads from one tab, pauses past the idle threshold, and exports without a spreadsheet in between.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a task in a client project",
            "Multi-tab safe - one tab leads, no double counting",
            "Automatic pause past the idle threshold",
            "Timesheets and entry history, editable",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Atlas · Sprint 14", task: "DF-482 Auth refactor", elapsed: "2:14:38" },
            entries: [
              { task: "DF-477 · Rate limiter", duration: "3:12:40" },
              { task: "DF-482 · Auth refactor", duration: "6:48:05" },
              { task: "DF-461 · Review", duration: "0:44:15" },
            ],
            foot: "Timesheet · sprint 14 · editable",
          },
        },
        {
          ref: "clients",
          label: "The project",
          heading: "Estimate and actual, on the same record.",
          body: "Tasks, budgets and stages live on the client project the hours are logged against. Budgeted versus actual is a live number on the board, so a sprint running hot announces itself while it can still be re-scoped.",
          caps: capsOf("clients", [
            "Client projects with full stage-change history",
            "Kanban board across all projects",
            "Budgeted vs actual hours, live",
            "Tasks - open / in progress / done / archived",
            "Team assignment per project",
            "Daily updates with status, blockers and KPIs",
          ]),
          mock: {
            kind: "record",
            title: "Atlas · Sprint 14",
            chip: "In progress",
            meter: { label: "Estimated", value: "40 h", percent: 100, read: "61 h actual" },
            foot: "Two tickets added on day three",
            tags: ["fixed bid", "sprint 14"],
          },
        },
        {
          ref: "knowledge",
          label: "The decisions",
          heading: "What was agreed, with the call attached.",
          body: "Specs, tickets and meeting notes sit inside the project, and recorded calls are transcribed as they happen. When a change request is disputed, the answer is a source rather than a recollection.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Video embeds - YouTube, Loom, Fathom",
            "Automatic video transcription, indexed",
            "Full-text search across everything",
            "AI assistant over semantic search, cited",
          ]),
          mock: {
            kind: "source",
            question: "when did token rotation enter sprint 14?",
            answer: "Day three, on the March 9 call. The sprint scope signed on March 2 covers the auth refactor only.",
            sources: ["doc · Sprint 14 scope", "call · Mar 9"],
          },
        },
      ],
      scenario: {
        eyebrow: "Sprint 14",
        heading: "How it actually goes.",
        lines: [
          [
            "Sprint 14 was estimated at ",
            fig("40 h"),
            ". On Thursday the board reads ",
            fig("61 h"),
            ", and ",
            fig("9.5 h"),
            " of that sits on DF-482 - a ticket that entered on day three.",
          ],
          [
            "Nobody has to reconstruct where it went. DF-482 came out of a call, the call has a transcript, and the transcript says the client asked for token rotation. The signed sprint scope doesn't mention it.",
          ],
          [
            "That is a change-order conversation you have on Thursday with the transcript open - not an overrun you explain at the retro.",
          ],
        ],
        mock: {
          kind: "record",
          title: "Atlas · Sprint 14",
          chip: "In progress",
          meter: { label: "Estimated", value: "40 h", percent: 100, read: "61 h actual" },
          foot: "DF-482 added on day three",
        },
      },
      objection: {
        eyebrow: "Monitoring",
        heading: "Screenshots on an engineering team is a fair objection.",
        body: "The timer runs in the browser and the desktop agent is a separate application, so a team can run time, tickets and projects with no capture at all. Where it is used - usually because a client contract asks for it - a visible indicator shows when the timer is running, screenshots can be blurred so content is never legible, and capture is restricted to an active-hours window.",
        argument:
          "On an engineering team the record is pointed at the client, not at the developer. Evidence that a request arrived on day three is what gets it billed as a change order, instead of absorbed as a weekend.",
        guarantees: [
          "The web timer runs in a browser - the desktop agent is a separate install",
          "A visible indicator shows the team exactly when the timer is running",
          "Screenshots can be blurred so content is never legible",
          "Anyone can open and review their own recorded data",
        ],
      },
      related: ["digital-agencies", "consulting-firms", "staffing-agencies"],
      cta: { title: "Start with your next sprint.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for development teams - estimate against actual",
        description:
          "Hours logged against a ticket inside a client project, budgets live on the board, and transcribed calls that say when a change request arrived. For teams billing fixed-scope work.",
      },
    },
  },

  /* ══ Conseil — mène par la PREUVE : le score de qualité du relevé ══ */
  "consulting-firms": {
    en: {
      h1: "Answer “what did you do for these forty hours?” from the record.",
      lede: "Hours attach to an engagement, activity and screenshots attach to the hours, and the monitoring data grades its own completeness. When an invoice is questioned, the answer is a record with a score on it rather than a recollection.",
      hero: {
        kind: "score",
        label: "Evidence quality",
        score: 84,
        grade: "STRONG",
        coverage: [
  { label: "Screenshots", value: "38 captured" },
  { label: "Activity windows", value: "1,914 of 2,010" },
  { label: "Idle prompts", value: "3 · all answered" },
  { label: "Devices reporting", value: "2 of 2" },
],
foot: "Meridian · week 32 · advisory",
      },
      problem: {
        heading: "The invoice is a claim. The record is the proof.",
        points: [
          {
            title: "The question arrives three weeks after the work.",
            body: "By then the consultant is on the next engagement, the working notes are in a personal folder, and the answer has to be assembled from a calendar.",
          },
          {
            title: "Utilisation is measured, but never evidenced.",
            body: "A percentage on a dashboard says the week was billable. It doesn't say what was produced, against which deliverable, under which statement of work.",
          },
          {
            title: "A thin record looks exactly like a complete one.",
            body: "Nothing in a timesheet tells you the week it covers was barely captured - until a client asks for detail that isn't there.",
          },
        ],
      },
      pillars: [
        {
          ref: "activity",
          label: "The evidence",
          heading: "The record grades its own completeness.",
          body: "A desktop agent on Windows, macOS and Linux records screenshots, activity levels and idle time in the background, and scores its own coverage from 0 to 100. A thin week announces itself before a client finds it.",
          caps: capsOf("activity", [
            "Evidence quality score, 0–100 per person",
            "Desktop agent for Windows, macOS and Linux",
            "Screenshots at randomised, configurable intervals",
            "Keyboard and mouse activity in 60-second windows",
            "Capture restricted to an active-hours window",
            "Admin analytics - coverage, quality, devices, alerts",
          ]),
          mock: {
            kind: "score",
            label: "Evidence quality",
            score: 84,
            grade: "STRONG",
            coverage: [
  { label: "Screenshots", value: "38 captured" },
  { label: "Activity windows", value: "1,914 of 2,010" },
  { label: "Idle prompts", value: "3 · all answered" },
  { label: "Devices reporting", value: "2 of 2" },
],
foot: "Meridian · week 32 · advisory",
          },
        },
        {
          ref: "time",
          label: "The hours",
          heading: "Hours that carry their engagement.",
          body: "Time is logged against a task inside a client engagement, never a free-text label. Timesheets stay editable, expected hours are configurable per person, and the export is clean enough to reconcile against a fee note.",
          caps: capsOf("time", [
            "Time logged against a task in a client project",
            "Timesheets and entry history, editable",
            "Attendance and presence",
            "Configurable expected hours per person",
            "Payroll-ready CSV export",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Meridian · Operating model", task: "Board pack revisions", elapsed: "1:32:07" },
            entries: [
              { task: "Meridian · Workshop prep", duration: "2:10:00" },
              { task: "Meridian · Stakeholder calls", duration: "1:45:30" },
              { task: "Harborline · Diagnostic", duration: "3:05:12" },
            ],
            foot: "Timesheet · week 32 · editable",
          },
        },
        {
          ref: "clients",
          label: "The engagement",
          heading: "The statement of work, with its budget attached.",
          body: "Each engagement is a client project with stages, a budget and its own structure. Twelve custom field types mean the record matches how your practice scopes work, rather than the other way round.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Budgeted vs actual hours, live",
            "Custom modules and fields - 12 field types",
            "Daily updates with status, blockers and KPIs",
          ]),
          mock: {
            kind: "record",
            title: "Meridian Group",
            chip: "In progress",
            people: true,
            meter: { label: "Budget", value: "$96,000", percent: 71, read: "71% used" },
            tags: ["advisory", "SOW-2026-04"],
          },
        },
        {
          ref: "knowledge",
          label: "The deliverable",
          heading: "Answers with a source, months later.",
          body: "Deliverables, working papers and recorded workshops live in the engagement and are indexed as they are written. The assistant answers from them with citations, so a question in November reaches work done in June.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Automatic video transcription, indexed",
            "Company files in folders - PDF, Word, text",
            "Full-text search across everything",
            "AI assistant over semantic search, cited",
          ]),
          mock: {
            kind: "source",
            question: "what did we deliver in week 32?",
            answer: "The operating model draft and the August board pack. Both were walked through on the August 14 workshop.",
            sources: ["doc · Operating model v3", "call · Aug 14"],
          },
        },
      ],
      scenario: {
        eyebrow: "Week 32",
        heading: "How a queried invoice ends.",
        lines: [
          [
            "Meridian queries a ",
            fig("$12,000"),
            " line on the August invoice: ",
            fig("40 h"),
            " described as “advisory support”.",
          ],
          [
            "The engagement record has those hours against three deliverables - ",
            fig("18 h"),
            " on the operating model, ",
            fig("14 h"),
            " on the board pack, ",
            fig("8 h"),
            " on workshops - and the week's evidence quality reads ",
            fig("84/100"),
            ".",
          ],
          [
            "The breakdown goes back the same afternoon. The conversation turns out to be about scope, not about whether the work happened.",
          ],
        ],
        mock: {
          kind: "score",
          label: "Evidence quality",
          score: 84,
          grade: "STRONG",
          coverage: [
  { label: "Screenshots", value: "38 captured" },
  { label: "Activity windows", value: "1,914 of 2,010" },
  { label: "Idle prompts", value: "3 · all answered" },
  { label: "Hours on the record", value: "40:00" },
],
foot: "Meridian · week 32 · 40 h",
        },
      },
      objection: {
        eyebrow: "Confidentiality",
        heading: "Client material will be on screen when a capture fires.",
        body: "So make it unreadable. Screenshots can be blurred so content is never legible, capture is restricted to an active-hours window, and a screenshot that shouldn't exist is soft-deleted with a recorded reason rather than silently erased. Devices are registered and revocable at any time.",
        argument:
          "Confidentiality and evidence are not opposites here. A blurred screenshot still proves the hour was worked on that engagement without showing a single line of the client's material - which is the only thing an invoice query actually asks.",
        guarantees: [
          "Screenshots can be blurred so content is never legible",
          "Capture is restricted to an active-hours window",
          "Screenshots are soft-deleted with a recorded reason, never silently erased",
          "Devices are registered and revocable at any time",
        ],
      },
      related: ["digital-agencies", "accounting-firms", "legal-services"],
      cta: { title: "Start with your next engagement.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for consulting firms - evidence behind the invoice",
        description:
          "Hours against an engagement, screenshots and activity behind the hours, and an evidence quality score from 0 to 100 that tells you when a week is thinly recorded.",
      },
    },
  },

  /* ══ Comptables — mènent par le CHRONO : le coût du changement de client ══ */
  "accounting-firms": {
    en: {
      h1: "In busy season, the hour you forget to write down is the hour you write off.",
      lede: "The timer runs against an engagement inside a client record, so moving from one small file to the next costs a click rather than a memory. Realisation stops depending on what anyone can reconstruct on Friday afternoon.",
      hero: {
        kind: "timer",
        running: { project: "Kestrel Foods · T2 return", task: "Year-end adjustments", elapsed: "0:26:14" },
        entries: [
          { task: "Bramble Cafe · Bookkeeping", duration: "0:41:20" },
          { task: "Ridgeway Ltd · T2 return", duration: "1:05:55" },
          { task: "Novak · Payroll", duration: "0:18:32" },
        ],
        foot: "Timesheet · March 14 · editable",
      },
      problem: {
        heading: "A dozen files a day, one timesheet from memory.",
        points: [
          {
            title: "Switching costs more than the work.",
            body: "Four minutes here, eleven there, a call that falls between two engagements. The blocks are too small to remember and too many to reconstruct.",
          },
          {
            title: "Friday's timesheet is an educated guess.",
            body: "Hours get written down after the fact and rounded to something defensible. The gap between what was worked and what was billed is the write-off.",
          },
          {
            title: "Realisation is only known once the season is over.",
            body: "By the time the numbers land the engagements are closed, and next year's fee letters have already gone out.",
          },
        ],
      },
      pillars: [
        {
          ref: "time",
          label: "The timer",
          heading: "One click per file, not one memory per week.",
          body: "Start, pause, resume, stop - against a task inside a client engagement rather than a free-text line. It leads from a single tab, pauses itself past the idle threshold, and the timesheet is built by the time the day ends.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a task in a client project",
            "Multi-tab safe - one tab leads, no double counting",
            "Automatic pause past the idle threshold",
            "Timesheets and entry history, editable",
            "Payroll-ready CSV export",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Kestrel Foods · T2 return", task: "Year-end adjustments", elapsed: "0:26:14" },
            entries: [
              { task: "Bramble Cafe · Bookkeeping", duration: "0:41:20" },
              { task: "Ridgeway Ltd · T2 return", duration: "1:05:55" },
              { task: "Novak · Payroll", duration: "0:18:32" },
            ],
            foot: "Timesheet · March 14 · editable",
          },
        },
        {
          ref: "activity",
          label: "The record",
          heading: "Hours with something behind them.",
          body: "While the timer runs, the desktop agent records screenshots and activity levels in the background and scores its own coverage. A week that was barely captured says so, rather than looking identical to one that was.",
          caps: capsOf("activity", [
            "Desktop agent for Windows, macOS and Linux",
            "Screenshots at randomised, configurable intervals",
            "Capture restricted to an active-hours window",
            "Screenshots soft-deleted with a recorded reason",
            "Evidence quality score, 0–100 per person",
          ]),
          mock: {
            kind: "score",
            label: "Evidence quality",
            score: 79,
            grade: "STRONG",
            coverage: [
  { label: "Screenshots", value: "52 captured" },
  { label: "Activity windows", value: "2,140 of 2,400" },
  { label: "Idle prompts", value: "6 · all answered" },
  { label: "Devices reporting", value: "4 of 4" },
],
foot: "Busy season · week of March 10",
          },
        },
        {
          ref: "clients",
          label: "The engagement",
          heading: "Every file, with its budget and its stage.",
          body: "Clients, engagements, stages and budgeted hours in one record, so a file that is running past its fee is visible in March rather than in June. Reminders and @mentions keep the follow-ups on the engagement instead of in an inbox.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Budgeted vs actual hours, live",
            "Tasks - open / in progress / done / archived",
            "Reminders with due dates, in-app and email",
            "Daily updates with status, blockers and KPIs",
          ]),
          mock: {
            kind: "record",
            title: "Kestrel Foods",
            chip: "In progress",
            meter: { label: "Budgeted", value: "24 h", percent: 88, read: "21 h logged" },
            foot: "T2 return · filing deadline in 9 days",
            tags: ["T2", "busy season"],
          },
        },
      ],
      scenario: {
        eyebrow: "March 14",
        heading: "How a busy day settles.",
        lines: [
          [
            fig("Fourteen"),
            " engagements touched between ",
            fig("8:40"),
            " and ",
            fig("18:20"),
            ". The longest block runs ",
            fig("1:05"),
            "; the shortest is ",
            fig("4 min"),
            ".",
          ],
          [
            "None of them get written from memory. Each one started against a client engagement, so the timesheet is already built when the day ends - including the four-minute call that would never have made it onto a Friday reconstruction.",
          ],
          [
            "The write-off conversation in April is then about scope on two files, rather than about eleven hours nobody can account for.",
          ],
        ],
        mock: {
          kind: "timer",
          running: { project: "Kestrel Foods · T2 return", task: "Year-end adjustments", elapsed: "0:26:14" },
          entries: [
            { task: "Bramble Cafe · Bookkeeping", duration: "0:41:20" },
            { task: "Novak · Payroll call", duration: "0:04:11" },
            { task: "Ridgeway Ltd · T2 return", duration: "1:05:55" },
          ],
          foot: "14 engagements · March 14",
        },
      },
      objection: {
        eyebrow: "Client data",
        heading: "Client financials will be on screen when a capture fires.",
        body: "So they don't have to be legible. Screenshots can be blurred, capture is restricted to an active-hours window, and any screenshot is soft-deleted with a recorded reason rather than silently erased. Anyone can open and review their own recorded data, and devices are revocable at any time.",
        argument:
          "A blurred capture still does the job it is there for: it shows the hour was worked on that engagement. Nothing in the record has to be readable for the record to hold up - which is what makes this workable on files covered by professional confidentiality.",
        guarantees: [
          "Screenshots can be blurred so content is never legible",
          "Capture is restricted to an active-hours window",
          "Screenshots are soft-deleted with a recorded reason, never silently erased",
          "Anyone can open and review their own recorded data",
        ],
      },
      related: ["consulting-firms", "legal-services", "digital-agencies"],
      cta: { title: "Start before the next busy season.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for accountants - stop writing off busy season",
        description:
          "A timer that runs against an engagement inside a client record, so a dozen small files a day arrive on the timesheet instead of being reconstructed on Friday.",
      },
    },
  },

  /* ══ Juridique — mène par le DOCKET et le DOSSIER. Objection : le privilège ══ */
  "legal-services": {
    en: {
      h1: "Docket the time while you still remember the matter.",
      lede: "Time runs against a matter, and the documents, notes and recorded calls sit on the same file. Months later the record still says what was done, when and by whom - which is the only version that holds up.",
      hero: {
        kind: "record",
        title: "Halvorsen · Matter 2026-0184",
        chip: "In progress",
        meter: { label: "Retainer", value: "$25,000", percent: 41, read: "41% billed" },
        foot: "Docketed today · 3.4 h",
        tags: ["litigation", "retainer"],
      },
      problem: {
        heading: "The docket is only as good as the day it was written.",
        points: [
          {
            title: "Six-minute increments do not survive the afternoon.",
            body: "A call, a memo, two emails on a different matter. Written up at six o'clock, the day becomes an estimate - and an estimate is what gets reduced.",
          },
          {
            title: "The file is in four places.",
            body: "The engagement letter is in email, the notes are on a pad, the call happened on video, and the time sits in a system that has never heard of the matter.",
          },
          {
            title: "The question comes months later.",
            body: "A taxation, an audit, a new lawyer on the file. What is needed then isn't a total: it is what was done, when, and on which matter.",
          },
        ],
      },
      pillars: [
        {
          ref: "time",
          label: "The docket",
          heading: "Time entered against the matter, not after it.",
          body: "The timer runs against a task inside a matter, so an entry exists before the description has to be remembered. It leads from one tab, pauses past the idle threshold, and every entry stays editable with its history.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a task in a client project",
            "Multi-tab safe - one tab leads, no double counting",
            "Automatic pause past the idle threshold",
            "Timesheets and entry history, editable",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Halvorsen · 2026-0184", task: "Review of production", elapsed: "0:42:18" },
            entries: [
              { task: "Halvorsen · Correspondence", duration: "0:18:00" },
              { task: "Whitlock estate · Drafting", duration: "1:24:36" },
              { task: "Halvorsen · Client call", duration: "0:36:12" },
            ],
            foot: "Docket · March 11 · editable",
          },
        },
        {
          ref: "knowledge",
          label: "The file",
          heading: "The whole file, searchable, with sources.",
          body: "Pleadings, correspondence, memos and recorded calls live on the matter and are indexed as they arrive. Search covers what was said as well as what was written, and the assistant answers with the document it came from.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Images, file attachments and audio recordings",
            "Company files in folders - PDF, Word, text",
            "Automatic video transcription, indexed",
            "Full-text search across everything",
            "AI assistant over semantic search, cited",
          ]),
          mock: {
            kind: "source",
            question: "what was agreed on scope of production?",
            answer: "Documents from January 2024 onward only. Confirmed on the March 11 call and recorded in the file note the same day.",
            sources: ["doc · File note Mar 11", "call · Mar 11"],
          },
        },
        {
          ref: "clients",
          label: "The matter",
          heading: "Matters, contacts and the history of every stage.",
          body: "Each matter is a record with its own stages, its own contacts and its own structure - twelve custom field types, so a litigation file and a corporate file don't have to look the same. Every stage change is kept.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Tasks - open / in progress / done / archived",
            "Notes with @mentions that notify",
            "Reminders with due dates, in-app and email",
            "Custom modules and fields - 12 field types",
          ]),
          mock: {
            kind: "record",
            title: "Halvorsen · Matter 2026-0184",
            chip: "In progress",
            people: true,
            meter: { label: "Retainer", value: "$25,000", percent: 41, read: "41% billed" },
            tags: ["litigation", "retainer"],
          },
        },
      ],
      scenario: {
        eyebrow: "Ten months later",
        heading: "How a docket entry holds up.",
        lines: [
          [
            "The Halvorsen file closed in March. In January the account is questioned: ",
            fig("3.4 h"),
            " docketed on the 11th, described as review and correspondence.",
          ],
          [
            "The matter still holds what sat behind those hours - two documents opened that day, a call with a transcript, and a file note carrying the date it was written. All three are on the matter, not in an inbox.",
          ],
          [
            "Assembling the answer takes ",
            fig("20 minutes"),
            " instead of an afternoon, and it is the record's version rather than anyone's recollection.",
          ],
        ],
        mock: {
          kind: "source",
          question: "what was done on the Halvorsen file on March 11?",
          answer: "Review of the production sent on March 8, a file note, and a 36-minute call with the client. 3.4 h docketed.",
          sources: ["doc · File note Mar 11", "call · Mar 11"],
        },
      },
      objection: {
        eyebrow: "Privilege",
        heading: "Privileged material cannot end up in a screenshot.",
        body: "Then don't capture it. The timer runs in a browser and the desktop agent is a separate application - a practice can run time, matters and documents with no capture at all. Where a firm does use it, screenshots can be blurred so content is never legible, capture is restricted to an active-hours window, screenshots are soft-deleted with a recorded reason rather than silently erased, and device tokens are stored only as hashes and revocable at any time.",
        argument:
          "The record that defends a fee is the docket and the file, not the screenshot. Nothing here asks a firm to point a camera at privileged material in order to get a defensible account of its own time.",
        guarantees: [
          "The web timer runs in a browser - the desktop agent is a separate install",
          "Screenshots can be blurred so content is never legible",
          "Screenshots are soft-deleted with a recorded reason, never silently erased",
          "Device tokens are stored only as hashes and revocable at any time",
        ],
      },
      related: ["accounting-firms", "consulting-firms", "digital-agencies"],
      cta: { title: "Start with your next matter.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for legal services - docket, file and matter",
        description:
          "Time docketed against a matter, with the documents, notes and transcribed calls on the same file. A record that still answers the question ten months later.",
      },
    },
  },

  /* ══ BPO — mène par la COUVERTURE : preuve d'occupation des postes, à l'échelle ══ */
  "bpo-call-centers": {
    en: {
      h1: "Prove the seats were staffed, without asking anyone for a status update.",
      lede: "Attendance, activity and evidence quality roll up per agent, per shift and per account, so coverage is something you show a client rather than something you assert. Built to be read across a floor, not one desk.",
      hero: {
        kind: "score",
        label: "Evidence quality",
        score: 88,
        grade: "STRONG",
        coverage: [
  { label: "Screenshots", value: "1,204 captured" },
  { label: "Activity windows", value: "19,880 of 20,160" },
  { label: "Idle prompts", value: "31 · all answered" },
  { label: "Devices reporting", value: "41 of 42" },
],
foot: "Night shift · 42 agents · admin analytics",
      },
      problem: {
        heading: "The client isn't buying hours. They are buying coverage.",
        points: [
          {
            title: "Adherence is reported, not evidenced.",
            body: "A schedule says twelve agents were rostered. It doesn't show that twelve seats were worked, which is the thing the SLA is actually written about.",
          },
          {
            title: "Status updates cost more than they tell you.",
            body: "Asking supervisors to confirm coverage produces a number at the end of the shift, from the people whose shift it was, in a spreadsheet nobody can audit.",
          },
          {
            title: "Past forty agents, the exceptions are the job.",
            body: "The floor is mostly fine. What takes the day is the four devices that stopped reporting and the two seats that went idle at three in the morning.",
          },
        ],
      },
      pillars: [
        {
          ref: "activity",
          label: "Coverage",
          heading: "Coverage you can show, per agent and per shift.",
          body: "The desktop agent records screenshots, activity levels and idle time in the background, keeps working offline, and grades its own coverage. Admin analytics raise the exceptions - thin quality, silent devices, missing capture - instead of leaving them to be found at month end.",
          caps: capsOf("activity", [
            "Desktop agent for Windows, macOS and Linux",
            "Keyboard and mouse activity in 60-second windows",
            "Idle detection with prompt and countdown",
            "Capture restricted to an active-hours window",
            "Offline-first - events queue and sync on reconnect",
            "Device registry with remote revocation",
            "Evidence quality score, 0–100 per person",
            "Admin analytics - coverage, quality, devices, alerts",
            "Screenshot review with a timezone selector",
          ]),
          mock: {
            kind: "score",
            label: "Evidence quality",
            score: 88,
            grade: "STRONG",
            coverage: [
  { label: "Screenshots", value: "1,204 captured" },
  { label: "Activity windows", value: "19,880 of 20,160" },
  { label: "Idle prompts", value: "31 · all answered" },
  { label: "Devices reporting", value: "41 of 42" },
],
foot: "Night shift · 42 agents · admin analytics",
          },
        },
        {
          ref: "time",
          label: "Attendance",
          heading: "Presence and expected hours, per person.",
          body: "Attendance and presence sit next to the timer, expected hours are configurable per person, and the export is payroll-ready. A shift that started late is a fact on the record rather than a supervisor's recollection.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Attendance and presence",
            "Configurable expected hours per person",
            "Automatic pause past the idle threshold",
            "Payroll-ready CSV export",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Ridgeline account · Tier 1", task: "Inbound queue", elapsed: "4:12:55" },
            entries: [
              { task: "Seat 14 · Inbound queue", duration: "7:58:20" },
              { task: "Seat 15 · Inbound queue", duration: "8:02:10" },
              { task: "Seat 16 · Escalations", duration: "7:44:05" },
            ],
            foot: "Night shift · 23:00 to 07:00",
          },
        },
        {
          ref: "clients",
          label: "The account",
          heading: "Every account, with the work filed under it.",
          body: "Client accounts, projects and teams, with the hours and the activity filed against them. Assignment is per project, so a report per account is a view of the record rather than an export somebody assembles.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Team assignment per project",
            "Tasks - open / in progress / done / archived",
            "Daily updates with status, blockers and KPIs",
          ]),
          mock: {
            kind: "record",
            title: "Ridgeline · Tier 1 support",
            chip: "In progress",
            meter: { label: "Contracted", value: "336 h", percent: 92, read: "309 h staffed" },
            foot: "42 agents · night shift",
            tags: ["SLA", "inbound"],
          },
        },
        {
          ref: "knowledge",
          label: "The floor",
          heading: "Procedures the floor can actually find.",
          body: "Scripts, escalation paths and account procedures live in the workspace and are indexed as they are written. New agents search instead of asking, and the assistant answers with the page it came from.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Page reordering, templates and duplication",
            "Company files in folders - PDF, Word, text",
            "Full-text search across everything",
            "AI assistant over semantic search, cited",
          ]),
          mock: {
            kind: "source",
            question: "what is the escalation path for a Ridgeline billing dispute?",
            answer: "Tier 1 collects the account number and the disputed period, then escalates to the Ridgeline duty lead within 15 minutes.",
            sources: ["doc · Ridgeline runbook", "doc · Escalation matrix"],
          },
        },
      ],
      scenario: {
        eyebrow: "Night shift",
        heading: "How a shift closes.",
        lines: [
          [
            fig("42"),
            " seats rostered from ",
            fig("23:00"),
            ". By ",
            fig("02:00"),
            " the board shows ",
            fig("41"),
            " reporting: one device stopped syncing at ",
            fig("01:12"),
            " and queued its events locally.",
          ],
          [
            "It reconnects at 02:40 and its events reconcile without double counting, so the shift total doesn't need a correction and nobody files an exception for it.",
          ],
          [
            "The account report goes out at ",
            fig("07:00"),
            " with attendance, activity and evidence quality per agent - and not one supervisor was asked for a status update.",
          ],
        ],
        mock: {
          kind: "score",
          label: "Evidence quality",
          score: 88,
          grade: "STRONG",
          coverage: [
  { label: "Screenshots", value: "1,204 captured" },
  { label: "Activity windows", value: "19,880 of 20,160" },
  { label: "Idle prompts", value: "31 · all answered" },
  { label: "Devices reporting", value: "41 of 42" },
],
foot: "41 of 42 devices reporting · 02:00",
        },
      },
      objection: {
        eyebrow: "Scale",
        heading: "Hundreds of agents is a different problem from ten.",
        body: "At this size the work is exceptions, not totals. The agent is offline-first: events queue locally and reconcile on reconnect without double counting. Devices are registered and revocable at any time, admin analytics raise coverage, quality and device alerts, and screenshot review carries a timezone selector for shifts that cross midnight.",
        argument:
          "That changes what a supervisor does with a shift. A silent device or a seat that went idle surfaces as an alert during the night, instead of as a discrepancy in the report a client reads at the end of the month.",
        guarantees: [
          "Events queue locally and reconcile without double counting",
          "Devices are registered and revocable at any time",
          "Admin analytics raise coverage, quality and device alerts",
          "Screenshot review carries a timezone selector for shifts that cross midnight",
        ],
      },
      related: ["consulting-firms", "staffing-agencies", "digital-agencies"],
      cta: { title: "Start with one team, not the whole floor.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for BPO teams - coverage you can show a client",
        description:
          "Attendance, activity and evidence quality per agent and per shift, with an offline-first agent and device alerts. Coverage reporting for outsourced teams at floor scale.",
      },
    },
  },

  /* ══ Construction — périmètre resserré : le bureau et le contrôle documentaire.
       AUCUNE revendication d'heures de chantier : l'objection l'énonce elle-même. ══ */
  construction: {
    en: {
      h1: "The office side of the job, on the project it belongs to.",
      lede: "Drawings, RFIs, meeting notes, subcontractor contacts and the coordination hours your project administrators spend chasing them all sit on the same project record. This is built for the office and the trailer - not for a phone on a scaffold.",
      hero: {
        kind: "source",
        question: "which revision did the electrical sub build to?",
        answer: "Revision C, issued March 14. Walked through on the March 21 coordination call, which is transcribed on the project.",
        sources: ["doc · E-201 rev C", "call · Mar 21"],
      },
      problem: {
        heading: "The build is on site. The disputes are on paper.",
        points: [
          {
            title: "Two crews are working from different revisions.",
            body: "A drawing goes out, a change is issued, and somewhere on the job a subcontractor is still building to the version they were handed first.",
          },
          {
            title: "The answer exists, but not where anyone will look for it.",
            body: "It is in a meeting recording, an email attachment or a photo on someone's phone. None of those is the project record, and none of them is searchable in October.",
          },
          {
            title: "The office hours are the invisible cost.",
            body: "Submittals, RFIs, coordination calls and chasing subcontractors take real time from real people - and none of it is attached to the job that caused it.",
          },
        ],
      },
      pillars: [
        {
          ref: "knowledge",
          label: "Document control",
          heading: "One version, on the project, searchable.",
          body: "Drawings, specs, submittals and meeting notes live inside the project, and recorded coordination calls are transcribed as they happen. Search covers what was said in the call as well as what was written in the RFI.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Page reordering, templates and duplication",
            "Images, file attachments and audio recordings",
            "Company files in folders - PDF, Word, text",
            "Automatic video transcription, indexed",
            "Full-text search across everything",
            "AI assistant over semantic search, cited",
          ]),
          mock: {
            kind: "source",
            question: "which revision did the electrical sub build to?",
            answer: "Revision C, issued March 14. Walked through on the March 21 coordination call, which is transcribed on the project.",
            sources: ["doc · E-201 rev C", "call · Mar 21"],
          },
        },
        {
          ref: "clients",
          label: "The project",
          heading: "Subcontractors, stages and the history of every change.",
          body: "Each job is a project record with its own stages, contacts and tasks, and every stage change is kept. Repeat builds start from a clone rather than from a blank page.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Kanban board across all projects",
            "Tasks - open / in progress / done / archived",
            "Reminders with due dates, in-app and email",
            "Custom modules and fields - 12 field types",
            "Project cloning",
          ]),
          mock: {
            kind: "record",
            title: "Fairview · Phase 2 fit-out",
            chip: "In progress",
            people: true,
            foot: "14 open RFIs · 3 submittals due",
            tags: ["fit-out", "phase 2"],
          },
        },
        {
          ref: "time",
          label: "Office hours",
          heading: "The coordination time, on the job that caused it.",
          body: "The hours your project administrators, estimators and coordinators spend run against the job rather than disappearing into overhead. Timesheets stay editable and export payroll-ready.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a task in a client project",
            "Timesheets and entry history, editable",
            "Attendance and presence",
            "Payroll-ready CSV export",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Fairview · Phase 2", task: "RFI 041 - electrical", elapsed: "0:38:44" },
            entries: [
              { task: "Fairview · Submittal review", duration: "1:52:10" },
              { task: "Fairview · Coordination call", duration: "0:45:00" },
              { task: "Brookline · Estimating", duration: "2:20:35" },
            ],
            foot: "Office timesheet · March 22",
          },
        },
      ],
      scenario: {
        eyebrow: "Revision C",
        heading: "How a claim ends before it starts.",
        lines: [
          [
            "The electrical sub invoices ",
            fig("$18,400"),
            " of rework on the second floor, citing a drawing issued in February.",
          ],
          [
            "The project holds revision C, issued ",
            fig("March 14"),
            ", and the ",
            fig("March 21"),
            " coordination call where the change was walked through, transcribed. Both are on the project record rather than in somebody's inbox.",
          ],
          [
            "The conversation takes one call instead of a claim - and the ",
            fig("12 h"),
            " your administrator spent chasing that submittal are on the job too.",
          ],
        ],
        mock: {
          kind: "source",
          question: "when was revision C issued and who confirmed it?",
          answer: "Issued March 14 and confirmed by the electrical sub on the March 21 coordination call.",
          sources: ["doc · E-201 rev C", "call · Mar 21"],
        },
      },
      objection: {
        eyebrow: "The site",
        heading: "Your crews are not sitting at a computer.",
        body: "They aren't, so this is not a site-hours product and it would be wrong to sell it as one. The timer runs in a browser and the activity agent installs on Windows, macOS and Linux - the office, the trailer and the estimating desk. Site labour hours belong wherever your crews already record them.",
        argument:
          "What it does carry is the half of a construction business that runs on paper: revisions, RFIs, submittals, subcontractor contacts and the coordination time nobody bills. That is where the disputes are decided, and it is the half that has to still make sense a year after handover.",
        guarantees: [
          "The web timer runs in a browser, on the office and trailer machines you control",
          "Drawings, submittals and recordings attach to the project, not to an inbox",
          "Full-text search covers transcribed coordination calls as well as documents",
          "Every stage change on a project is kept, with its history",
        ],
      },
      related: ["consulting-firms", "legal-services", "staffing-agencies"],
      cta: { title: "Start with one job and its drawings.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for construction - document control and project admin",
        description:
          "Drawings, RFIs, submittals and transcribed coordination calls on the project record, with the office hours that chase them. Built for the office, not for site labour tracking.",
      },
    },
  },

  /* ══ Staffing — périmètre resserré : le desk de l'agence, pas le contractuel
       placé chez le client. L'objection le dit en toutes lettres. ══ */
  "staffing-agencies": {
    en: {
      h1: "The margin on a placement is decided at your desk, not at the client's.",
      lede: "Mandates, client contacts, recruiter hours and the documents behind every placement sit on one record, so what a role costs to fill is visible while you are still filling it. Contractors you place work on the client's hardware, and this doesn't reach there.",
      hero: {
        kind: "record",
        title: "Ridgeway Logistics · 3 roles",
        chip: "In progress",
        meter: { label: "Budgeted", value: "60 h", percent: 44, read: "26 h to date" },
        foot: "Two roles filled · one re-opened",
        tags: ["contract", "warehouse"],
      },
      problem: {
        heading: "Filling the role is the cost. The fee is the easy part.",
        points: [
          {
            title: "Sourcing time never lands on the mandate.",
            body: "Screening calls, rescheduled interviews, a candidate who withdraws on the Friday. It is the majority of the work and it sits on nobody's record.",
          },
          {
            title: "Every mandate looks profitable until the third re-open.",
            body: "The fee is fixed when the role is signed. The hours are not, and by the fourth shortlist nobody is counting them any more.",
          },
          {
            title: "The paperwork outlives the placement.",
            body: "Contracts, compliance checks, the note about why a candidate was rejected. Scattered across inboxes by the time a client asks about it a year later.",
          },
        ],
      },
      pillars: [
        {
          ref: "clients",
          label: "The mandate",
          heading: "Every role, with the hours it actually took.",
          body: "Client accounts, mandates, stages and budgeted hours on one record. Twelve custom field types mean a permanent search and a contract placement don't have to be forced into the same shape.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Kanban board across all projects",
            "Budgeted vs actual hours, live",
            "Tasks - open / in progress / done / archived",
            "Reminders with due dates, in-app and email",
            "Custom modules and fields - 12 field types",
          ]),
          mock: {
            kind: "record",
            title: "Ridgeway Logistics · 3 roles",
            chip: "In progress",
            people: true,
            meter: { label: "Budgeted", value: "60 h", percent: 44, read: "26 h to date" },
            tags: ["contract", "warehouse"],
          },
        },
        {
          ref: "time",
          label: "The desk",
          heading: "Recruiter hours, on the mandate that caused them.",
          body: "The timer runs against a task inside the mandate, so sourcing, screening and rescheduling stop being invisible. What a placement costs to make is a number on the record rather than a feeling at the end of the quarter.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a task in a client project",
            "Timesheets and entry history, editable",
            "Attendance and presence",
            "Payroll-ready CSV export",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Ridgeway · Role 3", task: "Screening calls", elapsed: "0:51:26" },
            entries: [
              { task: "Ridgeway · Shortlist review", duration: "1:14:00" },
              { task: "Ridgeway · Client debrief", duration: "0:32:40" },
              { task: "Ardent · New mandate intake", duration: "0:58:15" },
            ],
            foot: "Desk timesheet · week 12",
          },
        },
        {
          ref: "knowledge",
          label: "The file",
          heading: "The placement file, a year later.",
          body: "Contracts, compliance documents, mandate specs and interview notes live on the record and are indexed as they arrive. When a client asks why a rate moved, the answer comes back with the document it came from.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Images, file attachments and audio recordings",
            "Company files in folders - PDF, Word, text",
            "Full-text search across everything",
            "AI assistant over semantic search, cited",
          ]),
          mock: {
            kind: "source",
            question: "why did the rate on Ridgeway role 3 move?",
            answer: "The spec was revised on April 8 to add a forklift certification. Agreed on the call the same day and reflected in the amended mandate.",
            sources: ["doc · Mandate 0412 rev B", "call · Apr 8"],
          },
        },
      ],
      scenario: {
        eyebrow: "Mandate 0412",
        heading: "How a fixed fee keeps its margin.",
        lines: [
          [
            "Ridgeway signs ",
            fig("3"),
            " warehouse roles at a fixed fee. Two fill inside a fortnight; the third re-opens twice.",
          ],
          [
            "The mandate carries ",
            fig("60"),
            " budgeted hours and reads ",
            fig("44%"),
            " at the halfway mark - so the third role gets a conversation about the spec rather than another shortlist.",
          ],
          [
            "When the client asks in October why the rate moved, the file has the two rejections, the revised spec and the call where it was agreed.",
          ],
        ],
        mock: {
          kind: "record",
          title: "Ridgeway Logistics · 3 roles",
          chip: "In progress",
          meter: { label: "Budgeted", value: "60 h", percent: 44, read: "26 h to date" },
          foot: "Role 3 re-opened twice",
        },
      },
      objection: {
        eyebrow: "Placed staff",
        heading: "Can you monitor the contractors we place?",
        body: "Usually not, and implying otherwise would be dishonest. The desktop agent installs on computers your organisation controls - your recruiters' machines. A contractor placed at a client site works on the client's hardware, under the client's IT policy, and installing a monitoring agent there is frequently neither permitted nor yours to authorise.",
        argument:
          "What this does cover is your own desk: the hours a mandate costs to fill, the client record it is filled against, and the file that has to outlive the placement. That is where a staffing margin is won or lost, and it is the part you actually control.",
        guarantees: [
          "The desktop agent installs only on machines your organisation controls",
          "The web timer runs in a browser, on your recruiters' hours",
          "Devices are registered and revocable at any time",
          "Anyone can open and review their own recorded data",
        ],
      },
      related: ["digital-agencies", "bpo-call-centers", "consulting-firms"],
      cta: { title: "Start with the mandate that is open now.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for staffing agencies - what a placement costs",
        description:
          "Mandates, client accounts, recruiter hours and placement files on one record, so the cost of filling a role is visible while you are filling it.",
      },
    },
  },
};

/* ─────────────────── Les six cas d'usage, axe de l'index ──────────────────── */

/**
 * L'axe qui justifie l'existence de `/solutions` face à l'index secteurs de
 * l'accueil : le même visiteur, rangé par PROBLÈME plutôt que par métier.
 *
 * **Tableau ORDONNÉ, source de l'ordre** — le méga-menu et l'index le suivent.
 * Le contenu de page vit à côté, dans `CONTENT_USE_CASES`, keyé par `id` : c'est
 * le motif déjà en place pour les secteurs (`SECTORS` ordonné → `CONTENT` keyé →
 * `SOLUTION_PAGES` dérivé), et c'est lui qui donne gratuitement la garde « un cas
 * d'usage sans page casse le build ».
 *
 * `id` sert de SLUG : les six pages vivent en `/solutions/{id}`, au même niveau
 * que les huit secteurs (décision de la direction du 29 juillet 2026, pour le
 * référencement — elle remplace le préfixe `/solutions/use-cases/…` du 27).
 * Les deux listes partagent donc un espace de noms : voir la garde de collision
 * plus bas, sans laquelle un doublon ferait disparaître une page sans erreur.
 */
export const USE_CASES = [
  {
    id: "remote-teams",
    title: "Remote teams",
    /** L'idée de ce bloc est la moins évidente des six, et la première version
     *  l'enterrait : « rather than letting a quiet week look like an absent one »
     *  demandait au lecteur de déplier une double comparaison pour trouver
     *  l'argument. Il tient en une phrase — un relevé creux est AMBIGU (personne
     *  n'a travaillé, ou rien n'a été capturé), et le score tranche. C'est ce qui
     *  protège la personne d'une mauvaise conclusion, donc ça se dit en clair. */
    body: "You can't see the work, so you read the record: hours, screenshots and daily updates land on the client project as the week happens. And when the record itself is thin, the evidence quality score says so - a gap in the data doesn't get read as a gap in the work.",
    pillar: "activity" as PillarId,
  },
  {
    id: "hybrid-teams",
    title: "Hybrid teams",
    body: "The same timesheet covers the desk and the kitchen table: the agent queues events locally when the connection drops and reconciles them on reconnect, without double counting. Capture stays inside the hours you set, so a laptop still open at 9pm isn't recording.",
    pillar: "time" as PillarId,
  },
  {
    id: "client-billing",
    title: "Client billing",
    body: "Time is logged against a task inside a client project, never a free-text label, so an invoice line traces back to hours, tasks and the documents they produced.",
    pillar: "clients" as PillarId,
  },
  {
    id: "employee-productivity",
    title: "Employee productivity",
    body: "Activity is measured in 60-second windows and idle time is flagged with a prompt, never deduced quietly. A visible indicator shows when the timer is running, and anyone can open the data recorded about them - which is the difference between a measure a team accepts and one it works around.",
    pillar: "activity" as PillarId,
  },
  {
    id: "project-profitability",
    title: "Project profitability",
    body: "Budgeted versus actual hours is a live number on the project record, so a job running hot is visible in week two rather than in a month-end reconstruction.",
    pillar: "clients" as PillarId,
  },
  {
    id: "onboarding-documentation",
    title: "Onboarding documentation",
    body: "A block editor with nested pages and templates, recorded walkthroughs transcribed automatically, and an assistant that answers with the page it came from. New people search instead of asking.",
    pillar: "knowledge" as PillarId,
  },
];

/** Le contenu du méga-menu, dérivé des deux mêmes sources que les pages : les
 *  huit entrées viennent de `SECTORS`, les six de `USE_CASES`. Rien n'est
 *  retapé, donc le menu ne peut pas proposer un secteur qui n'existe plus ni
 *  rater celui qu'on vient d'ajouter.
 *
 *  Copy reprise mot pour mot du brief du menu (§5.3 et §5.6). */
export const SOLUTIONS_MENU: MegaMenu = {
  overview: {
    label: "All solutions",
    blurb: "Find the page written for how your team bills.",
    href: "/solutions",
  },
  columns: [
    {
      heading: "By industry",
      items: SECTORS.map((sector) => ({
        label: sector.name,
        href: sector.href,
        tag: sector.tag,
        icon: sector.icon,
      })),
    },
    {
      // Pas d'`icon` ici, et c'est le point : l'absence d'icônes est ce qui
      // sépare les deux taxonomies à l'oeil (brief du menu §5.5).
      heading: "By use case",
      items: USE_CASES.map((useCase) => ({
        label: useCase.title,
        href: `/solutions/${useCase.id}`,
      })),
    },
  ],
  promo: {
    eyebrow: "Not sure?",
    title: "Start from what the product does.",
    body: "Time, activity, clients and knowledge - the four things DocuFlow replaces, on one page.",
    link: { label: "See the product", href: "/product" },
  },
};

/* ──────────────────────────── Dérivations ────────────────────────────────── */

/** Rythme des bandes des blocs piliers. Deux sections voisines ne partagent
 *  jamais un fond : la section « problème » qui précède est blanche, la bande
 *  `ink` du scénario suit. Quatre valeurs, donc trois OU quatre piliers
 *  fonctionnent sans y revenir — le brief exige les deux comptes.
 *  DÉRIVÉ du rang, jamais écrit par page : c'est ce qui rend le rythme
 *  structurellement juste au lieu de dépendre de huit relectures. */
const BAND_CYCLE = ["bg-paper", "bg-band-mint", "bg-band-warm", "bg-white"];

/** Le ton de l'oeil-de-boeuf est une fonction de la BANDE, pas du pilier — donc
 *  une table unique ici, plutôt qu'un ternaire recopié dans chaque composant.
 *  Toute bande absente de cette table prend `hour`. */
const EYEBROW_TONE: Record<string, "hour" | "live" | "ink"> = {
  "bg-band-mint": "live",
  "bg-white": "ink",
};

/** Slug = dernier segment du `href` de `SECTORS`. Cette source-là fait foi :
 *  l'accueil, le pied de page, le méga-menu et les routes lisent le même
 *  tableau, donc un lien de l'accueil ne peut pas pointer vers une page qui
 *  n'existe pas. */
const slugOf = (href: string) => href.replace(/^\/solutions\//, "");

export interface SolutionPillar {
  ref: PillarId;
  /** `01`, `02`… par rang. */
  index: string;
  label: string;
  heading: string;
  body: string;
  caps: Capability[];
  spec: Spec[];
  mock: Mockup;
  band: string;
  /** Le ton de l'oeil-de-boeuf suit la BANDE, jamais le pilier.
   *   - mint  → `live-on-light` : l'ambre y tombe à 1,83:1 (règle de `product.ts`)
   *   - blanc → `ink` : c'est la surface où l'ambre est au plus bas (1,90:1), et
   *     c'est l'arbitrage déjà rendu sur le héros de `/product`. L'ambre des
   *     oeils-de-boeuf sur bande claire est en attente d'arbitrage (voir
   *     `AGENTS.md`) — l'étendre à une quatrième surface l'aggraverait.
   *   - paper / warm → `hour` : la pratique livrée sur l'accueil et `/product`.
   *     Suivre le site plutôt que faire des pages secteur les dissidentes. */
  eyebrowTone: "hour" | "live" | "ink";
  /** Visuel à gauche un rang sur deux. Dérivé du rang, jamais posé à la main. */
  reverse: boolean;
  /** Ancre du pilier correspondant sur `/product`. */
  href: string;
}

/** Dérive les blocs piliers d'une page — bande, ton d'oeil-de-boeuf, index et
 *  côté du visuel, tous FONCTION DU RANG.
 *
 *  Partagé par les pages secteur et les pages cas d'usage : c'est ce qui fait
 *  que le rythme des bandes reste juste quel que soit le nombre de piliers.
 *
 *    secteur (3-4, offset 0)    : paper · mint · warm [· white]
 *    cas d'usage (2, offset 1)  : mint · warm
 *
 *  ⚠️ L'`offset` n'est pas un réglage esthétique. Les quatre bandes étant
 *  distinctes deux à deux, l'adjacence tient à n'importe quel décalage — mais
 *  « The Band Rule » de `DESIGN.md` veut aussi une progression froid → chaud →
 *  ink sur la longueur de la page, et `bg-band-warm` (Manila) est la bande du
 *  pilier Knowledge. À offset 0 avec seulement deux piliers, une page cas
 *  d'usage n'atteint jamais le warm : `/solutions/onboarding-documentation`,
 *  dont le SUJET est justement la documentation, serait la seule page du site à
 *  ne jamais montrer la bande documentaire. L'offset est une propriété du
 *  SQUELETTE, pas un choix par page — donc la règle « dérivé du rang, jamais
 *  écrit à la main » tient toujours. */
const pillarsOf = (blocks: PillarBlock[], offset = 0): SolutionPillar[] =>
  blocks.map((pillar, i) => {
    const band = BAND_CYCLE[(i + offset) % BAND_CYCLE.length];
    return {
      ref: pillar.ref,
      index: String(i + 1).padStart(2, "0"),
      label: pillar.label,
      heading: pillar.heading,
      body: pillar.body,
      caps: pillar.caps,
      spec: specOf(pillar.ref),
      mock: pillar.mock,
      band,
      eyebrowTone: EYEBROW_TONE[band] ?? "hour",
      reverse: i % 2 === 1,
      href: `/product#${pillar.ref}`,
    };
  });

export interface SolutionPage {
  slug: string;
  /** L'entrée de `SECTORS` : nom, tag, icône, href. Jamais recopiés ici. */
  sector: (typeof SECTORS)[number];
  copy: SectorCopy;
  pillars: SolutionPillar[];
}

/** Une page par entrée de `SECTORS`, dans l'ordre de `SECTORS`. Un secteur sans
 *  contenu casse le build : c'est la garantie qu'aucun lien de l'accueil ni du
 *  pied de page ne peut pointer vers une page absente. */
export const SOLUTION_PAGES: SolutionPage[] = SECTORS.map((sector) => {
  const slug = slugOf(sector.href);
  const entry = CONTENT[slug];
  if (!entry) {
    throw new Error(
      `[solutions] aucun contenu pour "${slug}" (${sector.name}). ` +
        `Tout secteur de SECTORS doit avoir sa page, sinon l'accueil pointe dans le vide.`
    );
  }

  const copy = entry[LOCALE];

  return { slug, sector, copy, pillars: pillarsOf(copy.pillars) };
});

const PAGES_BY_SLUG = new Map(SOLUTION_PAGES.map((page) => [page.slug, page]));

/** Lève plutôt que de rendre une page vide : un slug inconnu dans `related`
 *  serait un lien mort livré en production. */
export const getSolution = (slug: string): SolutionPage => {
  const page = PAGES_BY_SLUG.get(slug);
  if (!page) throw new Error(`[solutions] slug inconnu : ${slug}`);
  return page;
};

/* ─────────────────────── Les pages cas d'usage ───────────────────────────── */

/**
 * Contenu des six pages `/solutions/{use-case}`. Même forme que `CONTENT` —
 * `[slug][locale]` — donc le FR s'ajoutera par une clé, sans restructuration.
 *
 * Se remplit cas d'usage par cas d'usage : une entrée absente ne produit
 * simplement pas de route. La garde qui exige que les SIX existent arrive avec
 * le passage du méga-menu aux URL plates — c'est à ce moment-là qu'un cas
 * d'usage sans page deviendrait un lien mort, pas avant.
 */
const CONTENT_USE_CASES: Record<string, Record<Locale, UseCaseCopy>> = {
  /* ══ Client billing — la LIGNE de facture et sa traçabilité ══
   *
   * ⚠️ Cette page doit se défendre contre trois voisines qui parlent aussi
   * d'argent facturé, et la frontière est nette dans chaque cas :
   *   - `/solutions/consulting-firms` mène par la PREUVE (le score de qualité) ;
   *   - `/solutions/accounting-firms` mène par le COÛT DU CHANGEMENT de dossier ;
   *   - `/solutions/digital-agencies` mène par la CONSOMMATION d'un forfait.
   * Ici le sujet est la ligne elle-même : d'où elle vient et si elle tient quand
   * on la conteste. Aucune des trois ne traite ça, et cette page ne traite
   * aucune des trois. */
  "client-billing": {
    en: {
      eyebrow: "Client billing",
      h1: "Every invoice line should survive one question: “What was this?”",
      lede: "Every billed hour starts on a task inside a client project. When a client questions a line, the hours, tasks and documents behind it are already in one record.",
      hero: {
        kind: "record",
        title: "Halcyon Retail · March",
        chip: "In review",
        meter: { label: "Billed", value: "$18,400", percent: 76, read: "76% of budget" },
        foot: "42 entries · 3 tasks",
        tags: ["invoice", "March"],
      },
      situation: {
        heading: "The line says “campaign production.” The client asks what that means.",
        points: [
          {
            title: "The line is assembled by hand, not generated from the project record.",
            body: "Hours come out of one tool and the work out of another. The evening before the invoice goes out, somebody reconciles both into a line - a summary of a summary.",
          },
          {
            title: "The question arrives after everyone has moved on.",
            body: "Two weeks later, the person who did the work is on the next job. The answer has to be rebuilt from a calendar and memory.",
          },
          {
            title: "A queried line costs more than it is worth.",
            body: "Defending one line consumes an afternoon and strains the relationship even when the amount survives the challenge. Most firms discount it instead.",
          },
        ],
      },
      audienceHeading: "Anyone who sends an invoice a client can argue with.",
      audience: [
        {
          slug: "consulting-firms",
          reason: "An engagement invoice is a whole relationship in one number, and the query lands weeks after the work.",
        },
        {
          slug: "legal-services",
          reason: "A docket entry is billed in six-minute increments and read back a year later, by someone looking for a reason to cut it.",
        },
        {
          slug: "digital-agencies",
          reason: "A fixed retainer hides its line items until scope creep turns them into the conversation.",
        },
      ],
      pillars: [
        {
          ref: "clients",
          label: "The line",
          heading: "Every line traces back to a record.",
          body: "Hours, tasks, notes and documents attach to the client project as work happens. At month end, the invoice becomes a view of that record instead of something rebuilt by one person.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Budgeted vs actual hours, live",
            "Tasks - open / in progress / done / archived",
            "Notes with @mentions that notify",
            "Custom modules and fields - 12 field types",
          ]),
          /* ⚠️ `attach` et non `record` — le héros de cette page rendait DÉJÀ
             cette fiche, au titre, à la puce, à la jauge et aux valeurs
             identiques.
             Ce bloc s'appelle « The line » et son corps nomme quatre natures :
             « hours, tasks, notes and documents ATTACH TO THE CLIENT PROJECT ».
             Aucune n'était montrée. Le total `57 items` est dérivé — c'est ce
             qui rend « one record » vérifiable au lieu d'être une formule, et
             c'est le chiffre que le dessin de la situation contredit avec son
             `0 attached`. */
          mock: {
            kind: "attach",
            title: "Halcyon Retail · March",
            note: "one record",
            rows: [
              { label: "Hours", count: 42, unit: "entries" },
              { label: "Tasks", count: 3, unit: "on the project" },
              { label: "Notes", count: 7, unit: "with mentions" },
              { label: "Documents", count: 5, unit: "produced" },
            ],
            foot: "the invoice is a view of this",
          },
        },
        {
          ref: "time",
          label: "The hours",
          heading: "Hours that were never free text.",
          body: "The timer runs against a task inside a client project, so every hour already knows what it was for. Entries remain editable with their history, and exports can be shaped for the fee note.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a task in a client project",
            "Multi-tab safe - one tab leads, no double counting",
            "Timesheets and entry history, editable",
            "Payroll-ready CSV export",
          ]),
          mock: {
            kind: "timer",
            running: {
              project: "Halcyon Retail · Spring campaign",
              task: "Landing page build",
              elapsed: "1:12:40",
            },
            entries: [
              { task: "Halcyon · Copy review", duration: "0:38:15" },
              { task: "Halcyon · Client call", duration: "0:26:00" },
            ],
            foot: "Timesheet · March 14 · editable",
          },
        },
      ],
      scenario: {
        eyebrow: "The query",
        heading: "How a contested invoice query closes.",
        lines: [
          [
            "Halcyon queries one line on the March invoice: ",
            fig("$4,200"),
            ", described as “campaign production”.",
          ],
          [
            "The project record already holds the work behind it - ",
            fig("14 h"),
            " on the landing page build, ",
            fig("6.5 h"),
            " on copy review, ",
            fig("3 h"),
            " on calls - each entry against a task, each task on the project.",
          ],
          [
            "The reply goes out in one message the same morning. Nothing is reconstructed, and nothing is discounted to make the conversation stop.",
          ],
        ],
        mock: {
          kind: "query",
          client: "Halcyon Retail · March",
          invoice: "Campaign production",
          amount: "$4,200",
          tasks: [
            { name: "Landing page build", hours: "14 h" },
            { name: "Copy review", hours: "6.5 h" },
            { name: "Client calls", hours: "3 h" },
          ],
          foot: "3 tasks · 23.5 h · 42 entries",
        },
      },
      objection: {
        eyebrow: "Trust",
        heading: "Itemising everything invites the client to audit everything.",
        body: "You decide what leaves the building. The record exists so a question has an answer, not so every invoice ships with a dossier. Entries and timesheets remain editable with their history, and exports are yours to shape. When screenshots are used, they can be blurred so the hours are supported without exposing the client's material.",
        argument:
          "A line you can defend in one message is worth more than one that goes unquestioned only because it is opaque. The aim is not to send more detail - it is to avoid rebuilding the record when detail is requested.",
        guarantees: [
          "Time is logged against a task in a client project, never a free-text label",
          "Timesheets and entry history stay editable",
          "Screenshots can be blurred so content is never legible",
          "Exports are yours to shape",
        ],
      },
      cta: { title: "Start with the invoice you send next.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for client billing - invoice lines that trace",
        description:
          "Every billed hour starts on a task inside a client project, so a queried invoice line traces back to the work behind it.",
      },
    },
  },

  /* ══ Remote teams — l'AMBIGUÏTÉ d'un relevé creux ══
   * Frontière : `/solutions/bpo-call-centers` prouve la COUVERTURE d'un plateau
   * à un client ; ici il s'agit d'une seule personne dont on ne sait pas
   * distinguer la semaine calme de la semaine absente. */
  "remote-teams": {
    en: {
      eyebrow: "Remote teams",
      h1: "You cannot see the work. You can read the record.",
      lede: "Hours, activity and daily updates land on the client project as the week happens. When the record is thin, its evidence quality score says so - before a gap in the data is mistaken for a gap in the work.",
      /* ⚠️ `week` et non `score`. Le H1 promet quelque chose à LIRE — « You
         cannot see the work. You can read the record. » — et `ScoreMock` posait
         le chiffre au-dessus de vingt-quatre fenêtres anonymes et de huit
         vignettes identiques : une texture, pas un relevé de journées. Rien
         là-dedans ne se compte ni ne se reconnaît.
         Ici les cinq journées sont nommées et chacune porte ses heures, son
         activité et ses captures. Le total `38 h` est DÉRIVÉ des journées et
         tombe sur le chiffre du scénario (« 11 h against 38 h the week
         before ») : c'est la même semaine, vue entière avant d'être vue
         cassée. */
      hero: {
        kind: "week",
        label: "Evidence quality",
        score: 84,
        grade: "STRONG",
        days: [
          { day: "MON", hours: "7:40", activity: 78, shots: 3 },
          { day: "TUE", hours: "8:10", activity: 86, shots: 3 },
          { day: "WED", hours: "6:55", activity: 64, shots: 2 },
          { day: "THU", hours: "8:25", activity: 91, shots: 3 },
          { day: "FRI", hours: "6:50", activity: 61, shots: 2 },
        ],
        foot: "Week 31 · remote · one person",
      },
      situation: {
        heading: "A quiet week and an absent week look identical.",
        points: [
          {
            title: "Presence became the stand-in for progress.",
            body: "A green dot shows presence, not progress. It cannot answer a client asking what moved.",
          },
          {
            title: "The status meeting is the reporting layer.",
            body: "Work stops so that everyone can describe work, and the output is a recollection - delivered by the person being asked about.",
          },
          {
            title: "A thin record reads as a thin week.",
            body: "When little was captured, nothing separates someone who was heads-down from someone whose agent stopped reporting on Tuesday. The record is silent in the same way for both.",
          },
        ],
      },
      audienceHeading: "Teams whose work is invisible until somebody asks.",
      audience: [
        {
          slug: "software-teams",
          reason: "Async by default, and there is no desk to walk past on the way to the kitchen.",
        },
        {
          slug: "consulting-firms",
          reason: "Billable weeks happen on the client's premises, where nobody from your side is watching.",
        },
        {
          slug: "bpo-call-centers",
          reason: "Coverage is contractual, so a silent seat is a question from the client rather than an internal one.",
        },
      ],
      pillars: [
        {
          ref: "activity",
          label: "The record",
          heading: "The record grades its own completeness.",
          body: "The desktop agent records screenshots, activity levels and idle time, then scores the record's coverage from 0 to 100. A thin week announces itself instead of looking like a bad week.",
          caps: capsOf("activity", [
            "Evidence quality score, 0–100 per person",
            "Desktop agent for Windows, macOS and Linux",
            "Keyboard and mouse activity in 60-second windows",
            "Offline-first - events queue and sync on reconnect",
            "Admin analytics - coverage, quality, devices, alerts",
            "Device registry with remote revocation",
          ]),
          /* ⚠️ `device` et non `score` — le héros de cette page porte DÉJÀ la
             carte de score, aux mêmes valeurs. Les deux se suivaient à un écran
             d'écart, ce qui ne se voyait pas tant qu'elles étaient blanches et
             plates, et saute aux yeux depuis qu'elles sont deux feuilles
             chaudes jumelles.
             Le héros garde le chiffre qu'on LIT — c'est la promesse du H1. Ce
             bloc-ci montre la MACHINE, ce que son corps décrit mot pour mot, et
             c'est ce poste que le scénario fait taire plus bas.
             Toutes les valeurs viennent de `product.ts` (pilier `activity`) :
             3 plateformes, captures 3–15 min, fenêtres de 60 s, file hors
             ligne, registre révocable. Rien d'inventé sauf l'identifiant de
             parc, qui est une étiquette de maquette comme « Atlas · Sprint 14 ». */
          mock: {
            kind: "device",
            label: "Device registry",
            name: "WS-2291",
            platform: "macOS · reporting since Monday",
            status: "Live",
            platforms: [{ short: "WIN" }, { short: "MAC", active: true }, { short: "LNX" }],
            rows: [
              { label: "Screenshots", value: "randomised · 3–15 min" },
              { label: "Activity", value: "60-second windows" },
              { label: "Offline queue", value: "0 events" },
            ],
            foot: "Revocable from admin · one device, one person",
          },
        },
        {
          ref: "time",
          label: "The week",
          heading: "Hours that arrive without being asked for.",
          body: "The timer runs against a task inside a client project, so the week assembles itself as it happens. Daily updates carry status and blockers, which is the part a status meeting was there to collect.",
          caps: capsOf("time", [
            "Time logged against a task in a client project",
            "Multi-tab safe - one tab leads, no double counting",
            "Automatic pause past the idle threshold",
            "Timesheets and entry history, editable",
            "Attendance and presence",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Atlas · Sprint 14", task: "DF-482 Auth refactor", elapsed: "2:14:38" },
            entries: [
              { task: "Atlas · Standup", duration: "0:12:00" },
              { task: "Atlas · Code review", duration: "1:04:22" },
            ],
            foot: "Timesheet · Tuesday · editable",
          },
        },
      ],
      scenario: {
        eyebrow: "Tuesday",
        heading: "How a thin week explains itself.",
        lines: [
          [
            "One person's week reads ",
            fig("11 h"),
            " against ",
            fig("38 h"),
            " the week before. On a dashboard that is a conversation nobody wants to have.",
          ],
          [
            "The evidence quality score for the week reads ",
            fig("38/100"),
            " - weak. The agent stopped reporting on Tuesday and queued four days of events it never sent, so the record is incomplete rather than evidence that little was done.",
          ],
          [
            "The device shows in admin analytics with an alert against it. The conversation is with IT, not with the person.",
          ],
        ],
        /* `silence` et non `score` : le paragraphe nomme un JOUR, un ARRÊT et
           des événements RETENUS. Une carte de score ne porte aucun des trois —
           elle dessinerait une semaine dense sous une note « WEAK », donc un
           visuel qui contredit sa propre légende.
           `cut: 34` sur cinq jours tombe dans le deuxième, mardi : la coupure
           est à l'endroit que la phrase nomme, et le nombre de jours retenus
           s'en déduit (4) au lieu d'être retapé. */
        mock: {
          kind: "silence",
          label: "Evidence quality",
          score: 38,
          grade: "WEAK",
          days: ["MON", "TUE", "WED", "THU", "FRI"],
          cut: 34,
          lastEvent: "Last event · Tue 14:38",
          foot: "Week 32 · device silent since Tuesday",
        },
      },
      objection: {
        eyebrow: "Surveillance",
        heading: "Remote monitoring is where trust goes to die.",
        body: "Monitoring has to be visible or it is not worth having. A running indicator, active-hours window, blurred screenshots and self-review make the record inspectable by the person it describes. The desktop agent is separate from the browser timer, so a team can run time and projects with no capture at all.",
        argument:
          "The score protects the person because it grades the record, never the human. A week that looks empty is checked against the device before anyone attributes the gap to the individual.",
        guarantees: [
          "A visible indicator shows exactly when the timer is running",
          "Capture is restricted to an active-hours window",
          "Anyone can open and review their own recorded data",
          "The web timer runs in a browser - the desktop agent is a separate install",
        ],
      },
      cta: { title: "Start with one remote week.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for remote teams - read the record, not the dot",
        description:
          "Hours, activity and daily updates land on the client project as the week happens, and an evidence quality score says when the record itself is thin.",
      },
    },
  },

  /* ══ Hybrid teams — UN relevé pour DEUX lieux ══
   * Frontière : remote-teams parle d'un relevé creux ; ici le relevé est complet
   * mais éclaté entre le bureau et la maison, et la question est de le
   * recoller sans compter deux fois. */
  "hybrid-teams": {
    en: {
      eyebrow: "Hybrid teams",
      h1: "The desk and the kitchen table on one timesheet.",
      lede: "One timesheet follows the week from office to home. Offline events reconcile once the connection returns, and active hours stop capture when the working day ends.",
      /* ⚠️ `week` et non `timer`. Cette page rendait TROIS chronomètres
         identiques — héros, pilier 01, scénario — aux mêmes valeurs, ce qui
         disait au lecteur qu'il avait déjà vu la page.
         Le héros porte la promesse du H1, « one timesheet », donc il montre la
         SEMAINE ENTIÈRE : c'est la seule surface d'où l'on voit qu'une feuille
         couvre deux endroits. Le pilier 01 garde le chronomètre — c'est LA
         feuille de temps, en cours.
         Les lieux passent par `tag`, et le total `37 h` est dérivé des cinq
         journées : sur une page dont la situation dit « a timesheet that has to
         add up », le total ne peut pas être une décoration. */
      hero: {
        kind: "week",
        label: "Evidence quality",
        score: 79,
        grade: "STRONG",
        days: [
          { day: "MON", hours: "7:30", activity: 74, shots: 2, tag: "OFFICE" },
          { day: "TUE", hours: "8:05", activity: 83, shots: 3, tag: "OFFICE" },
          { day: "WED", hours: "6:45", activity: 66, shots: 2, tag: "HOME" },
          { day: "THU", hours: "7:50", activity: 88, shots: 3, tag: "HOME" },
          { day: "FRI", hours: "6:50", activity: 62, shots: 2, tag: "HOME" },
        ],
        foot: "Week 14 · one timesheet, two places",
      },
      situation: {
        heading: "Two places, one week, and a timesheet that has to add up.",
        points: [
          {
            title: "The week is split across places that don't talk.",
            body: "Two days in the office, three at home, and the hours arrive from whichever tool happened to be open. Reconciling them is somebody's Friday.",
          },
          {
            title: "The connection is the weakest part of the record.",
            body: "A dropped connection at home either loses the block or duplicates it on reconnect, and neither is discovered until the timesheet looks wrong.",
          },
          {
            title: "Nobody agrees where the working day ends.",
            body: "A laptop open at nine in the evening is not a working hour, but a tool that records whenever it is running cannot tell the difference.",
          },
        ],
      },
      audienceHeading: "Teams that stopped choosing between office and home.",
      audience: [
        {
          slug: "digital-agencies",
          reason: "Creative work moved home and client calls stayed in the office, so a single week now spans both.",
        },
        {
          slug: "accounting-firms",
          reason: "Busy season runs from wherever the files are, and the hours still have to land on the right engagement.",
        },
        {
          slug: "software-teams",
          reason: "Two office days a week is the norm, and the sprint has to read the same from either place.",
        },
      ],
      pillars: [
        {
          ref: "time",
          label: "The timesheet",
          heading: "One timesheet, wherever the day happened.",
          body: "The timer runs against a task inside a client project, not a location. Entries remain editable with their history, expected hours are configurable per person, and the same export carries work from either desk.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a task in a client project",
            "Multi-tab safe - one tab leads, no double counting",
            "Timesheets and entry history, editable",
            "Attendance and presence",
            "Configurable expected hours per person",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Meridian · Operating model", task: "Board pack revisions", elapsed: "1:32:07" },
            entries: [
              { task: "Office · Workshop prep", duration: "2:10:00" },
              { task: "Home · Stakeholder calls", duration: "1:45:30" },
            ],
            foot: "Timesheet · Thursday · two locations",
          },
        },
        {
          ref: "activity",
          label: "The agent",
          heading: "Offline is a state, not a hole.",
          body: "Events queue locally when the connection drops and reconcile on reconnect without double counting. Capture is restricted to an active-hours window, so the boundary of the working day is a setting rather than an argument.",
          caps: capsOf("activity", [
            "Offline-first - events queue and sync on reconnect",
            "Capture restricted to an active-hours window",
            "Desktop agent for Windows, macOS and Linux",
            "Idle detection with prompt and countdown",
            "Device registry with remote revocation",
          ]),
          /* Ce bloc s'appelle « The agent » et son corps décrit l'AGENT — file
             locale, reconnexion, fenêtre d'heures actives, révocation. Une
             carte de score n'en montre rien : elle note le relevé, pas la
             machine. `device` porte exactement les lignes que le corps
             énumère, et le score reste sur le héros où il note la semaine. */
          mock: {
            kind: "device",
            label: "Device registry",
            name: "MBP-0417",
            platform: "macOS · home network",
            status: "Live",
            platforms: [{ short: "WIN" }, { short: "MAC", active: true }, { short: "LNX" }],
            /* ⚠️ Pas de ligne « Active hours » ici : la fenêtre d'heures
               actives est le SUJET ENTIER du dessin de l'objection
               (`HoursWindowArt`), deux sections plus bas. Un fait, un seul
               endroit — sinon la page l'énonce deux fois et le dessin de
               l'objection ne fait que répéter une ligne déjà lue. */
            rows: [
              { label: "Offline queue", value: "reconciled 14:02" },
              { label: "Capture", value: "randomised · 3–15 min" },
              { label: "Screenshots", value: "blurred by default" },
            ],
            foot: "Revocable from admin · one device, one person",
          },
        },
      ],
      scenario: {
        eyebrow: "Thursday",
        heading: "How one split day reconciles.",
        lines: [
          [
            "Morning in the office, afternoon at home. The home connection drops at ",
            fig("13:40"),
            " and stays down for ",
            fig("22 min"),
            ".",
          ],
          [
            "The agent keeps recording and queues locally. On reconnect at ",
            fig("14:02"),
            " the events reconcile - the block appears once, not twice, and nobody edits a timesheet to make Friday balance.",
          ],
          [
            "At ",
            fig("21:00"),
            " the laptop is open again and nothing is captured, because the active-hours window closed at six.",
          ],
        ],
        /* ⚠️ `reconcile` et non `timer` — c'était le TROISIÈME chronomètre
           identique de la page.
           L'objection du scénario est une addition : « the block appears once,
           not twice ». Un chronomètre ne s'additionne pas ; ces quatre blocs si,
           et leur total (7 h) est dérivé. C'est le total qui prouve à l'oeil
           qu'aucune heure n'a été comptée deux fois.
           Les heures de début S'ENCHAÎNENT sur les durées, et la chaîne tombe
           sur les chiffres du texte : 09:05 + 2:38 = 11:43, + 1:57 = 13:40 (la
           coupure), + 0:22 = 14:02 (la reconnexion). Déplacer une durée casse
           la chaîne visiblement, ce qui est le but. */
        mock: {
          kind: "reconcile",
          label: "Thursday · one timesheet",
          blocks: [
            { at: "09:05", place: "OFFICE", task: "Workshop prep", hours: "2:38" },
            { at: "11:43", place: "OFFICE", task: "Board pack revisions", hours: "1:57" },
            { at: "13:40", place: "HOME", task: "Stakeholder calls", hours: "0:22", offline: true },
            { at: "14:02", place: "HOME", task: "Board pack revisions", hours: "2:03" },
          ],
          reconnected: "14:02",
          foot: "Thursday · queued and reconciled",
        },
      },
      objection: {
        eyebrow: "Boundaries",
        heading: "Working from home should not mean being recorded at home.",
        body: "It does not. Capture stays inside an active-hours window your organisation sets, and nothing is recorded outside it. Screenshots can be blurred, the desktop agent is separate from the browser timer, and registered devices can be revoked at any time.",
        argument:
          "The window turns the end of the working day into a setting everyone can see, not a judgement made afterwards. A laptop open at nine records nothing because the tool keeps the boundary for the team.",
        guarantees: [
          "Capture is restricted to an active-hours window",
          "Screenshots can be blurred so content is never legible",
          "Devices are registered and revocable at any time",
          "Anyone can open and review their own recorded data",
        ],
      },
      cta: { title: "Start with next week - both halves of it.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for hybrid teams - one timesheet, two places",
        description:
          "Events queue offline and reconcile without double counting, and capture stays inside the hours you set. Office days and home days on the same timesheet.",
      },
    },
  },

  /* ══ Employee productivity — la MESURE et son acceptabilité ══
   * Frontière : remote-teams parle de VOIR le travail à distance ; ici la
   * question est de mesurer ouvertement plutôt que de mesurer en douce, sur une
   * équipe qu'on a sous les yeux ou non. */
  "employee-productivity": {
    en: {
      eyebrow: "Employee productivity",
      h1: "Measure openly, or the team will work around the measure.",
      lede: "Activity is measured in 60-second windows and idle time is flagged with a prompt, never deduced quietly. A visible indicator shows when the timer is running, and anyone can open the data recorded about them.",
      /* ⚠️ `windows` et non `score` — le pilier 01 rendait la MÊME carte de
         score, aux mêmes valeurs, un écran plus bas.
         Le score reste au pilier 01, dont le corps dit « an evidence quality
         score rates the completeness of the record ». Le héros prend la
         première phrase du lede, « activity is measured in 60-second
         windows » : soixante carrés font une heure, et le lecteur peut les
         compter. C'est ce qu'une carte de score ne permettait pas.
         Les cinq fenêtres au ralenti tombent sur le ralenti du scénario
         (11:04 → 11:09), et leur compte est dérivé de la grille. */
      hero: {
        kind: "windows",
        label: "Activity · one hour",
        indicator: "Recording",
        cells: [
          72, 85, 64, 91, 78, 58, 88, 70, 95, 66, 82, 74, 60, 89, 77,
          68, 93, 71, 84, 62, 90, 75, 57, 86, null, null, null, null, null, 65,
          88, 76, 59, 92, 70, 83, 61, 87, 74, 96, 63, 80, 69, 90, 72,
          85, 58, 91, 77, 64, 66, 89, 75, 82, 60, 93, 71, 84, 68, 79,
        ],
        foot: "one hour · visible to the person measured",
      },
      situation: {
        heading: "Productivity gets measured by whoever is loudest about it.",
        points: [
          {
            title: "The proxy becomes the target.",
            body: "Whatever gets counted - messages, hours logged, tickets closed - is what the team starts producing. The number goes up and nothing else does.",
          },
          {
            title: "Measurement taken quietly gets discovered loudly.",
            body: "A tool nobody was told about is a tool everybody hears about eventually, and the conversation after that is never about productivity.",
          },
          {
            title: "One bad week and one incomplete record look the same.",
            body: "Without something that grades the record itself, a quiet stretch is indistinguishable from a stretch that simply wasn't captured - and people get judged on the difference.",
          },
        ],
      },
      audienceHeading: "Teams where the measure has to survive being seen.",
      audience: [
        {
          slug: "bpo-call-centers",
          reason: "Adherence is contractual, so measurement is not optional - which makes how it is done the only variable left.",
        },
        {
          slug: "software-teams",
          reason: "Engineering culture treats silent monitoring as a breach, and rightly asks what the number is for.",
        },
        {
          slug: "digital-agencies",
          reason: "Creative teams resent being watched and still need the hours to reach the account that pays for them.",
        },
      ],
      pillars: [
        {
          ref: "activity",
          label: "The measure",
          heading: "Measured in the open, with the record graded for completeness.",
          body: "Activity is measured in 60-second windows, idle time triggers a prompt and countdown, and an evidence quality score rates the completeness of the record - not the person it describes.",
          caps: capsOf("activity", [
            "Keyboard and mouse activity in 60-second windows",
            "Idle detection with prompt and countdown",
            "Evidence quality score, 0–100 per person",
            "Capture restricted to an active-hours window",
            "Screenshots soft-deleted with a recorded reason",
            "Admin analytics - coverage, quality, devices, alerts",
          ]),
          mock: {
            kind: "score",
            label: "Evidence quality",
            score: 88,
            grade: "STRONG",
            coverage: [
  { label: "Screenshots", value: "34 captured" },
  { label: "Activity windows", value: "412 of 420" },
  { label: "Idle prompts", value: "2 · both answered" },
  { label: "Device uptime", value: "7:40:00" },
],
foot: "60-second windows · idle prompted",
          },
        },
        {
          ref: "time",
          label: "The hours",
          heading: "Hours attached to work, not to a chair.",
          body: "The timer runs against a task inside a client project, so an hour says what it was for. Expected hours are configurable per person, and every entry stays editable with its history - which is what makes a correction a correction rather than an accusation.",
          caps: capsOf("time", [
            "Time logged against a task in a client project",
            "Automatic pause past the idle threshold",
            "Timesheets and entry history, editable",
            "Configurable expected hours per person",
            "Attendance and presence",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Ridgeline · Tier 1", task: "Inbound queue", elapsed: "4:12:55" },
            entries: [
              { task: "Idle · prompted at 11:04", duration: "0:06:20" },
              { task: "Ridgeline · Escalations", duration: "1:18:40" },
            ],
            foot: "Timesheet · today · editable",
          },
        },
      ],
      scenario: {
        eyebrow: "11:04",
        heading: "How an idle stretch is handled.",
        lines: [
          [
            "The screen goes quiet for ",
            fig("6 min"),
            ". Past the ",
            fig("3 min"),
            " threshold the agent prompts, with a countdown, rather than deciding on its own.",
          ],
          [
            "The person marks it as a call away from the desk. The entry remains annotated, and its history keeps both the prompt and the explanation.",
          ],
          [
            "Nothing was subtracted quietly, and nothing has to be argued about at review time. The record and the person agree.",
          ],
        ],
        /* ⚠️ `idle` et non `timer` — c'était la même carte que le pilier 02,
           aux mêmes valeurs.
           La section décrit un ENCHAÎNEMENT (« How an idle stretch is
           handled »), et un chronomètre montre un instant : il ne pouvait pas
           montrer ce qui est raconté. Les trois étapes portent leurs heures et
           la durée du ralenti est DÉRIVÉE — 11:04 → 11:10 fait les « 6 min » du
           texte, et le seuil de 3 min tombe visiblement à 11:07.
           L'ancienne valeur `0:06:20` contredisait déjà « 6 min » : c'est
           exactement le genre d'écart qu'un chiffre dérivé rend impossible. */
        mock: {
          kind: "idle",
          label: "Idle · Tuesday",
          steps: [
            { at: "11:04", event: "Input stops" },
            { at: "11:07", event: "Threshold reached", note: "3 min · prompt shown with countdown" },
            { at: "11:10", event: "Marked: call away from desk", note: "annotated, history kept" },
          ],
          outcome: "Prompted, not deduced",
          foot: "3 min threshold · prompt and countdown",
        },
      },
      objection: {
        eyebrow: "Consent",
        heading: "Nobody wants a productivity score on their back.",
        body: "Then do not put one there. The evidence quality score grades the record, not the person: it shows how complete the week's data is and never changes the time counted. A visible indicator, prompted idle time, active-hours window and self-review keep the measure open.",
        argument:
          "A measure the team can inspect is one it stops working around. When people can see what is recorded, when and why, the effort that went into looking busy goes back into the work.",
        guarantees: [
          "A visible indicator shows exactly when the timer is running",
          "Idle detection prompts with a countdown, never a silent deduction",
          "Anyone can open and review their own recorded data",
          "Screenshots are soft-deleted with a recorded reason, never silently erased",
        ],
      },
      cta: { title: "Start by telling the team what it measures.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for employee productivity - measured in the open",
        description:
          "Activity in 60-second windows, idle time prompted rather than deduced, a visible running indicator, and a record anyone can open about themselves.",
      },
    },
  },

  /* ══ Project profitability — la marge CONNUE TROP TARD ══
   * ⚠️ Frontière avec `/solutions/digital-agencies`, la plus fine du lot :
   * l'accueil agence parle du DÉBORDEMENT DE PÉRIMÈTRE d'un forfait, un
   * problème de négociation. Ici il s'agit du DÉLAI DE CONNAISSANCE de la marge,
   * un problème de comptabilité analytique — et il vaut pour un chantier, une
   * mission ou un sprint autant que pour un retainer. */
  "project-profitability": {
    en: {
      eyebrow: "Project profitability",
      h1: "Every job was profitable until somebody added it up.",
      lede: "Budgeted versus actual hours is a live number on the project record, not a figure assembled from exports after the fact. A job running hot is visible in week two, while it can still be changed.",
      hero: {
        kind: "record",
        title: "Fairview · Phase 2 fit-out",
        chip: "In progress",
        meter: { label: "Budgeted", value: "320 h", percent: 78, read: "249 h actual" },
        foot: "Week 2 of 6",
        tags: ["fixed price", "phase 2"],
      },
      situation: {
        heading: "Profit gets calculated after the chance to act has passed.",
        points: [
          {
            title: "Margin is assembled, not observed.",
            body: "Two exports, a spreadsheet and an afternoon of reconciliation produce a figure that is already three weeks old on the day it appears.",
          },
          {
            title: "The jobs that lose money look like the ones that don't.",
            body: "Until the hours are matched against the budget, a project running at 130 percent and one running at 70 look identical on a board - both are simply in progress.",
          },
          {
            title: "By the time the overrun is known, it is a lesson.",
            body: "The overrun becomes something you price differently next time, because on this one there was nothing left to change by the time anybody saw it.",
          },
        ],
      },
      audienceHeading: "Anyone quoting a fixed number for variable work.",
      audience: [
        {
          slug: "construction",
          reason: "A phase is quoted long before it is built, and the office hours spent coordinating it never reach the job's cost.",
        },
        {
          slug: "consulting-firms",
          reason: "A statement of work fixes the fee, and utilisation only reveals what it cost once the engagement has closed.",
        },
        {
          slug: "software-teams",
          reason: "A fixed-bid sprint absorbs every change request silently until the retro puts a number on it.",
        },
      ],
      pillars: [
        {
          ref: "clients",
          label: "The project",
          heading: "Budgeted versus actual, live on the record.",
          body: "Every project carries its budget, stages and tasks. Logged hours move the actual figure as they arrive, while daily updates add status, blockers and KPIs before the month closes.",
          caps: capsOf("clients", [
            "Budgeted vs actual hours, live",
            "Client projects with full stage-change history",
            "Kanban board across all projects",
            "Tasks - open / in progress / done / archived",
            "Daily updates with status, blockers and KPIs",
            "Team assignment per project",
          ]),
          /* ⚠️ `project` et non `record` — le héros de cette page rendait DÉJÀ
             cette fiche, à la jauge et aux valeurs identiques, et le scénario
             une troisième fois.
             Ce bloc s'appelle « The project » et son corps décrit un CONTENANT :
             « every project carries its budget, stages and tasks ». Le héros
             garde la jauge (le budget consommé, qui est sa promesse) ; ici on
             montre la structure qui la porte.
             Les étapes sont celles de `crmProjects`, donc celles du rail de
             l'accueil : deux pages qui décrivent le même objet ne peuvent pas
             le nommer autrement. */
          mock: {
            kind: "project",
            title: "Fairview · Phase 2 fit-out",
            chip: "In progress",
            stages: ["LEAD", "WON", "IN PROGRESS", "IN REVIEW", "COMPLETED"],
            at: 2,
            tasks: [
              { state: "Open", count: 12 },
              { state: "Active", count: 5 },
              { state: "Done", count: 31 },
              { state: "Archived", count: 4 },
            ],
            foot: "week 2 of 6 · 4 assigned",
          },
        },
        {
          ref: "time",
          label: "The hours",
          heading: "Every hour that shapes the margin starts on the project.",
          body: "Time runs against a task inside the project, so the actual side of the comparison is not a reconstruction. Coordination, review and the calls nobody bills land on the job that caused them instead of disappearing into overhead.",
          caps: capsOf("time", [
            "Time logged against a task in a client project",
            "Web timer - start, pause, resume, stop",
            "Timesheets and entry history, editable",
            "Attendance and presence",
            "Payroll-ready CSV export",
          ]),
          mock: {
            kind: "timer",
            running: { project: "Fairview · Phase 2", task: "Submittal review", elapsed: "1:52:10" },
            entries: [
              { task: "Fairview · Coordination call", duration: "0:45:00" },
              { task: "Fairview · RFI 041", duration: "0:38:44" },
            ],
            foot: "Timesheet · week 2 · editable",
          },
        },
      ],
      scenario: {
        eyebrow: "Week 2 of 6",
        heading: "How an overrun gets caught early.",
        lines: [
          [
            "Fairview phase 2 is quoted at ",
            fig("320 h"),
            ". At the end of week two the record reads ",
            fig("249 h"),
            " actual - ",
            fig("78%"),
            " of the budget, a third of the way through.",
          ],
          [
            "The hours are already attributed, so the cause is on the same screen: ",
            fig("62 h"),
            " on submittals and RFIs, against ",
            fig("20 h"),
            " budgeted for coordination across the whole phase.",
          ],
          [
            "That is a variation you raise in week two, with the figures open - not a margin you explain at handover.",
          ],
        ],
        /* ⚠️ `variance` et non `record` — troisième rendu de la même fiche sur
           la page, et surtout : la phrase centrale du scénario est « the hours
           are already attributed, so THE CAUSE IS ON THE SAME SCREEN ». Une
           jauge à 78 % ne montre aucune cause, et le seul chiffre qui la portait
           (`coordination 62 h / 20 h`) était noyé dans le pied.
           Les quatre lignes ci-dessous S'ADDITIONNENT sur les chiffres du
           texte : 20+90+60+150 = 320 h budgétées, 62+71+54+62 = 249 h réelles,
           soit 78 %. Les trois totaux sont dérivés, donc le lecteur peut faire
           l'addition et vérifier — sur une page dont le H1 est « Every job was
           profitable until somebody added it up », c'est le minimum. */
        mock: {
          kind: "variance",
          title: "Fairview · Phase 2",
          period: "Week 2 of 6",
          lines: [
            { label: "Coordination", budget: 20, actual: 62 },
            { label: "Submittals", budget: 90, actual: 71 },
            { label: "Site meetings", budget: 60, actual: 54 },
            { label: "Fit-out", budget: 150, actual: 62 },
          ],
          foot: "logged against tasks on the project",
        },
      },
      objection: {
        eyebrow: "Pressure",
        heading: "Watching margin mid-job turns into watching people.",
        body: "Only if the number is pointed at a person. Budgeted versus actual belongs to the project: it is a property of the job, not a score on anyone who worked it. Roles control who can see cost, and the hours behind it remain editable with their history.",
        argument:
          "Knowing in week two protects the team. An early overrun starts a client conversation about scope; the same overrun found at handover becomes a conversation with the team about why the work took so long.",
        guarantees: [
          "Budgeted vs actual hours sit on the project, not on a person",
          "Admin and member roles, with per-capability visibility",
          "Timesheets and entry history stay editable",
          "Time is logged against a task in a client project, never a free-text label",
        ],
      },
      cta: { title: "Start with the job you are quoting now.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for project profitability - margin in week two",
        description:
          "Budgeted against actual hours live on the project record, so a job running hot is visible while it can still be changed rather than at month end.",
      },
    },
  },

  /* ══ Onboarding documentation — la RÉPONSE INTROUVABLE ══
   * Frontière : `/solutions/construction` traite du contrôle documentaire (la
   * bonne révision) ; ici c'est l'ACCÈS — la réponse existe, la personne neuve
   * ne sait pas où elle est. */
  "onboarding-documentation": {
    en: {
      eyebrow: "Onboarding documentation",
      h1: "The answer already exists. The new person cannot find it.",
      lede: "New people search across written procedures and recorded walkthroughs instead of interrupting the team. Every answer links back to the page or call it came from.",
      hero: {
        kind: "source",
        question: "how do we handle a refund over $500?",
        answer: "Tier 2 approves anything above $500, and the reason goes on the client record. Walked through in the March onboarding session.",
        sources: ["doc · Refunds policy", "call · Onboarding Mar 6"],
      },
      situation: {
        heading: "Onboarding is a queue of interruptions with a person at the front.",
        points: [
          {
            title: "The answer is in somebody's head, and that somebody is busy.",
            body: "The fastest route to any answer is asking the person least able to spare the time, which is why onboarding costs two salaries rather than one.",
          },
          {
            title: "It was written down, in a place nobody searches.",
            body: "A wiki page, a thread, a deck from last year. Each one was the right answer once, and none of them is findable by someone who does not already know the vocabulary.",
          },
          {
            title: "The best explanations were spoken, not typed.",
            body: "The walkthrough that finally made it click happened on a call. Unless somebody transcribed it, it left with the meeting.",
          },
        ],
      },
      audienceHeading: "Teams that onboard often enough to feel it.",
      audience: [
        {
          slug: "bpo-call-centers",
          reason: "Agents join in cohorts and have to be productive on an account's procedures within days, not months.",
        },
        {
          slug: "staffing-agencies",
          reason: "Every placement is somebody's first week somewhere, and the desk explains the same things again each time.",
        },
        {
          slug: "construction",
          reason: "Each phase brings new subcontractors who need the current method and the current revision, not last year's.",
        },
      ],
      pillars: [
        {
          ref: "knowledge",
          label: "The library",
          heading: "Written, recorded, and both searchable.",
          body: "Write procedures in nested pages and templates; record walkthroughs and have them transcribed automatically. Search covers what was said and typed, and the assistant answers with the source it came from.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Page reordering, templates and duplication",
            "Automatic video transcription, indexed",
            "Video embeds - YouTube, Loom, Fathom",
            "Full-text search across everything",
            "AI assistant over semantic search, cited",
            "Re-indexing skips unchanged content",
          ]),
          /* ⚠️ `library` et non `source` — le héros ET le scénario rendaient
             déjà cette réponse citée, à la question, à la réponse et aux sources
             identiques. Trois exemplaires du même dessin sur une page dont le
             sujet est justement qu'on ne retrouve rien.
             Ce bloc s'appelle « The library » et sa phrase distinctive est
             « search covers WHAT WAS SAID AND TYPED » — la seule promesse de la
             page qu'aucune autre surface ne porte. D'où deux natures de contenu
             et un total indexé dérivé. */
          mock: {
            kind: "library",
            label: "The library · one index",
            shelves: [
              { name: "Pages", note: "nested, from templates", count: 48 },
              { name: "Recorded walkthroughs", note: "transcribed on upload", count: 12, spoken: true },
            ],
            foot: "re-indexed as they are edited",
          },
        },
        {
          ref: "clients",
          label: "The context",
          heading: "Procedures where the work is, not beside it.",
          body: "Documentation lives inside the client project it belongs to, so a new person reads the account's rules on the account's record. Notes with @mentions pull in the one person who does know, and the answer stays where the next person will look.",
          caps: capsOf("clients", [
            "Client projects with full stage-change history",
            "Notes with @mentions that notify",
            "Audio notes, transcribed automatically",
            "Reminders with due dates, in-app and email",
            "Team assignment per project",
            "Project cloning",
          ]),
          mock: {
            kind: "record",
            title: "Ridgeline · Tier 1 support",
            chip: "In progress",
            people: true,
            foot: "Runbook · escalation matrix · refunds policy",
            tags: ["onboarding", "SLA"],
          },
        },
      ],
      scenario: {
        eyebrow: "Day 3",
        heading: "How a question stops being an interruption.",
        lines: [
          [
            "A new agent hits a refund of ",
            fig("$740"),
            " on day three. The old route is to ask the team lead, who is on a call.",
          ],
          [
            "The answer returns with two sources: the refunds policy and the ",
            fig("March 6"),
            " onboarding call, transcribed and indexed when it was recorded.",
          ],
          [
            "The question took ",
            fig("20 seconds"),
            " and cost nobody else their morning. The page it came from is the same one the next agent will find.",
          ],
        ],
        /* ⚠️ `route` et non `source` — troisième rendu de la réponse citée sur
           la page, et surtout : l'arc de la section est un CONTRASTE. « The old
           route is to ask the team lead, WHO IS ON A CALL » contre « the
           question took 20 seconds and COST NOBODY ELSE THEIR MORNING ». Une
           carte de réponse ne peut montrer que la route qui aboutit ; elle est
           incapable de montrer celle qu'on évite, qui est la moitié de
           l'argument.
           Tous les chiffres viennent de la copy ci-dessus (`$740`, `20 seconds`,
           `March 6`). La route bloquée ne porte AUCUNE durée : chiffrer le temps
           perdu serait une allégation que le texte n'écrit pas. */
        mock: {
          kind: "route",
          label: "Day 3 · refund of $740",
          routes: [
            {
              name: "The old route",
              steps: ["Ask the team lead", "Team lead is on a call", "Wait, or guess"],
              outcome: "Two people stopped",
              blocked: true,
            },
            {
              name: "The new route",
              steps: ["Search the library", "Answer with 2 sources", "Open either one"],
              outcome: "20 seconds",
            },
          ],
          foot: "same page the next agent will find",
        },
      },
      objection: {
        eyebrow: "Decay",
        heading: "Documentation rots, and stale pages are worse than none.",
        body: "They can be. That is why every answer arrives with its sources attached. You can open the page it came from and judge whether it still holds. Edited pages are re-indexed as they are written, while unchanged content is skipped.",
        argument:
          "Citations make decay visible. An uncited answer sounds equally confident whether its source changed last week or three years ago. That is how a team stops trusting the library and goes back to asking a person.",
        guarantees: [
          "The assistant answers over semantic search, with cited sources",
          "Automatic video transcription, indexed and searchable",
          "Full-text search across everything",
          "Re-indexing skips unchanged content",
        ],
      },
      cta: { title: "Start with the question you answer twice a week.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for onboarding documentation - cited answers",
        description:
          "A block editor with nested pages, walkthroughs transcribed automatically, and an assistant that answers with the page it came from.",
      },
    },
  },
};

export interface UseCasePage {
  slug: string;
  /** L'entrée de `USE_CASES` : titre et teaser de l'index. Jamais recopiés. */
  useCase: (typeof USE_CASES)[number];
  copy: UseCaseCopy;
  pillars: SolutionPillar[];
}

const USE_CASES_BY_ID = new Map(USE_CASES.map((useCase) => [useCase.id, useCase]));

export const USE_CASE_PAGES: UseCasePage[] = Object.entries(CONTENT_USE_CASES).map(
  ([slug, entry]) => {
    const useCase = USE_CASES_BY_ID.get(slug);
    if (!useCase) {
      throw new Error(
        `[solutions] contenu orphelin pour le cas d'usage "${slug}". ` +
          `Toute page doit correspondre à une entrée de USE_CASES, sinon elle n'est ` +
          `atteignable ni par le menu ni par l'index.`
      );
    }

    const copy = entry[LOCALE];

    if (copy.pillars.length !== 2) {
      throw new Error(
        `[solutions] le cas d'usage "${slug}" déclare ${copy.pillars.length} pilier(s). ` +
          `Il en faut DEUX : un seul n'atteint pas la bande warm et rend le rythme de la page ` +
          `incomplet, trois ou plus refont le squelette d'une page secteur.`
      );
    }

    // Offset 1 : voir `pillarsOf`. Les deux piliers tombent sur mint puis warm.
    return { slug, useCase, copy, pillars: pillarsOf(copy.pillars, 1) };
  }
);

/**
 * ⚠️ GARDE DE COLLISION — la raison d'être de ce bloc.
 *
 * Depuis que les cas d'usage vivent en `/solutions/{slug}` et non plus sous un
 * préfixe à eux, les deux listes PARTAGENT UN SEUL ESPACE DE NOMS. Un cas
 * d'usage nommé comme un secteur ne produirait pas d'erreur : Astro générerait
 * deux fois la même route et l'une des deux pages disparaîtrait silencieusement
 * du site — la pire des pannes, invisible au build comme à la relecture.
 *
 * Il n'existait aucune vérification d'unicité dans ce dépôt, pas même sur les
 * slugs de secteur. Les deux sont posées ici, au niveau module, donc elles
 * cassent `astro build` et non le rendu d'une page.
 */
/**
 * ⚠️ Tout cas d'usage DOIT avoir sa page.
 *
 * Cette garde n'existe que depuis que le méga-menu pointe vers
 * `/solutions/{slug}` : tant que la colonne visait des ancres de l'index, un cas
 * d'usage sans page dégradait vers un saut en haut de page. Maintenant il livre
 * un 404 dans la navigation principale, sur toutes les pages du site.
 *
 * Pendant exact de la garde de `SOLUTION_PAGES` pour `SECTORS`.
 */
for (const useCase of USE_CASES) {
  if (!CONTENT_USE_CASES[useCase.id]) {
    throw new Error(
      `[solutions] aucun contenu pour le cas d'usage "${useCase.id}" (${useCase.title}). ` +
        `Le méga-menu et l'index de /solutions pointent vers /solutions/${useCase.id} : ` +
        `sans page, ce sont des liens morts sur tout le site.`
    );
  }
}

/** Slugs qu'aucune page ne peut porter, parce qu'une route STATIQUE les occupe
 *  déjà : Astro préfère le statique au dynamique et ne signale rien. Une page
 *  nommée `index` serait donc muette — jamais rendue, jamais en erreur. */
const RESERVED_SLUGS = new Set(["index"]);

const seen = new Map<string, string>();
for (const [slug, source] of [
  ...SOLUTION_PAGES.map((page) => [page.slug, "SECTORS"] as const),
  ...USE_CASE_PAGES.map((page) => [page.slug, "USE_CASES"] as const),
]) {
  if (!slug.trim()) {
    throw new Error(`[solutions] slug vide déclaré dans ${source}.`);
  }

  if (RESERVED_SLUGS.has(slug)) {
    throw new Error(
      `[solutions] slug réservé : "${slug}" (${source}). ` +
        `src/pages/solutions/${slug}.astro est une route statique — elle gagne sur la route ` +
        `dynamique, et la page ne serait jamais rendue ni jamais signalée.`
    );
  }

  const first = seen.get(slug);
  if (first) {
    throw new Error(
      `[solutions] collision de slug : "${slug}" est déclaré dans ${first} ET dans ${source}. ` +
        `Les pages secteur et les pages cas d'usage partagent l'espace /solutions/{slug} : ` +
        `deux entrées de même nom feraient disparaître une page du site sans erreur.`
    );
  }
  seen.set(slug, source);
}

/**
 * Toutes les routes de `/solutions/[slug]`, sectorielles et cas d'usage.
 *
 * Union discriminée et source UNIQUE de `getStaticPaths` : une page ne peut donc
 * pas exister dans les données sans exister comme route, ni l'inverse.
 */
const USE_CASE_PAGES_BY_SLUG = new Map(USE_CASE_PAGES.map((page) => [page.slug, page]));

/** Pendant de `getSolution` pour les cas d'usage.
 *
 *  ⚠️ Volontairement SÉPARÉ, et `getSolution` ne doit surtout pas être élargi
 *  pour les avaler : `RelatedSectors` lit `page.sector.icon / .name / .tag`, or
 *  une page cas d'usage n'a pas de `sector`. Un `getSolution` permissif ne
 *  lèverait plus — il planterait au rendu sur une propriété absente. */
export const getUseCase = (slug: string): UseCasePage => {
  const page = USE_CASE_PAGES_BY_SLUG.get(slug);
  if (!page) throw new Error(`[solutions] cas d'usage inconnu : ${slug}`);
  return page;
};

export type SolutionRoute =
  | { kind: "sector"; slug: string; page: SolutionPage }
  | { kind: "use-case"; slug: string; page: UseCasePage };

export const SOLUTION_ROUTES: SolutionRoute[] = [
  ...SOLUTION_PAGES.map((page) => ({ kind: "sector" as const, slug: page.slug, page })),
  ...USE_CASE_PAGES.map((page) => ({ kind: "use-case" as const, slug: page.slug, page })),
];
