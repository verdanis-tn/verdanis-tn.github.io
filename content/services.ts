import type { Service } from "@/lib/types";
import { images } from "./images";

/**
 * Core business areas (brief §6). Item lists describe the service offer;
 * the detailed scope of each must be confirmed by the company (see report).
 */
export const services: Service[] = [
  {
    key: "green-spaces",
    order: 1,
    tone: "dawn",
    image: images.greenSpaces,
    title: {
      fr: "Entretien des espaces verts",
      ar: "صيانة المساحات الخضراء",
      en: "Green Space Maintenance",
    },
    summary: {
      fr: "Entretien régulier des jardins, parcs, squares et espaces végétalisés publics, dans une logique de continuité de service tout au long de l'année.",
      ar: "صيانة منتظمة للحدائق والمنتزهات والساحات والفضاءات الخضراء العمومية، بما يضمن استمرارية الخدمة على مدار السنة.",
      en: "Year-round upkeep of public gardens, parks, squares and planted areas, delivered with continuity of service in mind.",
    },
    items: {
      fr: [
        "Tonte et entretien des surfaces engazonnées",
        "Taille des haies, arbustes et massifs",
        "Désherbage et entretien des massifs plantés",
        "Arrosage et suivi de l'état sanitaire des végétaux",
        "Ramassage et évacuation des déchets verts",
        "Propreté des allées et des abords",
      ],
      ar: [
        "قصّ العشب وصيانة المساحات المعشوشبة",
        "تشذيب السياجات النباتية والشجيرات وأحواض الزهور",
        "إزالة الأعشاب الضارة وصيانة الأحواض المغروسة",
        "الري ومتابعة الحالة الصحية للنباتات",
        "جمع الفضلات الخضراء ونقلها",
        "تنظيف الممرات والمحيط",
      ],
      en: [
        "Mowing and lawn care",
        "Pruning of hedges, shrubs and planted beds",
        "Weeding and bed maintenance",
        "Watering and plant-health monitoring",
        "Collection and removal of green waste",
        "Cleaning of paths and surroundings",
      ],
    },
  },
  {
    key: "infrastructure-landscape",
    order: 2,
    tone: "noon",
    image: images.highway,
    title: {
      fr: "Maintenance paysagère des infrastructures",
      ar: "الصيانة النباتية لمحيط البنية التحتية",
      en: "Infrastructure Landscape Maintenance",
    },
    summary: {
      fr: "Entretien de la végétation qui accompagne les infrastructures routières et autoroutières : terre-pleins centraux, accotements, talus et abords d'ouvrages.",
      ar: "صيانة الغطاء النباتي المحاذي للطرقات والطرقات السيارة: الفواصل الوسطى والحواشي والمنحدرات ومحيط المنشآت.",
      en: "Upkeep of the vegetation that lines road and motorway infrastructure — central reservations, verges, embankments and the surroundings of structures.",
    },
    items: {
      fr: [
        "Entretien végétal des terre-pleins centraux",
        "Entretien des accotements et des talus",
        "Maintien de la visibilité et des dégagements de sécurité",
        "Interventions sur de longs linéaires",
      ],
      ar: [
        "صيانة الغطاء النباتي في الفواصل الوسطى",
        "صيانة الحواشي والمنحدرات",
        "الحفاظ على مدى الرؤية ومسافات الأمان",
        "التدخل على امتدادات طويلة من الطرقات",
      ],
      en: [
        "Vegetation upkeep on central reservations",
        "Maintenance of verges and embankments",
        "Preserving sightlines and safety clearances",
        "Work along extended linear sections",
      ],
    },
  },
  {
    key: "roadside-cleaning",
    order: 3,
    tone: "mist",
    image: images.roadside,
    title: {
      fr: "Nettoyage et entretien des abords routiers",
      ar: "تنظيف وصيانة جوانب الطرقات",
      en: "Roadside Cleaning and Maintenance",
    },
    summary: {
      fr: "Interventions manuelles de nettoyage des abords routiers, de curage des avaloirs et d'entretien courant, pour des axes propres, sûrs et bien drainés.",
      ar: "تدخلات يدوية لتنظيف جوانب الطرقات وتسريح بالوعات مياه الأمطار والصيانة الاعتيادية، من أجل محاور نظيفة وآمنة وجيدة التصريف.",
      en: "Manual roadside cleaning, drainage-inlet clearing and routine upkeep, keeping corridors clean, safe and properly drained.",
    },
    items: {
      fr: [
        "Nettoyage manuel des abords et des accotements",
        "Ramassage et évacuation des déchets",
        "Curage des avaloirs d'eaux pluviales",
        "Entretien des espaces verts d'accompagnement",
        "Travaux d'entretien des chaussées",
      ],
      ar: [
        "التنظيف اليدوي لجوانب الطرقات وحواشيها",
        "جمع الفضلات ونقلها",
        "تسريح بالوعات مياه الأمطار",
        "صيانة المساحات الخضراء المحاذية",
        "أشغال صيانة قارعة الطريق",
      ],
      en: [
        "Manual cleaning of roadsides and verges",
        "Litter collection and removal",
        "Clearing of stormwater drainage inlets",
        "Upkeep of adjoining green areas",
        "Carriageway maintenance works",
      ],
    },
  },
  {
    key: "vegetation-management",
    order: 4,
    tone: "gold",
    image: images.clearing,
    title: {
      fr: "Gestion de la végétation et débroussaillage",
      ar: "إدارة الغطاء النباتي وإزالة الأعشاب",
      en: "Vegetation Management and Clearing",
    },
    summary: {
      fr: "Désherbage, fauchage et débroussaillage des terre-pleins, accotements et talus, notamment lors des campagnes estivales où la végétation sèche accroît les risques.",
      ar: "إزالة الأعشاب وجزّ الحشائش وتنظيف الفواصل الوسطى والحواشي والمنحدرات، لا سيما خلال الحملات الصيفية حين يزيد الغطاء النباتي الجاف من المخاطر.",
      en: "Weeding, mowing and brush clearing on central reservations, verges and embankments — particularly during summer campaigns, when dry vegetation increases risk.",
    },
    items: {
      fr: [
        "Désherbage des terre-pleins centraux et des abords",
        "Fauchage et débroussaillage",
        "Évacuation des résidus végétaux",
        "Campagnes saisonnières planifiées",
      ],
      ar: [
        "إزالة الأعشاب من الفواصل الوسطى وجوانب الطريق",
        "جزّ الحشائش وإزالة الأحراش",
        "نقل البقايا النباتية",
        "حملات موسمية مبرمجة",
      ],
      en: [
        "Weeding of central reservations and verges",
        "Mowing and brush clearing",
        "Removal of plant residues",
        "Planned seasonal campaigns",
      ],
    },
  },
  {
    key: "agronomy",
    order: 5,
    tone: "dusk",
    image: images.irrigation,
    title: {
      fr: "Irrigation et expertise agronomique",
      ar: "الري والخبرة الزراعية",
      en: "Irrigation and Agronomic Expertise",
    },
    summary: {
      fr: "L'entreprise est dirigée par un ingénieur agronome. Sa formation, enrichie d'une expérience de terrain dans la conduite d'exploitations agricoles, éclaire chacune de nos interventions sur le végétal.",
      ar: "يتولى إدارة المؤسسة مهندس فلاحي، تُثري تكوينَه خبرةٌ ميدانية في تسيير الضيعات الفلاحية، وهو ما ينعكس على كل تدخلاتنا في الوسط النباتي.",
      en: "The company is led by an agricultural engineer whose hands-on experience in farm management informs every intervention we carry out on living plants.",
    },
    itemsHeading: {
      fr: "Expertise du dirigeant",
      ar: "خبرة مدير المؤسسة",
      en: "The director's expertise",
    },
    items: {
      fr: [
        "Systèmes d'irrigation, en particulier le goutte-à-goutte",
        "Estimation des besoins en eau des cultures (CROPWAT)",
        "Conduite technique des plantations : taille, fertilisation, protection phytosanitaire",
        "Arboriculture, oléiculture et cultures maraîchères, y compris en mode biologique",
      ],
      ar: [
        "أنظمة الري، ولا سيما الري قطرة قطرة",
        "تقدير الحاجيات المائية للزراعات (برنامج CROPWAT)",
        "التسيير الفني للغراسات: التقليم والتسميد والوقاية النباتية",
        "الأشجار المثمرة والزياتين والزراعات الخضرية، بما في ذلك الزراعة البيولوجية",
      ],
      en: [
        "Irrigation systems, drip irrigation in particular",
        "Crop water requirement estimation (CROPWAT)",
        "Technical crop management: pruning, fertilisation, plant protection",
        "Orchards, olive groves and vegetable crops, including organic production",
      ],
    },
    note: {
      fr: "Cette expertise relève du parcours professionnel du dirigeant. Elle oriente nos pratiques d'entretien — arrosage, choix des périodes d'intervention, suivi sanitaire des végétaux — sans constituer, à ce stade, une prestation contractuelle distincte.",
      ar: "تندرج هذه الخبرة ضمن المسار المهني لمدير المؤسسة، وهي توجّه ممارساتنا في الصيانة — من ري واختيار لفترات التدخل ومتابعة للحالة الصحية للنباتات — دون أن تمثّل في هذه المرحلة خدمة تعاقدية مستقلة.",
      en: "This expertise comes from the director's own professional background. It shapes how we maintain plants — watering, timing of interventions, plant-health monitoring — but is not, at this stage, offered as a separate contracted service.",
    },
  },
];
