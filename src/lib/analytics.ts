import { track } from "@vercel/analytics";
import { getConsentState } from "@/lib/consent";

export type AnalyticsEventName =
  | "page_view"
  // Hero CTAs
  | "hero_primary_cta_click"
  | "hero_secondary_cta_click"
  // Navigation
  | "nav_contact_click"
  | "nav_products_click"
  // Product blocks (homepage + early access)
  | "product_cta_click"
  // Product detail pages
  | "product_page_cta_click"
  // Contact funnel
  | "contact_form_view"
  | "contact_form_start"
  | "contact_form_submit_attempt"
  | "contact_form_submit_success"
  | "contact_form_submit_error"
  // Privacy
  | "privacy_click"
  // Legacy — kept for any future custom adapter listeners
  | "cta_click";

export type AnalyticsParams = Record<string, unknown>;

// Keys that must never appear in analytics payloads
const PII_KEYS = new Set([
  "name", "email", "phone", "city", "company", "message", "ip",
  "nome", "telefono", "citta", "attivita", "messaggio",
]);

type AnalyticsAdapter = {
  name: string;
  category: "analytics" | "marketing";
  track: (name: AnalyticsEventName, params: AnalyticsParams) => void;
};

const adapters: AnalyticsAdapter[] = [];

function getCurrentPath(): string {
  if (typeof window === "undefined") return "/";
  return `${window.location.pathname}${window.location.search}`;
}

function cleanParams(params: AnalyticsParams = {}): AnalyticsParams {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string") return value.trim() !== "";
      return true;
    })
  );
}

// Strip any PII keys that should never appear in analytics payloads
function sanitizePayload(params: AnalyticsParams): AnalyticsParams {
  return Object.fromEntries(
    Object.entries(params).filter(([key]) => !PII_KEYS.has(key.toLowerCase()))
  );
}

// Vercel Analytics track() requires string | number | boolean values
function toVercelPayload(params: AnalyticsParams): Record<string, string | number | boolean> {
  const result: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      result[key] = value;
    }
  }
  return result;
}

export function registerAnalyticsAdapter(adapter: AnalyticsAdapter): void {
  if (adapters.some((item) => item.name === adapter.name)) return;
  adapters.push(adapter);
}

export function trackEvent(name: AnalyticsEventName, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;

  const consent = getConsentState();
  if (!consent.analytics && !consent.marketing) return;

  const eventParams = sanitizePayload(cleanParams({
    path: getCurrentPath(),
    ...params,
  }));

  // Fire to Vercel Analytics custom events
  track(name, toVercelPayload(eventParams));

  if (consent.analytics) {
    window.dispatchEvent(
      new CustomEvent("filo:analytics-event", {
        detail: { name, params: eventParams },
      })
    );
  }

  for (const adapter of adapters) {
    if (adapter.category === "analytics" && !consent.analytics) continue;
    if (adapter.category === "marketing" && !consent.marketing) continue;
    adapter.track(name, eventParams);
  }
}

export function trackPageView(path?: string): void {
  trackEvent("page_view", {
    path: path ?? getCurrentPath(),
  });
}
