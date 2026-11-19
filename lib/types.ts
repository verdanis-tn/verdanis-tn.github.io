import type { L } from "./i18n";

/**
 * Every image carries an `illustrative` flag. Illustrative images (stock or
 * generated) are captioned as such on the site and must never be presented as
 * photographs of the company's own work. Real project photos set it to false.
 */
export type ImageRef = {
  src: string;
  alt: L;
  illustrative: boolean;
  credit?: string;
};

/** Colour grade applied to a visual, so each project keeps its own mood. */
export type Tone = "dawn" | "noon" | "dusk" | "mist" | "gold" | "none";

export type ServiceKey =
  | "green-spaces"
  | "infrastructure-landscape"
  | "roadside-cleaning"
  | "vegetation-management"
  | "agronomy";

export type CategoryKey = "green-spaces" | "roadside" | "highway" | "public-space";

export type Category = {
  key: CategoryKey;
  /** Short label used in filters and badges. */
  label: L;
  /** Editorial heading used on the portfolio page. */
  title: L;
};

export type Service = {
  key: ServiceKey;
  order: number;
  title: L;
  summary: L;
  items: L<string[]>;
  /** Optional clarification shown under the list (e.g. personal vs. contracted expertise). */
  note?: L;
  itemsHeading?: L;
  image?: ImageRef;
  tone?: Tone;
};

export type VerificationState = "declared" | "documented" | "authorized";

/**
 * One contract as reported by the company. INTERNAL ONLY — never rendered.
 * Contract values and tender numbers are deliberately not stored anywhere in
 * this repository.
 */
export type Contract = {
  id: string;
  label: string;
  period: string;
  verification: VerificationState;
  notes?: string;
};

export type Project = {
  slug: string;
  order: number;
  featured: boolean;
  category: CategoryKey;
  services: ServiceKey[];
  status: "ongoing" | "completed";
  title: L;
  summary: L;
  description: L<string[]>;
  scope: L<string[]>;
  period: L;
  /** Only rendered when set: never guessed. */
  location?: L;
  /** Contracting authority, only set when publication is authorised. */
  client?: L;
  image?: ImageRef;
  gallery: ImageRef[];
  tone: Tone;
  /** Internal register of the individual contracts grouped under this project. */
  contracts: Contract[];
};

export type Announcement = {
  slug: string;
  date: string;
  title: L;
  excerpt: L;
  body: L<string[]>;
  image?: ImageRef;
};

export type Pillar = { title: L; text: L };

export type Person = {
  name: string;
  role: L;
  bio: L<string[]>;
  education: L<string[]>;
  photo?: ImageRef;
};

export type Company = {
  intro: L;
  approach: L;
  pillars: Pillar[];
  sectors: Pillar[];
  territories: { region: L; places: L }[];
  milestones: { year: string; text: L }[];
  leader?: Person;
  capabilities: Pillar[];
  method: Pillar[];
  equipment: L<string[]>;
  commitments: Pillar[];
};

export type Settings = {
  brand: string;
  descriptor: L;
  heroTitle: L;
  heroText: L;
  /** Registered company name — shown only once confirmed. */
  legalName?: string;
  formerName?: string;
  registration?: string;
  taxId?: string;
  publicationDirector?: string;
  host?: string;
  email?: string;
  phone?: string;
  address?: L;
  heroImage?: ImageRef;
};

export type SiteContent = {
  settings: Settings;
  company: Company;
  services: Service[];
  categories: Category[];
  projects: Project[];
  announcements: Announcement[];
};
