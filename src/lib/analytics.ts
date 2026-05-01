import { getConsentState } from "@/lib/consent";

export type AnalyticsEventName =
  | "page_view"
  | "cta_click"
  | "product_cta_click"
  | "contact_form_start"
  | "contact_form_submit_success"
  | "contact_form_submit_error";

export type AnalyticsParams = Record<string, unknown>;

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

export function registerAnalyticsAdapter(adapter: AnalyticsAdapter): void {
  if (adapters.some((item) => item.name === adapter.name)) return;
  adapters.push(adapter);
}

export function trackEvent(name: AnalyticsEventName, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;

  const consent = getConsentState();
  if (!consent.analytics && !consent.marketing) return;

  const eventParams = cleanParams({
    path: getCurrentPath(),
    ...params,
  });

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

  // Future provider hooks:
  // - GA4: call window.gtag("event", name, eventParams) only after analytics consent.
  // - Meta Pixel: call window.fbq("trackCustom", name, eventParams) only after marketing consent.
}

export function trackPageView(path?: string): void {
  trackEvent("page_view", {
    path: path ?? getCurrentPath(),
  });
}
