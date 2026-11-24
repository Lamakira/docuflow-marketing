# Audit des claims et des visuels — 23 novembre 2026

Passe demandée après l'appel d'équipe du 23 novembre : remplacer les visuels provisoires et
**ne plus annoncer ce que l'application ne fait pas aujourd'hui**.

Référence : l'application `techma-documentation-platform` (branche `fix/v2-dossier-review`,
`6c79e4e` — elle ne diffère de `main` que par des corrections de la fiche projet). **L'interface v2
est la seule servie aux clients** (`client/src/lib/featureFlags.ts` : `webAppV2` est `prod: true` ;
`client/src/App.tsx` rend `V2AuthenticatedApp`). Une fonction qui n'existe qu'en v1, ou qu'en route
d'API sans écran v2, ou qu'en clé de plan, compte donc comme **non livrée**.

Les preuves complètes, ligne par ligne, sont dans les deux rapports d'audit conservés hors dépôt
(`side-session-notes/…/audit-product-pricing-home.md` et `audit-solutions.md`). Ce document garde les
décisions et la preuve principale de chacune.

Toute phrase changée ici est de la copy **non signée** : elle repasse par Masdouk (voir « À faire »
dans `AGENTS.md`).

---

## 1. Visuels provisoires

| Fichier | Page | Ce que c'était | Remplacé par |
|---|---|---|---|
| `sections/Hours.astro` | `/` (pilier heures) | 4 vignettes rayées 45° « image retenue » | 4 écrans dessinés distincts (éditeur, tableur, document, maquette) — `CaptureThumb` |
| `sections/StackFold.astro` | `/` (pile) | 6 + 4 tuiles rayées (carte monitoring, carte DocuFlow) | vignettes `CaptureThumb` en petite taille, registre sombre sur la carte DocuFlow |
| `sections/Documentation.astro` | `/` (pilier docs) | fond rayé derrière le bloc de code | fond `paper` uni |
| `solutions/mockups/WeekMock.astro` | `/solutions/remote-teams`, `/solutions/hybrid-teams` | vignettes rayées par jour | `CaptureThumb` petite taille, variantes qui tournent d'un jour à l'autre |
| `solutions/mockups/SilenceMock.astro` | `/solutions/remote-teams` | vignettes rayées sous les jours enregistrés | `CaptureThumb` |
| `sections/ProofBand.astro` + `PROOF_STATS` | `/` (bande sous le héros) | 184,200 h · 2.6M captures · 11,400 docs · 1,340 projets — **inventés** | bande **retirée** (avec sa phrase « runs TECHMA's own operations », non approuvée) |
| `art/RedactedArt.astro` | les 8 pages secteur (objection) | capture dont le contenu est rayé = dessin du floutage | redessinée : la capture suit le chrono (4 vignettes sur le segment « en cours », rien après l'arrêt) |

**Vraies captures de l'app v2 sur `/product`.** Prises dans l'app locale, Workspace de démonstration
(`scripts/seed-demo.ts` : Northwind Logistics, Atlas warehouse rollout…), après connexion de
l'utilisateur. Le seul membre du Workspace est une vraie personne : son nom et sa photo ont été
remplacés **dans la page**, juste avant la capture, par « Ana Ruiz » et des initiales (décision du
23 novembre). Rien d'autre n'a été retouché. Une ligne de test interne (« CLIENT 1 / TECHMA ») est
restée hors champ.

| Pilier `/product` | Avant | Après |
|---|---|---|
| Time | `TimerMock` (dessin) | `src/assets/screens/time-entries.png` — Time Tracking, entrées par projet et tâche |
| Clients | `ClientMock` (dessin) | `src/assets/screens/project-dossier.png` — fiche projet, 23.0 h sur 120 h |
| Knowledge | `AnswerMock` (dessin) | `src/assets/screens/project-documentation.png` — arbre de pages et éditeur dans la fiche projet |
| Activity | `EvidenceMock` | **gardé dessiné** : la démo n'a aucune capture ni mesure d'activité, l'écran réel est vide |

**Accueil, deuxième passe (même jour, à la demande de l'utilisateur)** :

| Section de l'accueil | Avant | Après |
|---|---|---|
| Héros | carte dessinée à couches, inspecteur au survol | vraie vue projet (`project-overview.png`), même inclinaison ; l'inspecteur est retiré |
| Pile : 4 cartes d'outils | traits gris abstraits | lignes lisibles aux données d'exemple, et le trou de chaque outil en clair (« — h », « no client », « Project unknown », « 14 mo ago ») |
| Pile : carte DocuFlow | 4 mini-glyphes | vrai écran Today (`today.png`), rogné par le haut quand la pile est épinglée |
| Fiche client | maquette | vraie fiche client Northwind Logistics (`client-record.png`) |
| Heures | 4 écrans dessinés + barres | mêmes écrans, chacun avec son heure et son activité ; légende des barres réécrite (une barre par capture) |
| Documentation | maquette d'éditeur | vraie page de documentation du projet Ledger migration (`ledger-documentation.png`) |
| Réponse IA | carte question / réponse | dessin du vrai panneau « Ask DocuFlow » (mêmes libellés que l'app) ; pas de capture : l'assistant ne répond pas en local |

⚠️ Le héros affiche maintenant une vraie fiche à l'étape **ACTIVE** sous une accroche « LEAD - a new client
project » : la contradiction existait déjà avec la maquette (`docs/copy-proposals.md` §1), elle se voit
davantage. À trancher avec Masdouk.

Limites : la réponse de l'assistant (« Ask DocuFlow ») n'a pas pu être capturée — l'app locale n'a
pas de clé OpenAI (« Chat service is not configured »). Les captures font 708 à 754 px de large
(limite du panneau de navigateur) : nettes en 1x, un peu douces sur écran Retina. Les vignettes de
capture d'écran du poste (accueil, `/solutions`) restent dessinées : montrer un vrai bureau
exposerait une vraie personne.

`CaptureThumb` ne montre aucun texte, nom d'application ni heure : l'agent enregistre l'image, pas
le titre de la fenêtre (`desktop-agent/src/workers/ActivityWorker.ts`). La règle est dans `DESIGN.md`.

---

## 2. Claims — accueil, `/product`, `/pricing`

Légende : **R** réécrit · **X** retiré · **=** gardé (cité quand il était contesté).

### Ce que le produit ne fait pas du tout

| Claim | Où | | Preuve dans l'app |
|---|---|---|---|
| « Screenshots can be blurred so content is never legible » | Transparency (puce + corps), FAQ | X | aucun champ de floutage dans la politique de suivi (`shared/schema.ts`, bloc ScreenshotPolicy) ; aucun code de floutage dans l'agent ni le serveur |
| Serveur MCP « 22 tools », `search_documents`, `create_task`, `get_budget`… | `/product` (carte Platform, argument 05) | X | `mcp-server/index.ts` : 6 outils (`list_projects, get_project, list_clients, get_client, create_client, list_time_entries`), aucun sur les documents ; ni paquet ni doc client |
| Modules et champs personnalisés, 12 types | `/product` (capacité clé, spec, argument 03) | X | v2 n'a que 4 listes éditables (`client/src/v2/pipelineLists.ts`) ; l'ancien éditeur redirige |
| Attendance & presence | `/product`, comparatif `/pricing` | X | aucune table ni écran de présence |
| SSO, SCIM, data residency | carte Enterprise, comparatif, liste des cartes | X | la clé `sso` existe au registre (`planRegistry.ts`) mais rien ne la lit |
| Profitability dashboards | comparatif | X | aucun taux, coût ni marge dans le schéma |
| Export CSV d'activité | `/product` | X | le seul CSV est celui des entrées de temps (`server/routes.ts`) |
| Suppression de capture « avec motif » | `/product` | X | en v2 le bouton n'est offert qu'à une adresse interne codée en dur (`client/src/v2/activity.ts`), sans motif |
| Équipes (« Teams ») | carte Platform | R → « Invitations » | pas de table d'équipes ; invitations par e-mail avec rôle et expiration |
| « DocuFlow runs TECHMA's own operations » ; « keeps their rate » | bande de preuve, FAQ beta | X | non approuvé (`PRODUCT.md`) / non vérifiable |
| « Most teams cancel their time tracker… » | FAQ | X | aucun client externe : affirmation invérifiable |

### Ce que le produit fait autrement

| Avant | Après | Preuve |
|---|---|---|
| Le timer web « pauses itself when the screen goes idle » ; spec « 3 min idle threshold » | c'est l'agent bureau qui met en pause ; spec « 10 min default idle pause » | le timer web n'a plus de détection (`TimeTrackerContext.tsx`) ; agent : `idleTimeoutMinutes` 10 par défaut, 1–60 (`shared/schema.ts`) ; 3 min = seuil analytique seulement |
| « Timesheets… editable », « editable, with history » | « Timesheets and entry history », « built from the timer » | v2 ne sait que supprimer une entrée (`V2Time.tsx`) |
| « Automatic video transcription » ; « meeting recordings are indexed » | « Loom and Fathom transcripts, indexed » | `server/transcripts.ts` récupère la transcription existante d'un lien Loom/Fathom ; YouTube et vidéos importées ne sont pas transcrits |
| « Full-text search across everything » ; H2 « Search covers what was said » | « Search by project, page and file name » ; H2 « Ask covers what was said » | la recherche ne lit que les noms et titres (`postgresStorage.ts`) ; seul Ask lit le contenu |
| Notes « with @mentions that notify » ; notifications « mentions… by email » | « Project notes » ; « email for assignments, reminders and billing » | v2 n'a aucun moyen de mentionner (`client/src/v2` : affichage seulement) |
| Daily updates « + KPIs », « 1/day per person » | « status and blockers, team totals » | pas de champ KPI ; rien n'impose un par jour |
| Revue de captures « with a timezone selector » | « by person and date » | le sélecteur n'existe qu'en v1 |
| Rôles « Admin and member » | « Owner, administrator and member roles, plus capabilities granted per person » | `shared/schema.ts` (rôles, capacités) |
| H2 Clients « knows what the work cost » | « knows what the work took » | aucun montant n'est stocké |
| Budgets **$48,000**, « Spent $29,760 » (héros, fiche client, maquette `/product`) | **116 h**, « Tracked 71.7 h » → 62 % | le budget d'un projet est en heures (`crm_projects.budgetedHours`) |
| Maquette du score : « Activity windows », « Idle prompts », « Device uptime », « per week » | les 5 vraies entrées, le 84 **recalculé** par la formule du produit, « over the dates you pick » | `postgresStorage.ts` (calcul de l'evidence quality) |
| « Capture is scheduled to working hours only » | « No screenshot is taken while the timer is stopped » + « can be limited to working hours, or switched off entirely » | fenêtre optionnelle, désactivée par défaut, captures seulement (`ScreenCaptureWorker.ts`) |
| Source de réponse « call · Apr 3 » | « doc · Apr 3 call (Loom) » | Ask cite des documents, jamais un appel |
| FAQ Loi 25 « We provide a DPA » | « Ask us about a data processing agreement » | aucun DPA trouvable : à confirmer par TECHMA |
| FAQ essai : rien sur la durée ni la fin | « the trial lasts 14 days… turns read-only until you pick a plan » | `planRegistry.ts` (14 jours) ; `trialLifecycle.ts` (lecture seule, données gardées) |
| Blurbs secteur : « Show clients where the retainer went », « Billable hours », « What a mandate costs » | « See where… », « Client hours… », « The hours your desk spends… » | aucune vue client, aucun indicateur facturable, aucun coût |

### `/pricing` — les cartes contredisaient le registre de plans

`server/modules/billing/planRegistry.ts` (registre v2) et `featureGate.ts` :

| Rangée des cartes | Starter | Growth | Business | Enterprise | Changement |
|---|---|---|---|---|---|
| Timer & timesheets | ✓ | ✓ | ✓ | ✓ | = |
| Screenshots | **1 project** | ✓ | ✓ | ✓ | scindé de l'activité ; Starter était coché plein |
| Activity & idle | — | ✓ | ✓ | ✓ | Starter était coché, il n'a pas `activityCapture` |
| CRM & projects | — | ✓ | ✓ | ✓ | = |
| Docs & AI search | — | ✓ | ✓ | ✓ | = |
| Advanced analytics | — | — | ✓ | ✓ | = |
| Payroll exports | — | **—** | ✓ | ✓ | Starter était coché (refusé par l'API) ; Growth retiré, voir ci-dessous |
| ~~SSO & residency~~ | | | | | rangée retirée |

- **Export paie sur Growth** : l'API l'autorise dès Growth, mais le seul bouton de la v2 est sur la
  page Analytics, servie à partir de Business (`V2Analytics.tsx`). Le site suit ce qu'un client peut
  cliquer. Si l'app déplace le bouton, la case Growth revient.
- Le badge « Annual −20% » ne correspondait pas aux prix du site (−14 %, −21 %, −18 %) : « up to −21% ».
- Les montants 7 / 14 / 22 $ ne sont **pas vérifiables** dans le code (ils vivent dans Stripe) : à
  confirmer avant mise en ligne. Le bandeau « Beta pricing - subject to change » reste.

### Retirés à tort par l'audit, puis rétablis

L'audit automatique avait conclu que la v2 n'offrait ni sous-pages, ni modèles, ni réordonnancement,
ni duplication de pages, ni enregistrement audio dans les documents. C'est faux : la fiche projet v2
rend le composant partagé `client/src/components/PageTree.tsx` (glisser-déposer
`@hello-pangea/dnd`, « Duplicate », « add subpage », modèles `pageTemplates`), et
`BlockEditor.tsx` affiche le bouton micro et `AudioRecorder`. Vu à l'écran dans l'app locale. Les trois
capacités sont rétablies sur `/product`, sur le pilier docs de l'accueil et sur la page onboarding.

### Gardé après vérification (sélection)

Battement 60 s, captures 3–15 min aléatoires, fenêtre d'activité 60 s, journée de 8 h, score 0–100 et
ses paliers 75/50/25 (Business), morceaux de ~800 caractères, embeddings 1536, extraction PDF/Word/texte,
3 intégrations vidéo, kanban, historique des étapes, heures budgétées contre suivies en direct,
étiquettes, rappels par e-mail, notes audio transcrites (Whisper), clonage de projet, file hors ligne
sans double comptage, jetons de poste hachés et révocables, indicateur visible, chacun revoit ses
propres données, « No credit card ».

---

## 3. Claims — `/solutions` (14 pages)

Chaque phrase changée, page par page, avant / après / raison : **`docs/claims-audit-2026-11-23-solutions.md`**
(c'est aussi la liste à faire signer par Masdouk). Les corrections qui reviennent sur plusieurs pages :

| Claim retiré ou réécrit | Pages | Preuve |
|---|---|---|
| Captures floutées (une dizaine d'objections, « blurred by default ») | 8 secteurs, client-billing, remote, hybrid | aucun floutage nulle part ; objections reconstruites sur : captures désactivables pour tout l'espace, aucune capture chrono arrêté, fenêtre d'heures optionnelle, chacun revoit ses données |
| Budgets en $ (« $48,000 · 62% used », « $25,000 · 41% billed », « Billed $18,400 ») | agences, conseil, juridique, client-billing | budgets en heures ; les montants ne restent que dans le récit, comme chiffre du client |
| Facture produite par DocuFlow (« the invoice is a view of the record », maquette de requête à 4 200 $) | client-billing | aucune facture, aucun taux : DocuFlow garde les heures derrière la ligne, le client écrit la facture |
| Transcription « as they happen », vidéo « transcribed on upload », source « call · Apr 3 » | agences, dev, conseil, construction, staffing, onboarding | transcriptions Loom/Fathom récupérées ; Ask cite des pages |
| Recherche plein texte, « search covers what was said » | juridique, construction, onboarding | recherche par titre ; seul Ask lit le contenu |
| Entrées « editable, with history » | 9 pages + pieds des maquettes chrono | v2 : suppression seulement |
| Pause d'inactivité du timer web ; seuil 3 min ; « mark it as a call » | agences, comptables, productivité | agent seul, 10 min par défaut, réponses « I'm back » / « I'm not working », ralenti jamais compté |
| Alertes « during the night », rapport « at 07:00 », poste « with an alert » | BPO, remote | carte Warnings de la page Analytics, consultée, Business ; aucun envoi |
| Lignes de score fausses et scores impossibles (84 avec 38 captures pour 40 h…) | conseil, comptables, BPO, remote, hybrid, productivité | entrées réelles affichées, score **calculé** par la formule du produit (`evidenceScore()` dans `solutions.ts`) |
| Présence, quarts, bureau / maison, budgets par tâche, intégrations tickets, champs personnalisés, fuseau horaire, KPIs | BPO, hybrid, rentabilité, dev, conseil, juridique, staffing | non construits |
| « 4 days queued · never sent » | remote | le serveur ne voit pas ce qui n'a pas été envoyé : « last seen Tue 14:38 », poste Offline |
| « installs only on machines your organisation controls » | staffing | rien ne l'impose : tout poste appairé par code, révocable |

Dessins de `src/components/art/` corrigés en même temps : `RedactedArt` (floutage → la capture suit le
chrono), `ThinWeekArt` (84 / 38 codés en dur → dernier contact du poste, Online / Offline),
`OwnRecordArt` (« blurred », ligne « Idle · prompted », « nothing recorded », « correct »),
`DisclosureArt` (« Disclosure control », « Selected for invoice », « Editable history »).

---

## Liens vers l'application (inchangés)

Le domaine n'a pas été touché. Tous les liens passent par `src/data/app.ts` :

- `APP_SIGN_UP` = `${APP_URL}/signup` — tous les « Start free trial »
- `APP_SIGN_IN` = `${APP_URL}/auth` — « Sign in » (nav, tiroir)
- `appSignUpWithPlan(plan)` = `${APP_URL}/signup?plan=…` — cartes de `/pricing`, souches du reçu
- `APP_URL` par défaut : `https://docuflow-masdouk1.replit.app` (`astro.config.mjs`). Le `.env` local
  le pose à `http://localhost:5000`. Passer à `docuflow.techma.ai` = une valeur d'`APP_URL`, sans
  toucher au balisage.

## Passe du 24 novembre 2026 — tous les écrans dessinés remplacés

**Ce que cet audit avait raté.** La première passe avait gardé le « score de qualité 0–100 » et
affiché des valeurs (84, 96, 99…) que l'app ne montre pas. Vérifié depuis : l'interface v2 n'affiche
qu'un grade par membre (`client/src/v2/V2Analytics.tsx:457`), jamais de nombre, et ce grade est faux :
`getEvidenceQualityReport` (`server/modules/postgresStorage.ts`) somme les durées après une jointure
sur les captures. Mesuré sur l'instance isolée : 5 entrées de 8 h et 240 captures donnent
« 1920.0 h » et « 240 of 11520 ». Le score est donc retiré partout, nombre et grade. La même page
affirme pourtant « DocuFlow does not score or rank Members » (`administration.ts:1255`) : le site ne
reprend pas cette phrase, il dit seulement qu'il n'y a pas de score de productivité.

**Ce qui a remplacé les dessins.** 66 captures pour `/solutions`, 8 pour l'accueil et `/product`, sur
une instance locale isolée de l'app (base jetable, services tiers doublés, personnes et sociétés
fictives). Supprimés : `components/art/`, les deux dossiers `mockups/`, `scripts/art.ts`. Restent
dessinés : les quatre cartes d'outils de la pile et la réponse IA de l'accueil.

**À corriger dans l'app** (hors de ce dépôt) : la jointure ci-dessus, qui touche aussi le rapport de
couverture ; Switzer, déclarée mais plus servie par Fontshare ; à vérifier en production, la page
Devices de l'instance isolée annonçait « Not published yet for any platform ». L'app lit les
installeurs dans le bucket de l'environnement (`server/downloadRoutes.ts`) : sur un stockage doublé
il est vide, donc cela ne prouve rien sur la production. Le site promet Windows, macOS et Linux.

**Vérifié** : la recherche trouve une page et un projet par leur nom (instance isolée, 24 novembre).

**À trancher** : `advancedAnalytics` n'est ouvert qu'à partir de Business et couvre toute la route
`/api/admin/analytics` (`featureGate.ts:94`). Les pages `/solutions` montrent Analytics sans préciser
le plan.

