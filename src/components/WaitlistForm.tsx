import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const { data, error } = await supabase.functions.invoke("waitlist-signup", {
        body: { email: email.trim() },
      });

      if (error) {
        const msg = (error as any)?.context?.body
          ? await (error as any).context.json().catch(() => null)
          : null;
        if (msg?.error) {
          setErrorMsg(msg.error);
        } else {
          setErrorMsg("Something went wrong. Please try again.");
        }
        setStatus("error");
        return;
      }

      if (data?.error) {
        setErrorMsg(data.error);
        setStatus("error");
        return;
      }

      setStatus("success");
      toast({
        title: "You're in!",
        description: "You've been added to the waitlist. Check your email for confirmation.",
      });
    } catch (err: any) {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
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
        <p className="text-sm text-foreground">You're on the list! We'll notify you first when we launch.</p>
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
              Join <ArrowRight className="h-4 w-4" />
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
