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

/** Une vraie capture de l'application v2, prise sur une instance locale isolée
 *  remplie de données fictives (24 novembre 2026). `src` nomme un fichier de
 *  `src/assets/screens/solutions/` sans extension ; `ScreenShot.astro` lève au
 *  build s'il n'existe pas. Plus aucune maquette dessinée sur `/solutions`. */
export type Screen = { src: string; alt: string };

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
  /** `clip` : un geste filmé (`src/assets/clips/`) à la place de la capture. Piliers seulement. */
  mock: Screen & { clip?: string };
}

interface SectorCopy {
  h1: string;
  lede: string;
  hero: Screen;
  problem: {
    heading: string;
    points: { title: string; body: string }[];
  };
  pillars: PillarBlock[];
  scenario: {
    eyebrow: string;
    heading: string;
    lines: Line[];
    /** Absente quand aucun écran réel ne montre ce que dit la section. */
    mock?: Screen;
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
  hero: Screen;
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
    /** Absente quand aucun écran réel ne montre ce que dit la section. */
    mock?: Screen;
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
      hero: { src: "agencies-hero", alt: "DocuFlow project record for the Northwind Systems Q2 retainer: 186.0 h tracked of a 300 h budget, 62% used, with next tasks, the latest daily update and the project documents." },
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
            "Project notes",
            "Reminders with due dates, in-app and email",
          ]),
          mock: { src: "agencies-projects", alt: "DocuFlow Projects list: three client projects with their status, project manager, budget used and hours tracked this month. The Q2 retainer is at 62%." },
        },
        {
          ref: "time",
          label: "The hours",
          heading: "Hours that arrive already attributed.",
          body: "The timer runs against a task inside a client project, so nobody writes a timesheet from memory on Friday afternoon. It runs from one tab even with several open, and with the desktop agent it pauses when you go idle.",
          caps: capsOf("time", [
            "Time logged against a project and its task",
            "Multi-tab safe - one tab leads, no double counting",
            "The desktop agent pauses the timer when you go idle",
            "Timesheets and entry history",
            "CSV export of time entries for payroll",
          ]),
          mock: { src: "agencies-time", alt: "DocuFlow Time Tracking screen: a timer running on the Q2 retainer above today's time entries, each on a client project and a task." },
        },
        {
          ref: "knowledge",
          label: "The paper trail",
          heading: "The statement of work, where the work is.",
          body: "Briefs, scopes and meeting notes live inside the client project. Add a call's Loom or Fathom link and the assistant can answer from its transcript. When a client asks whether something was in scope, the answer has a source.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Video embeds - YouTube, Loom, Fathom",
            "Loom and Fathom transcripts, indexed",
            "Search by project, page and file name",
            "AI assistant over semantic search, cited",
          ]),
          mock: { src: "agencies-docs", alt: "DocuFlow project documentation: the statement of work open in the block editor, beside the project's nested pages." },
        },
      ],
      scenario: {
        eyebrow: "Day 11",
        heading: "How it actually goes.",
        lines: [
          [
            "Northwind is on a ",
            fig("$48,000"),
            " retainer, budgeted at ",
            fig("300 h"),
            ". On the 11th the budget meter reads ",
            fig("62%"),
            ", which is high for the date - so you open the record before the standup instead of after the invoice.",
          ],
          [
            "Analytics shows ",
            fig("38.5 h"),
            " logged to the Ledger rebuild and ",
            fig("21 h"),
            " to client calls. The call time is the anomaly. Two of those calls have a Loom recording on the project, and both transcripts are about a reporting module that isn't in the statement of work.",
          ],
          [
            "That is a scope conversation you can have on the 11th, with the document open - not a write-off you absorb on the 30th.",
          ],
        ],
        mock: { src: "agencies-analytics", alt: "DocuFlow Analytics, hours recorded per task: Ledger rebuild and client calls are listed with their totals." },
      },
      objection: {
        eyebrow: "Transparency",
        heading: "Your team will ask what's being recorded.",
        body: "So tell them, and let them check. The desktop agent shows in the tray whenever the timer is running, no screenshot is taken while the timer is stopped, screenshots can be limited to the working hours your admins set, and anyone can open and review their own data.",
        argument:
          "Used this way, the record protects the team as much as the account. Evidence that a request was out of scope is what lets you bill for it - instead of absorbing it as an unpaid evening.",
        guarantees: [
          "A visible indicator shows the team exactly when the timer is running",
          "No screenshot is taken while the timer is stopped",
          "Screenshots can be limited to the working hours your admins set",
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
      hero: { src: "software-hero", alt: "DocuFlow: Time Tracking screen with a timer running on DF-482 in Sprint 14, above today's time entries." },
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
          heading: "Time that lands on the task.",
          body: "The timer runs against a task inside a client project, never a free-text label. Name tasks after your tickets, and the hours land on them. It leads from one tab, and with the desktop agent it pauses when you go idle.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a project and its task",
            "Multi-tab safe - one tab leads, no double counting",
            "The desktop agent pauses the timer when you go idle",
            "Timesheets and entry history",
          ]),
          mock: { src: "software-entries", alt: "DocuFlow: The Time tab of the Sprint 14 project: each entry on a task, with the person, the day and the hours." },
        },
        {
          ref: "clients",
          label: "The project",
          heading: "Estimate and actual, on the same record.",
          body: "Tasks, budgets and stages live on the client project the hours are logged against. Budgeted versus actual is a live number on the board, so a sprint running hot shows while it can still be re-scoped.",
          caps: capsOf("clients", [
            "Client projects with full stage-change history",
            "Kanban board across all projects",
            "Budgeted vs actual hours, live",
            "Tasks - open / in progress / done / archived",
            "Team assignment per project",
            "Daily updates with status and blockers",
          ]),
          mock: { src: "software-record", alt: "DocuFlow: Project record for Sprint 14: 61.0 h tracked of a 40 h budget, 153% used, with tasks, the latest daily update and documents." },
        },
        {
          ref: "knowledge",
          label: "The decisions",
          heading: "What was agreed, with the call attached.",
          body: "Specs and meeting notes sit inside the project. Add a call's Loom or Fathom link and the assistant can answer from its transcript. When a change request is disputed, the answer is a source rather than a recollection.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Video embeds - YouTube, Loom, Fathom",
            "Loom and Fathom transcripts, indexed",
            "Search by project, page and file name",
            "AI assistant over semantic search, cited",
          ]),
          mock: { src: "software-docs", alt: "DocuFlow: Project documentation: the Sprint 14 scope in the block editor, with what is in and not in scope." },
        },
      ],
      scenario: {
        eyebrow: "Sprint 14",
        heading: "How it actually goes.",
        lines: [
          [
            "Sprint 14 was estimated at ",
            fig("40 h"),
            ". On Thursday the record reads ",
            fig("61 h"),
            ", and Analytics shows ",
            fig("9.5 h"),
            " logged to DF-482 - a task that entered on day three.",
          ],
          [
            "Nobody has to reconstruct where it went. DF-482 came out of a call, the call's Loom recording is on the sprint page, and its transcript says the client asked for token rotation. The signed sprint scope doesn't mention it.",
          ],
          [
            "That is a change-order conversation you have on Thursday with the transcript open - not an overrun you explain at the retro.",
          ],
        ],
        mock: { src: "software-tasks", alt: "DocuFlow: Analytics, hours recorded per task: DF-482 Auth refactor at 9.5 h." },
      },
      objection: {
        eyebrow: "Monitoring",
        heading: "Screenshots on an engineering team is a fair objection.",
        body: "The timer runs in the browser and the desktop agent is a separate application, so a team can run time, tickets and projects with no capture at all. Where it is used - usually because a client contract asks for it - the desktop agent shows in the tray whenever the timer runs, no screenshot is taken while the timer is stopped, and screenshots can be limited to the working hours your admins set.",
        argument:
          "On an engineering team the record is pointed at the client, not at the developer. Evidence that a request arrived on day three is what gets it billed as a change order, instead of absorbed as a weekend.",
        guarantees: [
          "The web timer runs in a browser - the desktop agent is a separate install",
          "A visible indicator shows the team exactly when the timer is running",
          "Screenshots can be switched off for the whole workspace",
          "Anyone can open and review their own recorded data",
        ],
      },
      related: ["digital-agencies", "consulting-firms", "staffing-agencies"],
      cta: { title: "Start with your next sprint.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for development teams - estimate against actual",
        description:
          "Hours logged against a task inside a client project, budgets live on the board, and call transcripts that say when a change request arrived. For teams billing fixed-scope work.",
      },
    },
  },

  /* ══ Conseil — mène par la PREUVE : la capture sous politique publiée ══ */
  "consulting-firms": {
    en: {
      h1: "Answer “what did you do for these forty hours?” from the record.",
      lede: "Hours attach to an engagement, and activity and screenshots attach to the hours. When a client questions an invoice, the answer is a record rather than a recollection.",
      hero: { src: "consulting-hero", alt: "DocuFlow: Project record for the Operating model engagement: 284.0 h tracked of a 400 h budget, 71% used." },
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
          heading: "Captured under a policy your team can read.",
          body: "A desktop agent on Windows, macOS and Linux records screenshots, activity levels and idle time in the background. Admins set what is captured and when, and every member can read that policy.",
          caps: capsOf("activity", [
            "Desktop agent for Windows, macOS and Linux",
            "Screenshots at randomised, configurable intervals",
            "Keyboard and mouse activity in 60-second windows",
            "Capture restricted to an active-hours window",
            "Admin analytics - recorded time, activity, warnings",
          ]),
          mock: { src: "consulting-evidence", alt: "DocuFlow: Activity page: the Tracking Policy every member reads, above captures from desktop devices filed against the Operating model engagement, by task and person." },
        },
        {
          ref: "time",
          label: "The hours",
          heading: "Hours that carry their engagement.",
          body: "Time is logged against a task inside a client engagement, never a free-text label. Expected hours are configurable per person, and admins export a CSV of every entry by task.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a project and its task",
            "Timesheets and entry history",
            "Configurable expected hours per person",
            "CSV export of time entries for payroll",
          ]),
          mock: { src: "consulting-time", alt: "DocuFlow: Time Tracking screen with a timer running on the Board pack task, above today's entries on two engagements." },
        },
        {
          ref: "clients",
          label: "The engagement",
          heading: "The statement of work, with its budget attached.",
          body: "Each engagement is a client project with stages, an hours budget and its tasks, and every stage change is kept.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Budgeted vs actual hours, live",
            "Tasks - open / in progress / done / archived",
            "Daily updates with status and blockers",
          ]),
          mock: { src: "consulting-client", alt: "DocuFlow: Client record for Meridian Group: client details, contacts and the engagement." },
        },
        {
          ref: "knowledge",
          label: "The deliverable",
          heading: "Answers with a source, months later.",
          body: "Deliverables, working papers and the Loom or Fathom recordings of workshops live in the engagement and are indexed as they are added. The assistant answers from them with citations, so a question in November reaches work done in June.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Loom and Fathom transcripts, indexed",
            "Company files in folders - PDF, Word, text",
            "Search by project, page and file name",
            "AI assistant over semantic search, cited",
          ]),
          mock: { src: "consulting-docs", alt: "DocuFlow: Project documentation: the operating model deliverable in the block editor, beside the engagement's pages." },
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
            "Analytics puts those hours against three deliverables - ",
            fig("18 h"),
            " on the operating model, ",
            fig("14 h"),
            " on the board pack, ",
            fig("8 h"),
            " on workshops.",
          ],
          [
            "The breakdown goes back the same afternoon. The conversation turns out to be about scope, not about whether the work happened.",
          ],
        ],
        mock: { src: "consulting-tasks", alt: "DocuFlow: Analytics, hours recorded per task: Operating model draft 18.0 h, Board pack 14.0 h, Workshops 8.0 h." },
      },
      objection: {
        eyebrow: "Confidentiality",
        heading: "Client material will be on screen when a capture fires.",
        body: "Then decide whether a capture fires at all. Screenshots can be switched off for the whole workspace, none is taken while the timer is stopped, and they can be limited to the working hours your admins set. Devices are registered and revocable at any time.",
        argument:
          "Confidentiality and evidence are a trade you set per workspace. With screenshots off, the engagement still holds the entries against each deliverable and the documents they produced - which is what an invoice query actually asks about. Keep them on, inside working hours, when a client contract asks for the stronger record.",
        guarantees: [
          "Screenshots can be switched off for the whole workspace",
          "No screenshot is taken while the timer is stopped",
          "Screenshots can be limited to the working hours your admins set",
          "Devices are registered and revocable at any time",
        ],
      },
      related: ["digital-agencies", "accounting-firms", "legal-services"],
      cta: { title: "Start with your next engagement.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for consulting firms - evidence behind the invoice",
        description:
          "Hours against an engagement, with the screenshots and activity behind them on the same record.",
      },
    },
  },

  /* ══ Comptables — mènent par le CHRONO : le coût du changement de client ══ */
  "accounting-firms": {
    en: {
      h1: "In busy season, the hour you forget to write down is the hour you write off.",
      lede: "The timer runs against an engagement inside a client record, so moving from one small file to the next costs a click rather than a memory. Realisation stops depending on what anyone can reconstruct on Friday afternoon.",
      hero: { src: "accounting-hero", alt: "DocuFlow: Time Tracking screen with a timer running on a T2 return, above entries on several small files." },
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
          body: "Start, pause, resume, stop - against a task inside a client engagement rather than a free-text line. It leads from a single tab, the desktop agent pauses it when you go idle, and the timesheet is built by the time the day ends.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a project and its task",
            "Multi-tab safe - one tab leads, no double counting",
            "The desktop agent pauses the timer when you go idle",
            "Timesheets and entry history",
            "CSV export of time entries for payroll",
          ]),
          mock: { src: "accounting-entries", alt: "DocuFlow: The Time tab of the Kestrel Foods T2 return: 21.0 h of a 24 h budget, with each entry on its task." },
        },
        {
          ref: "activity",
          label: "The record",
          heading: "Hours with something behind them.",
          body: "While the timer runs, the desktop agent records screenshots and activity levels in the background, under a policy every member can read: how often it captures, and when it pauses.",
          caps: capsOf("activity", [
            "Desktop agent for Windows, macOS and Linux",
            "Screenshots at randomised, configurable intervals",
            "Capture restricted to an active-hours window",
            "Screenshot review by person and date",
          ]),
          mock: { src: "accounting-policy", alt: "DocuFlow: Activity page, Tracking Policy: capture every 3 to 5 minutes, pause after 10 idle minutes, low activity below 10%." },
        },
        {
          ref: "clients",
          label: "The engagement",
          heading: "Every file, with its budget and its stage.",
          body: "Clients, engagements, stages and budgeted hours in one record, so a file that is running past its fee is visible in March rather than in June. Reminders keep the follow-ups on the engagement instead of in an inbox.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Budgeted vs actual hours, live",
            "Tasks - open / in progress / done / archived",
            "Reminders with due dates, in-app and email",
            "Daily updates with status and blockers",
          ]),
          mock: { src: "accounting-files", alt: "DocuFlow: Projects list for an accounting firm: each client file with its status, budget used, hours and due date." },
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
        mock: { src: "accounting-day", alt: "DocuFlow: One day of time entries across many client files, from a four-minute payroll call to a block of just over an hour." },
      },
      objection: {
        eyebrow: "Client data",
        heading: "Client financials will be on screen when a capture fires.",
        body: "Then choose when captures fire, or whether they do. Screenshots can be switched off for the whole workspace, none is taken while the timer is stopped, and they can be limited to the working hours your admins set. Anyone can open and review their own recorded data, and devices are revocable at any time.",
        argument:
          "On files covered by professional confidentiality, a firm can run the timer with screenshots off and the timesheet still holds up: every block, down to the four-minute call, was started against a client engagement rather than written from memory on Friday.",
        guarantees: [
          "Screenshots can be switched off for the whole workspace",
          "No screenshot is taken while the timer is stopped",
          "Screenshots can be limited to the working hours your admins set",
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
      hero: { src: "legal-hero", alt: "DocuFlow: Project record for Matter 2026-0184: 24.6 h tracked of a 60 h budget, 41% used, with tasks and documents." },
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
          body: "The timer runs against a task inside a matter, so an entry exists before the description has to be remembered. It leads from one tab, and a wrong entry can be deleted - durations come from the timer, not from typing.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a project and its task",
            "Multi-tab safe - one tab leads, no double counting",
            "The desktop agent pauses the timer when you go idle",
            "Timesheets and entry history",
          ]),
          mock: { src: "legal-time", alt: "DocuFlow: Time Tracking screen with a timer running on Review of production, above the day's entries on two matters." },
        },
        {
          ref: "knowledge",
          label: "The file",
          heading: "The whole file, with sources.",
          body: "Pleadings, correspondence, memos and call recordings live on the matter and are indexed as they arrive. Search finds them by title, and the assistant answers from their content - Loom and Fathom transcripts included - with the document it came from.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Images, file attachments and audio recordings",
            "Company files in folders - PDF, Word, text",
            "Loom and Fathom transcripts, indexed",
            "Search by project, page and file name",
            "AI assistant over semantic search, cited",
          ]),
          mock: { src: "legal-docs", alt: "DocuFlow: Project documentation: the March 11 file note in the block editor, with the call page nested under it." },
        },
        {
          ref: "clients",
          label: "The matter",
          heading: "Matters, contacts and the history of every stage.",
          body: "Each matter is a record with its own stages, contacts and tasks, and every stage change is kept.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Tasks - open / in progress / done / archived",
            "Project notes",
            "Reminders with due dates, in-app and email",
          ]),
          mock: { src: "legal-client", alt: "DocuFlow: Client record for Halvorsen: client details, contacts and the matter." },
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
            "The matter still holds what sat behind those hours - the entries themselves, the call's recording with its transcript, and a file note carrying the date it was written. All three are on the matter, not in an inbox.",
          ],
          [
            "Assembling the answer takes ",
            fig("20 minutes"),
            " instead of an afternoon, and it is the record's version rather than anyone's recollection.",
          ],
        ],
        mock: { src: "legal-entries", alt: "DocuFlow: The Time tab of the matter: client call, correspondence and review of production, with hours and dates." },
      },
      objection: {
        eyebrow: "Privilege",
        heading: "Privileged material cannot end up in a screenshot.",
        body: "Then don't capture it. The timer runs in a browser and the desktop agent is a separate application - a practice can run time, matters and documents with no capture at all. Where a firm does use it, screenshots can be switched off for the whole workspace, none is taken while the timer is stopped, and device tokens are stored only as hashes and revocable at any time.",
        argument:
          "The record that defends a fee is the docket and the file, not the screenshot. Nothing here asks a firm to point a camera at privileged material in order to get a defensible account of its own time.",
        guarantees: [
          "The web timer runs in a browser - the desktop agent is a separate install",
          "Screenshots can be switched off for the whole workspace",
          "No screenshot is taken while the timer is stopped",
          "Device tokens are stored only as hashes and revocable at any time",
        ],
      },
      related: ["accounting-firms", "consulting-firms", "digital-agencies"],
      cta: { title: "Start with your next matter.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for legal services - docket, file and matter",
        description:
          "Time docketed against a matter, with the documents, notes and call transcripts on the same file. A record that still answers the question ten months later.",
      },
    },
  },

  /* ══ BPO — mène par la COUVERTURE : preuve d'occupation des postes, à l'échelle ══ */
  "bpo-call-centers": {
    en: {
      h1: "Prove the seats were staffed, without asking anyone for a status update.",
      lede: "Recorded time per agent and per account, for any date range - so coverage is something you show a client rather than something you assert. Built to be read across a floor, not one desk.",
      hero: { src: "bpo-hero", alt: "DocuFlow: Analytics, recorded time per member: hours, idle time and number of entries for each agent." },
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
          heading: "Coverage you can show, per agent.",
          body: "The desktop agent records screenshots, activity levels and idle time in the background, and keeps working offline. The Analytics page lists the exceptions when an admin opens it - timers running with no screenshot, agents mostly idle, devices silent for a week - instead of leaving them to be found at month end.",
          caps: capsOf("activity", [
            "Desktop agent for Windows, macOS and Linux",
            "Keyboard and mouse activity in 60-second windows",
            "Idle detection with prompt and countdown",
            "Capture restricted to an active-hours window",
            "Offline-first - events queue and sync on reconnect",
            "Device registry with remote revocation",
            "Admin analytics - recorded time, activity, warnings",
            "Screenshot review by person and date",
          ]),
          mock: { src: "bpo-warnings", alt: "DocuFlow: Analytics, Warnings: members whose timer is running without evidence, with when it started." },
        },
        {
          ref: "time",
          label: "The hours",
          heading: "Hours and expected hours, per person.",
          body: "Each entry carries its start and stop time, expected hours are configurable per person, and the CSV export goes to payroll.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a project and its task",
            "Configurable expected hours per person",
            "The desktop agent pauses the timer when you go idle",
            "CSV export of time entries for payroll",
          ]),
          mock: { src: "bpo-people", alt: "DocuFlow: People screen: each member with their workspace role, capabilities and status." },
        },
        {
          ref: "clients",
          label: "The account",
          heading: "Every account, with the work filed under it.",
          body: "Client accounts, projects and teams, with the hours and the activity filed against them. Assignment is per project, and recorded time by account sits in admin analytics rather than in an export somebody assembles.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Team assignment per project",
            "Tasks - open / in progress / done / archived",
            "Daily updates with status and blockers",
          ]),
          mock: { src: "bpo-record", alt: "DocuFlow: Project record for Tier 1 support: 309.0 h tracked of a 336 h budget, 92% used." },
        },
        {
          ref: "knowledge",
          label: "The floor",
          heading: "Procedures the floor can actually find.",
          body: "Scripts, escalation paths and account procedures live in the workspace and are indexed as they are written. New agents find the page by title or ask the assistant, which answers with the page it came from.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Company files in folders - PDF, Word, text",
            "Search by project, page and file name",
            "AI assistant over semantic search, cited",
          ]),
          mock: { src: "bpo-docs", alt: "DocuFlow: Project documentation: the Ridgeline runbook with the billing dispute steps." },
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
            ". At ",
            fig("01:12"),
            " one device drops off the network and queues its events locally.",
          ],
          [
            "It reconnects at 02:40 and its events reconcile without double counting, so the shift total doesn't need a correction and nobody files an exception for it.",
          ],
          [
            "At ",
            fig("07:00"),
            " the account's hours are on the project, agent by agent - and not one supervisor was asked for a status update.",
          ],
        ],
        mock: { src: "bpo-entries", alt: "DocuFlow: The Time tab of the account: each agent's entries on the queue, with the hours." },
      },
      objection: {
        eyebrow: "Scale",
        heading: "Hundreds of agents is a different problem from ten.",
        body: "At this size the work is exceptions, not totals. The agent is offline-first: events queue locally and reconcile on reconnect without double counting. Devices are registered and revocable at any time, and the Analytics page lists timers running with no screenshot, agents mostly idle and devices silent for a week.",
        argument:
          "That changes what a supervisor does with a shift. A timer running with no screenshot or an agent who went idle shows on the Analytics page the next time it is opened, instead of as a discrepancy in a report a client reads at the end of the month.",
        guarantees: [
          "Events queue locally and reconcile without double counting",
          "Devices are registered and revocable at any time",
          "The Analytics page lists idle agents, timers with no screenshot and silent devices",
          "Screenshots can be reviewed by person and date",
        ],
      },
      related: ["consulting-firms", "staffing-agencies", "digital-agencies"],
      cta: { title: "Start with one team, not the whole floor.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for BPO teams - coverage you can show a client",
        description:
          "Recorded time per agent and per account, screenshots under a published policy, and an offline-first desktop agent for outsourced teams.",
      },
    },
  },

  /* ══ Construction — périmètre resserré : le bureau et le contrôle documentaire.
       AUCUNE revendication d'heures de chantier : l'objection l'énonce elle-même. ══ */
  construction: {
    en: {
      h1: "The office side of the job, on the project it belongs to.",
      lede: "Drawings, RFIs, meeting notes, subcontractor contacts and the coordination hours your project administrators spend chasing them all sit on the same project record. This is built for the office and the trailer - not for a phone on a scaffold.",
      hero: { src: "construction-hero", alt: "DocuFlow: Project documentation: drawing E-201 revision C and what changed, beside the project's pages." },
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
          body: "Drawings, specs, submittals and meeting notes live inside the project. Add a coordination call's Loom or Fathom link to the project page, and the assistant can answer from its transcript as well as from the RFI.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Images, file attachments and audio recordings",
            "Company files in folders - PDF, Word, text",
            "Loom and Fathom transcripts, indexed",
            "Search by project, page and file name",
            "AI assistant over semantic search, cited",
          ]),
          mock: { src: "construction-tasks", alt: "DocuFlow: The Tasks tab of the fit-out project: RFIs, submittals and calls, each with its status." },
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
            "Project cloning",
          ]),
          mock: { src: "construction-record", alt: "DocuFlow: Project record for the Phase 2 fit-out: budget, next actions, the latest daily update and project documents." },
        },
        {
          ref: "time",
          label: "Office hours",
          heading: "The coordination time, on the job that caused it.",
          body: "The hours your project administrators, estimators and coordinators spend run against the job rather than disappearing into overhead, and the entries export to CSV for payroll.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a project and its task",
            "Timesheets and entry history",
            "CSV export of time entries for payroll",
          ]),
          mock: { src: "construction-time", alt: "DocuFlow: Time Tracking screen with a timer running on RFI 041, above the day's office entries." },
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
            " coordination call where the change was walked through, recorded in Fathom with its transcript. Both are on the project record rather than in somebody's inbox.",
          ],
          [
            "The conversation takes one call instead of a claim - and the ",
            fig("12 h"),
            " your administrator spent chasing that submittal are on the job too.",
          ],
        ],
        mock: { src: "construction-call", alt: "DocuFlow: Project documentation: the March 21 coordination call page, nested under revision C." },
      },
      objection: {
        eyebrow: "The site",
        heading: "Your crews are not sitting at a computer.",
        body: "They aren't, so this is not a site-hours product and it would be wrong to sell it as one. The timer runs in a browser and the activity agent installs on Windows, macOS and Linux - the office, the trailer and the estimating desk. Site labour hours belong wherever your crews already record them.",
        argument:
          "What it does carry is the half of a construction business that runs on paper: revisions, RFIs, submittals, subcontractor contacts and the coordination time nobody bills. That is where the disputes are decided, and it is the half that has to still make sense a year after handover.",
        guarantees: [
          "The web timer runs in a browser, on the office and trailer machines",
          "Drawings, submittals and recordings attach to the project, not to an inbox",
          "The assistant answers from project pages, files and Loom or Fathom transcripts, with sources",
          "Every stage change on a project is kept, with its history",
        ],
      },
      related: ["consulting-firms", "legal-services", "staffing-agencies"],
      cta: { title: "Start with one job and its drawings.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for construction - document control and project admin",
        description:
          "Drawings, RFIs, submittals and coordination-call transcripts on the project record, with the office hours that chase them. Built for the office, not for site labour tracking.",
      },
    },
  },

  /* ══ Staffing — périmètre resserré : le desk de l'agence, pas le contractuel
       placé chez le client. L'objection le dit en toutes lettres. ══ */
  "staffing-agencies": {
    en: {
      h1: "The margin on a placement is decided at your desk, not at the client's.",
      lede: "Mandates, client contacts, recruiter hours and the documents behind every placement sit on one record, so what a role costs to fill is visible while you are still filling it. Contractors you place work on the client's hardware, and this doesn't reach there.",
      hero: { src: "staffing-hero", alt: "DocuFlow: Project record for three warehouse roles: 26.4 h tracked of a 60 h budget, 44% used." },
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
          body: "Client accounts, mandates, stages and budgeted hours on one record, with every stage change kept.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Kanban board across all projects",
            "Budgeted vs actual hours, live",
            "Tasks - open / in progress / done / archived",
            "Reminders with due dates, in-app and email",
          ]),
          mock: { src: "staffing-mandates", alt: "DocuFlow: Projects list: three mandates with their status, budget used and hours." },
        },
        {
          ref: "time",
          label: "The desk",
          heading: "Recruiter hours, on the mandate that caused them.",
          body: "The timer runs against a task inside the mandate, so sourcing, screening and rescheduling stop being invisible. What a placement costs to make is a number on the record rather than a feeling at the end of the quarter.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a project and its task",
            "Timesheets and entry history",
            "CSV export of time entries for payroll",
          ]),
          mock: { src: "staffing-time", alt: "DocuFlow: Time Tracking screen with a timer running on Screening calls, above the desk's entries." },
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
            "Search by project, page and file name",
            "AI assistant over semantic search, cited",
          ]),
          mock: { src: "staffing-docs", alt: "DocuFlow: Project documentation: mandate 0412 revision B and what changed." },
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
        mock: { src: "staffing-updates", alt: "DocuFlow: The Updates tab of the mandate: role 3 re-opened, role 2 filled, role 1 filled." },
      },
      objection: {
        eyebrow: "Placed staff",
        heading: "Can you monitor the contractors we place?",
        body: "Usually not, and implying otherwise would be dishonest. The desktop agent runs on the machines you pair with your workspace - your recruiters' machines. A contractor placed at a client site works on the client's hardware, under the client's IT policy, and installing a monitoring agent there is frequently neither permitted nor yours to authorise.",
        argument:
          "What this does cover is your own desk: the hours a mandate costs to fill, the client record it is filled against, and the file that has to outlive the placement. That is where a staffing margin is won or lost, and it is the part you actually control.",
        guarantees: [
          "The desktop agent runs only on machines paired with your workspace",
          "The web timer runs in a browser, on your recruiters' hours",
          "Each person can revoke their own devices from the Devices page",
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
     *  n'a travaillé, ou rien n'a été capturé), et la dernière connexion du poste le dit. C'est ce qui
     *  protège la personne d'une mauvaise conclusion, donc ça se dit en clair. */
    body: "You can't see the work, so you read the record: hours, screenshots and daily updates land on the client project as the week happens. Each person's Devices page says when a laptop last checked in - so a gap in the data doesn't get read as a gap in the work.",
    pillar: "activity" as PillarId,
  },
  {
    id: "hybrid-teams",
    title: "Hybrid teams",
    body: "The same timesheet covers the desk and the kitchen table: the agent queues events locally when the connection drops and reconciles them on reconnect, without double counting. Screenshots can be limited to the working hours you set, so a laptop still open at 9pm takes none.",
    pillar: "time" as PillarId,
  },
  {
    id: "client-billing",
    title: "Client billing",
    body: "Time is logged against a task inside a client project, never a free-text label, so the hours behind an invoice line - by task, with the documents they produced - are already on the record.",
    pillar: "clients" as PillarId,
  },
  {
    id: "employee-productivity",
    title: "Employee productivity",
    body: "Each screenshot carries the keyboard and mouse activity of the minute before it, and by default the agent asks before it pauses for idle. A visible indicator shows when the timer is running, and anyone can open the data recorded about them - which is the difference between a measure a team accepts and one it works around.",
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
    body: "A block editor for procedures, Loom and Fathom walkthroughs whose transcripts are fetched on their own, and an assistant that answers with the page it came from. New people ask it instead of interrupting the team.",
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
  mock: Screen;
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
   *   - `/solutions/consulting-firms` mène par la PREUVE (la capture sous politique publiée) ;
   *   - `/solutions/accounting-firms` mène par le COÛT DU CHANGEMENT de dossier ;
   *   - `/solutions/digital-agencies` mène par la CONSOMMATION d'un forfait.
   * Ici le sujet est la ligne elle-même : d'où elle vient et si elle tient quand
   * on la conteste. Aucune des trois ne traite ça, et cette page ne traite
   * aucune des trois. */
  "client-billing": {
    en: {
      eyebrow: "Client billing",
      h1: "Every invoice line should survive one question: “What was this?”",
      lede: "Every hour starts on a task inside a client project. DocuFlow does not write the invoice, but when a client questions a line, the hours, tasks and documents behind it are already in one record.",
      hero: { src: "billing-hero", alt: "DocuFlow: Project record for the Halcyon Retail campaign: 91.2 h tracked of a 120 h budget, 76% used." },
      situation: {
        heading: "The line says “campaign production.” The client asks what that means.",
        points: [
          {
            title: "The line is assembled by hand.",
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
          body: "Hours, tasks, notes and documents attach to the client project as work happens. DocuFlow does not write the invoice; it keeps the record each line is written from, so nobody rebuilds it at month end.",
          caps: capsOf("clients", [
            "Clients and contacts, with status and source",
            "Client projects with full stage-change history",
            "Budgeted vs actual hours, live",
            "Tasks - open / in progress / done / archived",
            "Project notes",
          ]),
          mock: { src: "billing-entries", alt: "DocuFlow: The Time tab of the campaign: every entry on a task, with the person, the day and the hours." },
        },
        {
          ref: "time",
          label: "The hours",
          heading: "Hours that were never free text.",
          body: "The timer runs against a task inside a client project, so every hour already knows what it was for. A wrong entry can be deleted, and admins export every entry as a CSV: date, person, project, task, description, hours.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a project and its task",
            "Multi-tab safe - one tab leads, no double counting",
            "Timesheets and entry history",
            "CSV export of time entries for payroll",
          ]),
          mock: { clip: "billing-filter", src: "billing-time", alt: "DocuFlow: Time Tracking entries for the week, filtered to the Halcyon Retail campaign: each one on a task, with the person and the duration." },
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
            "Analytics already shows the work behind it, task by task - ",
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
        mock: { src: "billing-tasks", alt: "DocuFlow: Analytics, hours recorded per task: Landing page build 14.0 h, Copy review 6.5 h, Client calls 3.0 h." },
      },
      objection: {
        eyebrow: "Trust",
        heading: "Itemising everything invites the client to audit everything.",
        body: "You decide what leaves the building. The record exists so a question has an answer, not so every invoice ships with a dossier. Nothing in DocuFlow is visible to your client: admins export one CSV of the entries, and you choose what goes out. Screenshots can be switched off for the whole workspace.",
        argument:
          "A line you can defend in one message is worth more than one that goes unquestioned only because it is opaque. The aim is not to send more detail - it is to avoid rebuilding the record when detail is requested.",
        guarantees: [
          "Time is logged against a task in a client project, never a free-text label",
          "Durations come from the timer, and a wrong entry can be deleted",
          "Nothing in DocuFlow is visible to your client",
          "Screenshots can be switched off for the whole workspace",
        ],
      },
      cta: { title: "Start with the invoice you send next.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for client billing - invoice lines that trace",
        description:
          "Every hour starts on a task inside a client project, so a queried invoice line traces back to the work behind it.",
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
      lede: "Hours, activity and daily updates land on the client project as the week happens. Each person's Devices page says when a laptop last checked in - before a gap in the data is mistaken for a gap in the work.",
      hero: { src: "remote-hero", alt: "DocuFlow: Analytics, hours recorded per day, Monday to Friday." },
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
          heading: "A silent laptop is not a quiet week.",
          body: "The desktop agent records screenshots, activity levels and idle time, and each person's Devices page shows when a laptop stopped checking in. Analytics warns admins about a device that has been silent for a week.",
          caps: capsOf("activity", [
            "Desktop agent for Windows, macOS and Linux",
            "Keyboard and mouse activity in 60-second windows",
            "Offline-first - events queue and sync on reconnect",
            "Admin analytics - recorded time, activity, warnings",
            "Device registry with remote revocation",
          ]),
          mock: { src: "remote-updates", alt: "DocuFlow: The Updates tab of the project: status and blockers written by two people." },
        },
        {
          ref: "time",
          label: "The week",
          heading: "Hours that arrive without being asked for.",
          body: "The timer runs against a task inside a client project, so the week assembles itself as it happens. Daily updates carry status and blockers, which is the part a status meeting was there to collect.",
          caps: capsOf("time", [
            "Time logged against a project and its task",
            "Multi-tab safe - one tab leads, no double counting",
            "The desktop agent pauses the timer when you go idle",
            "Timesheets and entry history",
          ]),
          mock: { src: "remote-time", alt: "DocuFlow: Time Tracking screen with a timer running on DF-482, above the day's entries." },
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
            "The record simply stops: the laptop last checked in on Tuesday at ",
            fig("14:38"),
            ".",
          ],
          [
            "Their Devices page shows it offline since then. The conversation is with IT, not with the person.",
          ],
        ],
        mock: { src: "remote-devices", alt: "DocuFlow: Devices screen: two enrolled devices, one online and one offline for three days, each revocable." },
      },
      objection: {
        eyebrow: "Surveillance",
        heading: "Remote monitoring is where trust goes to die.",
        body: "Monitoring has to be visible or it is not worth having. A running indicator, an optional working-hours window for screenshots and self-review make the record inspectable by the person it describes. The desktop agent is separate from the browser timer, so a team can run time and projects with no capture at all.",
        argument:
          "A week that looks empty is checked against the device before anyone attributes the gap to the individual.",
        guarantees: [
          "A visible indicator shows exactly when the timer is running",
          "Screenshots can be limited to the working hours your admins set",
          "Anyone can open and review their own recorded data",
          "The web timer runs in a browser - the desktop agent is a separate install",
        ],
      },
      cta: { title: "Start with one remote week.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for remote teams - read the record, not the dot",
        description:
          "Hours, activity and daily updates land on the client project as the week happens, and a silent laptop shows as offline instead of as a bad week.",
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
      lede: "One timesheet follows the week from office to home. Offline events reconcile once the connection returns, and screenshots can stop when the working day ends.",
      hero: { src: "hybrid-hero", alt: "DocuFlow: Project record for the Operating model engagement: budget, next actions and the hours tracked this month." },
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
          body: "The timer runs against a task inside a client project, not a location. A wrong entry can be deleted, expected hours are configurable per person, and the same export carries work from either desk.",
          caps: capsOf("time", [
            "Web timer - start, pause, resume, stop",
            "Time logged against a project and its task",
            "Multi-tab safe - one tab leads, no double counting",
            "Timesheets and entry history",
            "Configurable expected hours per person",
          ]),
          mock: { src: "hybrid-time", alt: "DocuFlow: Time Tracking screen with a timer running, above the day's entries." },
        },
        {
          ref: "activity",
          label: "The agent",
          heading: "Offline is a state, not a hole.",
          body: "Events queue locally when the connection drops and reconcile on reconnect without double counting. Screenshots can be limited to the working hours your admins set, so the boundary of the working day is a setting rather than an argument.",
          caps: capsOf("activity", [
            "Offline-first - events queue and sync on reconnect",
            "Capture restricted to an active-hours window",
            "Desktop agent for Windows, macOS and Linux",
            "Idle detection with prompt and countdown",
            "Device registry with remote revocation",
          ]),
          mock: { src: "hybrid-policy", alt: "DocuFlow: Administration, Tracking Policy: captures restricted to active hours, 08:00 to 18:00." },
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
            " the laptop is open again and no screenshot is taken, because the working-hours window closed at six.",
          ],
        ],
        mock: { src: "hybrid-entries", alt: "DocuFlow: The Time tab of the engagement: the four blocks of one day, each listed once." },
      },
      objection: {
        eyebrow: "Boundaries",
        heading: "Working from home should not mean being recorded at home.",
        body: "It does not have to. Screenshots can be limited to the working hours your organisation sets, and none is taken while the timer is stopped. The desktop agent is separate from the browser timer, and registered devices can be revoked at any time.",
        argument:
          "The window turns the end of the working day into a setting everyone can see, not a judgement made afterwards. A laptop open at nine takes no screenshot because the tool keeps the boundary for the team.",
        guarantees: [
          "Screenshots can be limited to the working hours your admins set",
          "No screenshot is taken while the timer is stopped",
          "Devices are registered and revocable at any time",
          "Anyone can open and review their own recorded data",
        ],
      },
      cta: { title: "Start with next week - both halves of it.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for hybrid teams - one timesheet, two places",
        description:
          "Events queue offline and reconcile without double counting, and screenshots can stay inside the hours you set. Office days and home days on the same timesheet.",
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
      lede: "Each screenshot carries the keyboard and mouse activity of the minute before it, and by default the agent asks before it pauses for idle. A visible indicator shows when the timer is running, and anyone can open the data recorded about them.",
      hero: { src: "productivity-hero", alt: "DocuFlow: Activity page as a member sees it: the Tracking Policy applied to them, above their own captures of the day." },
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
            body: "Without a rule everyone can read, a quiet stretch is indistinguishable from a stretch that simply wasn't captured - and people get judged on the difference.",
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
          heading: "Measured in the open, under a policy everyone can read.",
          body: "Each screenshot carries the activity of the minute before it, and idle time triggers a prompt and countdown. A capture below the low-activity line is a fact about the capture, not a score.",
          caps: capsOf("activity", [
            "Keyboard and mouse activity in 60-second windows",
            "Idle detection with prompt and countdown",
            "Capture restricted to an active-hours window",
            "Admin analytics - recorded time, activity, warnings",
          ]),
          mock: { src: "productivity-policy", alt: "DocuFlow: Tracking Policy settings: the low-activity threshold, described as a fact about the capture and not a score, the idle timeout and the idle prompt." },
        },
        {
          ref: "time",
          label: "The hours",
          heading: "Hours attached to work, not to a chair.",
          body: "The timer runs against a task inside a client project, so an hour says what it was for. Expected hours are configurable per person, and idle time is never counted as work.",
          caps: capsOf("time", [
            "Time logged against a project and its task",
            "The desktop agent pauses the timer when you go idle",
            "Timesheets and entry history",
            "Configurable expected hours per person",
          ]),
          mock: { src: "productivity-time", alt: "DocuFlow: Time Tracking screen with a timer running on the inbound queue." },
        },
      ],
      scenario: {
        eyebrow: "11:04",
        heading: "How an idle stretch is handled.",
        lines: [
          [
            "The screen goes quiet at ",
            fig("11:04"),
            ". After ",
            fig("10 min"),
            " - the default idle timeout - the agent asks, with a ",
            fig("60-second"),
            " countdown, rather than deciding on its own.",
          ],
          [
            "The person answers “I'm back”. The idle minutes are not counted, and the timer carries on.",
          ],
          [
            "Nothing idle was counted as work, and nothing has to be argued about at review time. The record and the person agree.",
          ],
        ],
        /* Pas de visuel : aucun écran de l'application ne montre la question d'inactivité,
           qui vit dans l'agent de bureau. */
      },
      objection: {
        eyebrow: "Consent",
        heading: "Nobody wants a productivity score on their back.",
        body: "Then do not put one there. DocuFlow gives no one a productivity score. A visible indicator, an idle prompt, an optional working-hours window for screenshots and self-review keep the measure open.",
        argument:
          "A measure the team can inspect is one it stops working around. When people can see what is recorded, when and why, the effort that went into looking busy goes back into the work.",
        guarantees: [
          "A visible indicator shows exactly when the timer is running",
          "By default the agent asks before pausing for idle, and idle time is never counted",
          "Anyone can open and review their own recorded data",
          "Screenshots can be switched off for the whole workspace",
        ],
      },
      cta: { title: "Start by telling the team what it measures.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for employee productivity - measured in the open",
        description:
          "Activity measured with every screenshot, idle time asked about and never counted, a visible running indicator, and a record anyone can open about themselves.",
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
      hero: { src: "profit-hero", alt: "DocuFlow: Project record for the Phase 2 fit-out: 249.0 h tracked of a 320 h budget, 78% used." },
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
          body: "Every project carries its budget, stages and tasks. Logged hours move the actual figure as they arrive, while daily updates add status, blockers and next steps before the month closes.",
          caps: capsOf("clients", [
            "Budgeted vs actual hours, live",
            "Client projects with full stage-change history",
            "Kanban board across all projects",
            "Tasks - open / in progress / done / archived",
            "Daily updates with status and blockers",
            "Team assignment per project",
          ]),
          mock: { src: "profit-list", alt: "DocuFlow: Projects list: three jobs with budget used and hours tracked." },
        },
        {
          ref: "time",
          label: "The hours",
          heading: "Every hour that shapes the margin starts on the project.",
          body: "Time runs against a task inside the project, so the actual side of the comparison is not a reconstruction. Coordination, review and the calls nobody bills land on the job that caused them instead of disappearing into overhead.",
          caps: capsOf("time", [
            "Time logged against a project and its task",
            "Web timer - start, pause, resume, stop",
            "Timesheets and entry history",
            "CSV export of time entries for payroll",
          ]),
          mock: { src: "profit-time", alt: "DocuFlow: Time Tracking screen with a timer running on Submittals and RFIs." },
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
            "The hours are already attributed to tasks: ",
            fig("62 h"),
            " of the 249 sit on submittals and RFIs - work the quote allowed ",
            fig("20 h"),
            " for across the whole phase.",
          ],
          [
            "That is a variation you raise in week two, with the figures open - not a margin you explain at handover.",
          ],
        ],
        mock: { src: "profit-tasks", alt: "DocuFlow: Analytics, hours recorded per task: Fit-out 98.0 h, Submittals and RFIs 62.0 h, Site meetings 54.0 h, Estimating 35.0 h." },
      },
      objection: {
        eyebrow: "Pressure",
        heading: "Watching margin mid-job turns into watching people.",
        body: "Only if the number is pointed at a person. Budgeted versus actual belongs to the project: it is a property of the job, not a score on anyone who worked it. Owners and admins see every project; members see the projects they are assigned to.",
        argument:
          "Knowing in week two protects the team. An early overrun starts a client conversation about scope; the same overrun found at handover becomes a conversation with the team about why the work took so long.",
        guarantees: [
          "Budgeted vs actual hours sit on the project, not on a person",
          "Owners and admins see every project; members see the ones they are assigned to",
          "Durations come from the timer, not from typing",
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
      lede: "New people ask the assistant about written procedures and recorded walkthroughs instead of interrupting the team. Every answer links back to the page it came from.",
      hero: { src: "onboarding-hero", alt: "DocuFlow: Project documentation: the refunds policy in the block editor, beside the account's pages." },
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
          heading: "Written, recorded, and both behind every answer.",
          body: "Write procedures in the block editor, with nested pages and templates. Record walkthroughs in Loom or Fathom and embed them, and their transcripts are fetched on their own. The assistant answers from both, with the source it came from; search finds pages by title.",
          caps: capsOf("knowledge", [
            "Block editor with slash commands and nested pages",
            "Loom and Fathom transcripts, indexed",
            "Video embeds - YouTube, Loom, Fathom",
            "Search by project, page and file name",
            "AI assistant over semantic search, cited",
            "Re-indexing skips unchanged content",
          ]),
          mock: { src: "onboarding-library", alt: "DocuFlow: Workspace Documents: folders and documents with their access and last editor." },
        },
        {
          ref: "clients",
          label: "The context",
          heading: "Procedures where the work is, not beside it.",
          body: "Documentation lives inside the client project it belongs to, so a new person reads the account's rules on the account's record. The answer stays where the next person will look.",
          caps: capsOf("clients", [
            "Client projects with full stage-change history",
            "Project notes",
            "Audio notes, transcribed automatically",
            "Reminders with due dates, in-app and email",
            "Team assignment per project",
            "Project cloning",
          ]),
          mock: { src: "onboarding-tasks", alt: "DocuFlow: The Tasks tab of the account, with new agent onboarding in progress." },
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
            "The answer returns with two sources: the refunds policy and the page holding the ",
            fig("March 6"),
            " onboarding walkthrough, its Loom transcript indexed on its own.",
          ],
          [
            "The question took ",
            fig("20 seconds"),
            " and cost nobody else their morning. The page it came from is the same one the next agent will find.",
          ],
        ],
        mock: { src: "onboarding-runbook", alt: "DocuFlow: Project documentation: the March 6 onboarding page, nested under the refunds policy." },
      },
      objection: {
        eyebrow: "Decay",
        heading: "Documentation rots, and stale pages are worse than none.",
        body: "They can be. That is why every answer arrives with its sources attached. You can open the page it came from and judge whether it still holds. Edited pages are re-indexed as they are written, while unchanged content is skipped.",
        argument:
          "Citations make decay visible. An uncited answer sounds equally confident whether its source changed last week or three years ago. That is how a team stops trusting the library and goes back to asking a person.",
        guarantees: [
          "The assistant answers over semantic search, with cited sources",
          "Loom and Fathom transcripts, fetched and indexed on their own",
          "Search finds pages and files by name",
          "Re-indexing skips unchanged content",
        ],
      },
      cta: { title: "Start with the question you answer twice a week.", note: FINE_PRINT },
      meta: {
        title: "DocuFlow for onboarding documentation - cited answers",
        description:
          "A block editor for procedures, Loom and Fathom walkthrough transcripts, and an assistant that answers with the page it came from.",
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
