/**
 * Animation INTERNE des illustrations de section (`src/components/art/`).
 *
 * Ce n'est pas un second reveal — `src/scripts/reveal.ts` fait arriver le bloc
 * entier, celui-ci fait vivre l'intérieur du dessin : des rangées qui se posent,
 * des barres qui poussent, un trait qui se trace.
 *
 * ⚠️ **Ne PAS mettre `data-reveal` sur l'enveloppe d'une illustration.** Les deux
 * scripts se composent techniquement, mais ça fait deux ScrollTrigger pour un
 * seul travail : l'enveloppe reste à `opacity: 0` pendant que ses enfants jouent
 * leur cascade à vide, et l'arrivée dépend alors de deux déclencheurs au lieu
 * d'un. Constaté à l'écran sur « By use case ». **La cascade interne EST
 * l'arrivée du dessin** — le reveal reste pour le texte à côté.
 *
 * Contrat du balisage — un crochet de groupe, quatre crochets d'effet :
 *   [data-art]        le bloc observé — un `<svg>` OU un élément HTML : les
 *                     dessins du site sont majoritairement des cartes dessinées
 *                     en DOM (voir `product/mockups/`), pas du vectoriel
 *   [data-art-in]     arrive en fondu, léger décalage vertical (l'ordre du DOM
 *                     EST l'ordre de la cascade)
 *   [data-art-grow]   pousse depuis sa base (barres verticales)
 *   [data-art-fill]   se remplit depuis la gauche (jauges, compteurs) — c'est
 *                     le mouvement qui se VOIT le mieux, donc il est réservé au
 *                     chiffre qui porte la section
 *   [data-art-draw]   se trace (connecteurs) via stroke-dashoffset, SVG seulement
 *   [data-art-pop]    apparaît en dernier avec un léger dépassement — réservé à
 *                     CE QUI PORTE L'ARGUMENT du dessin, jamais à la décoration
 *
 * Deux propriétés reprises de `reveal.ts`, pour les mêmes raisons :
 *  - **L'état masqué est posé par `gsap.set()`**, jamais par une règle CSS.
 *    Script absent ou en échec : le dessin est simplement là, entier.
 *  - **`prefers-reduced-motion` : pas d'animation du tout**, pas une version
 *    raccourcie. La branche `matchMedia` n'est alors jamais montée, donc
 *    `gsap.set()` n'est jamais appelé et il n'y a aucun état à récupérer.
 *
 * Un module ES ne s'exécute qu'une fois par document, quel que soit le nombre de
 * composants qui l'importent.
 */
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Mêmes bornes que le reveal : les deux disent « au moins 120px du bloc sont
 *  dans la fenêtre », des deux côtés, donc le dessin ne se joue jamais sous la
 *  ligne de flottaison ni ne se vide sous les yeux du lecteur. */
const ENTER_MARGIN = 120;
const TOGGLE_ACTIONS = "play reverse play reverse";

type Drawable = HTMLElement | SVGElement;

const groups = gsap.utils.toArray<Drawable>("[data-art]");

if (groups.length) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    groups.forEach((group) => {
      const pick = (selector: string) => gsap.utils.toArray<Drawable>(selector, group);

      const rise = pick("[data-art-in]");
      const grow = pick("[data-art-grow]");
      const fill = pick("[data-art-fill]");
      const draw = pick("[data-art-draw]");
      const pop = pick("[data-art-pop]");

      if (!rise.length && !grow.length && !fill.length && !draw.length && !pop.length) return;

      // 12px et non 8 : en dessous, l'arrivée ne se voit pas — le reproche fait
      // à la première version était « c'est statique », et il était fondé.
      if (rise.length) gsap.set(rise, { opacity: 0, y: 12 });
      // Origine en bas : une barre pousse depuis sa base, elle ne se dilate pas
      // depuis son centre.
      if (grow.length) gsap.set(grow, { scaleY: 0, transformOrigin: "50% 100%" });
      // Origine à gauche : une jauge se remplit, elle ne s'étire pas.
      if (fill.length) gsap.set(fill, { scaleX: 0, transformOrigin: "0% 50%" });
      if (pop.length) gsap.set(pop, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });

      // Le tracé se fait en pointillé d'une seule longueur, décalé de sa propre
      // longueur : le trait existe, il est juste entièrement hors de lui-même.
      draw.forEach((el) => {
        const length = (el as SVGGeometryElement).getTotalLength?.() ?? 0;
        if (length) gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: group,
          start: `top bottom-=${ENTER_MARGIN}`,
          end: `bottom top+=${ENTER_MARGIN}`,
          // Jamais `scrub` : lier au défilement remplacerait l'amorti par la
          // vitesse de la molette, c'est-à-dire l'effet recherché en moins.
          toggleActions: TOGGLE_ACTIONS,
        },
      });

      // Les quatre familles démarrent en léger décalage plutôt qu'en cascade
      // stricte : le dessin se construit, il ne se déroule pas comme une liste.
      if (rise.length)
        timeline.to(rise, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }, 0);
      if (grow.length)
        timeline.to(grow, { scaleY: 1, duration: 0.55, stagger: 0.06, ease: "power2.out" }, 0.1);
      // Le remplissage est long exprès : c'est le seul mouvement qu'on regarde
      // vraiment se produire, tous les autres ne font qu'arriver.
      if (fill.length)
        timeline.to(fill, { scaleX: 1, duration: 0.9, stagger: 0.12, ease: "power2.inOut" }, 0.2);
      if (draw.length)
        timeline.to(
          draw,
          { strokeDashoffset: 0, duration: 0.7, stagger: 0.06, ease: "power1.inOut" },
          0.15
        );
      // En dernier, et c'est le point : ce qui porte l'argument arrive une fois
      // le décor posé, sinon il se perd dedans.
      if (pop.length)
        timeline.to(
          pop,
          { opacity: 1, scale: 1, duration: 0.45, stagger: 0.07, ease: "back.out(1.6)" },
          0.35
        );
    });
  });

  // Les polices auto-hébergées changent la hauteur des blocs : les positions
  // mesurées au premier paint seraient fausses.
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}
