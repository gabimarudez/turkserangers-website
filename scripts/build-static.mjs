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
console.log("\nKlaar. De site staat in out/ en kan zo naar de host.");
