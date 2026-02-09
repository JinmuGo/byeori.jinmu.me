import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#0f0d0b;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0d0b;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">
        <!-- Header -->
        <tr><td style="padding:32px 40px 24px;text-align:center;">
          <h1 style="margin:0;font-size:28px;font-weight:700;color:#f5f0eb;letter-spacing:-0.5px;">✦ Byeori</h1>
          <p style="margin:8px 0 0;font-size:13px;color:#8a7d72;letter-spacing:2px;text-transform:uppercase;">AI Security Platform</p>
        </td></tr>
        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:linear-gradient(90deg,transparent,#e0734c55,transparent);"></div></td></tr>
        <!-- Body -->
        <tr><td style="padding:32px 40px;">
          <h2 style="margin:0 0 16px;font-size:22px;font-weight:600;color:#f5f0eb;">Thanks for joining the waitlist! 🎉</h2>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#b8ada3;">Hello,<br/>Thank you so much for joining the Byeori waitlist.</p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#b8ada3;">We're building a new security solution for the AI era. You'll be the <strong style="color:#f5f0eb;">first to know</strong> when we're ready to launch.</p>
          <!-- Highlight box -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
            <tr><td style="padding:20px 24px;background-color:#1a1614;border-radius:12px;border:1px solid #2a2420;">
              <p style="margin:0;font-size:14px;color:#b8ada3;line-height:1.6;">
                <span style="color:#e0734c;font-weight:600;">What's next?</span><br/>
                • We'll send you an early access invite via email<br/>
                • Exclusive founding member benefits are waiting for you<br/>
                • Be the first to receive product updates
              </p>
            </td></tr>
          </table>
          <p style="margin:0;font-size:15px;line-height:1.7;color:#b8ada3;">In the meantime, feel free to reach out if you have any questions.</p>
        </td></tr>
        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:linear-gradient(90deg,transparent,#e0734c33,transparent);"></div></td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:13px;color:#6b6058;">Made with care by <span style="color:#e0734c;">Neungsohwa</span> Team</p>
          <p style="margin:0;font-size:12px;color:#4a4440;">© 2026 Byeori. All rights reserved.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid email address." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    const audienceId = Deno.env.get("RESEND_AUDIENCE_ID");

    if (!resendKey || !audienceId) {
      throw new Error("Missing Resend configuration");
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Add to Resend Audience
    const audienceRes = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      }
    );

    const audienceData = await audienceRes.json();

    if (!audienceRes.ok) {
      if (audienceRes.status === 409 || audienceData?.name === "validation_error") {
        return new Response(
          JSON.stringify({ error: "This email is already on the waitlist." }),
          { status: 409, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      throw new Error(audienceData?.message || "Failed to add to audience");
    }

    // Send welcome email
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "Byeori <onboarding@resend.dev>",
      to: [normalizedEmail],
      subject: "Thanks for joining the Byeori Waitlist! ✦",
      html: emailHtml,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Waitlist signup error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
