export const ANALYTICS_CONSENT_KEY = "cs-analytics-consent";

export type AnalyticsConsent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getStoredAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const value = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(value: AnalyticsConsent) {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    // Private mode or blocked storage must not break the page.
  }

  window.gtag?.("consent", "update", {
    analytics_storage: value,
  });
}
