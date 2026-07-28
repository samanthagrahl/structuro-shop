import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import heroWorkflow from "@/assets/hero-workflow.jpg";
import samanthaPortrait from "@/assets/samantha.jpg";

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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
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

/* ---------- Header ---------- */
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#top" className="font-display text-lg tracking-tight">
          C<span className="text-petrol">&amp;</span>S Consulting
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Hauptnavigation">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#kontakt"
          className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Erstgespräch anfragen
        </a>
        <button
          aria-label="Menü"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border hairline md:hidden"
        >
          <span className="sr-only">Menü</span>
          <div className="flex flex-col gap-1.5">
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
          </div>
        </button>
      </div>
      {open && (
        <div className="border-t hairline md:hidden">
          <nav className="container-page flex flex-col py-4" aria-label="Mobile Navigation">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Erstgespräch anfragen
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div className="fade-in-up">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-petrol" />
            Boutique-Beratung · seit über 10 Jahren
          </p>
          <h1 className="text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Wir bringen Struktur in Produktdaten,
            <span className="text-petrol"> E-Commerce</span> und operative Digitalprojekte.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Für mittelständische Unternehmen, Onlineshops, Hersteller, Handel und
            Tourismusorganisationen. Von der Datenbasis bis zur Umsetzung im Tagesgeschäft
            – umsetzungsstark, remote und ohne Umwege.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Projekt besprechen <span aria-hidden>→</span>
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center gap-2 rounded-full border hairline bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Leistungen ansehen
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-sand/60 blur-xl" />
          <div className="overflow-hidden rounded-2xl border hairline bg-card shadow-[0_20px_60px_-30px_rgba(20,30,50,0.25)]">
            <img
              src={heroWorkflow}
              alt="Workflow: Datenquellen fließen über ein zentrales PIM in Shop, Marktplätze und Automatisierung."
              width={1280}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
          <ul className="mt-4 grid grid-cols-4 gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
            <li className="text-center">Datenquellen</li>
            <li className="text-center">PIM</li>
            <li className="text-center">Shop &amp; Markt</li>
            <li className="text-center">Automation</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Competence bar ---------- */
function Competence() {
  const items = [
    "10+ Jahre unternehmerische Erfahrung",
    "PIM & MDM",
    "E-Commerce Operations",
    "Remote in Europa",
  ];
  return (
    <section aria-label="Kompetenzen" className="border-y hairline bg-sand/40">
      <div className="container-page grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
        {items.map((i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-petrol" />
            <span className="text-foreground/80">{i}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Problems ---------- */
function Problems() {
  const pains = [
    "Produktdaten liegen verstreut in Excel, ERP und Shop – niemand weiß, welche Version stimmt.",
    "Neue Sortimente brauchen Wochen bis zum Livegang, weil Freigaben und Attribute fehlen.",
    "Marktplätze, Shop und Print-Katalog laufen auseinander, obwohl die Quelle dieselbe ist.",
    "Operative Themen bleiben liegen, weil die interne Kapazität für Umsetzung fehlt.",
    "KI wird diskutiert, aber im Tagesgeschäft nicht wirksam eingesetzt.",
    "Projekte starten ambitioniert und versanden zwischen Einkauf, Marketing und IT.",
  ];
  return (
    <section className="py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-petrol">Ausgangslage</p>
          <h2 className="text-3xl md:text-4xl">Wenn operative Komplexität Wachstum ausbremst.</h2>
          <p className="mt-4 text-muted-foreground">
            Die meisten Baustellen sind keine Strategiefragen, sondern operative Lücken. Wir
            benennen sie klar – und schließen sie.
          </p>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((p, i) => (
            <li
              key={p}
              className="bg-background p-6 text-sm leading-relaxed text-foreground/80"
            >
              <span className="mb-3 block font-display text-2xl text-petrol">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const services = [
    {
      title: "Produktdaten · PIM · MDM",
      body: "Datenmodell, Attributstruktur, Qualitätssicherung und Rollouts. Von der Auswahl bis zum sauberen Betrieb – inklusive Migration und Enrichment.",
      bullets: ["Attribut- und Kategoriemodell", "Datenqualität & Governance", "PIM-Auswahl & Einführung"],
    },
    {
      title: "E-Commerce Operations",
      body: "Sortiments-, Bestands- und Preissteuerung, Content-Prozesse, Marktplatzanbindung. Wir übernehmen operativ, wo Kapazität fehlt.",
      bullets: ["Shopify & Shopsysteme", "Marktplätze & Feeds", "Sortiment & Bestand"],
    },
    {
      title: "KI & Automatisierung",
      body: "Konkrete Anwendungsfälle statt Folienzauber: Produkttexte, Bilddaten, Dokumente, Backlog. Messbar entlastend im Tagesgeschäft.",
      bullets: ["Produkttexte & Übersetzungen", "Bild- & Dokumentenworkflows", "Prompt- & Toolauswahl"],
    },
    {
      title: "Projektmanagement & externe Unterstützung",
      body: "Interim, Kapazitätsbrücke oder projektbezogen. Wir bringen Vorhaben ins Ziel – zwischen Einkauf, Marketing, IT und Dienstleistern.",
      bullets: ["Interim & Vertretung", "Projekt- & Rollout-Steuerung", "Anforderungs- & Lastenhefte"],
    },
  ];
  return (
    <section id="leistungen" className="border-t hairline bg-muted/40 py-24">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-petrol">Leistungen</p>
            <h2 className="text-3xl md:text-4xl">Vier Bereiche, die im Zusammenspiel wirken.</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Buchbar einzeln oder als Kombination – abgestimmt auf Ihre Roadmap, Ressourcen
            und den tatsächlichen Reifegrad Ihrer Daten und Prozesse.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.title}
              className="group flex flex-col rounded-2xl border hairline bg-card p-8 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-30px_rgba(20,30,50,0.35)]"
            >
              <h3 className="text-xl md:text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <ul className="mt-6 space-y-2 border-t hairline pt-4 text-sm">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-foreground/80">
                    <span className="h-px w-4 bg-petrol" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
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
      title: "Ein Datenstamm für Filiale, Shop und Marktplatz.",
      body: "Mehrere Tausend Artikel aus einem konsolidierten Sortiment sauber strukturiert, freigegeben und an alle Kanäle ausgespielt – ohne Doppelpflege.",
      chips: ["Mehrere Tausend Artikel", "30+ Lieferanten", "100+ Eigenmarkenprodukte", "Schnittstelle Einkauf · Marketing · IT"],
    },
    {
      tag: "Eigener Fachhandel & Shopify",
      title: "Fachhandel und Onlineshop unter einem Dach steuern.",
      body: "Sortiment, Bestand und Content für einen 500 m² Fachhandel plus eigenen Shopify-Store – aus operativer Praxis, nicht vom Reißbrett.",
      chips: ["500 m² Fachhandel", "Shopify Onlineshop", "Sortimentssteuerung", "Bestandsführung"],
    },
    {
      tag: "KI im Tagesgeschäft",
      title: "KI, die spürbar Zeit spart – nicht nur in Slides.",
      body: "Produkttexte, Alt-Tags, Bild-Deduplikation, Dokumentenzusammenführung und ein spürbar kleinerer Backlog. Eingebettet in bestehende Tools.",
      chips: ["Produkttexte", "Dokumentenzusammenführung", "Alt-Tags", "Bild-Deduplikation", "Backlog-Abbau"],
    },
  ];
  return (
    <section id="projekte" className="py-24">
      <div className="container-page">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-petrol">Projekte</p>
          <h2 className="text-3xl md:text-4xl">Drei anonymisierte Beispiele aus laufenden Mandaten.</h2>
        </div>
        <div className="space-y-6">
          {cases.map((c) => (
            <article
              key={c.title}
              className="grid gap-6 rounded-2xl border hairline bg-card p-8 md:grid-cols-[220px_1fr] md:items-start"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-petrol">{c.tag}</div>
              <div>
                <h3 className="text-xl md:text-2xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full border hairline bg-background px-3 py-1 text-xs text-foreground/80"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why ---------- */
function Why() {
  const items = [
    { t: "Praxis statt PowerPoint", b: "Wir setzen operativ um – von der Datenpflege bis zum Rollout. Konzepte entstehen nebenbei, weil sie im Tun gebraucht werden." },
    { t: "Schnittstellenkompetenz", b: "Wir sprechen die Sprache von Einkauf, Marketing und IT und übersetzen zwischen den Bereichen – auch mit externen Dienstleistern." },
    { t: "Umsetzung aus einer Hand", b: "Kleines Team, kurze Wege, klare Verantwortung. Kein Beratungs-Ping-Pong, kein Übergabeverlust." },
    { t: "Unternehmerisches Denken", b: "Eigene Handels- und Shop-Erfahrung. Wir denken in Marge, Beständen und Prozessen – nicht nur in Deliverables." },
  ];
  return (
    <section className="border-y hairline bg-sand/40 py-24">
      <div className="container-page">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-petrol">Warum C&amp;S</p>
          <h2 className="text-3xl md:text-4xl">Vier Prinzipien, die den Unterschied machen.</h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {items.map((i) => (
            <div key={i.t} className="border-t hairline pt-6">
              <h3 className="text-xl">{i.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.b}</p>
            </div>
          ))}
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
      b: "Klar abgegrenzter Auftrag mit definiertem Ziel und Budget. Ideal für Migrationen, Rollouts oder Datenaufräum-Projekte.",
    },
    {
      t: "Externe Projektunterstützung",
      b: "Kontingent an Stunden oder Tagen pro Monat für laufende Themen: Content, Marktplätze, PIM-Betrieb, Backlog.",
    },
    {
      t: "Interim & Kapazitätsbrücke",
      b: "Wir überbrücken Vakanzen oder Wachstumsphasen – von der Fachkraft im E-Commerce bis zur Projektleitung.",
    },
  ];
  return (
    <section id="zusammenarbeit" className="py-24">
      <div className="container-page">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-petrol">Zusammenarbeit</p>
          <h2 className="text-3xl md:text-4xl">Drei Modelle, transparent und flexibel.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {models.map((m) => (
            <div
              key={m.t}
              className="flex h-full flex-col rounded-2xl border hairline bg-card p-8"
            >
              <h3 className="text-lg">{m.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Abrechnung auf Stunden-, Kontingent- oder Projektbasis. Zusammenarbeit primär remote,
          Vor-Ort-Termine nach Absprache.
        </p>
      </div>
    </section>
  );
}

/* ---------- Industries ---------- */
function Industries() {
  const clusters = [
    {
      t: "Handel & E-Commerce",
      b: "Mittelstand, Filialisten, Onlineshops, Hersteller mit D2C. Sortiments-, Daten- und Prozessarbeit über alle Kanäle.",
    },
    {
      t: "Tourismus & Hospitality",
      b: "Destinationen, Hotels, Erlebnisanbieter. Content-, Angebots- und Distributionsprozesse strukturieren.",
    },
    {
      t: "Pet · Lifestyle · Consumer Products",
      b: "Markenhersteller und Fachhandel mit erklärungsbedürftigem Sortiment und hoher Attributtiefe.",
    },
  ];
  return (
    <section className="border-y hairline bg-muted/40 py-24">
      <div className="container-page">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-petrol">Branchen</p>
          <h2 className="text-3xl md:text-4xl">Wo wir zu Hause sind.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {clusters.map((c) => (
            <div key={c.t} className="rounded-2xl border hairline bg-card p-8">
              <h3 className="text-lg">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="ueber-uns" className="py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
        <div>
          <div className="overflow-hidden rounded-2xl border hairline bg-sand/40">
            <img
              src={samanthaPortrait}
              alt="Portrait von Samantha, Lead Consultant bei C&S Consulting"
              width={912}
              height={1104}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Samantha · Lead Consultant</p>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-petrol">Über uns</p>
          <h2 className="text-3xl md:text-4xl">
            Ein kleines Team mit klarer Verantwortung.
          </h2>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/85">
            <p>
              <strong className="font-medium text-foreground">Samantha</strong> führt die
              Mandate als Lead Consultant. B.A. Business Management mit Schwerpunkt Hotel,
              Tourismus und Event. Seit vielen Jahren selbstständig in Produktdaten-,
              Stammdaten- und E-Commerce-Projekten. Betreibt zusätzlich einen eigenen
              Fachhandel mit Onlineshop und bildet sich laufend im Bereich KI-Management
              weiter.
            </p>
            <p>
              <strong className="font-medium text-foreground">Chris</strong> verantwortet
              Business &amp; Operations und den organisatorischen Rahmen der Beratung –
              Verträge, Abwicklung, Struktur.
            </p>
            <p className="text-muted-foreground">
              Bei Bedarf ergänzen wir das Team über ein festes Spezialistennetzwerk aus
              Entwicklung, Design, Content und PIM-Implementierung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [state, setState] = useState<{ status: "idle" | "success"; errors: Record<string, string> }>({
    status: "idle",
    errors: {},
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
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
    setState({ status: "success", errors: {} });
  }

  return (
    <section id="kontakt" className="border-t hairline bg-primary text-primary-foreground">
      <div className="container-page grid gap-12 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-petrol-soft">Kontakt</p>
          <h2 className="text-3xl md:text-4xl">
            Lassen Sie uns klären, wo wir kurzfristig Wirkung erzielen können.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/75">
            Ein Erstgespräch dauert 30 Minuten, ist kostenfrei und unverbindlich. Danach
            wissen Sie, ob wir passen – und was ein sinnvoller nächster Schritt wäre.
          </p>
          <dl className="mt-10 space-y-4 text-sm text-primary-foreground/80">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-petrol-soft">Standort</dt>
              <dd className="mt-1">Mallorca · europaweit remote · reisebereit nach Absprache</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-petrol-soft">Antwort</dt>
              <dd className="mt-1">In der Regel innerhalb eines Werktags.</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl bg-background p-6 text-foreground md:p-8">
          {state.status === "success" ? (
            <div className="flex min-h-[420px] flex-col items-start justify-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-petrol text-accent-foreground">
                ✓
              </span>
              <h3 className="mt-6 text-2xl">Vielen Dank – Nachricht ist angekommen.</h3>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Wir melden uns in Kürze mit Terminvorschlägen für ein Erstgespräch. (Demo –
                es wird keine Nachricht gesendet.)
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-4">
              <Field label="Name" name="name" error={state.errors.name} />
              <Field label="Unternehmen" name="company" error={state.errors.company} />
              <Field label="E-Mail" name="email" type="email" error={state.errors.email} />
              <Field
                label="Projektanliegen"
                name="message"
                as="textarea"
                error={state.errors.message}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Gewünschter Start" name="start" placeholder="z. B. Q4 2026" />
                <Field label="Umfang" name="scope" placeholder="z. B. 2 Tage/Woche, 3 Monate" />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Anfrage senden
              </button>
              <p className="text-xs text-muted-foreground">
                Mit Absenden stimmen Sie zu, dass wir Ihre Angaben zur Beantwortung Ihrer
                Anfrage verarbeiten.
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
  error,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "textarea";
  placeholder?: string;
  error?: string;
}) {
  const id = `f-${name}`;
  const base =
    "w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-petrol focus:ring-2 focus:ring-petrol/20";
  const cls = `${base} ${error ? "border-destructive" : "border-input"}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-foreground/80">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={name} rows={4} placeholder={placeholder} className={cls} />
      ) : (
        <input id={id} name={name} type={type} placeholder={placeholder} className={cls} />
      )}
      {error && (
        <p role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t hairline bg-background">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-base">
            C<span className="text-petrol">&amp;</span>S Consulting
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} C&amp;S Consulting. Alle Rechte vorbehalten.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">LinkedIn</a>
          <a href="#" className="transition-colors hover:text-foreground">Impressum</a>
          <a href="#" className="transition-colors hover:text-foreground">Datenschutz</a>
        </nav>
      </div>
    </footer>
  );
}
