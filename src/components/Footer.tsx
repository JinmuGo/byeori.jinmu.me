import Image from "next/image";
import neungsohwaSrc from "@/assets/neungsohwa.png";
import { Mail } from "lucide-react";
import ByeoriLogo from "@/components/icons/ByeoriLogo";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card">
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <ByeoriLogo className="h-9 w-auto text-foreground" aria-label="Byeori" />
            <span className="text-lg font-semibold text-foreground">Byeori</span>
          </div>
          <p className="mb-1 text-sm text-muted-foreground">The AI Supervision OS.</p>
          <p className="mb-8 text-sm text-muted-foreground/70">Reclaim your agency over complex codebases.</p>

          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Get In Touch</p>
          <a href="mailto:contact@byeori.dev" className="inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
              <Mail className="h-4 w-4" />
            </span>
            contact@byeori.dev
          </a>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Product</p>
          <ul className="space-y-3">
            <li><a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a></li>
            <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Docs</a></li>
            <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Manifesto</a></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Legal</p>
          <ul className="space-y-3">
            <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</a></li>
            <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Connect</p>
          <ul className="space-y-3">
            <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">GitHub</a></li>
            <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Twitter</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-border/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground/60 md:flex-row">
        <p>© 2026 neungsohwa. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Crafted with
          <Image src={neungsohwaSrc} alt="neungsohwa" width={16} height={16} className="inline-block h-4 w-4" />
          for developers worldwide
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
