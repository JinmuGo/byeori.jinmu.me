"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { trackLandingEvent } from "@/lib/analytics";

interface WaitlistResponse {
  success?: boolean;
  error?: string;
}

interface WaitlistFormProps {
  source?: string;
  persona?: string;
}

interface WaitlistRequestBody {
  email: string;
  source?: string;
  persona?: string;
  path?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const getUtmParams = (): Pick<
  WaitlistRequestBody,
  "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content"
> => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
  };
};

const WaitlistForm = ({
  source = "hero_waitlist",
  persona = "ai_agent_user",
}: WaitlistFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");
    trackLandingEvent("landing_cta_clicked", {
      source,
      persona,
      value: "waitlist_submit_click",
    });

    try {
      const payload: WaitlistRequestBody = {
        email: email.trim(),
        source,
        persona,
        path: window.location.pathname,
        referrer: document.referrer || undefined,
        ...getUtmParams(),
      };

      const res = await fetch("/api/waitlist-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: WaitlistResponse = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        trackLandingEvent("landing_waitlist_submitted", {
          source,
          persona,
          value: "error",
        });
        return;
      }

      setStatus("success");
      trackLandingEvent("landing_waitlist_submitted", {
        source,
        persona,
        value: "success",
      });
      toast({
        title: "You're in!",
        description: "You've been added to the waitlist. Check your email for confirmation.",
      });
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
      trackLandingEvent("landing_waitlist_submitted", {
        source,
        persona,
        value: "error",
      });
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-6 py-4"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
          <Check className="h-4 w-4 text-primary" />
        </div>
        <p className="text-sm text-foreground">You're on the list. We will email your early access invite first.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          required
          className="h-12 border-border bg-card text-foreground placeholder:text-muted-foreground/50"
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          size="lg"
          className="h-12 shrink-0 gap-2 bg-primary px-6 text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Join Waitlist <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {status === "error" && errorMsg && (
        <p className="mt-2 text-sm text-destructive">{errorMsg}</p>
      )}
    </form>
  );
};

export default WaitlistForm;
