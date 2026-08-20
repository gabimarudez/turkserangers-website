/**
 * Bouwt de site als losse HTML-bestanden in `out/`.
 *
 * Zo'n statische versie draait op elke host — Cloudflare Pages, GitHub Pages —
 * zonder server, zonder onderhoud en zonder rekening per bezoeker.
 *
 *   npm run build:static
 *
 * Twee dingen moeten daarvoor geregeld worden, en die staan hier bij elkaar
 * in plaats van verspreid over de instellingen van elke hostingpartij:
 *
 *  1. `src/middleware.ts` gaat tijdelijk aan de kant. Middleware draait bij
 *     elke aanvraag op een server; die is er niet. Next weigert de export
 *     zolang het bestand bestaat.
 *
 *  2. De hoofdmap krijgt een eigen `index.html`. Elke pagina van de site staat
 *     onder /nl, /tr of /en, dus zonder dit bestand is turkserangers.com zelf
 *     leeg. Deze pagina kiest de taal van de browser en stuurt door — precies
 *     wat de middleware anders had gedaan.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const middleware = path.join(root, "src/middleware.ts");
const parked = path.join(root, "middleware.ts.build");

// Een projectsite op GitHub Pages staat onder /<repo>/; op een eigen domein
// staat alles in de hoofdmap en blijft dit leeg.
const basePath = process.env.BASE_PATH ?? "";

function parkMiddleware() {
  if (fs.existsSync(middleware)) fs.renameSync(middleware, parked);
}

function restoreMiddleware() {
  if (fs.existsSync(parked)) fs.renameSync(parked, middleware);
}

function writeLanguageRedirect() {
  const html = `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>FC Turkse Rangers</title>
    <link rel="canonical" href="${basePath}/nl/">
${["nl", "tr", "en"]
  .map((l) => `    <link rel="alternate" hreflang="${l}" href="${basePath}/${l}/">`)
  .join("\n")}
    <link rel="alternate" hreflang="x-default" href="${basePath}/nl/">
    <style>
      body {
        margin: 0;
        display: grid;
        place-items: center;
        min-height: 100vh;
        background: #08090b;
        color: #6b7280;
        font: 14px system-ui, sans-serif;
      }
      a { color: #e11d2e }
    </style>
    <script>
      (function () {
        var supported = ["nl", "tr", "en"];
        var wanted = (navigator.language || "nl").slice(0, 2).toLowerCase();
        var locale = supported.indexOf(wanted) === -1 ? "nl" : wanted;
        location.replace("${basePath}/" + locale + "/");
      })();
    </script>
  </head>
  <body>
    <!-- Zonder JavaScript, en voor zoekmachines: gewoon een link. -->
    <p><a href="${basePath}/nl/">Doorgaan naar de website</a></p>
  </body>
</html>
`;
  fs.writeFileSync(path.join(root, "out/index.html"), html);

  // GitHub Pages negeert zonder dit bestand alle mappen die met _ beginnen,
  // waaronder _next met alle CSS en JavaScript. Cloudflare heeft er geen last van.
  fs.writeFileSync(path.join(root, "out/.nojekyll"), "");
}

/**
 * Next levert bij een statische export een kale Engelse 404 ("This page could
 * not be found"), en de pagina's die via `notFound()` ontstaan komen als leeg
 * vlak uit de build: hun inhoud wordt pas door JavaScript ingevuld. Cloudflare
 * serveert bij een onbekend adres de dichtstbijzijnde 404.html, dus die
 * schrijven we hier zelf — in de drie talen van de club.
 */
function writeNotFoundPage() {
  const teksten = {
    nl: {
      heading: "Deze pagina bestaat niet",
      body: "De link klopt niet meer, of de pagina is verplaatst.",
      cta: "Naar de startpagina",
    },
    tr: {
      heading: "Böyle bir sayfa yok",
      body: "Bağlantı artık geçerli değil ya da sayfa taşınmış.",
      cta: "Ana sayfaya dön",
    },
    en: {
      heading: "This page does not exist",
      body: "The link is no longer valid, or the page has moved.",
      cta: "Go to the home page",
    },
  };

  const html = `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>404 — FC Turkse Rangers</title>
    <style>
      :root { color-scheme: dark }
      body {
        margin: 0;
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 2rem 1.25rem;
        background: #08090b;
        color: #fff;
        font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif;
        text-align: center;
      }
      .code { font-size: 4rem; font-weight: 700; color: #e11d2e; line-height: 1 }
      h1 { margin: 1rem 0 0; font-size: 1.5rem; text-transform: uppercase; letter-spacing: -0.01em }
      p { margin: 0.75rem 0 0; color: rgba(255, 255, 255, 0.6) }
      a {
        display: inline-block;
        margin-top: 2rem;
        border-radius: 0.375rem;
        background: #e11d2e;
        padding: 0.7rem 1.4rem;
        color: #fff;
        font-weight: 600;
        text-decoration: none;
      }
      a:hover { background: #b91626 }
    </style>
  </head>
  <body>
    <div>
      <p class="code">404</p>
      <h1 id="kop">${teksten.nl.heading}</h1>
      <p id="tekst">${teksten.nl.body}</p>
      <a id="link" href="${basePath}/nl/">${teksten.nl.cta}</a>
    </div>
    <script>
      // Toon de melding in de taal waarin de bezoeker aan het lezen was: die
      // staat in het adres (/tr/…). Anders die van de browser, anders het
      // Nederlands dat al in de HTML staat.
      (function () {
        var t = ${JSON.stringify(teksten)};
        var uit = location.pathname.split("/").filter(Boolean)[0];
        var taal = t[uit] ? uit : null;
        if (!taal) {
          var browser = (navigator.language || "nl").slice(0, 2).toLowerCase();
          taal = t[browser] ? browser : "nl";
        }
        document.documentElement.lang = taal;
        document.getElementById("kop").textContent = t[taal].heading;
        document.getElementById("tekst").textContent = t[taal].body;
        var link = document.getElementById("link");
        link.textContent = t[taal].cta;
        link.href = "${basePath}/" + taal + "/";
      })();
    </script>
  </body>
</html>
`;
  fs.writeFileSync(path.join(root, "out/404.html"), html);
}

/**
 * Next weigert een lege lijst in `generateStaticParams`, dus houdt de
 * nieuwsroute één adres over zolang er geen echte artikelen zijn. Dat adres
 * mag niet als bestand blijven staan: een host serveert het dan met een
 * 200-status en een lege pagina. Weghalen laat de 404 zijn werk doen.
 */
function removePlaceholderRoutes() {
  for (const locale of ["nl", "tr", "en"]) {
    const dir = path.join(root, "out", locale, "nieuws/geen-berichten");
    fs.rmSync(dir, { recursive: true, force: true });
    fs.rmSync(`${dir}.txt`, { force: true });
  }
}

parkMiddleware();
try {
  execFileSync("npx", ["next", "build"], {
    stdio: "inherit",
    env: { ...process.env, EXPORT_MODE: "1" },
  });
} finally {
  // Ook bij een mislukte build hoort de middleware terug op zijn plek; anders
  // draait `npm run dev` daarna zonder taalherkenning.
  restoreMiddleware();
}

writeLanguageRedirect();
writeNotFoundPage();
removePlaceholderRoutes();
console.log("\nKlaar. De site staat in out/ en kan zo naar de host.");
