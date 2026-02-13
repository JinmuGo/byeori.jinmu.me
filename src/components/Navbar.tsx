"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ByeoriLogo from "@/components/icons/ByeoriLogo";
import { trackLandingEvent } from "@/lib/analytics";

const navLinks = [
  { href: "#problem", label: "Why Now" },
  { href: "#features", label: "Core Loop" },
  { href: "#proof", label: "Proof" },
  { href: "#faq", label: "FAQ" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleNavClick = (source: string, href: string) => {
    trackLandingEvent("landing_cta_clicked", {
      source,
      value: href,
    });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <ByeoriLogo className="h-6 text-foreground" aria-label="Byeori" />
          Byeori
        </a>

        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick("navbar_link", link.href)}
              className="transition-colors duration-150 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden h-8 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 md:inline-flex"
          >
            <a
              href="#waitlist"
              onClick={() => handleNavClick("navbar_desktop_cta", "#waitlist")}
            >
              Join Waitlist <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    handleNavClick("navbar_mobile_link", link.href);
                    setOpen(false);
                  }}
                  className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild size="sm" className="mt-2 h-9 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                <a
                  href="#waitlist"
                  onClick={() => {
                    handleNavClick("navbar_mobile_cta", "#waitlist");
                    setOpen(false);
                  }}
                >
                  Join Waitlist <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
