# Propositions de copy — à valider avec Masdouk

> Toute la copy à l'écran vient du handoff validé. Les modifications ci-dessous ont été
> **identifiées mais non appliquées** pendant les passes design du 22 juillet 2026
> (`layout`, `colorize`, `adapt` sur le héros). Le code actuel garde la copy d'origine.
>
> Contexte technique dans `.impeccable/critique/2026-07-22T10-41-23Z__src-components-sections-hero-astro.md`.

---

## 1. Contradiction d'étape dans le héros — *bloquant pour la crédibilité*

**Où** : `src/components/sections/Hero.astro`, ligne d'accroche.

**Actuel** :
> `LEAD` — a new client project

**Le problème.** La carte juste à côté affiche la puce `IN PROGRESS`, 71,7 h déjà pointées et
62 % d'un budget de 48 000 $ consommé. Un prospect méthodique voit la contradiction en quelques
secondes : un « nouveau projet client » qui a déjà brûlé les deux tiers de son budget. Le rail
répète `LEAD`, ce qui aggrave l'écart.

**Proposition** — garder la carte à `IN PROGRESS` (une fiche pleine est ce qui prouve le produit)
et corriger l'accroche :

> `IN PROGRESS` — one client project

**Alternative** si l'on tient à ouvrir sur `LEAD` : montrer une fiche réellement au stade `LEAD`,
avec des couches visiblement vides. « Everything a client project leaves behind » devient alors une
promesse que la page tient au fil du défilement. Plus ambitieux, plus long à produire.

---

## 2. Les quatre textes de l'inspecteur

**Où** : `src/components/sections/Hero.astro`, tableau `layers`.

**Le problème.** Chaque texte répète les valeurs déjà imprimées dans la ligne survolée. Survoler la
ligne « Client » renvoie les cinq mêmes informations que la ligne affiche déjà — l'interaction ne
paie rien et se lit comme décorative.

| Couche | Actuel | Proposé |
|---|---|---|
| `record` | Client record · 3 contacts · $48,000 budget · 62% used · 2 tags | Contacts, budget and tags live on the client — not in a separate CRM. |
| `hours` | Tracked hours · 71.7 h logged across 3 people this month | Every hour was logged against this project, by the timer that was running. |
| `shots` | Screenshots · 7 captures filed against this project today | Captures file themselves here — nobody tagged them. |
| `markers` | Tasks & documents · 4 tasks moved · 4 documents edited | Tasks and specs were written inside the project, so they stayed with it. |

Le principe : dire **le fait de rattachement**, pas relire la ligne. C'est l'argument de la page.

⚠️ Les textes proposés mélangent les échelles de temps de l'original (« this month » pour les
heures, « today » pour les captures) — l'écart existe déjà dans la version actuelle et n'est
signalé nulle part à l'écran. À arbitrer.

---

## 3. Texte de repli de l'inspecteur — *bloquant sur mobile*

**Actuel** :
> Every layer is attached to the same client project — hover to see what the record holds.

**Le problème.** Sur mobile, « hover » désigne une action impossible. Le texte occupe 3 lignes et
80 px de hauteur réservée sur un écran de 375 px pour donner une consigne inexécutable.

**Proposition** :
> Every layer is attached to the same client project. Open one to see what the record holds.

À coupler avec le gestionnaire de clic prévu dans la passe `harden`.

---

## 4. Légende des marqueurs (optionnel)

**Où** : couche `Tasks · docs` du héros.

Les marqueurs sont désormais groupés — 4 carrés puis 4 ronds — ce qui rend « quatre et quatre »
comptable à l'œil sans texte. Une légende explicite reste possible :

> `4 ▪ tasks · 4 ● documents`

Non appliqué : ajoute du texte à l'écran pour un gain marginal maintenant que le groupement porte
l'information. À trancher.

---

## 5. Deux mots déjà appliqués — à confirmer *a posteriori*

Les étiquettes de gouttière `CLIENT` et `HOURS` ont été **ajoutées** pendant la passe `layout`,
par symétrie avec `SHOTS` et `TASKS · DOCS` qui existaient déjà. Ce sont des étiquettes
structurelles d'interface, pas de la copy marketing, et la gouttière ne fonctionne pas sans elles.

Signalé ici pour que rien ne passe en douce. À retirer sur demande.
