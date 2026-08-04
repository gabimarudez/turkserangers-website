import type { Localized } from "./types";

export interface LegalSection {
  title: Localized;
  paragraphs: Localized<string[]>;
}

export interface LegalDocument {
  updatedAt: string;
  sections: LegalSection[];
}

/**
 * CONCEPTTEKSTEN. Voldoende om de pagina's te tonen, maar ze moeten vóór
 * publicatie nagelezen worden — zeker het privacyluik, omdat de club met
 * gegevens van minderjarigen werkt (AVG/GDPR).
 */
export const privacy: LegalDocument = {
  updatedAt: "2026-08-01",
  sections: [
    {
      title: {
        nl: "Wie verwerkt jouw gegevens?",
        tr: "Verilerinizi kim işliyor?",
        en: "Who processes your data?",
      },
      paragraphs: {
        nl: [
          "F.C. Turkse Rangers Waterschei, Hoevenzavellaan 120, 3600 Genk, is verantwoordelijk voor de verwerking van persoonsgegevens via deze website.",
          "Voor vragen over jouw gegevens kan je terecht bij het secretariaat via turkserangers9147@gmail.com.",
        ],
        tr: [
          "Bu web sitesi üzerinden kişisel verilerin işlenmesinden F.C. Turkse Rangers Waterschei (Hoevenzavellaan 120, 3600 Genk) sorumludur.",
          "Verilerinizle ilgili sorularınız için turkserangers9147@gmail.com adresinden sekreterliğe ulaşabilirsiniz.",
        ],
        en: [
          "F.C. Turkse Rangers Waterschei, Hoevenzavellaan 120, 3600 Genk, is responsible for processing personal data through this website.",
          "For questions about your data, contact the club secretary at turkserangers9147@gmail.com.",
        ],
      },
    },
    {
      title: {
        nl: "Welke gegevens verwerken wij?",
        tr: "Hangi verileri işliyoruz?",
        en: "What data do we process?",
      },
      paragraphs: {
        nl: [
          "Via het contactformulier: je naam, e-mailadres, eventueel telefoonnummer en de inhoud van je bericht. Wij gebruiken die enkel om je vraag te beantwoorden.",
          "Voor leden en spelers: gegevens die nodig zijn voor de aansluiting bij de KBVB en de werking van de club.",
          "Op de website tonen wij namen, foto's en sportieve statistieken van spelers.",
        ],
        tr: [
          "İletişim formu aracılığıyla: adınız, e-posta adresiniz, varsa telefon numaranız ve mesajınızın içeriği. Bunları yalnızca sorunuzu yanıtlamak için kullanırız.",
          "Üyeler ve oyuncular için: KBVB'ye kayıt ve kulüp işleyişi için gerekli veriler.",
          "Web sitesinde oyuncuların adlarını, fotoğraflarını ve sportif istatistiklerini gösteriyoruz.",
        ],
        en: [
          "Through the contact form: your name, email address, optionally your phone number and the content of your message. We use these only to answer your question.",
          "For members and players: the data required for affiliation with the Belgian FA and for running the club.",
          "On the website we display players' names, photographs and sporting statistics.",
        ],
      },
    },
    {
      title: {
        nl: "Beeldmateriaal en minderjarigen",
        tr: "Görsel materyal ve reşit olmayanlar",
        en: "Images and underage players",
      },
      paragraphs: {
        nl: [
          "Namen en foto's van spelers jonger dan zestien jaar worden pas gepubliceerd nadat een ouder of voogd daarvoor schriftelijk toestemming heeft gegeven.",
          "Die toestemming kan op elk moment worden ingetrokken. Wij verwijderen het beeldmateriaal dan zo snel als redelijkerwijs mogelijk van de website.",
          "Bij groepsfoto's van wedstrijden en clubactiviteiten kan het gebeuren dat iemand herkenbaar in beeld komt. Wie daar bezwaar tegen heeft, laat het ons weten en wij verwijderen de foto.",
        ],
        tr: [
          "On altı yaşından küçük oyuncuların adları ve fotoğrafları, ancak bir ebeveyn veya vasi yazılı izin verdikten sonra yayınlanır.",
          "Bu izin her zaman geri çekilebilir. Bu durumda görsel materyali makul olan en kısa sürede web sitesinden kaldırırız.",
          "Maç ve kulüp etkinliklerine ait toplu fotoğraflarda kişiler tanınabilir şekilde yer alabilir. İtirazı olan bize bildirsin, fotoğrafı kaldıralım.",
        ],
        en: [
          "Names and photographs of players under sixteen are published only after a parent or guardian has given written consent.",
          "That consent can be withdrawn at any time. We will then remove the material from the website as quickly as reasonably possible.",
          "In group photographs from matches and club events, individuals may be recognisable. If you object, let us know and we will remove the photo.",
        ],
      },
    },
    {
      title: {
        nl: "Jouw rechten",
        tr: "Haklarınız",
        en: "Your rights",
      },
      paragraphs: {
        nl: [
          "Je hebt het recht om je gegevens in te kijken, te laten verbeteren of te laten verwijderen, en om bezwaar te maken tegen de verwerking.",
          "Stuur daarvoor een e-mail naar het secretariaat. Ben je niet tevreden met onze reactie, dan kan je klacht indienen bij de Gegevensbeschermingsautoriteit.",
        ],
        tr: [
          "Verilerinizi görme, düzelttirme veya sildirme ve işlenmesine itiraz etme hakkına sahipsiniz.",
          "Bunun için sekreterliğe e-posta gönderin. Yanıtımızdan memnun kalmazsanız Veri Koruma Kurumu'na şikâyette bulunabilirsiniz.",
        ],
        en: [
          "You have the right to access, correct or delete your data, and to object to its processing.",
          "Send an email to the club secretary. If you are not satisfied with our response, you may lodge a complaint with the Belgian Data Protection Authority.",
        ],
      },
    },
  ],
};

export const cookies: LegalDocument = {
  updatedAt: "2026-08-01",
  sections: [
    {
      title: {
        nl: "Welke cookies gebruiken wij?",
        tr: "Hangi çerezleri kullanıyoruz?",
        en: "Which cookies do we use?",
      },
      paragraphs: {
        nl: [
          "Deze website gebruikt geen trackingcookies en geen advertentiecookies.",
          "Wij bewaren enkel je taalkeuze, zodat je bij een volgend bezoek in dezelfde taal terechtkomt. Daar is geen toestemming voor nodig, omdat het puur functioneel is.",
        ],
        tr: [
          "Bu web sitesi takip çerezi ve reklam çerezi kullanmaz.",
          "Yalnızca dil tercihinizi saklıyoruz; böylece bir sonraki ziyaretinizde aynı dilde karşılanıyorsunuz. Tamamen işlevsel olduğu için bunun için izin gerekmez.",
        ],
        en: [
          "This website uses no tracking cookies and no advertising cookies.",
          "We only store your language preference so that you return to the site in the same language. No consent is required for this, as it is purely functional.",
        ],
      },
    },
    {
      title: {
        nl: "Diensten van derden",
        tr: "Üçüncü taraf hizmetleri",
        en: "Third-party services",
      },
      paragraphs: {
        nl: [
          "Op de contactpagina tonen wij een kaart van OpenStreetMap. Daarbij wordt je IP-adres doorgegeven aan die dienst.",
          "Links naar Instagram openen in een nieuw venster; op die pagina's geldt het privacybeleid van het betreffende platform.",
        ],
        tr: [
          "İletişim sayfasında OpenStreetMap üzerinden bir harita gösteriyoruz. Bu sırada IP adresiniz o hizmete iletilir.",
          "Instagram bağlantıları yeni pencerede açılır; o sayfalarda ilgili platformun gizlilik politikası geçerlidir.",
        ],
        en: [
          "On the contact page we display a map from OpenStreetMap. Your IP address is shared with that service.",
          "Links to Instagram open in a new window; on those pages the privacy policy of that platform applies.",
        ],
      },
    },
  ],
};

export const clubRules: LegalDocument = {
  updatedAt: "2026-08-01",
  sections: [
    {
      title: {
        nl: "Algemeen",
        tr: "Genel",
        en: "General",
      },
      paragraphs: {
        nl: [
          "Iedereen die lid is van FC Turkse Rangers — speler, ouder, trainer, bestuurslid of vrijwilliger — draagt bij aan een respectvolle clubsfeer.",
          "Discriminatie, pesten, geweld en ongepast taalgebruik worden niet getolereerd, in geen enkele vorm.",
        ],
        tr: [
          "FC Turkse Rangers üyesi olan herkes — oyuncu, veli, antrenör, yönetim kurulu üyesi veya gönüllü — saygılı bir kulüp ortamına katkıda bulunur.",
          "Ayrımcılık, zorbalık, şiddet ve uygunsuz dil hiçbir biçimde hoş görülmez.",
        ],
        en: [
          "Everyone who is a member of FC Turkse Rangers — player, parent, coach, board member or volunteer — contributes to a respectful club atmosphere.",
          "Discrimination, bullying, violence and inappropriate language are not tolerated in any form.",
        ],
      },
    },
    {
      title: {
        nl: "Spelers",
        tr: "Oyuncular",
        en: "Players",
      },
      paragraphs: {
        nl: [
          "Wees op tijd voor training en wedstrijd. Ben je verhinderd, verwittig dan tijdig je trainer.",
          "Draag zorg voor de clubuitrusting, de kleedkamers en het materiaal.",
          "Respecteer de scheidsrechter, de tegenstander en je eigen ploegmaats — ook bij een nederlaag.",
        ],
        tr: [
          "Antrenman ve maçlara zamanında gelin. Gelemeyecekseniz antrenörünüzü zamanında bilgilendirin.",
          "Kulüp ekipmanına, soyunma odalarına ve malzemelere özen gösterin.",
          "Hakeme, rakibe ve takım arkadaşlarınıza saygı gösterin — yenilgide de.",
        ],
        en: [
          "Be on time for training and matches. If you cannot attend, notify your coach in good time.",
          "Take care of club kit, changing rooms and equipment.",
          "Respect the referee, the opposition and your own teammates — including in defeat.",
        ],
      },
    },
    {
      title: {
        nl: "Ouders",
        tr: "Veliler",
        en: "Parents",
      },
      paragraphs: {
        nl: [
          "Moedig aan, coach niet. Het coachen laten we over aan de trainer.",
          "Positieve aanmoediging langs de lijn helpt; commentaar op de scheidsrechter helpt niemand.",
          "Breng je kind tijdig naar training en wedstrijd, en haal het tijdig weer op.",
        ],
        tr: [
          "Destekleyin, teknik direktörlük yapmayın. Çalıştırmayı antrenöre bırakalım.",
          "Saha kenarından olumlu destek işe yarar; hakeme yönelik yorumlar kimseye yaramaz.",
          "Çocuğunuzu antrenman ve maça zamanında getirin, zamanında alın.",
        ],
        en: [
          "Encourage, don't coach. Coaching is the coach's job.",
          "Positive support from the touchline helps; comments aimed at the referee help no one.",
          "Bring your child to training and matches on time, and collect them on time.",
        ],
      },
    },
    {
      title: {
        nl: "Lidgeld en administratie",
        tr: "Aidat ve idari işler",
        en: "Membership fee and administration",
      },
      paragraphs: {
        nl: [
          "Het lidgeld wordt jaarlijks vastgelegd door het bestuur en dient betaald te worden vóór de start van de competitie.",
          "Voor gezinnen waarvoor het lidgeld een drempel vormt, bestaan er oplossingen. Neem daarvoor discreet contact op met het secretariaat.",
        ],
        tr: [
          "Aidat her yıl yönetim kurulu tarafından belirlenir ve lig başlamadan önce ödenmelidir.",
          "Aidatın zorluk oluşturduğu aileler için çözümler mevcuttur. Bunun için sekreterlikle gizlilik içinde iletişime geçin.",
        ],
        en: [
          "The membership fee is set annually by the board and must be paid before the season starts.",
          "For families for whom the fee is a barrier, solutions exist. Contact the club secretary in confidence.",
        ],
      },
    },
  ],
};
