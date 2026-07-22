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

export const SECTORS = [
  { tag: "agency", name: "Digital agencies", href: "/solutions/digital-agencies" },
  { tag: "software", name: "Development teams", href: "/solutions/software-teams" },
  { tag: "advisory", name: "Consulting firms", href: "/solutions/consulting-firms" },
  { tag: "finance", name: "Accountants", href: "/solutions/accounting-firms" },
  { tag: "legal", name: "Legal services", href: "/solutions/legal-services" },
  { tag: "outsourcing", name: "BPO teams", href: "/solutions/bpo-call-centers" },
  { tag: "field", name: "Construction", href: "/solutions/construction" },
  { tag: "placement", name: "Staffing agencies", href: "/solutions/staffing-agencies" },
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
