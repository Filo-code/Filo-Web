export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_STORAGE_KEY = "filo_consent_v1";

export const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function isConsentState(value: unknown): value is ConsentState {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<ConsentState>;
  return (
    candidate.necessary === true &&
    typeof candidate.analytics === "boolean" &&
    typeof candidate.marketing === "boolean"
  );
}

export function getConsentState(): ConsentState {
  if (typeof window === "undefined") return defaultConsent;

  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!stored) return defaultConsent;

  try {
    const parsed = JSON.parse(stored);
    return isConsentState(parsed) ? parsed : defaultConsent;
  } catch {
    return defaultConsent;
  }
}

export function saveConsentState(consent: ConsentState): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent<ConsentState>("filo:consent-change", { detail: consent }));

  // Future integration point:
  // - Google Consent Mode: update ad_storage, analytics_storage and ad_user_data here.
  // - GA4 / Meta Pixel loaders: keep them disabled until the relevant category is true.
}

export function hasSavedConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CONSENT_STORAGE_KEY) !== null;
}

export function subscribeToConsentChanges(callback: (consent: ConsentState) => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  const handler = (event: Event) => {
    callback((event as CustomEvent<ConsentState>).detail);
  };

  window.addEventListener("filo:consent-change", handler);
  return () => window.removeEventListener("filo:consent-change", handler);
}
