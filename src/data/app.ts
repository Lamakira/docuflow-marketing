/**
 * L'application, vue du site.
 *
 * ADR-0002 donne les surfaces d'identification et l'entrée en essai à
 * l'application. Le site ne construit donc ni `/signup`, ni `/signin`, ni
 * aucune autre page qui demanderait un mot de passe : il pointe vers celle qui
 * les porte. Deux autorités pour un même écran de connexion, c'est exactement
 * ce que l'ADR refuse.
 *
 * L'hôte de cette application change d'un environnement à l'autre — aujourd'hui
 * l'environnement parallèle, demain un domaine de production — donc il est une
 * variable validée à la compilation (`APP_URL`, voir `astro.config.mjs`) et
 * jamais un littéral dans un composant.
 *
 * Ce module est le SEUL endroit du site qui sache à quoi ressemble une URL de
 * l'application. Les composants importent une destination finie ; aucun ne
 * concatène une base. Le jour où une route de l'application est renommée, il y
 * a une ligne à changer, pas huit fichiers à relire.
 */
import { APP_URL } from "astro:env/server";
import type { Plan } from "./site";

/** `https://exemple.ca/` et `https://exemple.ca` doivent produire le même lien. */
const base = APP_URL.replace(/\/+$/, "");

/** L'inscription en libre-service, rouverte par #230.
 *
 *  `/signup` et non `/sign-up` : les deux mènent au même écran, mais c'est
 *  cette graphie-là que `client/src/App.tsx` a ajoutée au routeur pour les
 *  liens de ce site — la route canonique de l'application reste `/sign-up`. */
export const APP_SIGN_UP = `${base}/signup`;

/** La connexion. Clerk possède le formulaire (ADR-0007) ; `/auth` est la route
 *  de l'application qui l'affiche. Le site pointait vers un `/signin` qu'il
 *  n'a jamais construit — c'est précisément le lien mort que #231 retire. */
export const APP_SIGN_IN = `${base}/auth`;

/** Inscription depuis une carte tarifaire. Le plan continue de voyager dans
 *  l'URL comme avant : l'application ne le lit pas encore, mais le retirer
 *  perdrait la seule trace de ce que le visiteur avait choisi en cliquant.
 *
 *  Prend un `Plan` et non son nom, comme `planPrice` et `planYearly` : les deux
 *  appelants en tiennent un, et un plan qui cesserait d'exister casserait alors
 *  le build au lieu de produire une URL vers un plan inconnu. */
export const appSignUpWithPlan = (plan: Plan): string =>
  `${APP_SIGN_UP}?plan=${encodeURIComponent(plan.name.toLowerCase())}`;
