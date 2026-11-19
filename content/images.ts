import type { ImageRef } from "@/lib/types";
import type { L } from "@/lib/i18n";

/**
 * ILLUSTRATIVE IMAGES ONLY. Free-licence stock photographs (see
 * public/images/illustrative/credits.json). They are captioned
 * "Image d'illustration" on the site and must be replaced by genuine,
 * correctly attributed project photographs before production.
 */
const illus = (file: string, alt: L): ImageRef => ({
  src: `/images/illustrative/${file}`,
  alt,
  illustrative: true,
});

export const images = {
  hero: illus("public-space.jpg", {
    fr: "Promenade méditerranéenne bordée de palmiers au coucher du soleil",
    ar: "ممشى متوسطي تحفّه أشجار النخيل عند غروب الشمس",
    en: "Palm-lined Mediterranean promenade at sunset",
  }),
  greenSpaces: illus("green-spaces.jpg", {
    fr: "Entretien d'un espace vert public",
    ar: "صيانة مساحة خضراء عمومية",
    en: "Maintenance of a public green space",
  }),
  roadside: illus("roadside.jpg", {
    fr: "Avenue bordée d'espaces végétalisés",
    ar: "طريق تحفّه مساحات خضراء",
    en: "Avenue lined with planted verges",
  }),
  highway: illus("highway.jpg", {
    fr: "Autoroute traversant un paysage rural méditerranéen",
    ar: "طريق سيارة تعبر مشهدا ريفيا متوسطيا",
    en: "Motorway crossing a Mediterranean rural landscape",
  }),
  clearing: illus("vegetation-clearing.jpg", {
    fr: "Débroussaillage des abords d'une route",
    ar: "إزالة الأعشاب على جوانب طريق",
    en: "Vegetation clearing along a road",
  }),
  publicSpace: illus("public-space.jpg", {
    fr: "Espace public entretenu",
    ar: "فضاء عمومي معتنى به",
    en: "Well-maintained public space",
  }),
  irrigation: illus("irrigation.jpg", {
    fr: "Lignes d'irrigation goutte-à-goutte",
    ar: "خطوط الري قطرة قطرة",
    en: "Drip irrigation lines",
  }),
  olives: illus("olive-landscape.jpg", {
    fr: "Paysage d'oliveraie",
    ar: "مشهد لغابة زيتون",
    en: "Olive grove landscape",
  }),
  palms: illus("palm-avenue.jpg", {
    fr: "Allée bordée de palmiers",
    ar: "ممر تحفّه أشجار النخيل",
    en: "Palm-lined avenue",
  }),
  foliage: illus("foliage.jpg", {
    fr: "Feuillage méditerranéen",
    ar: "أوراق نباتات متوسطية",
    en: "Mediterranean foliage",
  }),
} satisfies Record<string, ImageRef>;
