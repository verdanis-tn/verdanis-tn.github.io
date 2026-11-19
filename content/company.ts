import type { Company, Settings, Announcement } from "@/lib/types";
import { images } from "./images";

export const settings: Settings = {
  brand: "VERDANIS",
  descriptor: {
    fr: "Paysages & Infrastructures",
    ar: "تهيئة المساحات الخضراء وصيانة البنية التحتية",
    en: "Landscaping & Infrastructure Maintenance",
  },
  heroTitle: {
    fr: "Des espaces entretenus. Des territoires valorisés.",
    ar: "عناية بالمساحات الخضراء، وارتقاء بجودة المحيط.",
    en: "Maintaining landscapes. Enhancing infrastructure.",
  },
  heroText: {
    fr: "Une expertise technique au service de l'entretien des espaces verts, de la maintenance paysagère et de la valorisation des infrastructures en Tunisie.",
    ar: "خبرة فنية في صيانة المساحات الخضراء، والعناية بالمحيط الطبيعي، وصيانة وتهيئة المساحات المحيطة بالبنية التحتية في تونس.",
    en: "Technical expertise in professional green-space maintenance, landscape management, and the upkeep of public and private infrastructure across Tunisia.",
  },
  // Legal identity — deliberately empty until confirmed from the registration
  // documents (RNE extract). See the verification report (private/, not in git) §1.
  legalName: undefined,
  formerName: "Best Green Garden",
  registration: undefined,
  taxId: undefined,
  publicationDirector: "Rabeh Belaid",
  host: undefined,
  // Public contact details — none published until the company approves them.
  email: undefined,
  phone: undefined,
  address: undefined,
  heroImage: images.hero,
};

export const company: Company = {
  intro: {
    fr: "VERDANIS est une entreprise tunisienne spécialisée dans l'entretien des espaces verts, la maintenance paysagère et l'entretien des abords d'infrastructures. Anciennement Best Green Garden, elle intervient pour des collectivités et des gestionnaires d'infrastructures, du nord de Tunis aux grands axes autoroutiers du pays.",
    ar: "VERDANIS مؤسسة تونسية مختصة في صيانة المساحات الخضراء والصيانة النباتية وصيانة محيط البنية التحتية. وتعمل المؤسسة — المعروفة سابقا باسم Best Green Garden — لفائدة الجماعات المحلية والهياكل المتصرفة في البنية التحتية، من شمال مدينة تونس إلى كبرى محاور الطرقات السيارة في البلاد.",
    en: "VERDANIS is a Tunisian company specialising in green-space maintenance, landscape management and the upkeep of infrastructure surroundings. Formerly known as Best Green Garden, it works for local authorities and infrastructure operators, from northern Tunis to the country's main motorway corridors.",
  },
  approach: {
    fr: "Notre approche repose sur une conviction simple : l'entretien d'un espace public est un service continu, qui se juge sur la durée. Nous organisons nos équipes et nos interventions pour tenir, saison après saison, le niveau d'exigence fixé par nos donneurs d'ordre — avec un regard d'agronome sur le végétal.",
    ar: "يقوم نهجنا على قناعة بسيطة: صيانة الفضاء العام خدمة متواصلة تُقاس جودتها على المدى الطويل. لذلك ننظّم فرقنا وتدخلاتنا بما يضمن الحفاظ، موسما بعد موسم، على مستوى الجودة الذي يحدده أصحاب المشاريع — برؤية مهندس فلاحي للنبات.",
    en: "Our approach rests on a simple conviction: maintaining a public space is a continuous service, judged over time. We organise our crews and our work to sustain, season after season, the standard our clients set — with an agronomist's eye on living plants.",
  },
  pillars: [
    {
      title: { fr: "Un regard d'agronome", ar: "رؤية فلاحية", en: "An agronomist's eye" },
      text: {
        fr: "Comprendre le végétal pour mieux l'entretenir : périodes d'intervention, besoins en eau, état sanitaire.",
        ar: "فهم النبات من أجل صيانة أفضل: فترات التدخل، والحاجيات المائية، والحالة الصحية.",
        en: "Understanding plants in order to care for them better: timing, water needs, plant health.",
      },
    },
    {
      title: { fr: "Continuité de service", ar: "استمرارية الخدمة", en: "Continuity of service" },
      text: {
        fr: "Des interventions régulières, planifiées et suivies sur toute la durée des marchés.",
        ar: "تدخلات منتظمة ومبرمجة ومتابَعة طيلة مدة الصفقات.",
        en: "Regular, planned and monitored work for the full term of every contract.",
      },
    },
    {
      title: { fr: "Maîtrise du terrain", ar: "التحكم في الميدان", en: "Command of the field" },
      text: {
        fr: "Des équipes organisées par secteur, capables d'intervenir sur de longs linéaires routiers et autoroutiers.",
        ar: "فرق منظّمة حسب القطاعات، قادرة على التدخل على امتدادات طويلة من الطرقات والطرقات السيارة.",
        en: "Crews organised by sector, able to work along extended road and motorway sections.",
      },
    },
    {
      title: { fr: "Sécurité d'abord", ar: "السلامة أولا", en: "Safety first" },
      text: {
        fr: "La sécurité des équipes et des usagers, priorité de chaque chantier en bordure de circulation.",
        ar: "سلامة الفرق ومستعملي الطريق أولوية كل حظيرة محاذية لحركة المرور.",
        en: "The safety of crews and road users comes first on every site next to live traffic.",
      },
    },
  ],
  sectors: [
    {
      title: { fr: "Collectivités locales", ar: "الجماعات المحلية", en: "Local authorities" },
      text: {
        fr: "Municipalités et services techniques chargés des espaces verts et de la propreté urbaine.",
        ar: "البلديات والمصالح الفنية المكلفة بالمساحات الخضراء والنظافة الحضرية.",
        en: "Municipalities and technical departments responsible for green spaces and urban cleanliness.",
      },
    },
    {
      title: {
        fr: "Gestionnaires d'infrastructures routières et autoroutières",
        ar: "الهياكل المتصرفة في الطرقات والطرقات السيارة",
        en: "Road and motorway operators",
      },
      text: {
        fr: "Entretien des abords, des terre-pleins et des dépendances vertes du réseau.",
        ar: "صيانة جوانب الطرقات والفواصل الوسطى والملحقات الخضراء للشبكة.",
        en: "Upkeep of verges, central reservations and the green margins of the network.",
      },
    },
    {
      title: {
        fr: "Administrations et établissements publics",
        ar: "الإدارات والمؤسسات العمومية",
        en: "Public administrations and institutions",
      },
      text: {
        fr: "Entretien des espaces extérieurs et des abords de sites publics.",
        ar: "صيانة الفضاءات الخارجية ومحيط المواقع العمومية.",
        en: "Upkeep of the grounds and surroundings of public sites.",
      },
    },
    {
      title: { fr: "Entreprises privées", ar: "المؤسسات الخاصة", en: "Private companies" },
      text: {
        fr: "Entretien des espaces verts de sites d'activité, de sièges et d'ensembles tertiaires.",
        ar: "صيانة المساحات الخضراء بمواقع النشاط والمقرات والمركّبات الإدارية.",
        en: "Green-space upkeep for business sites, headquarters and office complexes.",
      },
    },
  ],
  territories: [
    {
      region: { fr: "Grand Tunis", ar: "تونس الكبرى", en: "Greater Tunis" },
      places: {
        fr: "Zone Nord de Tunis · axe RR21 (Route X)",
        ar: "المنطقة الشمالية لتونس · الطريق الجهوية رقم 21 (الطريق X)",
        en: "Northern Tunis · RR21 corridor (Route X)",
      },
    },
    {
      region: { fr: "Nord-Ouest", ar: "الشمال الغربي", en: "North-West" },
      places: {
        fr: "Autoroute A3 · district de Béja",
        ar: "الطريق السيارة أ3 · إقليم باجة",
        en: "A3 motorway · Béja district",
      },
    },
    {
      region: { fr: "Sahel et Centre-Est", ar: "الساحل والوسط الشرقي", en: "Sahel and Centre-East" },
      places: {
        fr: "Autoroute A1 · district d'El Jem",
        ar: "الطريق السيارة أ1 · إقليم الجم",
        en: "A1 motorway · El Jem district",
      },
    },
  ],
  milestones: [
    {
      year: "2021",
      text: {
        fr: "Début de l'entretien des espaces verts de la zone Nord pour la Municipalité de Tunis — mission reconduite chaque année depuis.",
        ar: "انطلاق صيانة المساحات الخضراء بالمنطقة الشمالية لفائدة بلدية تونس — مهمة متجددة كل سنة منذ ذلك الحين.",
        en: "Green-space maintenance begins in northern Tunis for the Municipality of Tunis — renewed every year since.",
      },
    },
    {
      year: "2022",
      text: {
        fr: "Interventions manuelles sur les abords routiers : nettoyage, curage des avaloirs, espaces verts et chaussées (2022 – 2023).",
        ar: "تدخلات يدوية على جوانب الطرقات: تنظيف وتسريح البالوعات وصيانة المساحات الخضراء وقارعة الطريق (2022 – 2023).",
        en: "Manual roadside works: cleaning, drainage inlets, green areas and carriageways (2022 – 2023).",
      },
    },
    {
      year: "2025",
      text: {
        fr: "Marché-cadre de trois ans pour le nettoyage et l'embellissement de l'axe RR21 (Route X).",
        ar: "صفقة إطارية لمدة ثلاث سنوات لتنظيف وتجميل الطريق الجهوية رقم 21 (الطريق X).",
        en: "Three-year framework contract to clean and beautify the RR21 corridor (Route X).",
      },
    },
    {
      year: "2026",
      text: {
        fr: "Campagnes estivales de désherbage sur les autoroutes A3 (district de Béja) et A1 (district d'El Jem).",
        ar: "حملات صيفية لإزالة الأعشاب على الطريقين السيارين أ3 (إقليم باجة) وأ1 (إقليم الجم).",
        en: "Summer weeding campaigns on the A3 (Béja district) and A1 (El Jem district) motorways.",
      },
    },
  ],
  leader: {
    name: "Rabeh Belaid",
    role: {
      fr: "Dirigeant · Ingénieur agronome",
      ar: "مدير المؤسسة · مهندس فلاحي",
      en: "Director · Agricultural engineer",
    },
    bio: {
      fr: [
        "Ingénieur agronome, Rabeh Belaid dirige l'entreprise et en pilote les chantiers.",
        "Son parcours comprend la conduite technique d'exploitations agricoles et biologiques — arboriculture, oléiculture, céréaliculture et cultures maraîchères — dans les régions de Zaghouan, Sousse et Bizerte.",
        "Il est l'auteur d'une publication sur la contribution de l'eau virtuelle à la sécurité hydrique en Tunisie, à partir d'études de cas d'exploitations céréalières et oléicoles de Zaghouan.",
      ],
      ar: [
        "رابح بلعيد مهندس فلاحي، يتولى إدارة المؤسسة والإشراف على حظائرها.",
        "يشمل مساره المهني الإشراف الفني على ضيعات فلاحية وبيولوجية — في الأشجار المثمرة والزياتين والحبوب والزراعات الخضرية — بجهات زغوان وسوسة وبنزرت.",
        "وله منشور حول مساهمة المياه الافتراضية في تعزيز الأمن المائي في تونس، انطلاقا من دراسة حالات لضيعات الحبوب والزياتين بزغوان.",
      ],
      en: [
        "An agricultural engineer, Rabeh Belaid leads the company and oversees its sites.",
        "His career includes the technical management of conventional and organic farms — orchards, olive groves, cereals and vegetable crops — in the Zaghouan, Sousse and Bizerte regions.",
        "He is the author of a publication on the contribution of virtual water to water security in Tunisia, based on case studies of cereal and olive farms in Zaghouan.",
      ],
    },
    education: {
      fr: [
        "Ingénieur agronome, spécialité production végétale — École supérieure d'agriculture de Mograne (2013)",
        "Master 1 en agriculture durable — Institut agronomique méditerranéen de Chania, Grèce (2015)",
      ],
      ar: [
        "مهندس فلاحي، اختصاص إنتاج نباتي — المدرسة العليا للفلاحة بمقرن (2013)",
        "ماجستير 1 في الفلاحة المستدامة — المعهد الفلاحي المتوسطي بخانيا، اليونان (2015)",
      ],
      en: [
        "Agricultural engineering degree, plant production — Higher School of Agriculture of Mograne (2013)",
        "Master 1 in sustainable agriculture — Mediterranean Agronomic Institute of Chania, Greece (2015)",
      ],
    },
  },
  capabilities: [
    {
      title: { fr: "Encadrement technique", ar: "التأطير الفني", en: "Technical supervision" },
      text: {
        fr: "Les chantiers sont pilotés par un ingénieur agronome, qui en assure la planification, le suivi technique et le contrôle de la qualité.",
        ar: "يشرف على الحظائر مهندس فلاحي يتولى تخطيطها ومتابعتها الفنية ومراقبة جودة الأشغال.",
        en: "Sites are run by an agricultural engineer, who handles planning, technical follow-up and quality control.",
      },
    },
    {
      title: { fr: "Équipes de terrain", ar: "الفرق الميدانية", en: "Field crews" },
      text: {
        fr: "Des équipes d'intervention manuelle organisées par secteur ou par section, pour l'entretien des espaces verts, le nettoyage et le désherbage.",
        ar: "فرق تدخل يدوي منظّمة حسب القطاع أو المقطع، لصيانة المساحات الخضراء والتنظيف وإزالة الأعشاب.",
        en: "Manual intervention crews organised by sector or section for green-space upkeep, cleaning and weeding.",
      },
    },
    {
      title: { fr: "Chantiers simultanés", ar: "حظائر متزامنة", en: "Concurrent sites" },
      text: {
        fr: "À l'été 2026, l'entreprise a conduit en parallèle des chantiers dans le Grand Tunis, sur l'autoroute A3 et sur l'autoroute A1.",
        ar: "خلال صيف 2026، أدارت المؤسسة بالتوازي حظائر في تونس الكبرى وعلى الطريق السيارة أ3 والطريق السيارة أ1.",
        en: "In summer 2026, the company ran sites in Greater Tunis and on the A3 and A1 motorways at the same time.",
      },
    },
    {
      title: { fr: "Grands linéaires", ar: "امتدادات طويلة", en: "Long linear sections" },
      text: {
        fr: "Une expérience des interventions sur de longs linéaires : environ 54 km sur l'A3, 90 km sur l'A1 et 20 km sur l'axe RR21.",
        ar: "خبرة في التدخل على امتدادات طويلة: نحو 54 كلم على الطريق السيارة أ3، و90 كلم على أ1، و20 كلم على الطريق الجهوية رقم 21.",
        en: "Experience of work along long sections: some 54 km on the A3, 90 km on the A1 and 20 km on the RR21 corridor.",
      },
    },
  ],
  method: [
    {
      title: { fr: "Reconnaissance du site", ar: "معاينة الموقع", en: "Site survey" },
      text: {
        fr: "Visite des lieux, lecture du cahier des charges et repérage des contraintes : circulation, accès, saison.",
        ar: "زيارة الموقع ودراسة كراس الشروط وتحديد الإكراهات: حركة المرور، والنفاذ، والموسم.",
        en: "Site visit, review of the specifications and mapping of constraints: traffic, access, season.",
      },
    },
    {
      title: { fr: "Planification", ar: "التخطيط", en: "Planning" },
      text: {
        fr: "Découpage en secteurs, affectation des équipes et calendrier d'intervention.",
        ar: "تقسيم الموقع إلى قطاعات، وتوزيع الفرق، وضبط رزنامة التدخل.",
        en: "Division into sectors, crew allocation and an intervention schedule.",
      },
    },
    {
      title: { fr: "Exécution encadrée", ar: "تنفيذ تحت الإشراف", en: "Supervised execution" },
      text: {
        fr: "Travaux conduits sous la supervision directe de l'encadrement technique.",
        ar: "أشغال منجزة تحت الإشراف المباشر للتأطير الفني.",
        en: "Work carried out under the direct supervision of the technical lead.",
      },
    },
    {
      title: { fr: "Contrôle et compte rendu", ar: "المراقبة والتقرير", en: "Inspection and reporting" },
      text: {
        fr: "Vérification sur le terrain et suivi de l'avancement auprès du donneur d'ordre.",
        ar: "التثبت الميداني ومتابعة تقدم الأشغال مع صاحب المشروع.",
        en: "On-site checks and progress reporting to the client.",
      },
    },
  ],
  // Equipment inventory: intentionally empty until the company provides a
  // verified list. The section is hidden while empty.
  equipment: { fr: [], ar: [], en: [] },
  commitments: [
    {
      title: {
        fr: "Sécurité des équipes et des usagers",
        ar: "سلامة الفرق ومستعملي الطريق",
        en: "Safety of crews and road users",
      },
      text: {
        fr: "Port des équipements de protection, signalisation des zones d'intervention et consignes adaptées aux travaux en bordure de circulation.",
        ar: "ارتداء معدات الوقاية، وتركيز إشارات مناطق التدخل، واعتماد تعليمات ملائمة للأشغال المحاذية لحركة المرور.",
        en: "Protective equipment, signed work zones and procedures adapted to work alongside live traffic.",
      },
    },
    {
      title: {
        fr: "Respect du végétal et de l'environnement",
        ar: "احترام النبات والبيئة",
        en: "Respect for plants and the environment",
      },
      text: {
        fr: "Des pratiques d'entretien raisonnées, un usage mesuré de l'eau et une évacuation responsable des déchets verts.",
        ar: "ممارسات صيانة رشيدة، واستعمال مقتصد للمياه، ونقل مسؤول للفضلات الخضراء.",
        en: "Considered maintenance practices, careful use of water and responsible disposal of green waste.",
      },
    },
    {
      title: { fr: "Qualité et régularité", ar: "الجودة والانتظام", en: "Quality and consistency" },
      text: {
        fr: "Un niveau de service constant, conforme aux cahiers des charges et contrôlé sur le terrain.",
        ar: "مستوى خدمة ثابت، مطابق لكراسات الشروط ومراقَب ميدانيا.",
        en: "A steady level of service that meets the specifications and is checked on the ground.",
      },
    },
    {
      title: { fr: "Respect des délais", ar: "احترام الآجال", en: "Meeting deadlines" },
      text: {
        fr: "Des plannings tenus, y compris lors de campagnes courtes et intensives comme les désherbages estivaux.",
        ar: "الالتزام بالرزنامات، بما في ذلك خلال الحملات القصيرة والمكثفة مثل حملات إزالة الأعشاب الصيفية.",
        en: "Schedules kept, including during short, intensive campaigns such as summer weeding.",
      },
    },
    {
      title: { fr: "Transparence", ar: "الشفافية", en: "Transparency" },
      text: {
        fr: "Un dialogue suivi avec les donneurs d'ordre et des comptes rendus clairs sur l'avancement des travaux.",
        ar: "حوار متواصل مع أصحاب المشاريع وتقارير واضحة حول تقدم الأشغال.",
        en: "Ongoing dialogue with clients and clear reporting on the progress of the work.",
      },
    },
  ],
};

export const announcements: Announcement[] = [
  {
    slug: "summer-weeding-campaign-a1-a3-2026",
    date: "2026-08-30",
    image: images.highway,
    title: {
      fr: "Campagne estivale de désherbage achevée sur les autoroutes A1 et A3",
      ar: "اختتام الحملة الصيفية لإزالة الأعشاب على الطريقين السيارين أ1 وأ3",
      en: "Summer weeding campaign completed on the A1 and A3 motorways",
    },
    excerpt: {
      fr: "Deux mois de travaux menés en parallèle dans les districts de Béja et d'El Jem.",
      ar: "شهران من الأشغال المنجزة بالتوازي في إقليمي باجة والجم.",
      en: "Two months of work carried out in parallel in the Béja and El Jem districts.",
    },
    body: {
      fr: [
        "Le 30 août 2026 s'est achevée la campagne estivale de désherbage du terre-plein central et des abords de l'autoroute A3, entre les PK 66 et 120 (district de Béja), et de l'autoroute A1, entre les PK 140 et 230 (district d'El Jem).",
        "Menées simultanément du 1er juillet au 30 août, ces deux interventions ont mobilisé nos équipes sur près de 150 kilomètres de linéaire autoroutier, en pleine saison sèche.",
      ],
      ar: [
        "اختُتمت يوم 30 أوت 2026 الحملة الصيفية لإزالة الأعشاب من الفاصل الأوسط وجوانب الطريق السيارة أ3، بين النقطتين الكيلومتريتين 66 و120 (إقليم باجة)، والطريق السيارة أ1، بين النقطتين الكيلومتريتين 140 و230 (إقليم الجم).",
        "وقد نُفّذ هذان التدخلان بالتزامن من 1 جويلية إلى 30 أوت، وجنّدا فرقنا على امتداد قرابة 150 كيلومترا من الطرقات السيارة، في ذروة الموسم الجاف.",
      ],
      en: [
        "On 30 August 2026 we completed the summer weeding campaign on the central reservation and verges of the A3 motorway between km 66 and km 120 (Béja district) and of the A1 motorway between km 140 and km 230 (El Jem district).",
        "Run simultaneously from 1 July to 30 August, the two operations kept our crews at work along nearly 150 kilometres of motorway at the height of the dry season.",
      ],
    },
  },
];
