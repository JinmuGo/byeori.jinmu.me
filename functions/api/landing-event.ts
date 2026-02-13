interface LandingEventBody {
  eventName?: string;
  payload?: Record<string, unknown>;
}

const ALLOWED_EVENTS = new Set([
  "landing_cta_clicked",
  "landing_demo_interacted",
  "landing_waitlist_submitted",
  "landing_section_viewed",
]);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const sanitizePayload = (payload: Record<string, unknown> | undefined): Record<string, string> => {
  if (!payload || typeof payload !== "object") return {};

  const sanitized: Record<string, string> = {};
  const entries = Object.entries(payload).slice(0, 24);
  for (const [key, value] of entries) {
    if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") continue;
    const cleanKey = key.trim().slice(0, 64);
    if (!cleanKey) continue;
    sanitized[cleanKey] = String(value).slice(0, 256);
  }
  return sanitized;
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const onRequestPost: PagesFunction = async (context) => {
  try {
    const body = (await context.request.json()) as LandingEventBody;
    const eventName = body.eventName;

    if (!eventName || typeof eventName !== "string" || !ALLOWED_EVENTS.has(eventName)) {
      return new Response(
        JSON.stringify({ error: "Invalid event name." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const payload = sanitizePayload(body.payload);

    console.info("[landing-event]", {
      eventName,
      payload,
      timestamp: new Date().toISOString(),
      userAgent: context.request.headers.get("user-agent"),
      country: context.request.headers.get("cf-ipcountry"),
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  } catch (error) {
    console.error("Failed to process landing event:", error);
    return new Response(
      JSON.stringify({ error: "Unable to process event." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }
};
