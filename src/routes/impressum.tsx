import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { CookieSettingsButton } from "@/components/analytics-consent";
import { SITE_ORIGIN, setPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/impressum")({
  component: ImpressumPage,
});

type Lang = "de" | "en";

const content = {
  de: {
    title: "Impressum",
    intro:
      "Angaben gemäß § 5 DDG (Deutschland) und Art. 10 Ley 34/2002 (LSSI-CE, Spanien)",
    sections: [
      {
        heading: "Anbieter/Inhaber",
        body: [
          "C&S Business Consulting",
          "Christian Hofstetter",
          "Autónomo (selbstständig)",
          "NIE: Y5010117H",
          "Carrer de Medellin 4, Esc. 17, Bajo A",
          "07006 Palma de Mallorca",
          "Spanien",
        ],
      },
      {
        heading: "Kontakt",
        body: [
          "E-Mail: contact@cs-business-consulting.com",
          "Telefon: +34 623 72 14 59",
          "Website: www.cs-business-consulting.com",
        ],
      },
      {
        heading: "Umsatzsteuer-Identifikationsnummer",
        body: ["ESY5010117H (gemäß § 27a UStG)"],
      },
      {
        heading: "Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)",
        body: [
          "Christian Hofstetter",
          "Carrer de Medellin 4, Esc. 17, Bajo A",
          "07006 Palma de Mallorca",
          "Spanien",
        ],
      },
      {
        heading: "Verbraucherstreitbeilegung",
        body: [
          "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        ],
      },
      {
        heading: "Haftung für Inhalte",
        body: [
          "Als Diensteanbieter sind wir gemäß den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
          "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.",
        ],
      },
      {
        heading: "Haftung für Links",
        body: [
          "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
        ],
      },
      {
        heading: "Urheberrecht",
        body: [
          "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
        ],
      },
    ],
    back: "Zur Startseite",
    langLabel: "Sprache",
  },
  en: {
    title: "Legal Notice / Imprint",
    intro:
      "Information in accordance with § 5 DDG (Germany) and Art. 10 Ley 34/2002 (LSSI-CE, Spain)",
    sections: [
      {
        heading: "Service provider / Owner",
        body: [
          "C&S Business Consulting",
          "Christian Hofstetter",
          "Autónomo (self-employed)",
          "NIE: Y5010117H",
          "Carrer de Medellin 4, Esc. 17, Bajo A",
          "07006 Palma de Mallorca",
          "Spain",
        ],
      },
      {
        heading: "Contact",
        body: [
          "Email: contact@cs-business-consulting.com",
          "Phone: +34 623 72 14 59",
          "Website: www.cs-business-consulting.com",
        ],
      },
      {
        heading: "VAT identification number",
        body: ["ESY5010117H"],
      },
      {
        heading: "Responsible for content (§ 18 (2) MStV)",
        body: [
          "Christian Hofstetter",
          "Carrer de Medellin 4, Esc. 17, Bajo A",
          "07006 Palma de Mallorca",
          "Spain",
        ],
      },
      {
        heading: "Consumer dispute resolution",
        body: [
          "We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.",
        ],
      },
      {
        heading: "Liability for content",
        body: [
          "As a service provider, we are responsible for our own content on these pages in accordance with general laws. However, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances indicating illegal activity.",
          "Obligations to remove or block the use of information under general laws remain unaffected.",
        ],
      },
      {
        heading: "Liability for links",
        body: [
          "Our website contains links to external third-party websites over whose content we have no control. We therefore cannot accept any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content.",
        ],
      },
      {
        heading: "Copyright",
        body: [
          "The content and works created by the site operators on these pages are subject to copyright law. Reproduction, editing, distribution and any kind of use beyond the limits of copyright require the written consent of the respective author or creator.",
        ],
      },
    ],
    back: "Back to homepage",
    langLabel: "Language",
  },
} as const;

function ImpressumPage() {
  const [lang, setLang] = useState<Lang>("de");
  const copy = content[lang];

  useEffect(() => {
    const isDe = lang === "de";
    setPageSeo({
      title: isDe ? "Impressum | C&S Consulting" : "Legal Notice | C&S Consulting",
      description: isDe
        ? "Impressum von C&S Business Consulting: Anbieterangaben, Kontakt und rechtliche Informationen gemäß DDG und LSSI-CE."
        : "Legal notice of C&S Business Consulting: provider details, contact information and legal disclosures.",
      path: "/impressum",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: `${SITE_ORIGIN}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isDe ? "Impressum" : "Legal Notice",
            item: `${SITE_ORIGIN}/impressum`,
          },
        ],
      },
    });
  }, [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#hauptinhalt" className="skip-link">
        Zum Hauptinhalt
      </a>
      <header className="sticky top-0 z-40 border-b hairline bg-background/85 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4 sm:gap-6">
          <Link
            to="/"
            className="min-w-0 shrink rounded-sm text-lg text-foreground"
            aria-label="C&S Consulting – zur Startseite"
          >
            <BrandMark />
          </Link>
          <div className="flex items-center gap-2 text-sm" role="group" aria-label={copy.langLabel}>
            <button
              type="button"
              onClick={() => setLang("de")}
              aria-pressed={lang === "de"}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                lang === "de"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              DE
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main id="hauptinhalt" className="container-page py-16 md:py-24" lang={lang}>
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-petrol" aria-hidden="true" />
            {lang === "de" ? "Rechtliches" : "Legal"}
          </p>
          <h1 className="text-3xl leading-[1.1] md:text-4xl">{copy.title}</h1>
          <div className="mt-6 border-l-2 border-petrol pl-5">
            <p className="text-base leading-relaxed text-foreground/80">{copy.intro}</p>
          </div>
        </div>

        <div className="mt-10 max-w-3xl space-y-8">
          {copy.sections.map((section, index) => (
            <section key={section.heading} aria-labelledby={`imp-section-${index}`}>
              <h2
                id={`imp-section-${index}`}
                className="text-base font-semibold tracking-tight text-foreground"
              >
                {section.heading}
              </h2>
              <div className="mt-2 space-y-2 break-words text-sm leading-relaxed text-foreground/70">
                {section.body.map((line) => (
                  <p key={line} className="break-words">
                    {line.includes("contact@") ? (
                      <>
                        {line.split("contact@cs-business-consulting.com")[0]}
                        <a
                          href="mailto:contact@cs-business-consulting.com"
                          className="prose-link"
                        >
                          contact@cs-business-consulting.com
                        </a>
                        {line.split("contact@cs-business-consulting.com")[1] ?? ""}
                      </>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <nav className="mt-12 flex flex-wrap gap-x-6 gap-y-3" aria-label={lang === "de" ? "Weitere Seiten" : "Related pages"}>
          <Link to="/" className="prose-link text-sm">
            ← {copy.back}
          </Link>
          <Link to="/datenschutz" className="prose-link text-sm">
            {lang === "de" ? "Datenschutz" : "Privacy policy"} →
          </Link>
          <CookieSettingsButton className="prose-link text-sm" />
        </nav>
      </main>

      <footer className="border-t hairline bg-background">
        <div className="container-page py-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} <BrandMark className="text-xs text-muted-foreground" />.
          </p>
        </div>
      </footer>
    </div>
  );
}
