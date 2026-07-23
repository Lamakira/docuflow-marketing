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

export const PLANS = [
  {
    name: "Starter",
    price: "$7",
    note: "Solo & very small teams. Timer, screenshots, one client.",
    cta: "Start free trial",
    featured: false,
  },
  {
    name: "Growth",
    price: "$14",
    note: "The full stack: time, monitoring, CRM, docs & AI.",
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Business",
    price: "$22",
    note: "Advanced analytics, roles and payroll exports.",
    cta: "Start free trial",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "SSO, data residency and a dedicated contact.",
    cta: "Talk to us",
    featured: false,
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
