export const ANALYTICS_CONSENT_KEY = "cs-analytics-consent";
export const GA_MEASUREMENT_ID = "G-0DF5DSMSVV";
export const COOKIE_SETTINGS_EVENT = "cs-open-cookie-settings";

export type AnalyticsConsent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let analyticsLoaded = false;

export function getStoredAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const value = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** Opens the consent banner again so the choice can be changed (Art. 7(3) GDPR). */
export function openCookieSettings() {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}

/** Basic Consent Mode: load GA4 only after explicit opt-in. No Google scripts before that. */
export function loadGoogleAnalytics() {
  if (analyticsLoaded || typeof document === "undefined") {
    return;
  }
  analyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  // Google expects the Arguments object (not a rest-parameter array).
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function setAnalyticsConsent(value: AnalyticsConsent) {
  const previous = getStoredAnalyticsConsent();

  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    // Private mode or blocked storage must not break the page.
  }

  if (value === "granted") {
    loadGoogleAnalytics();
    return;
  }

  // Withdrawal after GA was already loaded: reload so no further hits are sent.
  if (value === "denied" && (analyticsLoaded || previous === "granted")) {
    window.location.reload();
  }
}

export function initAnalyticsFromStoredConsent() {
  if (getStoredAnalyticsConsent() === "granted") {
    loadGoogleAnalytics();
  }
}
