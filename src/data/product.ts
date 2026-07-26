/**
 * Contenu de la page `/product` — le « datasheet ».
 *
 * Toutes les capacités listées ici ont été vérifiées contre le schéma et l'API de
 * l'application (`../techma-documentation-platform`) par le handoff
 * (`docs/design_handoff_product/`). **Ne rien ajouter qui n'y figure pas** : au
 * Canada une indication trompeuse relève de la Loi sur la concurrence, et le
 * brief l'écrit noir sur blanc (§8). Si une section paraît maigre, c'est la mise
 * en page qu'on améliore, pas la liste qu'on rallonge.
 *
 * La taxonomie TIME → ACTIVITY → CLIENTS → KNOWLEDGE est **la même que celle du
 * comparatif de `/pricing`** (`COMPARISON_GROUPS` dans `site.ts`) : les deux pages
 * doivent rester d'accord. Les dix futures pages par fonction
 * (`/product/time-tracking`, …) liront cette source, pas une copie.
 *
 * ⚠️ Copy en attente de signature Masdouk (le handoff les signale comme nouvelles) :
 * le H2 de Knowledge, le libellé « THE ARGUMENT » et les cinq phrases de
 * `PRODUCT_ARGUMENT`. Tout le reste vient du brief validé (§6).
 */

/** Les quatre piliers du produit, et rien d'autre : la clé du registre de
 *  visuels dans `product.astro` (`Record<PillarId, …>`) est construite sur ce
 *  type, pas sur `string` — un pilier ajouté ou renommé sans son visuel casse
 *  donc `astro check`/le build plutôt que de planter au rendu avec un mockup
 *  `undefined`. */
export type PillarId = "time" | "activity" | "clients" | "knowledge";

export type Capability = {
  text: string;
  /** Ce que la section veut qu'on retienne — rendu en `ink` 600 au lieu de `slate`.
   *  Au plus deux par pilier : au-delà, plus rien ne ressort. */
  key?: boolean;
};

/** Une cellule de la bande de specs. `value` est toujours un nombre, un
 *  intervalle ou un format — jamais un adjectif. C'est la preuve de la section. */
export type Spec = { value: string; label: string };

export interface ProductPillar {
  /** Ancre de la page ET clé du spy de la barre de saut. */
  id: PillarId;
  index: string;
  /** Libellé court : barre de saut, carte d'index du héros, oeil-de-boeuf (en capitales). */
  name: string;
  heading: string;
  body: string;
  /** Fond de bande — uni, jamais de dégradé. Aucune bande voisine identique. */
  band: string;
  /** `live` uniquement sur la bande mint : l'ambre y tombe à 1,83:1. */
  eyebrowTone: "hour" | "live";
  caps: Capability[];
  spec: Spec[];
}

/**
 * Une capacité, dans ses deux habillages : `bullet`/`key` pour la puce du
 * pilier (`ProductPillar.caps`, ton court, phrase complète), `capability`/
 * `qualifier` pour la rangée du tableau exhaustif (`CAPABILITY_GROUPS`, nom nu
 * puis précision détachée). Les deux textes diffèrent **volontairement** — même
 * capacité, deux formats de lecture — donc la paire les porte tous les deux au
 * lieu d'en dériver un du texte de l'autre, ce qui inventerait une glose.
 *
 * L'unique liste par pilier est ici, dans `PILLAR_DEFINITIONS` : `caps` et
 * `CAPABILITY_GROUPS` en sont tous deux DÉRIVÉS plus bas, ce qui rend le drift
 * entre les deux structurellement impossible plutôt que de compter sur la
 * discipline de la prochaine modification.
 */
type CapabilityRow = {
  bullet: string;
  key?: boolean;
  capability: string;
  qualifier?: string;
};

interface PillarDefinition {
  id: PillarId;
  index: string;
  name: string;
  heading: string;
  body: string;
  band: string;
  eyebrowTone: "hour" | "live";
  rows: CapabilityRow[];
  spec: Spec[];
}

const PILLAR_DEFINITIONS: PillarDefinition[] = [
  {
    id: "time",
    index: "01",
    name: "Time",
    heading: "Hours that already know what they were for.",
    body: "The timer runs against a task inside a client project, so a timesheet is a by-product rather than a chore. It survives multiple browser tabs, pauses itself when the screen goes idle, and exports clean enough for payroll.",
    band: "bg-paper",
    eyebrowTone: "hour",
    rows: [
      {
        bullet: "Web timer - start, pause, resume, stop",
        capability: "Web timer - start, pause, resume, stop",
      },
      {
        bullet: "Time logged against a task in a client project",
        capability: "Time logged against a task",
        qualifier: "never a free-text label",
      },
      {
        bullet: "Multi-tab safe - one tab leads, no double counting",
        capability: "Multi-tab safe",
        qualifier: "leader election, no double counting",
      },
      {
        bullet: "Automatic pause past the idle threshold",
        capability: "Automatic idle pause",
        qualifier: "past the idle threshold",
      },
      {
        bullet: "Timesheets and entry history, editable",
        capability: "Timesheets and entry history",
        qualifier: "editable",
      },
      { bullet: "Attendance and presence", capability: "Attendance and presence" },
      {
        bullet: "Configurable expected hours per person",
        capability: "Expected hours per person",
        qualifier: "configurable",
      },
      { bullet: "Payroll-ready CSV export", capability: "Payroll-ready CSV export" },
    ],
    spec: [
      { value: "60s", label: "heartbeat" },
      { value: "3 min", label: "idle threshold" },
      { value: "8h", label: "default day" },
      { value: "CSV", label: "export" },
    ],
  },
  {
    id: "activity",
    index: "02",
    name: "Activity",
    heading: "Evidence, and a score telling you how good it is.",
    body: "A desktop agent on Windows, macOS and Linux records screenshots, keyboard and mouse activity and idle time in the background. It keeps working offline. And it grades its own coverage, so you know when the record is thin instead of assuming it is complete.",
    band: "bg-band-mint",
    eyebrowTone: "live",
    rows: [
      {
        bullet: "Desktop agent for Windows, macOS and Linux",
        capability: "Desktop agent",
        qualifier: "Windows, macOS, Linux",
      },
      {
        bullet: "Screenshots at randomised, configurable intervals",
        capability: "Screenshots at randomised intervals",
        qualifier: "org-configurable",
      },
      {
        bullet: "Keyboard and mouse activity in 60-second windows",
        capability: "Keyboard and mouse activity",
        qualifier: "60-second windows",
      },
      {
        bullet: "Idle detection with prompt and countdown",
        capability: "Idle detection",
        qualifier: "prompt and countdown",
      },
      {
        bullet: "Capture restricted to an active-hours window",
        capability: "Active-hours capture window",
      },
      {
        bullet: "Offline-first - events queue and sync on reconnect",
        capability: "Offline-first sync",
        qualifier: "events queue locally",
      },
      {
        bullet: "Device registry with remote revocation",
        capability: "Device registry",
        qualifier: "remote revocation",
      },
      {
        bullet: "Screenshots soft-deleted with a recorded reason",
        capability: "Screenshots soft-deleted with reason",
        qualifier: "never silently erased",
      },
      {
        bullet: "Evidence quality score, 0–100 per person",
        key: true,
        capability: "Evidence quality score, 0–100",
        qualifier: "strong / moderate / weak / insufficient",
      },
      {
        bullet: "Admin analytics - coverage, quality, devices, alerts",
        capability: "Admin analytics",
        qualifier: "coverage, quality, devices, alerts",
      },
      {
        bullet: "Screenshot review with a timezone selector",
        capability: "Screenshot review",
        qualifier: "timezone selector",
      },
      { bullet: "CSV export", capability: "CSV export" },
    ],
    spec: [
      { value: "3–15m", label: "capture" },
      { value: "60s", label: "activity window" },
      { value: "0–100", label: "evidence score" },
      { value: "3", label: "platforms" },
    ],
  },
  {
    id: "clients",
    index: "03",
    name: "Clients",
    heading: "A CRM that knows what the work cost.",
    body: "Clients, contacts, projects, stages, budgets, tasks and daily updates. Because the hours live in the same place, budget consumed is a live number rather than a month-end reconstruction.",
    band: "bg-paper",
    eyebrowTone: "hour",
    rows: [
      {
        bullet: "Clients and contacts, with status and source",
        capability: "Clients and contacts",
        qualifier: "status and source",
      },
      {
        bullet: "Client projects with full stage-change history",
        capability: "Client projects with stages",
        qualifier: "full stage-change history",
      },
      {
        bullet: "Kanban board across all projects",
        capability: "Kanban board",
        qualifier: "across all projects",
      },
      {
        bullet: "Budgeted vs actual hours, live",
        capability: "Budgeted vs actual hours",
        qualifier: "consumption live",
      },
      {
        bullet: "Tasks - open / in progress / done / archived",
        capability: "Tasks",
        qualifier: "open / in progress / done / archived",
      },
      { bullet: "Team assignment per project", capability: "Team assignment per project" },
      { bullet: "Coloured tags", capability: "Coloured tags" },
      {
        bullet: "Notes with @mentions that notify",
        capability: "Notes with @mentions",
        qualifier: "notifies the person named",
      },
      {
        bullet: "Audio notes, transcribed automatically",
        capability: "Audio notes",
        qualifier: "transcribed automatically",
      },
      {
        bullet: "Reminders with due dates, in-app and email",
        capability: "Reminders with due dates",
        qualifier: "in-app and email",
      },
      {
        bullet: "Custom modules and fields - 12 field types",
        key: true,
        capability: "Custom modules and fields",
        qualifier: "12 field types",
      },
      {
        bullet: "Daily updates with status, blockers and KPIs",
        capability: "Daily updates",
        qualifier: "one per person / project / day + KPIs",
      },
      { bullet: "Project cloning", capability: "Project cloning" },
    ],
    spec: [
      { value: "12", label: "field types" },
      { value: "5", label: "project stages" },
      { value: "1/day", label: "per person" },
      { value: "full", label: "stage history" },
    ],
  },
  {
    id: "knowledge",
    index: "04",
    name: "Knowledge",
    /** Volontairement différent du H2 de l'accueil (« Ask your own company a
     *  question. ») : deux pages ne doivent pas se répéter mot pour mot. */
    heading: "Search covers what was said, not just what was written.",
    body: "A block editor inside the client project, company files in folders, and meeting videos transcribed automatically. All of it indexed as it is written, so the assistant answers with a source instead of a list of files.",
    band: "bg-band-warm",
    eyebrowTone: "hour",
    rows: [
      {
        bullet: "Block editor with slash commands and nested pages",
        capability: "Block editor",
        qualifier: "slash commands, nested pages",
      },
      {
        bullet: "Page reordering, templates and duplication",
        capability: "Page reordering, templates, duplication",
      },
      {
        bullet: "Images, file attachments and audio recordings",
        capability: "Images, attachments, audio recordings",
      },
      {
        bullet: "Video embeds - YouTube, Loom, Fathom",
        capability: "Video embeds",
        qualifier: "YouTube, Loom, Fathom",
      },
      {
        bullet: "Automatic video transcription, indexed",
        key: true,
        capability: "Automatic video transcription",
        qualifier: "indexed and searchable",
      },
      {
        bullet: "Company files in folders - PDF, Word, text",
        capability: "Company documents in folders",
        qualifier: "PDF, Word, text extracted",
      },
      {
        bullet: "Full-text search across everything",
        capability: "Full-text search across everything",
      },
      {
        bullet: "AI assistant over semantic search, cited",
        key: true,
        capability: "AI assistant over semantic search",
        qualifier: "cited sources",
      },
      {
        bullet: "Re-indexing skips unchanged content",
        capability: "Incremental re-indexing",
        qualifier: "skips unchanged content",
      },
    ],
    spec: [
      { value: "~800", label: "char chunks" },
      { value: "1536", label: "dim embeddings" },
      { value: "3", label: "video providers" },
      { value: "PDF·W·txt", label: "extracted" },
    ],
  },
];

/** Les quatre piliers rendus par `ProductPillar.astro`. `caps` est DÉRIVÉ de
 *  `PILLAR_DEFINITIONS[].rows` — jamais retapé — pour que la puce affichée ici
 *  et la rangée affichée dans `CAPABILITY_GROUPS` ne puissent plus diverger. */
export const PRODUCT_PILLARS: ProductPillar[] = PILLAR_DEFINITIONS.map((pillar) => ({
  id: pillar.id,
  index: pillar.index,
  name: pillar.name,
  heading: pillar.heading,
  body: pillar.body,
  band: pillar.band,
  eyebrowTone: pillar.eyebrowTone,
  caps: pillar.rows.map((row) => (row.key ? { text: row.bullet, key: true } : { text: row.bullet })),
  spec: pillar.spec,
}));

/** Les briques communes aux quatre piliers. `icon` : nom Lucide, à tenir
 *  synchronisé avec `include` dans `astro.config.mjs` — **un nom absent ne rend
 *  rien et ne casse pas le build**, donc ça se vérifie en comptant les `<svg>`
 *  livrés.
 *
 *  `featured` n'existe que pour MCP : le brief présente le serveur MCP comme
 *  unique dans la catégorie — revendication à substantifier avant publication —
 *  et demande donc une carte entière plutôt qu'une note de bas de page. */
export const PLATFORM_CARDS = [
  {
    icon: "shield-check",
    title: "Roles and permissions",
    body: "Admin and member roles, with per-capability visibility.",
  },
  {
    icon: "users",
    title: "Teams",
    body: "Grouping with owner / admin / member roles and expiring invite codes.",
  },
  {
    icon: "bell",
    title: "Notifications",
    body: "Mentions and system alerts, in-app and by email.",
  },
  {
    icon: "refresh-cw",
    title: "Offline-first agent",
    body: "Local queue and idempotent sync - no double-counted work.",
  },
  {
    icon: "lock",
    title: "Device security",
    body: "Device tokens stored only as hashes, revocable at any time.",
  },
  {
    icon: "share-2",
    title: "Claude Desktop integration",
    body: "An MCP server exposing 22 tools, so an AI assistant can query projects, documents, clients and time entries directly.",
    featured: true,
  },
];

/** Six des 22 outils exposés, plus le reste compté. Les noms sont ceux du
 *  serveur — les afficher tels quels est l'argument : ils existent. */
export const MCP_TOOLS = [
  "list_projects",
  "get_client",
  "search_documents",
  "query_time_entries",
  "create_task",
  "get_budget",
  "+16 more",
];

/** La réponse directe à « pourquoi pas Hubstaff ». Le seul moment de la page qui
 *  argumente au lieu de spécifier — tout le reste est une fiche technique.
 *  ⚠️ Copy en attente de signature Masdouk. */
export const PRODUCT_ARGUMENT = [
  {
    n: "01",
    title: "An evidence quality score",
    body: "The monitoring data grades its own completeness, so a thin record announces itself.",
  },
  {
    n: "02",
    title: "Meetings that answer questions",
    body: "Recorded calls are transcribed and indexed, so the assistant can answer from what was said.",
  },
  {
    n: "03",
    title: "A CRM you can reshape",
    body: "12 custom field types across custom modules, not a fixed schema.",
  },
  {
    n: "04",
    title: "An agent that survives the network",
    body: "Work queues locally and reconciles without duplicates when the connection returns.",
  },
  {
    n: "05",
    title: "An MCP server",
    body: "Query your operations from Claude Desktop through 22 exposed tools.",
  },
];

/** Le tableau exhaustif — à la fois l'artefact de due diligence et la charge SEO
 *  de la page. Même découpage que les piliers, en plus fin : `qualifier` porte la
 *  limite ou la précision quand elle existe, et reste vide sinon plutôt que
 *  d'inventer une glose.
 *
 *  DÉRIVÉ de `PILLAR_DEFINITIONS`, comme `PRODUCT_PILLARS.caps` : les deux
 *  listes viennent de la même source, ce qui est le point — un pilier compte
 *  structurellement autant de puces que le tableau lui compte de rangées. */
export const CAPABILITY_GROUPS: {
  title: string;
  rows: { capability: string; qualifier?: string }[];
}[] = PILLAR_DEFINITIONS.map((pillar) => ({
  title: pillar.name,
  rows: pillar.rows.map((row) =>
    row.qualifier ? { capability: row.capability, qualifier: row.qualifier } : { capability: row.capability }
  ),
}));
