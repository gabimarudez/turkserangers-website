import type { HistoryEvent, StaffMember } from "./types";

export const club = {
  name: "FC Turkse Rangers",
  fullName: "F.C. Turkse Rangers Waterschei",
  shortName: "Turkse Rangers",
  city: "Genk",
  founded: 1976,
  registrationNumber: "9147",
  ground: "Anfield — Hoevenzavel",
  address: {
    street: "Hoevenzavellaan 120",
    postalCode: "3600",
    city: "Genk",
    country: "België",
  },
  contact: {
    email: "turkserangers9147@gmail.com",
    phone: "+32 89 38 63 48",
    phoneHref: "tel:+3289386348",
  },
  social: {
    instagram: "https://www.instagram.com/turkse_rangers/",
    instagramHandle: "@turkse_rangers",
    facebook: "",
    youtube: "",
  },
  stats: {
    founded: 1976,
    teams: 17,
    members: 400,
    volunteers: 50,
  },
  /**
   * Clubbeelden. Elk pad wijst naar public/images/. Zolang een sleutel leeg
   * blijft, toont de site het grijze kader in plaats van een gebroken foto.
   */
  images: {
    hero: "/images/terrein-tribune.jpg",
    ground: "/images/terrein-tribune-klein.jpg",
    logo: "/images/logo.png",
    teamPhoto: "",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Hoevenzavellaan%20120%2C%203600%20Genk",
};

export const history: HistoryEvent[] = [
  {
    year: "1976",
    title: {
      nl: "De oprichting",
      tr: "Kuruluş",
      en: "The founding",
    },
    body: {
      nl: "Leden van de Turkse gemeenschap in Genk richten de club op onder de naam Texas Rangers. Het doel: jongeren uit de wijk Waterschei samenbrengen rond voetbal.",
      tr: "Genk'teki Türk topluluğunun üyeleri kulübü Texas Rangers adıyla kurar. Amaç: Waterschei mahallesindeki gençleri futbol etrafında bir araya getirmek.",
      en: "Members of Genk's Turkish community found the club under the name Texas Rangers, with one goal: bringing together young people from the Waterschei district through football.",
    },
  },
  {
    year: "1989",
    title: {
      nl: "Aansluiting bij de KBVB",
      tr: "KBVB'ye katılım",
      en: "Joining the Belgian FA",
    },
    body: {
      nl: "De club sluit zich aan bij de Koninklijke Belgische Voetbalbond onder de naam Turkse Rangers en krijgt stamnummer 9147.",
      tr: "Kulüp, Turkse Rangers adıyla Belçika Kraliyet Futbol Federasyonu'na katılır ve 9147 matrikül numarasını alır.",
      en: "The club affiliates with the Royal Belgian Football Association as Turkse Rangers and receives registration number 9147.",
    },
  },
  {
    year: "1993",
    title: {
      nl: "Integratieprijs van de stad Genk",
      tr: "Genk şehri entegrasyon ödülü",
      en: "City of Genk integration award",
    },
    body: {
      nl: "De stad Genk bekroont de club met de integratieprijs voor de manier waarop sport en multiculturele samenwerking hand in hand gaan.",
      tr: "Genk şehri, sporu ve çok kültürlü iş birliğini bir araya getirme biçimi nedeniyle kulübü entegrasyon ödülüyle onurlandırır.",
      en: "The city of Genk honours the club with its integration award for the way sport and multicultural cooperation go hand in hand.",
    },
  },
  {
    year: "2000s",
    title: {
      nl: "Uitbouw van de jeugdwerking",
      tr: "Altyapının kurulması",
      en: "Building the youth academy",
    },
    body: {
      nl: "De club investeert in een volwaardige jeugdopleiding. Van U6 tot U21 groeit de werking uit tot het hart van de vereniging.",
      tr: "Kulüp tam donanımlı bir altyapıya yatırım yapar. U6'dan U21'e uzanan yapı, kulübün kalbi hâline gelir.",
      en: "The club invests in a full youth academy. From U6 to U21, it grows into the heart of the organisation.",
    },
  },
  {
    year: "2026",
    title: {
      nl: "Vijftig jaar Turkse Rangers",
      tr: "Turkse Rangers'ın 50. yılı",
      en: "Fifty years of Turkse Rangers",
    },
    body: {
      nl: "Een halve eeuw voetbal in Waterschei. Zeventien ploegen, meer dan vierhonderd leden en een club die nog altijd draait op vrijwilligers.",
      tr: "Waterschei'de yarım asırlık futbol. On yedi takım, dört yüzden fazla üye ve hâlâ gönüllülerle ayakta duran bir kulüp.",
      en: "Half a century of football in Waterschei. Seventeen teams, more than four hundred members and a club still powered by volunteers.",
    },
  },
];

/**
 * Voorbeeldnamen voor de demo. Deze moeten vóór publicatie vervangen worden
 * door de echte bestuursleden en trainers van de club.
 */
export const staff: StaffMember[] = [
  {
    id: "staff-1",
    name: "Demo Voorzitter",
    role: { nl: "Voorzitter", tr: "Başkan", en: "Chairman" },
    isBoard: true,
    order: 1,
  },
  {
    id: "staff-2",
    name: "Demo Ondervoorzitter",
    role: { nl: "Ondervoorzitter", tr: "Başkan yardımcısı", en: "Vice-chairman" },
    isBoard: true,
    order: 2,
  },
  {
    id: "staff-3",
    name: "Demo Secretaris",
    role: { nl: "Secretaris", tr: "Genel sekreter", en: "Club secretary" },
    isBoard: true,
    email: "turkserangers9147@gmail.com",
    order: 3,
  },
  {
    id: "staff-4",
    name: "Demo Penningmeester",
    role: { nl: "Penningmeester", tr: "Sayman", en: "Treasurer" },
    isBoard: true,
    order: 4,
  },
  {
    id: "staff-5",
    name: "Demo Jeugdcoördinator",
    role: {
      nl: "Jeugdcoördinator",
      tr: "Altyapı koordinatörü",
      en: "Head of youth",
    },
    isBoard: true,
    order: 5,
  },
  {
    id: "staff-6",
    name: "Demo Gerechtigd Correspondent",
    role: {
      nl: "Gerechtigd correspondent",
      tr: "Yetkili yazışma sorumlusu",
      en: "Registered correspondent",
    },
    isBoard: true,
    order: 6,
  },
  {
    id: "coach-a1",
    name: "Demo Hoofdtrainer",
    role: { nl: "Hoofdtrainer (T1)", tr: "Teknik direktör (T1)", en: "Head coach (T1)" },
    isBoard: false,
    order: 10,
  },
  {
    id: "coach-a2",
    name: "Demo Assistent",
    role: { nl: "Assistent-trainer (T2)", tr: "Yardımcı antrenör (T2)", en: "Assistant coach (T2)" },
    isBoard: false,
    order: 11,
  },
  {
    id: "coach-gk",
    name: "Demo Keeperstrainer",
    role: { nl: "Keeperstrainer", tr: "Kaleci antrenörü", en: "Goalkeeping coach" },
    isBoard: false,
    order: 12,
  },
  {
    id: "coach-b1",
    name: "Demo Trainer B-kern",
    role: { nl: "Trainer B-kern", tr: "B takımı antrenörü", en: "B team coach" },
    isBoard: false,
    order: 13,
  },
  {
    id: "coach-w1",
    name: "Demo Trainer Dames",
    role: { nl: "Trainer Dames", tr: "Kadın takımı antrenörü", en: "Women's team coach" },
    isBoard: false,
    order: 14,
  },
  {
    id: "coach-y1",
    name: "Demo Jeugdtrainer",
    role: { nl: "Jeugdtrainer", tr: "Altyapı antrenörü", en: "Youth coach" },
    isBoard: false,
    order: 15,
  },
];

export const board = staff.filter((s) => s.isBoard).sort((a, b) => a.order - b.order);
export const coaches = staff.filter((s) => !s.isBoard).sort((a, b) => a.order - b.order);

export function staffById(id: string): StaffMember | undefined {
  return staff.find((s) => s.id === id);
}
