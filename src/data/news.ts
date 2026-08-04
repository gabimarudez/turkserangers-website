import type { NewsArticle, NewsCategory } from "./types";

/** DEMO-DATA — voorbeeldartikelen om het ontwerp te tonen. */
export const news: NewsArticle[] = [
  {
    slug: "vijftig-jaar-turkse-rangers",
    category: "club",
    featured: true,
    publishedAt: "2026-08-01",
    author: "Clubsecretariaat",
    imageAlt: {
      nl: "Spelers en supporters vieren feest op het veld",
      tr: "Oyuncular ve taraftarlar sahada kutlama yapıyor",
      en: "Players and supporters celebrating on the pitch",
    },
    title: {
      nl: "Vijftig jaar Turkse Rangers: het jubileumseizoen begint",
      tr: "Turkse Rangers'ta 50. yıl: jübile sezonu başlıyor",
      en: "Fifty years of Turkse Rangers: the anniversary season begins",
    },
    excerpt: {
      nl: "In 1976 begon het als een buurtinitiatief in Waterschei. Vijftig jaar later telt de club zeventien ploegen en meer dan vierhonderd leden.",
      tr: "1976'da Waterschei'de bir mahalle girişimi olarak başladı. Elli yıl sonra kulüpte on yedi takım ve dört yüzden fazla üye var.",
      en: "It started in 1976 as a neighbourhood initiative in Waterschei. Fifty years on, the club has seventeen teams and over four hundred members.",
    },
    body: {
      nl: [
        "Dit seizoen bestaat FC Turkse Rangers vijftig jaar. Wat in 1976 begon als een groepje jongeren uit Waterschei die samen wilden voetballen, is uitgegroeid tot een van de grootste familieclubs van Genk.",
        "Doorheen het jubileumseizoen plannen we verschillende activiteiten: een jubileumwedstrijd, een tentoonstelling met foto's uit het clubarchief en een feestavond voor leden, oud-spelers en vrijwilligers.",
        "Heb je oude foto's, truitjes of krantenknipsels van de club? Wij verzamelen ze graag voor de tentoonstelling. Neem contact op via het secretariaat.",
      ],
      tr: [
        "Bu sezon FC Turkse Rangers elli yaşına giriyor. 1976'da Waterschei'den birlikte futbol oynamak isteyen bir grup gencin başlattığı şey, bugün Genk'in en büyük aile kulüplerinden birine dönüştü.",
        "Jübile sezonu boyunca çeşitli etkinlikler planlıyoruz: bir jübile maçı, kulüp arşivinden fotoğraflarla bir sergi ve üyeler, eski oyuncular ve gönüllüler için bir gala gecesi.",
        "Kulübe ait eski fotoğraflarınız, formalarınız veya gazete kupürleriniz var mı? Sergi için toplamak isteriz. Sekreterlik üzerinden bize ulaşın.",
      ],
      en: [
        "This season FC Turkse Rangers turns fifty. What began in 1976 as a group of young people from Waterschei wanting to play football together has grown into one of the largest family clubs in Genk.",
        "Throughout the anniversary season we are planning several events: a jubilee match, an exhibition of photographs from the club archive and a celebration evening for members, former players and volunteers.",
        "Do you have old photos, shirts or newspaper clippings of the club? We would love to collect them for the exhibition. Get in touch through the club secretary.",
      ],
    },
  },
  {
    slug: "voorbereiding-afgesloten-met-zege",
    category: "matches",
    featured: false,
    publishedAt: "2026-08-02",
    author: "Persdienst",
    imageAlt: {
      nl: "Actiebeeld uit de oefenwedstrijd",
      tr: "Hazırlık maçından bir an",
      en: "Action shot from the friendly",
    },
    title: {
      nl: "A-kern sluit voorbereiding af met 2-0 tegen Winterslag Boys",
      tr: "A takımı hazırlık dönemini Winterslag Boys'u 2-0 yenerek kapattı",
      en: "First team ends pre-season with a 2-0 win over Winterslag Boys",
    },
    excerpt: {
      nl: "Vijf oefenwedstrijden, drie overwinningen en een gelijkspel. De ploeg is klaar voor de competitiestart van 16 augustus.",
      tr: "Beş hazırlık maçı, üç galibiyet ve bir beraberlik. Takım 16 Ağustos'taki lig açılışına hazır.",
      en: "Five friendlies, three wins and a draw. The squad is ready for the league opener on 16 August.",
    },
    body: {
      nl: [
        "In de laatste oefenwedstrijd van de voorbereiding won de A-kern met 2-0 van FC Winterslag Boys. Beide doelpunten vielen in de tweede helft.",
        "Over de hele voorbereiding scoorde de ploeg twaalf keer en incasseerde ze zes tegendoelpunten. De staf houdt vooral het defensieve blok en de omschakeling in de gaten.",
        "De competitie begint op zondag 16 augustus om 15u00 met een thuiswedstrijd tegen K. Park Houthalen.",
      ],
      tr: [
        "Hazırlık döneminin son maçında A takımı FC Winterslag Boys'u 2-0 yendi. Her iki gol de ikinci yarıda geldi.",
        "Hazırlık dönemi genelinde takım on iki gol attı, altı gol yedi. Teknik ekip özellikle savunma bloğunu ve hızlı geçiş oyununu takip ediyor.",
        "Lig, 16 Ağustos Pazar günü saat 15.00'te K. Park Houthalen ile oynanacak iç saha maçıyla başlıyor.",
      ],
      en: [
        "In the final friendly of pre-season the first team beat FC Winterslag Boys 2-0, with both goals coming after the break.",
        "Across pre-season the side scored twelve and conceded six. The staff are paying particular attention to the defensive block and transitions.",
        "The league campaign opens on Sunday 16 August at 15:00 with a home fixture against K. Park Houthalen.",
      ],
    },
  },
  {
    slug: "start-jeugdtrainingen-2026-2027",
    category: "youth",
    featured: false,
    publishedAt: "2026-07-28",
    author: "Jeugdcoördinatie",
    imageAlt: {
      nl: "Jeugdspelers tijdens de training",
      tr: "Antrenman sırasında altyapı oyuncuları",
      en: "Youth players during training",
    },
    title: {
      nl: "Jeugdtrainingen starten opnieuw vanaf 10 augustus",
      tr: "Altyapı antrenmanları 10 Ağustos'ta yeniden başlıyor",
      en: "Youth training restarts from 10 August",
    },
    excerpt: {
      nl: "Alle jeugdploegen van U6 tot U19 hervatten de trainingen. Nieuwe spelers mogen twee keer vrijblijvend meetrainen.",
      tr: "U6'dan U19'a kadar tüm altyapı takımları antrenmanlara başlıyor. Yeni oyuncular iki kez ücretsiz katılabilir.",
      en: "All youth teams from U6 to U19 resume training. New players are welcome to join two sessions with no obligation.",
    },
    body: {
      nl: [
        "Vanaf maandag 10 augustus hervatten alle jeugdploegen hun trainingen. De uurroosters per ploeg vind je op de teampagina's.",
        "Nieuwe spelers zijn welkom om twee trainingen vrijblijvend mee te doen. Meld je vooraf aan via het contactformulier, zodat de trainer je verwacht.",
        "Ouders vragen wij om het inschrijvingsformulier en het toestemmingsformulier voor beeldmateriaal ingevuld mee te brengen naar de eerste training.",
      ],
      tr: [
        "10 Ağustos Pazartesi'den itibaren tüm altyapı takımları antrenmanlara başlıyor. Takım bazında saatleri takım sayfalarında bulabilirsiniz.",
        "Yeni oyuncular iki antrenmana hiçbir yükümlülük olmadan katılabilir. Antrenörün sizi beklemesi için lütfen önceden iletişim formundan haber verin.",
        "Velilerden, kayıt formunu ve görsel materyal izin formunu doldurup ilk antrenmana getirmelerini rica ediyoruz.",
      ],
      en: [
        "From Monday 10 August all youth teams resume training. Per-team schedules are listed on the team pages.",
        "New players are welcome to join two sessions with no obligation. Please register in advance through the contact form so the coach expects you.",
        "We ask parents to bring the completed registration form and the image consent form to the first session.",
      ],
    },
  },
  {
    slug: "nieuwe-hoofdsponsor-seizoen-2026-2027",
    category: "sponsors",
    featured: false,
    publishedAt: "2026-07-20",
    author: "Bestuur",
    imageAlt: {
      nl: "Ondertekening van de sponsorovereenkomst",
      tr: "Sponsorluk anlaşmasının imzalanması",
      en: "Signing of the sponsorship agreement",
    },
    title: {
      nl: "Sponsorploeg versterkt voor het jubileumseizoen",
      tr: "Jübile sezonu için sponsor kadrosu güçlendi",
      en: "Sponsor line-up strengthened for the anniversary season",
    },
    excerpt: {
      nl: "Verschillende lokale ondernemers verlengden hun samenwerking met de club. Zonder hun steun geen jeugdwerking.",
      tr: "Birçok yerel işletme kulüple iş birliğini uzattı. Onların desteği olmadan altyapı çalışmaları olmaz.",
      en: "Several local businesses extended their partnership with the club. Without their support there is no youth academy.",
    },
    body: {
      nl: [
        "Voor het jubileumseizoen mogen we opnieuw rekenen op de steun van onze hoofdsponsors en partners.",
        "De inkomsten uit sponsoring gaan integraal naar de werking: trainingsmateriaal, uitrusting voor de jeugdploegen, terreinonderhoud en de opleiding van trainers.",
        "Ondernemers die willen aansluiten, kunnen contact opnemen met het bestuur. Wij werken met formules vanaf een reclamebord langs het veld tot volledige shirtsponsoring.",
      ],
      tr: [
        "Jübile sezonunda yine ana sponsorlarımızın ve partnerlerimizin desteğine güvenebiliyoruz.",
        "Sponsorluk gelirlerinin tamamı kulüp faaliyetlerine gidiyor: antrenman malzemeleri, altyapı takımlarının ekipmanları, saha bakımı ve antrenör eğitimi.",
        "Katılmak isteyen işletmeler yönetim kuruluyla iletişime geçebilir. Saha kenarı reklam panosundan tam forma sponsorluğuna kadar farklı paketlerimiz var.",
      ],
      en: [
        "For the anniversary season we can once again count on the support of our main sponsors and partners.",
        "Sponsorship income goes entirely into the club: training equipment, kit for the youth teams, pitch maintenance and coach education.",
        "Businesses wishing to join can contact the board. We offer packages ranging from pitchside advertising to full shirt sponsorship.",
      ],
    },
  },
  {
    slug: "damesploeg-zoekt-speelsters",
    category: "club",
    featured: false,
    publishedAt: "2026-07-15",
    author: "Clubsecretariaat",
    imageAlt: {
      nl: "Damesploeg tijdens de warming-up",
      tr: "Isınma sırasında kadın takımı",
      en: "The women's team warming up",
    },
    title: {
      nl: "Damesploeg zoekt versterking voor het nieuwe seizoen",
      tr: "Kadın takımı yeni sezon için oyuncu arıyor",
      en: "Women's team looking for players for the new season",
    },
    excerpt: {
      nl: "Onze damesploeg groeit en verwelkomt graag nieuwe speelsters vanaf zestien jaar, met of zonder ervaring.",
      tr: "Kadın takımımız büyüyor ve on altı yaşından itibaren, tecrübeli ya da tecrübesiz yeni oyuncuları bekliyor.",
      en: "Our women's team is growing and welcomes new players aged sixteen and up, with or without experience.",
    },
    body: {
      nl: [
        "De damesploeg traint op dinsdag en vrijdag van 19u00 tot 20u30.",
        "Ervaring is geen vereiste. Wie nooit in clubverband gevoetbald heeft, is even welkom als wie al jaren speelt.",
        "Interesse? Kom langs op een training of stuur een bericht via het contactformulier.",
      ],
      tr: [
        "Kadın takımı salı ve cuma günleri 19.00-20.30 arasında antrenman yapıyor.",
        "Tecrübe şart değil. Daha önce hiç kulüpte futbol oynamamış olanlar da yıllardır oynayanlar kadar bekleniyor.",
        "İlgileniyor musunuz? Bir antrenmana uğrayın veya iletişim formundan mesaj gönderin.",
      ],
      en: [
        "The women's team trains on Tuesday and Friday from 19:00 to 20:30.",
        "Experience is not required. Anyone who has never played club football is as welcome as someone who has played for years.",
        "Interested? Drop by a training session or send us a message through the contact form.",
      ],
    },
  },
  {
    slug: "kantine-vrijwilligers-gezocht",
    category: "club",
    featured: false,
    publishedAt: "2026-07-08",
    author: "Bestuur",
    imageAlt: {
      nl: "De clubkantine op een wedstrijddag",
      tr: "Maç günü kulüp kantini",
      en: "The clubhouse on a matchday",
    },
    title: {
      nl: "Vrijwilligers gezocht voor kantine en wedstrijddagen",
      tr: "Kantin ve maç günleri için gönüllü aranıyor",
      en: "Volunteers wanted for the canteen and matchdays",
    },
    excerpt: {
      nl: "Een paar uur per maand maakt al een groot verschil. Ook zonder voetbalervaring ben je welkom.",
      tr: "Ayda birkaç saat bile büyük fark yaratıyor. Futbol tecrübeniz olmasa da bekleriz.",
      en: "A few hours a month already makes a big difference. No football experience needed.",
    },
    body: {
      nl: [
        "Een club met zeventien ploegen draait alleen dankzij vrijwilligers. Wij zoeken helpende handen voor de kantine, het terreinonderhoud en de begeleiding op wedstrijddagen.",
        "Je bepaalt zelf hoeveel tijd je vrijmaakt. Ook een paar uur per maand helpt.",
        "Interesse? Spreek een bestuurslid aan of laat het weten via het contactformulier.",
      ],
      tr: [
        "On yedi takımlı bir kulüp yalnızca gönüllülerle ayakta durur. Kantin, saha bakımı ve maç günü organizasyonu için yardım edecek eller arıyoruz.",
        "Ne kadar zaman ayıracağınıza siz karar verirsiniz. Ayda birkaç saat bile yeter.",
        "İlgileniyor musunuz? Bir yönetim kurulu üyesiyle konuşun veya iletişim formundan bize yazın.",
      ],
      en: [
        "A club with seventeen teams only runs thanks to volunteers. We are looking for help in the canteen, with pitch maintenance and on matchdays.",
        "You decide how much time you give. Even a few hours a month helps.",
        "Interested? Speak to a board member or let us know through the contact form.",
      ],
    },
  },
];

export const newsByDate = [...news].sort(
  (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
);

export function articleBySlug(slug: string): NewsArticle | undefined {
  return news.find((a) => a.slug === slug);
}

export function articlesByCategory(category: NewsCategory | "all"): NewsArticle[] {
  return category === "all"
    ? newsByDate
    : newsByDate.filter((a) => a.category === category);
}

export const newsCategories: NewsCategory[] = ["club", "matches", "youth", "sponsors"];

export const categoryLabels: Record<NewsCategory, { nl: string; tr: string; en: string }> = {
  club: { nl: "Clubnieuws", tr: "Kulüp haberleri", en: "Club news" },
  matches: { nl: "Wedstrijden", tr: "Maçlar", en: "Matches" },
  youth: { nl: "Jeugd", tr: "Altyapı", en: "Youth" },
  sponsors: { nl: "Sponsors", tr: "Sponsorlar", en: "Sponsors" },
};
