import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { BrandMark } from "@/components/brand-mark";
import { CookieSettingsButton } from "@/components/analytics-consent";
import { SITE_ORIGIN, setPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/datenschutz")({
  component: PrivacyPage,
});

type Lang = "de" | "en";

type Section = {
  heading: string;
  body: string[];
};

const content: Record<Lang, { title: string; intro: string; sections: Section[]; back: string; langLabel: string; label: string }> = {
  de: {
    label: "Rechtliches",
    title: "Datenschutzerklärung",
    intro:
      "Informationen zur Verarbeitung personenbezogener Daten gemäß der Datenschutz-Grundverordnung (DSGVO) und dem spanischen LOPDGDD.",
    sections: [
      {
        heading: "1. Verantwortlicher",
        body: [
          "C&S Business Consulting",
          "Christian Hofstetter",
          "Carrer de Medellin 4, Esc. 17, Bajo A",
          "07006 Palma de Mallorca, Spanien",
          "E-Mail: contact@cs-business-consulting.com",
          "Telefon: +34 623 72 14 59",
          "Website: www.cs-business-consulting.com",
          "Ein gesonderter Datenschutzbeauftragter ist nicht bestellt. Ansprechpartner für Datenschutz ist der Verantwortliche.",
        ],
      },
      {
        heading: "2. Allgemeine Hinweise",
        body: [
          "Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.",
          "Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Website, zur Beantwortung von Anfragen oder aufgrund gesetzlicher Pflichten erforderlich ist.",
        ],
      },
      {
        heading: "3. Domain, Hosting und Server-Logfiles",
        body: [
          "Die Domain www.cs-business-consulting.com wird bei IONOS SE (Deutschland) verwaltet. Die Website wird über GitHub Pages (GitHub, Inc. / Microsoft) ausgeliefert.",
          "Beim Aufruf der Website können technisch bedingt Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt, aufgerufene Seite, Browser- und Gerätetyp) in Server-Logfiles anfallen. Diese Daten werden durch uns nicht ausgewertet und nicht zur Profilerstellung genutzt.",
          "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren Bereitstellung der Website).",
        ],
      },
      {
        heading: "4. Kontaktformular und E-Mail-Kommunikation",
        body: [
          "Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir die von Ihnen eingegebenen Daten. Pflichtangaben sind: Name, Unternehmen, E-Mail-Adresse und Projektanliegen. Zusätzlich können Sie optionale Angaben machen (z. B. Telefonnummer, gewünschter Start, Umfang).",
          "Die Übermittlung erfolgt technisch über den Formular-Dienst Formspree (Formspree Inc., USA). Formspree nimmt die Formulardaten entgegen, leitet sie an unser Postfach contact@cs-business-consulting.com weiter und speichert die Anfrage, damit wir sie bearbeiten und für spätere Rückfragen verfügbar halten können.",
          "E-Mail-Hosting: IONOS SE, Deutschland. Formular-Dienst: Formspree Inc., USA.",
          "Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen auf Ihre Anfrage hin) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer zuverlässigen technischen Entgegennahme und Bearbeitung von Anfragen).",
          "Sie sind zur Bereitstellung der genannten Daten nicht gesetzlich verpflichtet. Ohne die Pflichtangaben können wir Ihre Anfrage jedoch nicht bearbeiten.",
        ],
      },
      {
        heading: "5. Webanalyse (Google Analytics)",
        body: [
          "Wir setzen Google Analytics 4 (Google Ireland Limited / Google LLC, USA) ein, um die Nutzung unserer Website statistisch auszuwerten und unser Angebot zu verbessern.",
          "Die Analyse-Skripte von Google werden erst geladen, nachdem Sie über den Hinweis auf der Website zugestimmt haben. Vor Ihrer Einwilligung wird Google Analytics nicht geladen und es findet keine Übermittlung an Google statt.",
          "Nach der Einwilligung verwendet Google Analytics Cookies und vergleichbare Technologien. Die dabei erhobenen Informationen (z. B. Seitenaufrufe, Verweildauer, Herkunft) werden in der Regel an Google-Server übermittelt und dort gespeichert; eine Übermittlung in die USA ist möglich.",
          "Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).",
          "Sie können Ihre Einwilligung jederzeit widerrufen – über „Cookie-Einstellungen“ im Footer der Website, durch Löschen der gespeicherten Website-Daten in Ihrem Browser oder über den Opt-out von Google: tools.google.com/dlpage/gaoptout",
        ],
      },
      {
        heading: "6. Cookies",
        body: [
          "Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Vergleichbare Speichermechanismen im Endgerät (z. B. lokaler Browserspeicher) können rechtlich denselben Anforderungen unterliegen.",
          "Zur Speicherung Ihrer Auswahl zur Webanalyse verwenden wir den lokalen Browserspeicher (cs-analytics-consent). Die Information dient ausschließlich dazu, Ihre Auswahl bei weiteren Seitenaufrufen zu berücksichtigen.",
          "Klassische Cookies für den reinen Seitenbetrieb setzen wir derzeit nicht.",
          "Analyse-Cookies: Google Analytics und zugehörige Cookies werden nur nach Ihrer ausdrücklichen Einwilligung geladen bzw. gesetzt.",
          "Sie können Cookies und lokal gespeicherte Website-Daten in Ihren Browser-Einstellungen einschränken oder löschen. Über „Cookie-Einstellungen“ im Footer können Sie Ihre Auswahl zur Webanalyse jederzeit ändern.",
        ],
      },
      {
        heading: "7. Anonymisierte Projektdarstellungen",
        body: [
          "Auf unserer Website beschreiben wir ausgewählte Kundenprojekte in anonymisierter Form. Es werden keine personenbezogenen Daten von Kunden oder Mitarbeitern veröffentlicht.",
        ],
      },
      {
        heading: "8. Speicherdauer",
        body: [
          "Anfragen über das Kontaktformular speichern wir in unserem E-Mail-Postfach, solange dies für die Bearbeitung, Nachverfolgung oder gesetzliche Aufbewahrung erforderlich ist. Formspree speichert übermittelte Anfragen ebenfalls, um die technische Zustellung und Nachvollziehbarkeit zu gewährleisten; die Speicherdauer richtet sich nach den Einstellungen und Richtlinien von Formspree.",
          "Server-Logfiles beim Hosting-Anbieter werden nach dessen Richtlinien automatisch gelöscht.",
          "Analytics-Daten werden gemäß den Einstellungen und Speicherfristen von Google Analytics verarbeitet.",
        ],
      },
      {
        heading: "9. Empfänger und Auftragsverarbeitung",
        body: [
          "Eine Weitergabe personenbezogener Daten erfolgt nur, soweit dies zur Bereitstellung der Website, zur Bearbeitung Ihrer Anfrage oder aufgrund gesetzlicher Verpflichtungen erforderlich ist.",
          "Empfänger bzw. Auftragsverarbeiter können insbesondere sein: IONOS SE, Deutschland (Domain und E-Mail-Hosting); GitHub, Inc. / Microsoft (Hosting über GitHub Pages); Formspree Inc., USA (technische Entgegennahme und Weiterleitung des Kontaktformulars); sowie – nur nach Einwilligung in die Webanalyse – Google Ireland Limited / Google LLC (Google Analytics).",
          "Formspree verarbeitet die Formulardaten in unserem Auftrag zur technischen Übermittlung an uns. Soweit erforderlich, stützen wir uns auf Vereinbarungen zur Auftragsverarbeitung gemäß Art. 28 DSGVO.",
        ],
      },
      {
        heading: "10. Drittlandübermittlung",
        body: [
          "Bei der Nutzung von Diensten mit Sitz in den USA (insbesondere Formspree, GitHub/Microsoft und Google) kann eine Übermittlung personenbezogener Daten in ein Drittland außerhalb der EU/des EWR erfolgen. Dabei kann auch Ihre IP-Adresse sowie der Inhalt Ihrer Formularanfrage betroffen sein.",
          "Soweit verfügbar, stützen wir uns auf einen Angemessenheitsbeschluss der Europäischen Kommission (z. B. EU-US Data Privacy Framework) und/oder auf geeignete Garantien gemäß Art. 46 DSGVO, insbesondere Standardvertragsklauseln.",
          "Weitere Informationen zur Datenverarbeitung durch Formspree: formspree.io/legal/privacy",
        ],
      },
      {
        heading: "11. Ihre Rechte",
        body: [
          "Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:",
          "• Auskunft (Art. 15 DSGVO)",
          "• Berichtigung (Art. 16 DSGVO)",
          "• Löschung (Art. 17 DSGVO)",
          "• Einschränkung der Verarbeitung (Art. 18 DSGVO)",
          "• Datenübertragbarkeit (Art. 20 DSGVO)",
          "• Widerspruch (Art. 21 DSGVO)",
          "• Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO) mit Wirkung für die Zukunft – über „Cookie-Einstellungen“ im Footer ebenso einfach wie die Erteilung",
          "Zur Ausübung Ihrer Rechte genügt eine Nachricht an contact@cs-business-consulting.com.",
        ],
      },
      {
        heading: "12. Beschwerderecht",
        body: [
          "Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.",
          "Für Spanien: Agencia Española de Protección de Datos (AEPD), aepd.es",
          "Für Deutschland (wenn Sie dort wohnen oder die Verletzung dort betrifft): zuständige Landesdatenschutzbehörde.",
        ],
      },
      {
        heading: "13. Aktualität",
        body: ["Stand: August 2026. Wir passen diese Datenschutzerklärung an, wenn sich unsere Website, Tools oder rechtliche Anforderungen ändern."],
      },
    ],
    back: "Zur Startseite",
    langLabel: "Sprache",
  },
  en: {
    label: "Legal",
    title: "Privacy Policy",
    intro:
      "Information on the processing of personal data in accordance with the GDPR and the Spanish LOPDGDD.",
    sections: [
      {
        heading: "1. Data controller",
        body: [
          "C&S Business Consulting",
          "Christian Hofstetter",
          "Carrer de Medellin 4, Esc. 17, Bajo A",
          "07006 Palma de Mallorca, Spain",
          "Email: contact@cs-business-consulting.com",
          "Phone: +34 623 72 14 59",
          "Website: www.cs-business-consulting.com",
          "No separate data protection officer has been appointed. The controller is the contact for privacy matters.",
        ],
      },
      {
        heading: "2. General information",
        body: [
          "Personal data is any information relating to an identified or identifiable natural person.",
          "We process personal data only to the extent necessary to provide our website, respond to inquiries, or comply with legal obligations.",
        ],
      },
      {
        heading: "3. Domain, hosting and server log files",
        body: [
          "The domain www.cs-business-consulting.com is managed by IONOS SE (Germany). The website is delivered via GitHub Pages (GitHub, Inc. / Microsoft).",
          "When you visit the website, connection data (e.g. IP address, time of access, page viewed, browser and device type) may be recorded in server log files for technical reasons. We do not analyse this data or use it for profiling.",
          "Legal basis: Art. 6(1)(f) GDPR (legitimate interest in secure website operation).",
        ],
      },
      {
        heading: "4. Contact form and email communication",
        body: [
          "If you send us an inquiry via the contact form, we process the data you enter. Required fields are: name, company, email address and project details. You may also provide optional information (e.g. phone number, desired start date, scope).",
          "The data is transmitted technically via the form service Formspree (Formspree Inc., USA). Formspree receives the form data, forwards it to our mailbox contact@cs-business-consulting.com and stores the inquiry so we can process it and keep it available for follow-up questions.",
          "Email hosting: IONOS SE, Germany. Form service: Formspree Inc., USA.",
          "Legal basis: Art. 6(1)(b) GDPR (pre-contractual measures following your inquiry) and Art. 6(1)(f) GDPR (legitimate interest in reliably receiving and handling inquiries).",
          "You are not legally obliged to provide this data. However, without the required fields we cannot process your inquiry.",
        ],
      },
      {
        heading: "5. Web analytics (Google Analytics)",
        body: [
          "We use Google Analytics 4 (Google Ireland Limited / Google LLC, USA) to statistically evaluate website usage and improve our offering.",
          "Google’s analytics scripts are loaded only after you consent via the notice on the website. Before your consent, Google Analytics is not loaded and no data is transmitted to Google.",
          "After consent, Google Analytics uses cookies and similar technologies. Information collected (e.g. page views, duration, referrer) is usually transmitted to and stored on Google servers; transfer to the USA is possible.",
          "Legal basis: Art. 6(1)(a) GDPR (consent).",
          "You may withdraw consent at any time via “Cookie settings” in the website footer, by clearing stored website data in your browser, or using Google’s opt-out: tools.google.com/dlpage/gaoptout",
        ],
      },
      {
        heading: "6. Cookies",
        body: [
          "Cookies are small text files stored on your device. Comparable storage mechanisms on the end device (e.g. local browser storage) may be subject to the same legal requirements.",
          "To store your web analytics choice, we use local browser storage (cs-analytics-consent). This information is used solely to respect your choice on subsequent visits.",
          "We currently do not set classic cookies solely for operating the website.",
          "Analytics cookies: Google Analytics and related cookies are loaded or set only after your explicit consent.",
          "You can restrict or delete cookies and locally stored website data in your browser settings. Via “Cookie settings” in the footer you can change your web analytics choice at any time.",
        ],
      },
      {
        heading: "7. Anonymised project descriptions",
        body: [
          "Our website describes selected client projects in anonymised form. No personal data of clients or employees is published.",
        ],
      },
      {
        heading: "8. Retention period",
        body: [
          "Inquiries via the contact form are stored in our email mailbox for as long as necessary for processing, follow-up or legal retention. Formspree also stores submitted inquiries to ensure technical delivery and traceability; the retention period follows Formspree’s settings and policies.",
          "Server log files at the hosting provider are deleted automatically according to their policies.",
          "Analytics data is processed according to Google Analytics settings and retention periods.",
        ],
      },
      {
        heading: "9. Recipients and processors",
        body: [
          "Personal data is disclosed only where necessary to provide the website, process your inquiry or comply with legal obligations.",
          "Recipients or processors may include in particular: IONOS SE, Germany (domain and email hosting); GitHub, Inc. / Microsoft (hosting via GitHub Pages); Formspree Inc., USA (technical receipt and forwarding of the contact form); and – only after consent to web analytics – Google Ireland Limited / Google LLC (Google Analytics).",
          "Formspree processes the form data on our behalf for technical transmission to us. Where required, we rely on processor agreements pursuant to Art. 28 GDPR.",
        ],
      },
      {
        heading: "10. Transfers to third countries",
        body: [
          "When using services based in the USA (in particular Formspree, GitHub/Microsoft and Google), personal data may be transferred to a third country outside the EU/EEA. This may include your IP address and the content of your form inquiry.",
          "Where available, we rely on an adequacy decision of the European Commission (e.g. the EU-US Data Privacy Framework) and/or appropriate safeguards under Art. 46 GDPR, in particular standard contractual clauses.",
          "Further information on Formspree’s data processing: formspree.io/legal/privacy",
        ],
      },
      {
        heading: "11. Your rights",
        body: [
          "You have the following rights regarding your personal data:",
          "• Access (Art. 15 GDPR)",
          "• Rectification (Art. 16 GDPR)",
          "• Erasure (Art. 17 GDPR)",
          "• Restriction of processing (Art. 18 GDPR)",
          "• Data portability (Art. 20 GDPR)",
          "• Objection (Art. 21 GDPR)",
          "• Withdrawal of consent (Art. 7(3) GDPR) with effect for the future – via “Cookie settings” in the footer, as easy as giving consent",
          "To exercise your rights, contact contact@cs-business-consulting.com.",
        ],
      },
      {
        heading: "12. Right to lodge a complaint",
        body: [
          "You have the right to lodge a complaint with a supervisory authority.",
          "For Spain: Agencia Española de Protección de Datos (AEPD), aepd.es",
          "For Germany (if you live there or the infringement affects you there): the competent state data protection authority.",
        ],
      },
      {
        heading: "13. Updates",
        body: ["Last updated: August 2026. We will update this privacy policy when our website, tools or legal requirements change."],
      },
    ],
    back: "Back to homepage",
    langLabel: "Language",
  },
};

function linkify(line: string, lang: Lang): ReactNode {
  const newWindowNote =
    lang === "de" ? " (öffnet in neuem Fenster)" : " (opens in a new window)";

  if (line.includes("contact@cs-business-consulting.com")) {
    const [before, after = ""] = line.split("contact@cs-business-consulting.com");
    return (
      <>
        {before}
        <a href="mailto:contact@cs-business-consulting.com" className="prose-link">
          contact@cs-business-consulting.com
        </a>
        {after}
      </>
    );
  }
  if (line.includes("formspree.io/legal/privacy")) {
    const [before, after = ""] = line.split("formspree.io/legal/privacy");
    return (
      <>
        {before}
        <a
          href="https://formspree.io/legal/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="prose-link"
        >
          formspree.io/legal/privacy
          <span className="sr-only">{newWindowNote}</span>
        </a>
        {after}
      </>
    );
  }
  if (line.includes("tools.google.com/dlpage/gaoptout")) {
    const [before, after = ""] = line.split("tools.google.com/dlpage/gaoptout");
    return (
      <>
        {before}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="prose-link"
        >
          tools.google.com/dlpage/gaoptout
          <span className="sr-only">{newWindowNote}</span>
        </a>
        {after}
      </>
    );
  }
  if (line.includes("aepd.es")) {
    const [before, after = ""] = line.split("aepd.es");
    return (
      <>
        {before}
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener noreferrer"
          className="prose-link"
        >
          aepd.es
          <span className="sr-only">{newWindowNote}</span>
        </a>
        {after}
      </>
    );
  }
  return line;
}

function PrivacyPage() {
  const [lang, setLang] = useState<Lang>("de");
  const copy = content[lang];

  useEffect(() => {
    const isDe = lang === "de";
    setPageSeo({
      title: isDe
        ? "Datenschutzerklärung | C&S Consulting"
        : "Privacy Policy | C&S Consulting",
      description: isDe
        ? "Datenschutzerklärung von C&S Business Consulting zur Verarbeitung personenbezogener Daten gemäß DSGVO und LOPDGDD."
        : "Privacy policy of C&S Business Consulting on the processing of personal data under the GDPR and LOPDGDD.",
      path: "/datenschutz",
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
            name: isDe ? "Datenschutzerklärung" : "Privacy Policy",
            item: `${SITE_ORIGIN}/datenschutz`,
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
            {copy.label}
          </p>
          <h1 className="text-3xl leading-[1.1] md:text-4xl">{copy.title}</h1>
          <div className="mt-6 border-l-2 border-petrol pl-5">
            <p className="text-base leading-relaxed text-foreground/80">{copy.intro}</p>
          </div>
        </div>

        <div className="mt-10 max-w-3xl space-y-8">
          {copy.sections.map((section, index) => (
            <section key={section.heading} aria-labelledby={`ds-section-${index}`}>
              <h2
                id={`ds-section-${index}`}
                className="text-base font-semibold tracking-tight text-foreground"
              >
                {section.heading}
              </h2>
              <div className="mt-2 space-y-2 break-words text-sm leading-relaxed text-foreground/70">
                {section.body.map((line) => (
                  <p key={line} className="break-words">
                    {linkify(line, lang)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <nav
          className="mt-12 flex flex-wrap gap-x-6 gap-y-3"
          aria-label={lang === "de" ? "Weitere Seiten" : "Related pages"}
        >
          <Link to="/" className="prose-link text-sm">
            ← {copy.back}
          </Link>
          <Link to="/impressum" className="prose-link text-sm">
            {lang === "de" ? "Impressum" : "Legal notice"} →
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
