/**
 * Reveal « drapé » — bascule `rotateX` charnière en haut, arrivée amortie,
 * cascade des éléments d'une section.
 *
 * Extrait de `PillarSection.astro` le 24 juillet 2026, quand la page `/product`
 * a eu besoin du même comportement sur trois sections qui ne sont pas des
 * piliers d'accueil. Un module partagé plutôt qu'un second exemplaire du script :
 * importé par plusieurs composants d'une même page, il ne s'exécute qu'une fois
 * (module ES), et il n'y a qu'un seul endroit où régler l'allure.
 *
 * Contrat du balisage — deux crochets, aucune classe :
 *   [data-reveal-group]  la section observée
 *   [data-reveal]        les éléments qui arrivent, DANS L'ORDRE de la cascade
 *
 * L'état masqué est posé par `gsap.set()`, jamais par une règle CSS : script
 * absent ou en échec, rien n'est caché et la page reste lisible.
 */
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Réversibilité à l'essai : le reveal se rejoue dans les deux sens, aux deux
 *  bords du trigger. Si le fondu de sortie par le haut se révèle distrayant,
 *  repasser en déclenchement unique tient en une ligne — remplacer par :
 *  const TOGGLE_ACTIONS = "play none none none";
 *  Ordre des quatre actions : onEnter, onLeave, onEnterBack, onLeaveBack. */
const TOGGLE_ACTIONS = "play reverse play reverse";

/** Réglages de direction artistique — les deux seuls chiffres à toucher pour
 *  régler l'allure. Ils se lisent ensemble, pas séparément : c'est leur RAPPORT
 *  qui décide si la cascade se lit ou non.
 *
 *  Avec 0,7 s et 0,09 s de décalage, les trois fenêtres d'animation étaient
 *  [0–0,70] [0,09–0,79] [0,18–0,88] : plus de 90 % de recouvrement. À l'aller
 *  l'étoffe arrivait quasiment d'un bloc, et au retour les trois éléments se
 *  dissolvaient ensemble — l'ordre inverse existait dans la timeline mais
 *  restait invisible. D'où : durée plus longue, et surtout décalage bien plus
 *  ample par rapport à elle.
 *
 *  Fenêtres actuelles : [0–1,00] [0,22–1,22] [0,44–1,44]. */
const REVEAL_DURATION = 1;
const REVEAL_STAGGER = 0.22;

/** Combien de pixels de la section doivent être dans la fenêtre pour qu'elle
 *  compte comme « à l'écran ». Sert aux DEUX bornes, donc à l'apparition comme
 *  à la disparition, dans les deux sens de défilement. Trop petit : le reveal
 *  se joue pendant que la section est encore sous la ligne de flottaison et on
 *  n'en voit que la fin. Trop grand : elle se vide sous les yeux du lecteur. */
const ENTER_MARGIN = 120;

const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]");

if (groups.length) {
  const mm = gsap.matchMedia();

  // Mouvement réduit : pas de version raccourcie, pas d'animation du tout.
  // La branche n'est jamais montée, donc `gsap.set()` n'est jamais appelé et
  // le contenu n'a jamais d'état masqué à récupérer.
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    groups.forEach((group) => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", group);
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y: 12, rotationX: 15, transformOrigin: "top center" });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: REVEAL_DURATION,
        // Charnière amortie : léger dépassement puis retour au repos. C'est ce
        // dépassement qui distingue « se poser » de « claquer » — il doit se
        // sentir sans se voir. Au-delà de ~1.4 il devient un rebond visible.
        ease: "back.out(1.2)",
        // La cascade est l'ingrédient qui fait lire de l'étoffe plutôt qu'une
        // planche. Une arrivée simultanée tue l'effet.
        //
        // Décalage POSITIF, jamais `from: "end"` : `reverse()` rejoue la
        // timeline à l'envers, donc le dernier parti est le premier à repartir.
        // L'ordre de sortie est le miroir exact de l'entrée, et il vient de la
        // timeline elle-même. Inverser le stagger ici casserait l'entrée pour
        // « corriger » une sortie déjà juste.
        stagger: REVEAL_STAGGER,
        scrollTrigger: {
          trigger: group,
          // Les deux bornes disent la même chose des deux côtés : « au moins
          // ENTER_MARGIN px de la section sont dans la fenêtre ». La section
          // se révèle en entrant et ne se replie qu'une fois VRAIMENT sortie,
          // par le haut comme par le bas.
          //
          // L'ancien couple `top 80%` / `bottom 20%` posait la ligne à 20% À
          // L'INTÉRIEUR de la fenêtre. En descendant ça allait — on ne voit pas
          // ce qui sort par le haut. En remontant, la même ligne servait à
          // MASQUER : la section se vidait alors qu'il en restait un cinquième
          // à l'écran, sous les yeux du lecteur. Une borne ne peut pas servir
          // d'entrée dans un sens et de sortie dans l'autre sans ce défaut.
          start: `top bottom-=${ENTER_MARGIN}`,
          end: `bottom top+=${ENTER_MARGIN}`,
          // Jamais `scrub` : lier la progression au défilement remplacerait
          // l'amorti par la vitesse de scroll de l'utilisateur, c'est-à-dire
          // exactement l'effet recherché en moins.
          toggleActions: TOGGLE_ACTIONS,
        },
      });
    });
  });

  // Les polices auto-hébergées changent la hauteur des blocs : les positions
  // mesurées au premier paint seraient fausses. `refresh()` recalcule tous les
  // triggers de la page, y compris ceux posés par StackFold.
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}
