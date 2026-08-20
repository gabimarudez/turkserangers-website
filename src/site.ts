/**
 * Het adres waarop de site draait.
 *
 * Google, Facebook en WhatsApp hebben absolute URL's nodig — voor de canonieke
 * link, de sitemap en de afbeelding die bij een gedeeld bericht hoort. Tijdens
 * het ontwikkelen is dat localhost, op de echte site het clubdomein.
 *
 * De hostingpartij zet SITE_URL als omgevingsvariabele; staat die er niet, dan
 * valt het terug op het clubdomein zodat een handmatige build ook klopt.
 */
export const siteUrl = (
  process.env.SITE_URL ?? "https://turkserangers.com"
).replace(/\/+$/, "");
