export const SECTORS = ["gobierno", "academia", "sociedad", "privado"] as const;

export type Sector = (typeof SECTORS)[number];

export const SOCIAL_NETWORKS = ["web", "facebook", "instagram", "x", "linkedin", "youtube", "tiktok"] as const;

export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number];

export interface ConvocanteLink {
  network: SocialNetwork;
  href: string;
}

export interface Convocante {
  id: string;
  shortName: string;
  sector: Sector;
  /** White mark on transparent. Omitted when we do not have a file. */
  logo?: string;
  /** English lockup, when the Spanish plate should not travel. */
  logoEn?: string;
  width?: number;
  height?: number;
  widthEn?: number;
  heightEn?: number;
  /** Horizontal wordmark. Square marks stay taller. */
  wide?: boolean;
  /** Desktop cap. Compact reins a wide wordmark. Seal gives a crest room beside it. */
  presence?: "compact" | "quiet" | "seal";
  /** Two-line plate (secretarías, REGENIA, Gobierno del Estado). */
  stack?: boolean;
  /** Render flush with the following mark in the same sector. */
  paired?: boolean;
  /** The plate does not spell the name. */
  showName?: boolean;
  /**
   * Shared plate with no page. The mark is not a link.
   * Gobierno del Estado and the federal science lockup stay here.
   */
  detail?: false;
  /** Official site and social profiles. Only links confirmed on their own pages. */
  links?: ConvocanteLink[];
}

/**
 * Lockups that must never be split.
 * Federal: SECIHTI nacional and INAOE. Naming either one renders both, in this order.
 * State: Gobierno de Puebla, then each dependencia that applies, in the home order
 * (SEDETRA, SECIHTI Puebla, CTS). A dependencia never appears without the state mark.
 */
export const FEDERAL_LOCKUP = ["secihti-federal", "inaoe"] as const;
export const STATE_HEAD = "estado";
export const STATE_OFFICES = ["sedetra", "secihti", "cts"] as const;

export function composeConvocanteIds(ids: string[]): string[][] {
  const present = new Set(ids);
  const consumed = new Set<string>();
  const groups: string[][] = [];
  const offices = STATE_OFFICES.filter((id) => present.has(id));

  for (const id of ids) {
    if (consumed.has(id)) continue;
    if ((FEDERAL_LOCKUP as readonly string[]).includes(id)) {
      groups.push([...FEDERAL_LOCKUP]);
      for (const member of FEDERAL_LOCKUP) consumed.add(member);
      continue;
    }
    if (id === STATE_HEAD || (STATE_OFFICES as readonly string[]).includes(id)) {
      groups.push(offices.length > 0 ? [STATE_HEAD, ...offices] : [STATE_HEAD]);
      consumed.add(STATE_HEAD);
      for (const office of STATE_OFFICES) consumed.add(office);
      continue;
    }
    groups.push([id]);
    consumed.add(id);
  }

  return groups;
}

/**
 * Supplied plates, flattened to white.
 * Federal Ciencia y Tecnología and INAOE are one lockup, in academia.
 * State pair: Gobierno del Estado, then SEDETRA and SECIHTI Puebla.
 * UPAEP is the official wordmark, a step under the row so it does not outweigh BUAP.
 * BUAP is the seal plus the word, flattened to one white mark.
 * World Space Week and REGENIA sit with civil society.
 * REGENIA was knocked out of a white sheet so the pink and black ink read as one white mark.
 * CTS is the Capital de la Tecnología lockup, knocked out of a screenshot.
 * Yankuilotl's wordmark file was cut off, so only the symbol is used.
 */
export const CONVOCANTES: Convocante[] = [
  {
    id: "estado",
    shortName: "Gobierno del Estado",
    sector: "gobierno",
    logo: "/convocantes/estado.png",
    width: 1042,
    height: 437,
    stack: true,
    detail: false,
  },
  {
    id: "sedetra",
    shortName: "SEDETRA",
    sector: "gobierno",
    logo: "/convocantes/sedetra.png",
    width: 900,
    height: 181,
    stack: true,
    presence: "quiet",
    links: [
      { network: "web", href: "https://sedetra.puebla.gob.mx/" },
      { network: "facebook", href: "https://www.facebook.com/SedetraGobPue" },
      { network: "x", href: "https://x.com/SedetraGobPue" },
    ],
  },
  {
    id: "secihti",
    shortName: "SECIHTI Puebla",
    sector: "gobierno",
    logo: "/convocantes/secihti.png",
    width: 528,
    height: 240,
    stack: true,
    links: [
      { network: "web", href: "https://secihti.puebla.gob.mx/" },
      { network: "facebook", href: "https://www.facebook.com/SecihtiGobPue" },
      { network: "instagram", href: "https://www.instagram.com/cienciagobpue_/" },
      { network: "x", href: "https://x.com/SecihtiGobPue" },
      { network: "linkedin", href: "https://www.linkedin.com/company/secihtigobpue" },
      { network: "tiktok", href: "https://www.tiktok.com/@cienciagobpue_" },
    ],
  },
  {
    id: "cts",
    shortName: "CTS",
    sector: "gobierno",
    logo: "/convocantes/cts.png",
    width: 1000,
    height: 521,
    stack: true,
    links: [
      { network: "web", href: "https://capitaldelatecnologia.puebla.gob.mx/" },
      { network: "facebook", href: "https://www.facebook.com/people/Ciudad-Modelo-Puebla/100076196627496/" },
      { network: "x", href: "https://x.com/CapitalTSGobPue" },
      { network: "linkedin", href: "https://www.linkedin.com/company/capitaltsgobpue" },
    ],
  },
  {
    id: "secihti-federal",
    shortName: "SECIHTI",
    sector: "academia",
    logo: "/convocantes/secihti-federal.png",
    width: 1400,
    height: 169,
    stack: true,
    paired: true,
    presence: "quiet",
    detail: false,
  },
  {
    id: "inaoe",
    shortName: "INAOE",
    sector: "academia",
    logo: "/convocantes/inaoe.png",
    width: 92,
    height: 98,
    links: [
      { network: "web", href: "https://www.inaoep.mx/" },
      { network: "facebook", href: "https://www.facebook.com/inaoe.oficial/" },
      { network: "instagram", href: "https://www.instagram.com/inaoep.mx/" },
      { network: "x", href: "https://x.com/inaoe_mx" },
      { network: "linkedin", href: "https://www.linkedin.com/company/inaoe" },
      { network: "youtube", href: "https://www.youtube.com/c/INAOEOficial" },
    ],
  },
  {
    id: "upaep",
    shortName: "UPAEP",
    sector: "academia",
    logo: "/convocantes/upaep.png",
    width: 1433,
    height: 372,
    stack: true,
    presence: "compact",
    links: [
      { network: "web", href: "https://www.upaep.mx/" },
      { network: "facebook", href: "https://www.facebook.com/UPAEP" },
      { network: "instagram", href: "https://www.instagram.com/upaepoficial/" },
      { network: "x", href: "https://x.com/UPAEP" },
      { network: "linkedin", href: "https://www.linkedin.com/school/upaep" },
    ],
  },
  {
    id: "buap",
    shortName: "BUAP",
    sector: "academia",
    logo: "/convocantes/buap.png",
    width: 480,
    height: 633,
    presence: "seal",
    links: [
      { network: "web", href: "https://www.buap.mx/" },
      { network: "facebook", href: "https://www.facebook.com/BUAPoficial" },
      { network: "instagram", href: "https://www.instagram.com/buapoficial/" },
      { network: "x", href: "https://x.com/buapoficial" },
      { network: "linkedin", href: "https://www.linkedin.com/school/buapoficial" },
      { network: "youtube", href: "https://www.youtube.com/user/ibuap" },
    ],
  },
  {
    id: "sintonia",
    shortName: "Sintonía",
    sector: "academia",
    logo: "/convocantes/sintonia.png",
    width: 112,
    height: 120,
    links: [
      { network: "web", href: "https://sintonia.mx/" },
      { network: "facebook", href: "https://www.facebook.com/SintoniaMx/" },
      { network: "x", href: "https://x.com/sintoniamexico" },
    ],
  },
  {
    id: "sme",
    shortName: "Semana Mundial del Espacio",
    sector: "sociedad",
    logo: "/convocantes/wsw.png",
    width: 834,
    height: 207,
    stack: true,
    presence: "quiet",
    links: [
      { network: "web", href: "https://sme-mexico.space/" },
      { network: "facebook", href: "https://www.facebook.com/SemanaMundialEspacioMexico/" },
    ],
  },
  {
    id: "regenia",
    shortName: "REGENIA",
    sector: "sociedad",
    logo: "/convocantes/regenia.png",
    width: 887,
    height: 259,
    stack: true,
    presence: "quiet",
    links: [
      { network: "web", href: "https://regeniamexico.org/" },
      { network: "linkedin", href: "https://www.linkedin.com/company/regenia-méxico" },
    ],
  },
  {
    id: "csi",
    shortName: "Clúster de Startups",
    sector: "privado",
    logo: "/convocantes/csi.png",
    width: 935,
    height: 382,
    wide: true,
    links: [
      { network: "web", href: "https://www.clusterdestartups.org/" },
      { network: "instagram", href: "https://www.instagram.com/cluster_startups/" },
      { network: "linkedin", href: "https://www.linkedin.com/company/cluster-startups-puebla/" },
    ],
  },
  {
    id: "automotriz",
    shortName: "Clúster Automotriz",
    sector: "privado",
    logo: "/convocantes/clauz.png",
    width: 800,
    height: 262,
    wide: true,
    links: [
      { network: "web", href: "https://www.clauz.mx/" },
      { network: "linkedin", href: "https://www.linkedin.com/company/clauz" },
    ],
  },
  {
    id: "canacintra",
    shortName: "CANACINTRA Puebla",
    sector: "privado",
    logo: "/convocantes/canacintra.png",
    width: 900,
    height: 198,
    wide: true,
    links: [
      { network: "web", href: "https://canacintrapuebla.org.mx/" },
      { network: "facebook", href: "https://www.facebook.com/PueblaCANACINTRA/" },
      { network: "instagram", href: "https://www.instagram.com/canacintrapuebla/" },
      { network: "x", href: "https://x.com/canacintrap" },
      { network: "linkedin", href: "https://www.linkedin.com/company/canacintra-puebla/" },
    ],
  },
  {
    id: "yankuilotl",
    shortName: "Yankuilotl",
    sector: "privado",
    logo: "/convocantes/yankuilotl.png",
    width: 68,
    height: 74,
    showName: true,
    links: [
      { network: "web", href: "https://yankuilotl.com.mx/" },
      { network: "linkedin", href: "https://www.linkedin.com/company/yankuilotl" },
    ],
  },
];

export function convocanteById(id: string): Convocante | undefined {
  return CONVOCANTES.find((item) => item.id === id);
}

/** Plates such as the state government and the federal science lockup have no page. */
export function hasConvocantePage(item: Convocante | undefined): item is Convocante {
  return Boolean(item && item.detail !== false);
}

export function detailConvocantes(): Convocante[] {
  return CONVOCANTES.filter((item) => hasConvocantePage(item));
}
