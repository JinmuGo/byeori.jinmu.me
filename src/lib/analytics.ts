export type LandingEventName =
  | "landing_cta_clicked"
  | "landing_demo_interacted"
  | "landing_waitlist_submitted"
  | "landing_section_viewed";

export interface LandingEventPayload {
  source?: string;
  section?: string;
  persona?: string;
  value?: string;
  path?: string;
  referrer?: string;
  [key: string]: string | number | boolean | undefined;
}

interface WindowWithAnalytics extends Window {
  dataLayer?: Record<string, unknown>[];
  gtag?: (type: "event", eventName: string, params?: Record<string, unknown>) => void;
}

const EVENT_ENDPOINT = "/api/landing-event";

export const trackLandingEvent = (
  eventName: LandingEventName,
  payload: LandingEventPayload = {},
): void => {
  if (typeof window === "undefined") return;

  const safePayload = {
    ...payload,
    path: payload.path ?? window.location.pathname,
    referrer: payload.referrer ?? (document.referrer || undefined),
  };

  const analyticsWindow = window as WindowWithAnalytics;

  if (analyticsWindow.dataLayer) {
    analyticsWindow.dataLayer.push({
      event: eventName,
      ...safePayload,
    });
  }

  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", eventName, safePayload);
  }

  void fetch(EVENT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventName, payload: safePayload }),
    keepalive: true,
  }).catch(() => {
    // Do not block UI on analytics errors.
  });
};
