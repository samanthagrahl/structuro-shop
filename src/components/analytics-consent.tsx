import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  COOKIE_SETTINGS_EVENT,
  getStoredAnalyticsConsent,
  initAnalyticsFromStoredConsent,
  openCookieSettings,
  setAnalyticsConsent,
} from "@/lib/analytics-consent";

export function AnalyticsConsentBanner() {
  const [decision, setDecision] = useState(getStoredAnalyticsConsent);
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    initAnalyticsFromStoredConsent();

    const onOpenSettings = () => setForceOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, onOpenSettings);
  }, []);

  if (decision && !forceOpen) {
    return null;
  }

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-0 bottom-0 z-50 border-t hairline bg-background/95 px-4 py-4 shadow-[0_-8px_24px_rgba(28,36,51,0.08)] backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-foreground">
          Wir verwenden Google Analytics nur mit Ihrer Einwilligung. Vor dem
          Akzeptieren werden keine Analyse-Skripte von Google geladen.{" "}
          <Link to="/datenschutz" className="underline underline-offset-2">
            Datenschutzerklärung
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            onClick={() => {
              setAnalyticsConsent("denied");
              setDecision("denied");
              setForceOpen(false);
            }}
          >
            Ablehnen
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            onClick={() => {
              setAnalyticsConsent("granted");
              setDecision("granted");
              setForceOpen(false);
            }}
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </aside>
  );
}

export function CookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={
        className ??
        "rounded-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:underline"
      }
    >
      Cookie-Einstellungen
    </button>
  );
}
