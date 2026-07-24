/**
 * Contenu de référence du site vitrine.
 * La copy vient du handoff validé — toute modification doit repasser par Masdouk.
 */

export const STAGES = ["LEAD", "WON", "IN PROGRESS", "IN REVIEW", "COMPLETED"] as const;

export const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "#resources" },
];

/** Les quatre abonnements que DocuFlow remplace. L'ordre est repris à l'identique
 *  dans le reçu de la section COMPLETED — les deux doivent rester synchronisés. */
export const STACK = [
  { name: "CRM & projects", note: "Clients, but no hours.", price: 12 },
  { name: "Time tracker", note: "Hours, but no client.", price: 7 },
  { name: "Monitoring", note: "Screenshots, but no context.", price: 9 },
  { name: "Wiki & docs", note: "Pages nobody opens.", price: 10 },
];

export const STACK_TOTAL = STACK.reduce((sum, item) => sum + item.price, 0);
export const DOCUFLOW_PRICE = 14;

/** ⚠️ Chiffres provisoires — à remplacer par les valeurs réelles de la base
 *  avant toute mise en ligne. Le brief interdit les statistiques inventées. */
export const PROOF_STATS = [
  { value: "184,200", label: "hours tracked" },
  { value: "2.6M", label: "screenshots processed" },
  { value: "11,400", label: "documents indexed" },
  { value: "1,340", label: "client projects managed" },
];

/** `name` et `href` viennent du handoff validé (`docs/design-handoff/Homepage.dc.html`)
 *  et de la matrice de `docs/site-architecture.md` — ne pas les toucher sans Masdouk.
 *
 *  ⚠️ Les `blurb` sont des BROUILLONS, écrits ici le 23 juillet 2026, pas issus du
 *  handoff. Ils passent par Masdouk avant mise en ligne, au même titre que le reste
 *  de la copy. Chacun ne décrit que des fonctions qui existent — heures, captures,
 *  projet client, documents. Aucune promesse de conformité (HIPAA, SOC 2…) ni
 *  d'intégration tierce : ce sont des affirmations vérifiables, et au Canada une
 *  indication trompeuse relève de la Loi sur la concurrence.
 *
 *  `icon` : nom Lucide, à tenir synchronisé avec `include` dans `astro.config.mjs`
 *  — un nom absent de cette liste ne rend rien et ne casse pas le build. */
export const SECTORS = [
  {
    tag: "agency",
    name: "Digital agencies",
    blurb: "Every hour and file on the client that pays for it.",
    icon: "lucide:palette",
    href: "/solutions/digital-agencies",
  },
  {
    tag: "software",
    name: "Development teams",
    blurb: "Hours and screenshots filed against the project.",
    icon: "lucide:code-xml",
    href: "/solutions/software-teams",
  },
  {
    tag: "advisory",
    name: "Consulting firms",
    blurb: "Show clients where the retainer actually went.",
    icon: "lucide:presentation",
    href: "/solutions/consulting-firms",
  },
  {
    tag: "finance",
    name: "Accountants",
    blurb: "Billable hours backed by what happened.",
    icon: "lucide:calculator",
    href: "/solutions/accounting-firms",
  },
  {
    tag: "legal",
    name: "Legal services",
    blurb: "Time logs and documents ready for review.",
    icon: "lucide:scale",
    href: "/solutions/legal-services",
  },
  {
    tag: "outsourcing",
    name: "BPO teams",
    blurb: "Team activity without asking for a status update.",
    icon: "lucide:headset",
    href: "/solutions/bpo-call-centers",
  },
  {
    tag: "field",
    name: "Construction",
    blurb: "Site hours and captures on the right job.",
    icon: "lucide:hard-hat",
    href: "/solutions/construction",
  },
  {
    tag: "placement",
    name: "Staffing agencies",
    blurb: "Placed staff, their hours and their output.",
    icon: "lucide:user-search",
    href: "/solutions/staffing-agencies",
  },
];

/** Liste unique des fonctions listées sur les cartes de `/pricing`. Ordonnée du
 *  plus commun au plus avancé — c'est ce qui permet à `included` de n'être qu'un
 *  nombre plus bas. Libellés volontairement courts : la rangée est en
 *  `white-space: nowrap` et ne doit jamais passer à la ligne. Ne pas les rallonger. */
export const PLAN_FEATURES = [
  "Timer & timesheets",
  "Screenshots & activity",
  "Payroll exports",
  "CRM & projects",
  "Docs & AI search",
  "Advanced analytics",
  "SSO & residency",
];

/** Les quatre plans.
 *
 *  `monthly` / `annual` sont des **nombres**, jamais des libellés : le prix affiché
 *  est toujours dérivé (`planPrice`). `/pricing` bascule entre les deux, le reçu de
 *  l'accueil n'affiche que le mensuel — un seul endroit décide comment un prix s'écrit.
 *  `annual` est le tarif mensuel quand la facturation est annuelle (−20 %), pas le
 *  montant annuel : celui-ci vaut `annual × 12` (`planYearly`) et n'apparaît que sur
 *  la ligne « billed yearly ».
 *
 *  Deux notes, deux handoffs validés : `note` est la copy de la souche du reçu
 *  (accueil), `pricingNote` celle des cartes de `/pricing`. Ne pas les fusionner
 *  sans repasser par Masdouk.
 *
 *  `included` : nombre d'entrées de `PLAN_FEATURES` cochées. Les paliers sont
 *  strictement cumulatifs aujourd'hui ; si un plan cesse d'être un préfixe de la
 *  liste, remplacer ce nombre par un tableau de booléens. */
export const PLANS = [
  {
    name: "Starter",
    monthly: 7,
    annual: 6,
    note: "Solo & very small teams. Timer, screenshots, one client.",
    pricingNote: "Solo & very small teams getting off spreadsheets.",
    cta: "Start free trial",
    featured: false,
    included: 3,
  },
  {
    name: "Growth",
    monthly: 14,
    annual: 11,
    note: "The full stack: time, monitoring, CRM, docs & AI.",
    pricingNote: "The full stack - replaces all four vendors.",
    cta: "Start free trial",
    featured: true,
    included: 5,
  },
  {
    name: "Business",
    monthly: 22,
    annual: 18,
    note: "Advanced analytics, roles and payroll exports.",
    pricingNote: "Scaling ops that need control and reporting.",
    cta: "Start free trial",
    featured: false,
    included: 6,
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    note: "SSO, data residency and a dedicated contact.",
    pricingNote: "Custom terms, security and residency.",
    cta: "Talk to us",
    featured: false,
    included: 7,
  },
];

export type Plan = (typeof PLANS)[number];

/** « $7 » ou « Custom ». Enterprise n'a pas de montant, dans aucun des deux modes. */
export const planPrice = (plan: Plan, annual = false): string => {
  const amount = annual ? plan.annual : plan.monthly;
  return amount == null ? "Custom" : `$${amount}`;
};

/** Ce qui est réellement débité en facturation annuelle. `null` sur Enterprise. */
export const planYearly = (plan: Plan): number | null =>
  plan.annual == null ? null : plan.annual * 12;

/** Cellule du tableau comparatif : `true` = inclus, `false` = absent, une chaîne
 *  quand le plan a une limite plutôt qu'un oui/non (« 1 proj »). */
type Cell = boolean | string;

/** Le comparatif détaillé de `/pricing`. Les colonnes suivent l'ordre de `PLANS` —
 *  quatre cellules par rangée, ni plus ni moins. C'est la source fine dont les
 *  sept lignes des cartes ne sont que le résumé : les deux doivent rester cohérentes. */
export const COMPARISON_GROUPS: {
  title: string;
  rows: { name: string; cells: Cell[] }[];
}[] = [
  {
    title: "Time",
    rows: [
      { name: "Web timer & timesheets", cells: [true, true, true, true] },
      { name: "Attendance & presence", cells: [true, true, true, true] },
      { name: "Payroll-ready exports", cells: [false, true, true, true] },
    ],
  },
  {
    title: "Activity",
    rows: [
      { name: "Desktop agent (Win/Mac/Linux)", cells: [true, true, true, true] },
      { name: "Screenshots", cells: ["1 proj", true, true, true] },
      { name: "Activity & idle detection", cells: [false, true, true, true] },
      { name: "Advanced analytics", cells: [false, false, true, true] },
    ],
  },
  {
    title: "Clients",
    rows: [
      { name: "CRM & contacts", cells: [false, true, true, true] },
      { name: "Projects, tasks & budgets", cells: [false, true, true, true] },
      { name: "Profitability dashboards", cells: [false, false, true, true] },
    ],
  },
  {
    title: "Knowledge",
    rows: [
      { name: "Block documentation editor", cells: [false, true, true, true] },
      { name: "Video transcription", cells: [false, true, true, true] },
      { name: "AI semantic search", cells: [false, true, true, true] },
      { name: "SSO, SCIM & data residency", cells: [false, false, false, true] },
    ],
  },
];

/** Les objections avant l'achat, dans l'ordre où elles se posent. Aucune promesse
 *  de conformité : la réponse Loi 25 décrit ce que le produit fait, pas une
 *  certification qu'il n'a pas. */
export const PRICING_FAQ = [
  {
    q: "Do I really replace four subscriptions?",
    a: "Yes. Time tracking, the monitoring agent, CRM/projects and documentation all live in DocuFlow, on one bill. Most teams cancel their time tracker, monitoring tool, project board and wiki when they move over.",
  },
  {
    q: "What does the desktop agent actually record?",
    a: "Screenshots, keyboard and mouse activity levels, and idle time - filed against whatever project the timer is running on. Your team sees exactly what is captured and when, and screenshots can be blurred or limited to working hours.",
  },
  {
    q: "Is this compliant with Quebec Law 25?",
    a: "The product is built for transparent monitoring: employees can review their own data, capture is configurable and disclosed. We provide a DPA and keep monitoring visible by design rather than hidden.",
  },
  {
    q: "What happens after the free trial?",
    a: "No credit card is needed to start. When the trial ends you pick a plan; your tracked data, clients and documents stay in place.",
  },
  {
    q: "Why is pricing marked beta?",
    a: "DocuFlow currently runs TECHMA's own operations and is opening to outside teams. Prices may change as the product matures - anyone who joins during beta keeps their rate through the beta period.",
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Time tracking", href: "/product/time-tracking" },
      { label: "Monitoring", href: "/product/employee-monitoring" },
      { label: "Projects & CRM", href: "/product/crm" },
      { label: "Documentation", href: "/product/documentation" },
      { label: "AI assistant", href: "/product/ai-assistant" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Digital agencies", href: "/solutions/digital-agencies" },
      { label: "Development teams", href: "/solutions/software-teams" },
      { label: "Consulting", href: "/solutions/consulting-firms" },
      { label: "Accountants", href: "/solutions/accounting-firms" },
      { label: "Legal", href: "/solutions/legal-services" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "vs Time Doctor", href: "/compare/docuflow-vs-time-doctor" },
      { label: "vs Hubstaff", href: "/compare/docuflow-vs-hubstaff" },
      { label: "vs Toggl", href: "/compare/docuflow-vs-toggl-track" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About TECHMA", href: "/about" },
      { label: "Security", href: "/security" },
      { label: "Law 25", href: "/legal/law-25" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
