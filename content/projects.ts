import type { Category, Project } from "@/lib/types";
import { images } from "./images";

/**
 * Editorial categories used on the portfolio page (brief §5).
 */
export const categories: Category[] = [
  {
    key: "green-spaces",
    label: { fr: "Espaces verts", ar: "المساحات الخضراء", en: "Green spaces" },
    title: {
      fr: "Entretien des espaces verts de Tunis",
      ar: "الصيانة الدورية للمساحات الخضراء بتونس",
      en: "Green Space Maintenance in Tunis",
    },
  },
  {
    key: "roadside",
    label: { fr: "Abords routiers", ar: "جوانب الطرقات", en: "Roadsides" },
    title: {
      fr: "Entretien et valorisation des abords routiers",
      ar: "صيانة وتهيئة جوانب الطرقات",
      en: "Roadside Landscape Maintenance",
    },
  },
  {
    key: "highway",
    label: { fr: "Autoroutes", ar: "الطرقات السيارة", en: "Motorways" },
    title: {
      fr: "Maintenance paysagère des infrastructures autoroutières",
      ar: "الصيانة النباتية لمحيط الطرقات السيارة",
      en: "Highway Vegetation Maintenance",
    },
  },
  {
    key: "public-space",
    label: { fr: "Espaces publics", ar: "الفضاءات العامة", en: "Public spaces" },
    title: {
      fr: "Nettoyage et embellissement des espaces publics",
      ar: "تنظيف وتجميل الفضاءات العامة",
      en: "Public Space Cleaning and Beautification",
    },
  },
];

/**
 * Portfolio. Each editorial project groups one or more individual contracts,
 * kept distinguishable in `contracts` (internal register, never rendered).
 * Source: list supplied by the company (November 2026). Every entry is
 * "declared" until checked against the contract / attestation documents —
 * see the verification report (private/VERIFICATION_REPORT.md, kept out of git).
 *
 * Contract values and tender / lot numbers are intentionally NOT recorded.
 */
export const projects: Project[] = [
  {
    slug: "tunis-north-green-spaces",
    order: 1,
    featured: true,
    category: "green-spaces",
    services: ["green-spaces", "agronomy"],
    status: "ongoing",
    tone: "dawn",
    title: {
      fr: "Espaces verts de la zone Nord de Tunis",
      ar: "المساحات الخضراء بالمنطقة الشمالية لمدينة تونس",
      en: "Green Spaces of Northern Tunis",
    },
    summary: {
      fr: "Six campagnes annuelles successives d'entretien des espaces verts pour la Municipalité de Tunis.",
      ar: "ست حملات سنوية متتالية لصيانة المساحات الخضراء لفائدة بلدية تونس.",
      en: "Six successive annual green-space maintenance campaigns for the Municipality of Tunis.",
    },
    description: {
      fr: [
        "Depuis 2021, l'entreprise assure l'entretien des espaces verts de la zone Nord de Tunis dans le cadre de marchés annuels successifs passés avec la Municipalité de Tunis.",
        "Six campagnes consécutives, de 2021 à 2026, ont permis de construire une connaissance précise du patrimoine végétal du secteur, de ses particularités saisonnières et des attentes des services municipaux.",
      ],
      ar: [
        "منذ سنة 2021، تتولى المؤسسة صيانة المساحات الخضراء بالمنطقة الشمالية لمدينة تونس، في إطار صفقات سنوية متتالية مبرمة مع بلدية تونس.",
        "وقد مكّنت ست حملات متتالية، من 2021 إلى 2026، من اكتساب معرفة دقيقة بالرصيد النباتي في المنطقة وبخصوصياته الموسمية وبانتظارات المصالح البلدية.",
      ],
      en: [
        "Since 2021, the company has maintained the green spaces of Tunis's northern zone under successive annual contracts with the Municipality of Tunis.",
        "Six consecutive campaigns, from 2021 to 2026, have built a detailed knowledge of the area's planted heritage, its seasonal particularities and the expectations of the municipal services.",
      ],
    },
    scope: {
      fr: [
        "Entretien courant des espaces verts publics du secteur",
        "Interventions adaptées au cycle des saisons",
        "Coordination avec les services municipaux",
        "Continuité de service tout au long de l'année",
      ],
      ar: [
        "الصيانة الاعتيادية للمساحات الخضراء العمومية بالمنطقة",
        "تدخلات ملائمة لتعاقب الفصول",
        "التنسيق مع المصالح البلدية",
        "استمرارية الخدمة على مدار السنة",
      ],
      en: [
        "Routine upkeep of the area's public green spaces",
        "Work scheduled around the seasonal cycle",
        "Coordination with the municipal services",
        "Continuity of service throughout the year",
      ],
    },
    period: {
      fr: "2021 – 2026 · marchés annuels",
      ar: "2021 – 2026 · صفقات سنوية",
      en: "2021 – 2026 · annual contracts",
    },
    location: {
      fr: "Tunis — zone Nord",
      ar: "تونس — المنطقة الشمالية",
      en: "Tunis — northern zone",
    },
    client: { fr: "Municipalité de Tunis", ar: "بلدية تونس", en: "Municipality of Tunis" },
    image: images.greenSpaces,
    gallery: [images.roadside, images.olives],
    contracts: [2021, 2022, 2023, 2024, 2025, 2026].map((year) => ({
      id: `tunis-ev-${year}`,
      label: 'Entretien des espaces verts — Municipalité de Tunis, "zone Nord"',
      period: String(year),
      verification: "declared" as const,
    })),
  },
  {
    slug: "rr21-route-x-tunis",
    order: 2,
    featured: true,
    category: "public-space",
    services: ["roadside-cleaning", "green-spaces"],
    status: "ongoing",
    tone: "gold",
    title: {
      fr: "Axe RR21 — Route X, Tunis",
      ar: "الطريق الجهوية رقم 21 — الطريق X، تونس",
      en: "RR21 Corridor — Route X, Tunis",
    },
    summary: {
      fr: "Marché-cadre de trois ans pour le nettoyage et l'embellissement de vingt kilomètres d'un axe majeur de la capitale.",
      ar: "صفقة إطارية لمدة ثلاث سنوات لتنظيف وتجميل عشرين كيلومترا من محور رئيسي بالعاصمة.",
      en: "A three-year framework contract to clean and beautify twenty kilometres of a major corridor in the capital.",
    },
    description: {
      fr: [
        "Depuis août 2025, l'entreprise intervient dans le cadre d'un marché-cadre de trois ans portant sur le nettoyage et l'embellissement de l'axe routier RR21 — la Route X — du PK 0 au PK 20, dans le gouvernorat de Tunis.",
        "Sur vingt kilomètres d'un axe structurant de la capitale, la mission consiste à maintenir durablement la propreté des abords et la qualité paysagère d'une voie très fréquentée.",
      ],
      ar: [
        "منذ أوت 2025، تتدخل المؤسسة في إطار صفقة إطارية لمدة ثلاث سنوات تتعلق بتنظيف وتجميل الطريق الجهوية رقم 21 — الطريق X — من النقطة الكيلومترية 0 إلى النقطة الكيلومترية 20، بولاية تونس.",
        "وعلى امتداد عشرين كيلومترا من أحد المحاور الرئيسية للعاصمة، تتمثل المهمة في المحافظة بصفة دائمة على نظافة جوانب الطريق وعلى جودة المشهد الطبيعي لطريق تشهد حركة مرور كثيفة.",
      ],
      en: [
        "Since August 2025, the company has been working under a three-year framework contract to clean and beautify the RR21 regional road — Route X — from km 0 to km 20 in the Governorate of Tunis.",
        "Along twenty kilometres of one of the capital's main corridors, the task is to keep the roadsides consistently clean and the landscape well kept on a heavily used route.",
      ],
    },
    scope: {
      fr: [
        "Nettoyage des abords et des accotements",
        "Embellissement et entretien des espaces végétalisés",
        "Linéaire de 20 km en milieu urbain",
        "Interventions programmées sur la durée du marché-cadre",
      ],
      ar: [
        "تنظيف جوانب الطريق وحواشيها",
        "تجميل المساحات المغروسة وصيانتها",
        "امتداد بطول 20 كلم في وسط حضري",
        "تدخلات مبرمجة طيلة مدة الصفقة الإطارية",
      ],
      en: [
        "Cleaning of roadsides and verges",
        "Beautification and upkeep of planted areas",
        "A 20 km urban linear section",
        "Work scheduled over the life of the framework contract",
      ],
    },
    period: {
      fr: "Depuis août 2025 · marché-cadre de 3 ans",
      ar: "منذ أوت 2025 · صفقة إطارية لمدة 3 سنوات",
      en: "Since August 2025 · 3-year framework contract",
    },
    location: {
      fr: "Gouvernorat de Tunis — du PK 0 au PK 20",
      ar: "ولاية تونس — من النقطة الكيلومترية 0 إلى 20",
      en: "Governorate of Tunis — km 0 to km 20",
    },
    image: images.palms,
    gallery: [images.publicSpace, images.roadside],
    contracts: [
      {
        id: "rr21-2025",
        label:
          "Achèvement des travaux de nettoyage et d'embellissement de l'axe routier RR21 (Route X), PK 0 – PK 20, gouvernorat de Tunis — marché-cadre 3 ans",
        period: "Août 2025 (+3 ans)",
        verification: "declared",
        notes:
          "À confirmer : date de début, échéance, maître d'ouvrage, sens exact de « achèvement » (reprise d'un chantier ?).",
      },
    ],
  },
  {
    slug: "a3-motorway-beja",
    order: 3,
    featured: true,
    category: "highway",
    services: ["vegetation-management", "infrastructure-landscape"],
    status: "completed",
    tone: "noon",
    title: {
      fr: "Autoroute A3 — district de Béja",
      ar: "الطريق السيارة أ3 — إقليم باجة",
      en: "A3 Motorway — Béja District",
    },
    summary: {
      fr: "Campagne estivale de désherbage du terre-plein central et des abords, sur environ 54 kilomètres.",
      ar: "حملة صيفية لإزالة الأعشاب من الفاصل الأوسط وجوانب الطريق على امتداد نحو 54 كيلومترا.",
      en: "A summer weeding campaign on the central reservation and verges, over some 54 kilometres.",
    },
    description: {
      fr: [
        "Du 1er juillet au 30 août 2026, l'entreprise a mené une campagne de désherbage du terre-plein central et des abords de l'autoroute A3, entre les points kilométriques 66 et 120, dans le district de Béja.",
        "Conduite en pleine saison sèche sur environ 54 kilomètres, l'intervention contribue à la visibilité, à la sécurité des usagers et à la réduction du risque d'incendie de la végétation.",
      ],
      ar: [
        "من 1 جويلية إلى 30 أوت 2026، نفّذت المؤسسة حملة لإزالة الأعشاب من الفاصل الأوسط وجوانب الطريق السيارة أ3، بين النقطتين الكيلومتريتين 66 و120، بإقليم باجة.",
        "وقد أُنجز هذا التدخل في ذروة الموسم الجاف على امتداد نحو 54 كيلومترا، بما يساهم في تحسين مدى الرؤية وسلامة مستعملي الطريق والحدّ من خطر حرائق الغطاء النباتي.",
      ],
      en: [
        "From 1 July to 30 August 2026, the company ran a weeding campaign on the central reservation and verges of the A3 motorway between kilometre points 66 and 120, in the Béja district.",
        "Carried out at the height of the dry season over some 54 kilometres, the work supports visibility, road-user safety and the reduction of vegetation-fire risk.",
      ],
    },
    scope: {
      fr: [
        "Désherbage du terre-plein central",
        "Désherbage des abords",
        "Environ 54 km de linéaire autoroutier",
        "Campagne estivale de deux mois",
      ],
      ar: [
        "إزالة الأعشاب من الفاصل الأوسط",
        "إزالة الأعشاب من جوانب الطريق",
        "نحو 54 كلم من الطريق السيارة",
        "حملة صيفية لمدة شهرين",
      ],
      en: [
        "Weeding of the central reservation",
        "Weeding of the verges",
        "Some 54 km of motorway",
        "A two-month summer campaign",
      ],
    },
    period: {
      fr: "1er juillet – 30 août 2026",
      ar: "1 جويلية – 30 أوت 2026",
      en: "1 July – 30 August 2026",
    },
    location: {
      fr: "Autoroute A3 — du PK 66 au PK 120",
      ar: "الطريق السيارة أ3 — من النقطة الكيلومترية 66 إلى 120",
      en: "A3 motorway — km 66 to km 120",
    },
    image: images.highway,
    gallery: [images.clearing, images.olives],
    contracts: [
      {
        id: "a3-beja-2026",
        label:
          "Travaux de désherbage du terre-plein central et des abords, PK 66 – PK 120, autoroute A3, district de Béja",
        period: "01/07/2026 – 30/08/2026",
        verification: "declared",
        notes: "Maître d'ouvrage à confirmer et à autoriser avant publication.",
      },
    ],
  },
  {
    slug: "a1-motorway-el-jem",
    order: 4,
    featured: true,
    category: "highway",
    services: ["vegetation-management", "infrastructure-landscape"],
    status: "completed",
    tone: "dusk",
    title: {
      fr: "Autoroute A1 — district d'El Jem",
      ar: "الطريق السيارة أ1 — إقليم الجم",
      en: "A1 Motorway — El Jem District",
    },
    summary: {
      fr: "Désherbage du terre-plein central et des abords sur environ 90 kilomètres, au cœur de l'été 2026.",
      ar: "إزالة الأعشاب من الفاصل الأوسط وجوانب الطريق على امتداد نحو 90 كيلومترا، في ذروة صيف 2026.",
      en: "Weeding of the central reservation and verges over some 90 kilometres, at the height of summer 2026.",
    },
    description: {
      fr: [
        "Du 1er juillet au 30 août 2026, l'entreprise a réalisé le désherbage du terre-plein central et des abords de l'autoroute A1, entre les points kilométriques 140 et 230, dans le district d'El Jem.",
        "Menée en parallèle du chantier de l'A3, cette campagne d'environ 90 kilomètres a demandé une organisation rigoureuse des équipes sur un long linéaire, dans un délai de deux mois.",
      ],
      ar: [
        "من 1 جويلية إلى 30 أوت 2026، أنجزت المؤسسة أشغال إزالة الأعشاب من الفاصل الأوسط وجوانب الطريق السيارة أ1، بين النقطتين الكيلومتريتين 140 و230، بإقليم الجم.",
        "وقد تطلّبت هذه الحملة، التي امتدت على نحو 90 كيلومترا ونُفّذت بالتوازي مع حظيرة الطريق السيارة أ3، تنظيما محكما للفرق على امتداد طويل وفي أجل لا يتجاوز شهرين.",
      ],
      en: [
        "From 1 July to 30 August 2026, the company weeded the central reservation and verges of the A1 motorway between kilometre points 140 and 230, in the El Jem district.",
        "Run in parallel with the A3 works, this campaign of some 90 kilometres called for tightly organised crews along an extended section, within a two-month window.",
      ],
    },
    scope: {
      fr: [
        "Désherbage du terre-plein central",
        "Désherbage des abords",
        "Environ 90 km de linéaire autoroutier",
        "Chantier conduit en parallèle de l'A3",
      ],
      ar: [
        "إزالة الأعشاب من الفاصل الأوسط",
        "إزالة الأعشاب من جوانب الطريق",
        "نحو 90 كلم من الطريق السيارة",
        "حظيرة منفّذة بالتوازي مع الطريق السيارة أ3",
      ],
      en: [
        "Weeding of the central reservation",
        "Weeding of the verges",
        "Some 90 km of motorway",
        "Run in parallel with the A3 works",
      ],
    },
    period: {
      fr: "1er juillet – 30 août 2026",
      ar: "1 جويلية – 30 أوت 2026",
      en: "1 July – 30 August 2026",
    },
    location: {
      fr: "Autoroute A1 — du PK 140 au PK 230",
      ar: "الطريق السيارة أ1 — من النقطة الكيلومترية 140 إلى 230",
      en: "A1 motorway — km 140 to km 230",
    },
    image: images.clearing,
    gallery: [images.highway, images.olives],
    contracts: [
      {
        id: "a1-eljem-2026",
        label:
          "Travaux de désherbage du terre-plein central et des abords, PK 140 – PK 230, autoroute A1, district d'El Jem",
        period: "01/07/2026 – 30/08/2026",
        verification: "declared",
        notes: "Maître d'ouvrage à confirmer et à autoriser avant publication.",
      },
    ],
  },
  {
    slug: "roadside-maintenance-2022-2023",
    order: 5,
    featured: false,
    category: "roadside",
    services: ["roadside-cleaning", "green-spaces"],
    status: "completed",
    tone: "mist",
    title: {
      fr: "Abords routiers : nettoyage, avaloirs et espaces verts",
      ar: "جوانب الطرقات: التنظيف وتسريح البالوعات وصيانة المساحات الخضراء",
      en: "Roadsides: Cleaning, Drainage Inlets and Green Areas",
    },
    summary: {
      fr: "Une année d'interventions manuelles sur les abords routiers, du nettoyage au curage des avaloirs.",
      ar: "سنة من التدخلات اليدوية على جوانب الطرقات، من التنظيف إلى تسريح البالوعات.",
      en: "A year of manual roadside works, from litter clearance to drainage-inlet clearing.",
    },
    description: {
      fr: [
        "De septembre 2022 à août 2023, l'entreprise a réalisé des travaux d'intervention manuelle combinant le nettoyage des abords routiers, l'entretien des espaces verts, le curage des avaloirs et la maintenance des chaussées.",
        "Ce type de mission repose sur une organisation rigoureuse des équipes et une présence régulière sur le terrain : un avaloir dégagé, c'est une chaussée qui évacue l'eau de pluie et un axe qui reste praticable.",
      ],
      ar: [
        "من سبتمبر 2022 إلى أوت 2023، أنجزت المؤسسة أشغال تدخل يدوي جمعت بين تنظيف جوانب الطرقات، وصيانة المساحات الخضراء، وتسريح البالوعات، وصيانة قارعة الطريق.",
        "ويقوم هذا النوع من المهام على تنظيم دقيق للفرق وحضور ميداني منتظم: فالبالوعة المسرَّحة تعني طريقا تُصرَّف منه مياه الأمطار ومحورا يظل صالحا لحركة المرور.",
      ],
      en: [
        "From September 2022 to August 2023, the company carried out manual works combining roadside cleaning, green-space upkeep, drainage-inlet clearing and carriageway maintenance.",
        "This kind of assignment depends on disciplined crew organisation and a steady presence in the field: a clear drainage inlet means a road that sheds rainwater and a corridor that stays open to traffic.",
      ],
    },
    scope: {
      fr: [
        "Nettoyage manuel des abords routiers",
        "Entretien des espaces verts d'accompagnement",
        "Curage des avaloirs",
        "Maintenance des chaussées",
      ],
      ar: [
        "التنظيف اليدوي لجوانب الطرقات",
        "صيانة المساحات الخضراء المحاذية",
        "تسريح البالوعات",
        "صيانة قارعة الطريق",
      ],
      en: [
        "Manual roadside cleaning",
        "Upkeep of adjoining green areas",
        "Drainage-inlet clearing",
        "Carriageway maintenance",
      ],
    },
    period: {
      fr: "Septembre 2022 – août 2023",
      ar: "سبتمبر 2022 – أوت 2023",
      en: "September 2022 – August 2023",
    },
    // Location and contracting authority were not supplied: left empty on purpose.
    image: images.roadside,
    gallery: [images.publicSpace],
    contracts: [
      {
        id: "abords-2022-2023",
        label:
          "Travaux d'intervention manuelle pour le nettoyage des abords routiers, l'entretien des espaces verts, le curage des avaloirs et la maintenance des chaussées",
        period: "09/2022 – 08/2023",
        verification: "declared",
        notes: "Lieu et maître d'ouvrage non communiqués — à compléter.",
      },
    ],
  },
];
