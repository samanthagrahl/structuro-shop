import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  getStoredAnalyticsConsent,
  setAnalyticsConsent,
} from "@/lib/analytics-consent";

export function AnalyticsConsentBanner() {
  const [decision, setDecision] = useState(getStoredAnalyticsConsent);

  if (decision) {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Einwilligung zur Webanalyse"
      className="fixed inset-x-0 bottom-0 z-50 border-t hairline bg-background/95 px-4 py-4 shadow-[0_-8px_24px_rgba(28,36,51,0.08)] backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-foreground">
          Wir verwenden Google Analytics, um die Nutzung der Website statistisch
          auszuwerten. Analyse-Cookies werden nur mit Ihrer Einwilligung gesetzt.{" "}
          <Link to="/datenschutz" className="underline underline-offset-2">
            Datenschutzerklärung
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full border hairline bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            onClick={() => {
              setAnalyticsConsent("denied");
              setDecision("denied");
            }}
          >
            Ablehnen
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            onClick={() => {
              setAnalyticsConsent("granted");
              setDecision("granted");
            }}
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </aside>
  );
}
