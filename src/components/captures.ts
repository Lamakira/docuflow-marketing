/** Les quatre dessins de `CaptureThumb.astro`. Une rangée de vignettes
 *  identiques a été refusée en revue (`docs/mockup-corrections.md`) : un
 *  appelant qui en pose plusieurs les fait tourner avec
 *  `CAPTURE_VARIANTS[i % CAPTURE_VARIANTS.length]`. Vit hors du composant parce
 *  qu'un fichier `.astro` ne peut exporter que des types. */
export const CAPTURE_VARIANTS = ["code", "sheet", "doc", "split"] as const;
export type CaptureVariant = (typeof CAPTURE_VARIANTS)[number];
