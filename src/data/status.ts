/**
 * Welke gegevens al écht van de club zijn.
 *
 * De site staat online op turkserangers.com. Alles wat hier op `false` staat,
 * bestaat in `src/data/` nog als voorbeeld: verzonnen namen, verzonnen
 * uitslagen, verzonnen artikelen. Bezoekers zouden die voor waar aannemen —
 * een bezoeker kan niet zien dat "Demo Voorzitter" geen bestuurslid is, en een
 * uitslag van 4-1 tegen KFC Zwartberg leest als een echte uitslag.
 *
 * Zolang een sleutel op `false` staat, toont de site op die plek eerlijk dat
 * de gegevens nog volgen. De voorbeeldgegevens blijven wel bestaan: het
 * beheerpaneel draait erop, zodat bestuur en trainers kunnen zien hoe het
 * werkt vóór de echte gegevens er zijn.
 *
 * Zodra de club iets aanlevert: zet de sleutel op `true` en vervang het
 * bijbehorende bestand in `src/data/`. Beide horen bij elkaar — een sleutel
 * omzetten zonder de gegevens te vervangen zet de verzonnen versie online.
 */
export const dataReady = {
  /** Bestuursleden — `board` in src/data/club.ts */
  board: false,
  /** Trainers en staf — `coaches` in src/data/club.ts */
  staff: false,
  /** Spelerskernen — src/data/players.ts */
  squads: false,
  /** Kalender, uitslagen en klassement — src/data/matches.ts */
  matches: false,
  /** Nieuwsartikelen — src/data/news.ts */
  news: false,
} as const;
