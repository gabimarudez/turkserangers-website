import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Shield, Youtube } from "lucide-react";
import { href } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/nl";
import { club } from "@/data/club";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const columns = [
    {
      title: dict.footer.club,
      links: [
        { label: dict.footer.aboutClub, path: "/club" },
        { label: dict.nav.history, path: "/club#geschiedenis" },
        { label: dict.nav.board, path: "/club#bestuur" },
        { label: dict.nav.staff, path: "/club#staf" },
        { label: dict.nav.volunteers, path: "/club#vrijwilligers" },
      ],
    },
    {
      title: dict.footer.teams,
      links: [
        { label: dict.teams.categoryAll, path: "/teams" },
        { label: "A-kern", path: "/teams/a-kern" },
        { label: "B-kern", path: "/teams/b-kern" },
        { label: dict.teams.categoryWomen, path: "/teams/dames" },
        { label: dict.nav.youth, path: "/jeugdopleiding" },
      ],
    },
    {
      title: dict.footer.info,
      links: [
        { label: dict.footer.calendar, path: "/wedstrijden" },
        { label: dict.footer.results, path: "/wedstrijden#uitslagen" },
        { label: dict.nav.standings, path: "/wedstrijden#klassement" },
        { label: dict.nav.news, path: "/nieuws" },
        { label: dict.nav.rules, path: "/clubreglement" },
      ],
    },
    {
      title: dict.footer.extra,
      links: [
        { label: dict.nav.gallery, path: "/fotogalerij" },
        { label: dict.nav.sponsors, path: "/sponsors" },
        { label: dict.nav.becomeMember, path: "/contact" },
        { label: dict.nav.contact, path: "/contact" },
        { label: dict.nav.adminLogin, path: "/admin" },
      ],
    },
  ];

  const socials = [
    { label: "Instagram", url: club.social.instagram, Icon: Instagram },
    { label: "Facebook", url: club.social.facebook, Icon: Facebook },
    { label: "YouTube", url: club.social.youtube, Icon: Youtube },
  ].filter((s) => s.url); // Lege links tonen we niet — beter geen link dan een dode link.

  return (
    <footer className="border-t border-rangers-border bg-black">
      <div className="container grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href={href(locale, "/")} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rangers-surface2 ring-1 ring-white/10">
              <Shield className="h-5 w-5 text-rangers-red" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-semibold uppercase tracking-wide">
                {club.name}
              </span>
              <span className="block text-[11px] uppercase tracking-widest2 text-white/45">
                {club.city} · {club.founded}
              </span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-white/50">
            {dict.footer.tagline}
            <br />
            {dict.footer.taglineSub}
          </p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-2">
              {socials.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-rangers-red hover:text-rangers-red"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="font-display text-xs font-semibold uppercase tracking-widest2 text-white/40">
              {column.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}-${link.path}`}>
                  <Link
                    href={href(locale, link.path)}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="font-display text-xs font-semibold uppercase tracking-widest2 text-white/40">
            {dict.footer.contact}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rangers-red" aria-hidden="true" />
              <a
                href={club.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <span className="block">{club.address.street}</span>
                <span className="block">
                  {club.address.postalCode} {club.address.city}
                </span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-rangers-red" aria-hidden="true" />
              <a href={club.contact.phoneHref} className="hover:text-white">
                {club.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-rangers-red" aria-hidden="true" />
              <a href={`mailto:${club.contact.email}`} className="break-all hover:text-white">
                {club.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-rangers-border">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {club.name} {club.city}. {dict.footer.rights}
          </p>
          <div className="flex gap-5">
            <Link href={href(locale, "/privacy")} className="hover:text-white">
              {dict.footer.privacy}
            </Link>
            <Link href={href(locale, "/cookies")} className="hover:text-white">
              {dict.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
