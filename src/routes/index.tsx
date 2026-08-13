import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand-mark";
import { CookieSettingsButton } from "@/components/analytics-consent";
import {
  organizationJsonLd,
  setPageSeo,
  websiteJsonLd,
} from "@/lib/seo";
import heroWorkspace from "@/assets/hero-workspace.jpg";
import heroWorkspace800 from "@/assets/hero-workspace-800.jpg";
import heroWorkspace1200 from "@/assets/hero-workspace-1200.jpg";
import heroWorkspace1600 from "@/assets/hero-workspace-1600.jpg";
import heroWorkspaceWebp800 from "@/assets/hero-workspace-800.webp";
import heroWorkspaceWebp1200 from "@/assets/hero-workspace-1200.webp";
import heroWorkspaceWebp1600 from "@/assets/hero-workspace-1600.webp";
import christianPortrait from "@/assets/christian-new.png";
import christianPortraitWebp from "@/assets/christian-new.webp";
import samanthaPortrait from "@/assets/samantha-new.png";
import samanthaPortraitWebp from "@/assets/samantha-new.webp";

const maintenanceMode =
  import.meta.env.PROD && import.meta.env.VITE_MAINTENANCE_MODE === "true";

export const Route = createFileRoute("/")({
  component: Landing,
});

const nav = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#projekte", label: "Projekte" },
  { href: "#zusammenarbeit", label: "Zusammenarbeit" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#kontakt", label: "Kontakt" },
];

function Landing() {
  useEffect(() => {
    setPageSeo({
      title: "C&S Consulting | Operations, Prozesse & Digitalisierung",
      description:
        "Unternehmerisch geprägte Beratung für Operations, Prozesse, E-Commerce, Projekte und Digitalisierung – von der Analyse bis zur Umsetzung.",
      path: "/",
      jsonLd: [organizationJsonLd(), websiteJsonLd()],
    });
  }, []);

  if (maintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#hauptinhalt" className="skip-link">
        Zum Hauptinhalt
      </a>
      <Header />
      <main id="hauptinhalt">
        <Hero />
        <Competence />
        <Problems />
        <Services />
        <Cases />
        <Why />
        <Collaboration />
        <Industries />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function MaintenancePage() {
  return (
    <main className="flex min-h-screen bg-background text-foreground">
      <section className="container-page flex w-full items-center py-20">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-petrol" aria-hidden="true" />
            <BrandMark className="normal-case tracking-tight text-sm text-foreground" />
          </p>
          <h1 className="text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Website im Aufbau
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Unsere neue Website wird derzeit finalisiert. Vielen Dank fuer Ihre
            Geduld.
          </p>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Bei Rueckfragen oder Interesse an einem Erstgespraech erreichen Sie
            uns gern per E-Mail.
          </p>
          <a
            href="mailto:info@cs-business-consulting.com"
            className="mt-8 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            info@cs-business-consulting.com
          </a>
        </div>
      </section>
    </main>
  );
}

/* ---------- Header ---------- */
function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b hairline bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:gap-6">
        <a
          href="#top"
          className="min-w-0 shrink rounded-sm text-lg text-foreground"
          aria-label="C&S Consulting – zum Seitenanfang"
        >
          <BrandMark />
        </a>
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Hauptnavigation">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="shrink-0 whitespace-nowrap rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#kontakt"
          className="hidden shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:inline-flex"
        >
          Erstgespräch anfragen
        </a>
        <button
          ref={buttonRef}
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border hairline lg:hidden"
        >
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
          </span>
        </button>
      </div>
      {open ? (
        <div ref={panelRef} id={menuId} className="border-t hairline lg:hidden">
          <nav className="container-page flex flex-col py-4" aria-label="Mobile Navigation">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-sm py-2.5 text-sm text-muted-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex w-full justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Erstgespräch anfragen
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative">
      <div className="container-page grid gap-10 py-16 md:gap-12 md:py-24 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:items-stretch lg:gap-x-14 lg:gap-y-0">
        <div className="fade-in-up min-w-0 lg:col-start-1 lg:row-start-1">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-petrol" aria-hidden="true" />
            Beratung · Struktur · Umsetzung
          </p>
        </div>
        <div className="fade-in-up min-w-0 lg:col-start-1 lg:row-start-2">
          <h1 className="text-3xl leading-[1.1] sm:text-4xl md:text-5xl lg:text-[2.5rem] xl:text-5xl">
            Wir schaffen Strukturen, die Unternehmen tragen – im Tagesgeschäft und im{" "}
            <span className="text-petrol">Wachstum</span>.
          </h1>
          <div className="mt-6 border-l-2 border-petrol pl-5">
            <p className="max-w-xl text-base leading-relaxed text-foreground/80">
              <BrandMark className="text-foreground" /> verbindet Beratung mit eigener
              unternehmerischer und operativer Erfahrung. Wir analysieren gewachsene
              Strukturen, entwickeln Lösungen und begleiten deren Umsetzung bis in den
              operativen Betrieb – beratend, steuernd oder hands-on.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className="inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Projektvorhaben besprechen <span aria-hidden="true">→</span>
            </a>
            <a
              href="#projekte"
              className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border hairline bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Projekte &amp; Ergebnisse ansehen
            </a>
          </div>
        </div>
        <div className="min-w-0 self-center lg:col-start-2 lg:row-start-2 lg:self-stretch lg:relative lg:min-h-0">
          <div className="overflow-hidden rounded-2xl border hairline bg-card shadow-[0_20px_60px_-30px_rgba(20,30,50,0.25)] lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
            <picture>
              <source
                type="image/webp"
                srcSet={`${heroWorkspaceWebp800} 800w, ${heroWorkspaceWebp1200} 1200w, ${heroWorkspaceWebp1600} 1600w`}
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
              <img
                src={heroWorkspace}
                srcSet={`${heroWorkspace800} 800w, ${heroWorkspace1200} 1200w, ${heroWorkspace1600} 1600w`}
                sizes="(min-width: 1024px) 42vw, 100vw"
                alt="Prozess: Ausgangslage über C&S Consulting und Umsetzung bis zu klaren Verantwortlichkeiten und skalierbaren Strukturen."
                width={1600}
                height={1067}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full max-w-full object-contain object-center lg:max-h-full lg:w-auto lg:max-w-full"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Competence bar ---------- */
function Competence() {
  const items = [
    {
      primary: "Unternehmerische Praxis",
      secondary: "Gründung & Geschäftsführung",
    },
    {
      primary: "Operations & Prozesse",
      secondary: "Handel, E-Commerce & Organisation",
    },
    {
      primary: "Projekte & Transformation",
      secondary: "Steuerung & Schnittstellen",
    },
    {
      primary: "Digitalisierung & KI",
      secondary: "Automatisierung & digitale Lösungen",
    },
  ];
  return (
    <section aria-labelledby="kompetenz-heading" className="border-y hairline bg-sand/40">
      <h2 id="kompetenz-heading" className="sr-only">
        Kompetenzen
      </h2>
      <div className="container-page grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-x-10">
        {items.map((item) => (
          <div
            key={item.primary}
            className="flex flex-col items-center gap-2.5 text-center text-sm leading-snug"
          >
            <span className="text-foreground/80">{item.primary}</span>
            <div className="h-0.5 w-16 shrink-0 bg-petrol/45" aria-hidden="true" />
            <p className="text-foreground/80">{item.secondary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Problems ---------- */
function Problems() {
  const pains = [
    {
      title: "Prozesse skalieren nicht mehr mit",
      body: "Abläufe funktionieren, werden mit steigender Komplexität aber langsam, manuell oder abhängig von Einzelwissen.",
    },
    {
      title: "Fehlende operative Kapazität",
      body: "Tagesgeschäft und Projekte konkurrieren um dieselben Ressourcen. Wichtige Vorhaben kommen nicht zuverlässig voran.",
    },
    {
      title: "Systeme & Daten greifen nicht ineinander",
      body: "Informationen liegen verteilt, Schnittstellen fehlen und manuelle Übergaben ersetzen durchgängige Prozesse.",
    },
    {
      title: "Projekte stocken an Schnittstellen",
      body: "Operations, Einkauf, Marketing, E-Commerce und IT verfolgen unterschiedliche Prioritäten oder Verantwortlichkeiten bleiben unklar.",
    },
    {
      title: "Commerce skaliert nicht mit",
      body: "Sortiment, Kanäle, Produkte, Content und Bestände wachsen schneller als die Prozesse und Strukturen dahinter.",
    },
    {
      title: "KI ohne operative Wirkung",
      body: "Tools werden getestet, aber noch nicht sinnvoll in bestehende Abläufe und Verantwortlichkeiten integriert.",
    },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-petrol" aria-hidden="true" />
            Ausgangslage
          </p>
          <h2 className="text-3xl leading-[1.1] md:text-4xl">
            Wenn gewachsene Strukturen nicht mehr{" "}
            <span className="text-petrol">tragen</span>.
          </h2>
          <div className="mt-6 border-l-2 border-petrol pl-5">
            <p className="max-w-xl text-base leading-relaxed text-foreground/80">
              Viele operative Probleme entstehen nicht durch fehlende Ideen, sondern durch
              unklare Abläufe, begrenzte Kapazitäten und Systeme, die nicht zusammenspielen.
              Wir schaffen Transparenz, setzen Prioritäten und bringen die Umsetzung voran.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((p, i) => (
            <li key={p.title} className="bg-background p-6 md:p-7">
              <span className="mb-4 block font-display text-[1.75rem] font-semibold leading-none text-petrol">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground sm:min-h-[2.75rem]">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{p.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 max-w-xl border-l-2 border-petrol pl-5 md:mt-10">
          <p className="text-base leading-relaxed text-foreground/80">
            Daraus entwickeln wir klare Strukturen, priorisierte Maßnahmen und Lösungen,
            die im Tagesgeschäft funktionieren.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const services = [
    {
      title: "Operations & Prozesse",
      body: "Wir schaffen belastbare Abläufe und Verantwortlichkeiten – von der Analyse bis zu Strukturen, die mitwachsen.",
      bullets: [
        "Prozessanalyse & Optimierung",
        "Operative Strukturen & Verantwortlichkeiten",
        "Einkauf, Lieferanten & Warensteuerung",
        "Aufbau und Skalierung neuer Strukturen",
      ],
    },
    {
      title: "Commerce & Product Operations",
      body: "Wir strukturieren Commerce entlang der gesamten Produktkette – von Sortiment, Bestand und Content bis zu Produktdaten, Shops und Marktplätzen.",
      bullets: [
        "Sortiment, Bestand & Warenverfügbarkeit",
        "E-Commerce, Shopify & Marktplätze",
        "Product Operations & Produktdaten",
        "PIM / MDM & Datenqualität",
      ],
    },
    {
      title: "Projekte & Umsetzung",
      body: "Wir steuern bereichsübergreifende Vorhaben – von der Anforderung bis zum Rollout, zwischen Fachbereichen und IT.",
      bullets: [
        "Projektsteuerung & Rollouts",
        "System- und Prozesseinführungen",
        "Fachbereich-/IT-Koordination",
        "Temporäre Projektverantwortung",
      ],
    },
    {
      title: "Digitalisierung & Automatisierung",
      body: "Wir übersetzen operative Anforderungen in sinnvolle digitale Lösungen – von Prozessautomatisierung und KI bis zu internen Tools und individuellen Web-Apps.",
      bullets: [
        "Digitalisierung manueller Prozesse",
        "KI-Integration & Automatisierung",
        "Daten- und Dokumentenworkflows",
        "Digitale Tools & individuelle Web-Apps",
      ],
    },
  ];
  return (
    <section id="leistungen" className="border-t hairline bg-sand/30 py-16 md:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-petrol" aria-hidden="true" />
            Leistungen
          </p>
          <h2 className="text-3xl leading-[1.1] md:text-4xl">
            Vier Felder, die im{" "}
            <span className="text-petrol">Zusammenspiel</span> wirken.
          </h2>
          <div className="mt-6 border-l-2 border-petrol pl-5">
            <p className="max-w-xl text-base leading-relaxed text-foreground/80">
              Einzeln oder kombiniert – abgestimmt auf Ziel, Reifegrad und die Kapazitäten
              Ihres Teams. Je nach Ausgangslage verbinden wir die Bereiche dort, wo Prozesse,
              Commerce, Projekte und Digitalisierung ineinandergreifen.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border hairline bg-hairline sm:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.title} className="flex flex-col bg-background p-6 md:p-7">
              <span className="mb-4 block font-display text-[1.75rem] font-semibold leading-none text-petrol">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground sm:min-h-[2.75rem]">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70 sm:min-h-[4.75rem]">
                {s.body}
              </p>
              <ul className="mt-5 space-y-2.5 border-t hairline pt-4 text-sm leading-relaxed text-foreground/80">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol"
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-8 max-w-xl border-l-2 border-petrol pl-5 md:mt-10">
          <p className="text-base leading-relaxed text-foreground/80">
            Der Geschäftsprozess steht zuerst. Technologie ist das Werkzeug – sichtbar in
            konkreten Projekten.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Cases ---------- */
function Cases() {
  const cases = [
    {
      tag: "Omnichannel-Handel",
      title: "Operations und Datenprozesse im Omnichannel-Handel skalierbar strukturiert",
      body: "Bei einem großen deutschen Omnichannel-Händler Prozesse, Stammdaten und Arbeitsstrukturen über Sortimente, Lieferanten und Kanäle hinweg weiterentwickelt – an der Schnittstelle von IT, Einkauf, Marketing und MDM.",
      chips: [
        "Projektumfeld: 80.000+ Artikel",
        "500+ Lieferanten",
        "2.000+ Eigenmarkenprodukte",
        "Schnittstelle Einkauf · Marketing · IT",
      ],
    },
    {
      tag: "Eigene Gründung",
      title: "Handels- und E-Commerce-Operations aus eigener unternehmerischer Verantwortung",
      body: "Fachhandel und Onlineshop von der Gründung bis zum laufenden Betrieb aufgebaut und geführt – mit Verantwortung für Sortiment, Einkauf, Bestände, Lieferanten, Content und operative Prozesse.",
      chips: [
        "500 m² Fachhandel",
        "Shopify-Onlineshop",
        "30+ Lieferanten",
        "100+ Eigenmarkenprodukte",
        "Sortiment & Bestand",
      ],
    },
    {
      tag: "KI & Automatisierung",
      title: "KI und Automatisierung in operative Prozesse integriert",
      body: "KI und Automatisierung dort eingesetzt, wo sie konkrete Arbeitsschritte unterstützen – von Produkttexten und Dokumentenprozessen bis zu Bildbearbeitung und Backlog-Arbeit.",
      chips: [
        "Produkttexte",
        "Dokumentenzusammenführung",
        "Alt-Tags",
        "Bild-Deduplikation",
        "POS-Plakate",
        "Backlog-Abbau",
      ],
    },
    {
      tag: "Digitale Lösung",
      title: "Vom betrieblichen Prozess zur individuellen Web-App",
      body: "Für einen Handwerksbetrieb einen konkreten operativen Bedarf analysiert, Anforderungen strukturiert und daraus eine individuelle Web-App entwickelt – vom Geschäftsprozess bis zur funktionierenden digitalen Lösung.",
      claim: "Business zuerst. Technologie als Werkzeug.",
      chips: [
        "Operative Analyse",
        "Anforderungsstruktur",
        "Konzeption",
        "Umsetzung als Web-App",
      ],
    },
  ];
  return (
    <section id="projekte" className="py-16 md:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-petrol" aria-hidden="true" />
            Projekte
          </p>
          <h2 className="text-3xl leading-[1.1] md:text-4xl">
            Ergebnisse aus{" "}
            <span className="text-petrol">Praxis</span> und Mandaten.
          </h2>
          <div className="mt-6 border-l-2 border-petrol pl-5">
            <p className="max-w-xl text-base leading-relaxed text-foreground/80">
              Vier Beispiele – von Omnichannel-Komplexität und eigener Gründung bis zu
              Automatisierung und einer konkreten digitalen Lösung.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border hairline bg-hairline">
          {cases.map((c, i) => (
            <li
              key={c.title}
              className="grid gap-6 bg-background p-6 md:grid-cols-[minmax(9rem,11rem)_minmax(0,1fr)] md:gap-10 md:p-7"
            >
              <div className="min-w-0">
                <span className="block font-display text-[1.75rem] font-semibold leading-none text-petrol">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-xs uppercase leading-snug tracking-[0.18em] text-muted-foreground">
                  {c.tag}
                </p>
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{c.body}</p>
                {"claim" in c && c.claim ? (
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.claim}</p>
                ) : null}
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5 border-t hairline pt-4 text-sm leading-relaxed text-foreground/80">
                  {c.chips.map((chip) => (
                    <li key={chip} className="flex min-w-0 max-w-full items-start gap-2.5">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 break-words">{chip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 max-w-xl border-l-2 border-petrol pl-5 md:mt-10">
          <p className="text-base leading-relaxed text-foreground/80">
            Was diese Projekte verbindet: Problem verstehen, Struktur schaffen und
            konsequent umsetzen.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why ---------- */
function Why() {
  const items = [
    {
      t: "Unternehmerische Perspektive",
      b: "Wir kennen unternehmerische Entscheidungen nicht nur aus Beratungsprojekten, sondern aus zwei eigenen Gründungen und eigener Geschäftsverantwortung.",
    },
    {
      t: "Operative Erfahrung",
      b: "Handel, E-Commerce, Hospitality, kaufmännische Abläufe, Prozesse und digitale Strukturen kennen wir aus praktischer Arbeit – nicht vom Reißbrett.",
    },
    {
      t: "Schnittstellenkompetenz",
      b: "Wir verbinden Business, Operations, Fachbereiche und IT – und übersetzen zwischen unterschiedlichen Anforderungen.",
    },
    {
      t: "Beratung + Umsetzung",
      b: "C&S endet nicht bei einer Empfehlung. Je nach Aufgabe reicht die Arbeit von Prozessgestaltung und Projektsteuerung bis zu Automatisierung und konkreten digitalen Lösungen.",
    },
  ];
  return (
    <section className="border-y hairline bg-sand/30 py-16 md:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-petrol" aria-hidden="true" />
            Warum C<span className="text-petrol">&amp;</span>S
          </p>
          <h2 className="text-3xl leading-[1.1] md:text-4xl">
            Vier Prinzipien, die den{" "}
            <span className="text-petrol">Unterschied</span> machen.
          </h2>
          <div className="mt-6 border-l-2 border-petrol pl-5">
            <p className="max-w-xl text-base leading-relaxed text-foreground/80">
              Beratung mit operativer Wirkung – von der Analyse bis in den laufenden Betrieb.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border hairline bg-hairline sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.t} className="bg-background p-6 md:p-7">
              <span className="mb-4 block font-display text-[1.75rem] font-semibold leading-none text-petrol">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground sm:min-h-[2.75rem]">
                {item.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.b}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 max-w-xl border-l-2 border-petrol pl-5 md:mt-10">
          <p className="text-base leading-relaxed text-foreground/80">
            Welches Modell dafür sinnvoll ist, richtet sich nach Ziel, Umfang und
            Ausgangslage.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Collaboration ---------- */
function Collaboration() {
  const models = [
    {
      t: "Projektpaket",
      b: "Klar abgegrenztes Projekt mit definiertem Ziel, Zeitrahmen und Leistungsumfang – etwa für Prozessoptimierung, Digitalisierung, Rollouts oder den Aufbau neuer Strukturen.",
    },
    {
      t: "Laufende Zusammenarbeit",
      b: "Kontinuierliche Weiterentwicklung, Optimierung oder Steuerung in einem vereinbarten Rahmen – mit klaren Prioritäten, Verantwortlichkeiten und regelmäßiger Abstimmung.",
    },
    {
      t: "Interim & temporäre Verantwortung",
      b: "Zeitlich begrenzte Übernahme klar definierter operativer oder projektbezogener Verantwortung – etwa bei Wachstum, Veränderung, Vakanzen oder hoher Projektlast.",
    },
  ];
  return (
    <section id="zusammenarbeit" className="py-16 md:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-petrol" aria-hidden="true" />
            Zusammenarbeit
          </p>
          <h2 className="text-3xl leading-[1.1] md:text-4xl">
            Drei Modelle – transparent und{" "}
            <span className="text-petrol">flexibel</span>.
          </h2>
          <div className="mt-6 border-l-2 border-petrol pl-5">
            <p className="max-w-xl text-base leading-relaxed text-foreground/80">
              Ob klar abgegrenztes Projekt, laufende Zusammenarbeit oder temporäre
              Verantwortung: Wir wählen das Modell passend zu Ziel, Umfang und Ausgangslage.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border hairline bg-hairline lg:grid-cols-3">
          {models.map((m, i) => (
            <li key={m.t} className="flex flex-col bg-background p-6 md:p-7">
              <span className="mb-4 block font-display text-[1.75rem] font-semibold leading-none text-petrol">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground lg:min-h-[2.75rem]">
                {m.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{m.b}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 max-w-xl border-l-2 border-petrol pl-5 md:mt-10">
          <p className="text-base leading-relaxed text-foreground/80">
            Je nach Auftrag arbeiten wir auf Projekt-, Kontingent- oder Zeitbasis. Die
            Zusammenarbeit erfolgt überwiegend remote; Vor-Ort-Termine sind europaweit nach
            Absprache möglich.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Industries ---------- */
function Industries() {
  const clusters = [
    {
      t: "Handel & E-Commerce",
      b: "Handelsunternehmen, Hersteller, Filialisten und Onlineshops – von Sortiment, Einkauf und Beständen bis zu E-Commerce, Omnichannel und Product Operations.",
    },
    {
      t: "Tourismus & Hospitality",
      b: "Destinationen, Hotels, Gastronomie und Erlebnisanbieter – mit Fokus auf operative Abläufe, Organisation, Projekte, Gästeprozesse und Digitalisierung.",
    },
    {
      t: "Pet · Food · Lifestyle",
      b: "Marken, Hersteller und Fachhandel mit erklärungsbedürftigen oder komplexen Sortimenten – von Product Operations und Commerce bis zu Lieferanten, Prozessen und digitalen Strukturen.",
    },
  ];
  return (
    <section className="border-y hairline bg-sand/30 py-16 md:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-petrol" aria-hidden="true" />
            Branchen
          </p>
          <h2 className="text-3xl leading-[1.1] md:text-4xl">
            Wo wir zu{" "}
            <span className="text-petrol">Hause</span> sind.
          </h2>
          <div className="mt-6 border-l-2 border-petrol pl-5">
            <p className="max-w-xl text-base leading-relaxed text-foreground/80">
              Unsere Erfahrung liegt in Branchen, in denen operative Abläufe, Kunden- und
              Handelsprozesse sowie Digitalisierung eng ineinandergreifen.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border hairline bg-hairline lg:grid-cols-3">
          {clusters.map((c, i) => (
            <li key={c.t} className="bg-background p-6 md:p-7">
              <span className="mb-4 block font-display text-[1.75rem] font-semibold leading-none text-petrol">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground lg:min-h-[2.75rem]">
                {c.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{c.b}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 max-w-xl border-l-2 border-petrol pl-5 md:mt-10">
          <p className="text-base leading-relaxed text-foreground/80">
            Dahinter steht ein kleines Team mit klarer Verantwortung – und echter
            unternehmerischer Praxis.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  const points = [
    {
      t: "Samantha · Lead Consultant · Operations & Digital Business",
      paragraphs: [
        "Samantha ist Unternehmerin und Beraterin mit zwei eigenen Gründungen und Geschäftsführungsverantwortung. Ihr B.A. Business Management mit Schwerpunkt Hotel, Tourismus und Event verbindet sich mit einer Arbeitsweise aus gründlicher Recherche, hoher Detailtiefe und der Fähigkeit, komplexe Themen schnell zu strukturieren und in umsetzbare Lösungen zu übersetzen.",
        "Aus eigener Praxis bringt sie Erfahrung aus Handel, E-Commerce, Hospitality und Gastronomie mit – von Personalauswahl und -führung, Einsatz- und Schichtplanung sowie operativer Organisation über Marketing, Social Media, Kooperationen und Events bis zu Lieferantenrecherche, Produktentwicklung und Sortimentssteuerung.",
        "Dazu kommen umfangreiche Projekte an den Schnittstellen von Operations, E-Commerce, Daten und IT. Heute verbindet Samantha diese Erfahrung mit Prozessoptimierung, Digitalisierung, KI und Automatisierung – bis zur Konzeption und Umsetzung konkreter digitaler Lösungen.",
      ],
      focus:
        "Schwerpunkte: Recherche & Konzeption · Operations · Projekte · Marketing & Partnerschaften · Digital Business · KI",
      qualifications:
        "Qualifikationen: B.A. Business Management · KI-Management · IBM-Grundlagen der Künstlichen Intelligenz · EU AI Act Essentials · Data Literacy",
    },
    {
      t: "Christian · Business, Finance & Operations",
      paragraphs: [
        "Christian ist Unternehmer und ausgebildeter Bankkaufmann mit langjähriger Erfahrung im Finanzwesen. Über mehrere Jahre betreute er Affluent-Kunden und war parallel als Ausbildungsbeauftragter in der Bank tätig. So verbindet er kaufmännisches Denken und Kundenberatung mit Erfahrung in Schulung, Einarbeitung und strukturierter Wissensvermittlung – ergänzt um Erfahrung aus der Immobilienbranche.",
        "In den eigenen Unternehmen lag sein Schwerpunkt auf der kaufmännischen und wirtschaftlichen Steuerung: Zahlen und Liquidität, Buchhaltung und Rechnungen, Einkauf, Preis- und Vertragsverhandlungen sowie verlässliche kaufmännische Abläufe. In Handel und Gastronomie übernahm er außerdem Schulung, Einarbeitung und Führung von Mitarbeitern.",
        "Bei C&S bringt Christian die wirtschaftliche und kaufmännische Perspektive ein. Er verantwortet Business & Finance, Vertrags- und Abwicklungsthemen sowie den organisatorischen Rahmen der Beratung – und sorgt dafür, dass operative Entscheidungen auch wirtschaftlich tragfähig gedacht werden.",
      ],
      focus:
        "Schwerpunkte: Finance · Einkauf · Verhandlungen · Verträge · Schulung & Wissensvermittlung · Business Operations",
    },
    {
      t: "Netzwerk bei Bedarf",
      paragraphs: [
        "Für klar abgegrenzte Spezialthemen binden wir bei Bedarf erfahrene Partner projektbezogen ein – transparent und mit klarer Verantwortlichkeit bei C&S.",
      ],
    },
  ];
  const portraits = [
    {
      name: "Samantha",
      role: "Lead Consultant · Operations & Digital Business",
      image: samanthaPortrait,
      imageWebp: samanthaPortraitWebp,
      alt: "Portrait von Samantha, Lead Consultant bei C&S Consulting",
    },
    {
      name: "Christian",
      role: "Business, Finance & Operations",
      image: christianPortrait,
      imageWebp: christianPortraitWebp,
      alt: "Portrait von Christian, Business & Operations bei C&S Consulting",
    },
  ];

  const portraitBlock = (portrait: (typeof portraits)[number]) => (
    <div key={portrait.name}>
      <div className="overflow-hidden rounded-2xl border hairline bg-sand/40">
        <picture>
          <source srcSet={portrait.imageWebp} type="image/webp" />
          <img
            src={portrait.image}
            alt={portrait.alt}
            width={912}
            height={1104}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      </div>
      <p className="mt-3 break-words text-sm text-foreground/70">
        {portrait.name} · {portrait.role}
      </p>
    </div>
  );

  const pointCard = (p: (typeof points)[number], i: number) => (
    <li key={p.t} className="bg-background p-6 md:p-7">
      <span className="mb-4 block font-display text-[1.75rem] font-semibold leading-none text-petrol">
        {String(i + 1).padStart(2, "0")}
      </span>
      <h3 className="break-words text-base font-semibold leading-snug tracking-tight text-foreground">
        {p.t}
      </h3>
      <div className="mt-3 max-w-prose space-y-3.5 text-sm leading-relaxed text-foreground/70">
        {p.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {"focus" in p && p.focus ? (
        <p className="mt-5 max-w-prose border-t hairline pt-4 text-xs leading-relaxed text-foreground/80">
          {p.focus}
        </p>
      ) : null}
      {"qualifications" in p && p.qualifications ? (
        <p className="mt-3 max-w-prose text-xs leading-relaxed text-muted-foreground">
          {p.qualifications}
        </p>
      ) : null}
    </li>
  );

  return (
    <section id="ueber-uns" className="py-16 md:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-petrol" aria-hidden="true" />
            Über uns
          </p>
          <h2 className="text-3xl leading-[1.1] md:text-4xl">
            Ein kleines Team mit klarer{" "}
            <span className="text-petrol">Verantwortung</span>.
          </h2>
          <div className="mt-6 border-l-2 border-petrol pl-5">
            <p className="max-w-xl text-base leading-relaxed text-foreground/80">
              Beratung und Umsetzung aus unternehmerischer Praxis – nah am Tagesgeschäft,
              mit kurzen Wegen und verbindlichen Ansprechpartnern.
            </p>
          </div>
        </div>

        <div className="about-team mt-8">
          <div className="about-team-photos">
            <div className="about-team-photo-s">{portraitBlock(portraits[0])}</div>
            <div className="about-team-photo-c">{portraitBlock(portraits[1])}</div>
          </div>
          <div className="about-team-cards">
            <article className="about-team-card about-team-card-s">
              <ul>{pointCard(points[0], 0)}</ul>
            </article>
            <article className="about-team-card about-team-card-c">
              <ul>{pointCard(points[1], 1)}</ul>
            </article>
            <article className="about-team-card about-team-card-n">
              <ul>{pointCard(points[2], 2)}</ul>
            </article>
          </div>
        </div>
        <div className="mt-8 max-w-xl border-l-2 border-petrol pl-5 md:mt-10">
          <p className="text-base leading-relaxed text-foreground/80">
            Wenn das zu Ihrer Ausgangslage passt, klären wir im Erstgespräch den sinnvollsten
            nächsten Schritt.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined;
  const [state, setState] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    errors: Record<string, string>;
    formError?: string;
  }>({
    status: "idle",
    errors: {},
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errors: Record<string, string> = {};
    const req = (k: string, msg: string) => {
      if (!String(fd.get(k) ?? "").trim()) errors[k] = msg;
    };
    req("name", "Bitte Namen angeben.");
    req("company", "Bitte Unternehmen angeben.");
    req("email", "Bitte E-Mail angeben.");
    req("message", "Bitte kurz Ihr Anliegen beschreiben.");
    const email = String(fd.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
    }
    if (Object.keys(errors).length > 0) {
      setState({ status: "idle", errors });
      return;
    }

    if (!formspreeId) {
      setState({
        status: "error",
        errors: {},
        formError:
          "Formular ist noch nicht konfiguriert. Bitte schreiben Sie uns direkt an contact@cs-business-consulting.com.",
      });
      return;
    }

    setState({ status: "submitting", errors: {} });

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fd.get("name"),
          company: fd.get("company"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          message: fd.get("message"),
          start: fd.get("start") || undefined,
          scope: fd.get("scope") || undefined,
          _replyto: fd.get("email"),
          _subject: "Neue Anfrage über cs-business-consulting.com",
        }),
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      form.reset();
      setState({ status: "success", errors: {} });
    } catch {
      setState({
        status: "error",
        errors: {},
        formError:
          "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie an contact@cs-business-consulting.com.",
      });
    }
  }

  return (
    <section id="kontakt" className="border-t hairline bg-primary text-primary-foreground">
      <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-petrol-soft">
            <span className="h-px w-8 bg-petrol-soft" aria-hidden="true" />
            Kontakt
          </p>
          <h2 className="text-3xl leading-[1.1] md:text-4xl">
            Wo können wir konkret{" "}
            <span className="text-petrol-soft">Wirkung</span> erzielen?
          </h2>
          <div className="mt-6 border-l-2 border-petrol-soft pl-5">
            <p className="max-w-md text-base leading-relaxed text-primary-foreground/80">
              In einem 30-minütigen, unverbindlichen Erstgespräch klären wir Ausgangslage,
              Ziel und den sinnvollsten nächsten Schritt – von Operations und Projekten bis
              zu Digitalisierung und Umsetzung.
            </p>
          </div>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 sm:grid-cols-2">
            <div className="bg-primary p-6">
              <dt className="text-xs uppercase tracking-[0.18em] text-petrol-soft">Standort</dt>
              <dd className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
                Mallorca · europaweit remote · vor Ort nach Absprache
              </dd>
            </div>
            <div className="bg-primary p-6">
              <dt className="text-xs uppercase tracking-[0.18em] text-petrol-soft">Antwort</dt>
              <dd className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
                In der Regel innerhalb eines Werktags
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl border hairline bg-background p-6 text-foreground md:p-8">
          {state.status === "success" ? (
            <div
              className="flex min-h-[420px] flex-col items-start justify-center"
              role="status"
              aria-live="polite"
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-petrol text-accent-foreground"
                aria-hidden="true"
              >
                ✓
              </span>
              <h3 className="mt-6 text-2xl">Vielen Dank – Nachricht ist angekommen.</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/70">
                Wir melden uns in Kürze mit Terminvorschlägen für ein Erstgespräch.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-4" aria-describedby="kontakt-hinweis">
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <Field label="Name" name="name" required error={state.errors.name} autoComplete="name" />
              <Field label="Unternehmen" name="company" required error={state.errors.company} autoComplete="organization" />
              <Field label="E-Mail" name="email" type="email" required error={state.errors.email} autoComplete="email" />
              <Field label="Telefon" name="phone" type="tel" error={state.errors.phone} autoComplete="tel" />
              <Field
                label="Projektanliegen"
                name="message"
                as="textarea"
                required
                error={state.errors.message}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Gewünschter Start" name="start" placeholder="z. B. Q4 2026" autoComplete="off" />
                <Field
                  label="Geplanter Rahmen"
                  name="scope"
                  placeholder="z. B. Projekt, laufende Zusammenarbeit, temporäre Verantwortung"
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                disabled={state.status === "submitting"}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {state.status === "submitting" ? "Wird gesendet …" : "Projektanfrage senden"}
              </button>
              {state.formError ? (
                <p role="alert" className="text-sm text-destructive">
                  {state.formError}
                </p>
              ) : null}
              <p id="kontakt-hinweis" className="text-xs text-muted-foreground">
                Mit Absenden werden Ihre Angaben zur Bearbeitung Ihrer Anfrage
                verarbeitet. Details finden Sie in der{" "}
                <Link to="/datenschutz" className="prose-link">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  as,
  placeholder,
  required,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "textarea";
  placeholder?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  const id = `f-${name}`;
  const errorId = `${id}-error`;
  const base =
    "w-full min-w-0 rounded-md border bg-background px-3 py-2.5 text-sm leading-normal text-foreground transition-colors placeholder:truncate placeholder:text-muted-foreground focus-visible:border-petrol focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol/30";
  const cls = `${base} ${error ? "border-destructive" : "border-input"} ${as === "textarea" ? "min-h-[7.5rem] resize-y" : "min-h-11"}`;
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-foreground/90">
        {label}
        {required ? (
          <>
            <span className="text-destructive" aria-hidden="true">
              {" "}
              *
            </span>
            <span className="sr-only"> (Pflichtfeld)</span>
          </>
        ) : null}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          placeholder={placeholder}
          className={cls}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          autoComplete={autoComplete}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={cls}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          autoComplete={autoComplete}
        />
      )}
      {error ? (
        <p id={errorId} role="alert" className="mt-1 break-words text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t hairline bg-background">
      <div className="container-page flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
          <div className="text-base text-foreground">
            <BrandMark />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} <BrandMark className="text-xs text-muted-foreground" />.
            Alle Rechte vorbehalten.
          </p>
        </div>
        <nav aria-label="Rechtliche Informationen" className="flex flex-wrap items-center gap-6 text-sm">
          <Link
            to="/impressum"
            className="rounded-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:underline"
          >
            Impressum
          </Link>
          <Link
            to="/datenschutz"
            className="rounded-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:underline"
          >
            Datenschutz
          </Link>
          <CookieSettingsButton />
        </nav>
      </div>
    </footer>
  );
}
