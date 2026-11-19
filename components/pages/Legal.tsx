import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";
import type { SiteContent, Settings } from "@/lib/types";
import credits from "@/public/images/illustrative/credits.json";

type Block = { h: string; p: string[] };

function Prose({ title, blocks }: { title: string; blocks: Block[] }) {
  return (
    <>
      <section className="on-dark bg-forest text-ivory">
        <div className="container-x pb-14 pt-16 md:pb-20 md:pt-24">
          <h1 className="h-display text-4xl md:text-6xl">{title}</h1>
        </div>
      </section>
      <div className="container-x py-14 md:py-20">
        <div className="max-w-3xl space-y-12">
          {blocks.map((b) => (
            <section key={b.h}>
              <h2 className="font-display text-2xl text-forest">{b.h}</h2>
              <div className="prose-body mt-4 leading-relaxed text-stone">
                {b.p.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

const nameOf = (s: Settings) => s.legalName ?? s.brand;

function legalBlocks(locale: Locale, s: Settings): Block[] {
  const publisher = [nameOf(s), s.formerName && `(${{ fr: "anciennement", ar: "سابقا", en: "formerly" }[locale]} ${s.formerName})`]
    .filter(Boolean)
    .join(" ");
  const ids = [
    s.registration && { fr: `Registre national des entreprises : ${s.registration}`, ar: `السجل الوطني للمؤسسات: ${s.registration}`, en: `National Business Register: ${s.registration}` }[locale],
    s.taxId && { fr: `Matricule fiscal : ${s.taxId}`, ar: `المعرف الجبائي: ${s.taxId}`, en: `Tax ID: ${s.taxId}` }[locale],
    s.address?.[locale],
    s.email,
    s.phone,
  ].filter(Boolean) as string[];

  const creditLines = (credits as { file: string; photographer: string; source_url: string; license: string }[]).map(
    (c) => `${c.photographer} — ${c.license} — ${c.source_url}`,
  );

  const T = {
    fr: [
      { h: "Éditeur du site", p: [publisher, ...ids] },
      { h: "Directeur de la publication", p: [s.publicationDirector ?? ""] },
      ...(s.host ? [{ h: "Hébergement", p: [s.host] }] : []),
      {
        h: "Propriété intellectuelle",
        p: [
          "Les textes, le logotype et l'identité visuelle du site sont la propriété de l'entreprise. Toute reproduction sans autorisation préalable est interdite.",
        ],
      },
      {
        h: "Crédits photographiques",
        p: [
          "Les images signalées « Image d'illustration » sont des photographies libres de droits, utilisées à titre illustratif. Elles ne représentent pas les chantiers de l'entreprise.",
          ...creditLines,
        ],
      },
    ],
    ar: [
      { h: "ناشر الموقع", p: [publisher, ...ids] },
      { h: "مدير النشر", p: [s.publicationDirector ?? ""] },
      ...(s.host ? [{ h: "الاستضافة", p: [s.host] }] : []),
      {
        h: "الملكية الفكرية",
        p: ["النصوص والشعار والهوية البصرية للموقع ملك للمؤسسة. يُمنع كل استنساخ دون ترخيص مسبق."],
      },
      {
        h: "حقوق الصور",
        p: [
          "الصور المشار إليها بعبارة «صورة توضيحية» صور فوتوغرافية حرّة الاستعمال، مستعملة لأغراض توضيحية، ولا تمثّل حظائر المؤسسة.",
          ...creditLines,
        ],
      },
    ],
    en: [
      { h: "Publisher", p: [publisher, ...ids] },
      { h: "Publication director", p: [s.publicationDirector ?? ""] },
      ...(s.host ? [{ h: "Hosting", p: [s.host] }] : []),
      {
        h: "Intellectual property",
        p: ["The text, logo and visual identity of this website belong to the company. Reproduction without prior permission is prohibited."],
      },
      {
        h: "Photo credits",
        p: [
          "Images marked “Illustrative image” are royalty-free photographs used for illustration only. They do not show the company's own sites.",
          ...creditLines,
        ],
      },
    ],
  };
  return T[locale];
}

function privacyBlocks(locale: Locale, s: Settings): Block[] {
  const who = nameOf(s);
  const T = {
    fr: [
      {
        h: "Responsable du traitement",
        p: [`${who}, représentée par ${s.publicationDirector ?? "son dirigeant"}.`],
      },
      {
        h: "Données collectées",
        p: [
          "Le formulaire de contact recueille : nom et prénom, organisme, adresse e-mail, téléphone, prestation souhaitée, lieu du projet, description de la demande et, le cas échéant, une pièce jointe.",
        ],
      },
      {
        h: "Finalité et base légale",
        p: [
          "Ces données servent uniquement à répondre à votre demande et, le cas échéant, à établir une proposition. Leur traitement repose sur votre consentement, exprimé en cochant la case prévue à cet effet.",
        ],
      },
      {
        h: "Destinataires",
        p: [
          "Votre demande est transmise par e-mail à l'adresse professionnelle de l'entreprise, par l'intermédiaire d'un prestataire technique d'acheminement des formulaires (Formspree), qui ne l'utilise à aucune autre fin. Les pièces jointes ne sont pas stockées sur le serveur du site. Aucune donnée n'est vendue ni cédée à des tiers.",
        ],
      },
      {
        h: "Durée de conservation",
        p: [
          "Les demandes sont conservées le temps nécessaire à leur traitement et au suivi de la relation, et au plus 24 mois après le dernier échange.",
        ],
      },
      {
        h: "Vos droits",
        p: [
          "Conformément à la loi organique n° 2004-63 du 27 juillet 2004 portant sur la protection des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition. Vous pouvez l'exercer via le formulaire de contact. Vous pouvez également saisir l'Instance nationale de protection des données personnelles (INPDP).",
        ],
      },
      {
        h: "Cookies",
        p: [
          "Le site n'utilise ni cookies publicitaires ni outil de mesure d'audience. Si la protection anti-spam Cloudflare Turnstile est activée, elle traite des données techniques de connexion dans le seul but de distinguer les visiteurs des robots.",
        ],
      },
    ],
    ar: [
      { h: "المسؤول عن المعالجة", p: [`${who}، في شخص ${s.publicationDirector ?? "مديرها"}.`] },
      {
        h: "المعطيات المجمّعة",
        p: [
          "تجمع استمارة الاتصال: الاسم واللقب، والهيكل، والبريد الإلكتروني، والهاتف، والخدمة المطلوبة، وموقع المشروع، ووصف الطلب، وعند الاقتضاء ملفا مرفقا.",
        ],
      },
      {
        h: "الغاية والأساس القانوني",
        p: [
          "تُستعمل هذه المعطيات حصريا للرد على طلبكم، وعند الاقتضاء لإعداد عرض. وتستند معالجتها إلى موافقتكم المعبَّر عنها بتأشير الخانة المخصصة لذلك.",
        ],
      },
      {
        h: "الجهات المتلقية",
        p: [
          "يُرسَل طلبكم عبر البريد الإلكتروني إلى العنوان المهني للمؤسسة، عن طريق مزوّد تقني لإرسال الاستمارات (Formspree) لا يستعملها لأي غرض آخر، ولا تُخزَّن الملفات المرفقة على خادم الموقع. ولا يتم بيع أي معطيات أو إحالتها إلى الغير.",
        ],
      },
      {
        h: "مدة الحفظ",
        p: ["تُحفظ الطلبات طيلة المدة اللازمة لمعالجتها ومتابعة العلاقة، ولمدة أقصاها 24 شهرا بعد آخر تواصل."],
      },
      {
        h: "حقوقكم",
        p: [
          "طبقا للقانون الأساسي عدد 63 لسنة 2004 المؤرخ في 27 جويلية 2004 المتعلق بحماية المعطيات الشخصية، لكم حق النفاذ والتصحيح والاعتراض، ويمكنكم ممارسته عبر استمارة الاتصال. كما يمكنكم التوجه إلى الهيئة الوطنية لحماية المعطيات الشخصية.",
        ],
      },
      {
        h: "ملفات تعريف الارتباط",
        p: [
          "لا يستعمل الموقع ملفات تعريف ارتباط إشهارية ولا أدوات لقياس عدد الزوار. وفي صورة تفعيل الحماية من الرسائل غير المرغوب فيها Cloudflare Turnstile، فإنها تعالج معطيات تقنية متعلقة بالاتصال بغرض وحيد هو التمييز بين الزوار والبرمجيات الآلية.",
        ],
      },
    ],
    en: [
      { h: "Data controller", p: [`${who}, represented by ${s.publicationDirector ?? "its director"}.`] },
      {
        h: "Data collected",
        p: [
          "The contact form collects: full name, organisation, email address, telephone, service required, project location, a description of the request and, optionally, an attachment.",
        ],
      },
      {
        h: "Purpose and legal basis",
        p: [
          "This data is used solely to answer your enquiry and, where relevant, to prepare a proposal. Processing is based on your consent, given by ticking the box provided.",
        ],
      },
      {
        h: "Recipients",
        p: [
          "Your enquiry is sent by email to the company's business address through a form-delivery provider (Formspree), which uses it for no other purpose. Attachments are not stored on the website's server. No data is sold or passed on to third parties.",
        ],
      },
      {
        h: "Retention",
        p: ["Enquiries are kept for as long as needed to handle them and follow up, and for no more than 24 months after the last exchange."],
      },
      {
        h: "Your rights",
        p: [
          "Under Tunisian Organic Law No. 2004-63 of 27 July 2004 on the protection of personal data, you have the right to access, correct and object to the processing of your data. You can exercise these rights through the contact form, and you may also contact the National Authority for the Protection of Personal Data (INPDP).",
        ],
      },
      {
        h: "Cookies",
        p: [
          "The site uses no advertising cookies or audience-measurement tools. If Cloudflare Turnstile spam protection is enabled, it processes technical connection data solely to tell visitors and bots apart.",
        ],
      },
    ],
  };
  return T[locale];
}

export function LegalPage({ locale, d, c }: { locale: Locale; d: Dictionary; c: SiteContent }) {
  return <Prose title={d.nav.legal} blocks={legalBlocks(locale, c.settings)} />;
}

export function PrivacyPage({ locale, d, c }: { locale: Locale; d: Dictionary; c: SiteContent }) {
  return <Prose title={d.nav.privacy} blocks={privacyBlocks(locale, c.settings)} />;
}
