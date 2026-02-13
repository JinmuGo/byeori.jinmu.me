"use client";

import { useEffect } from "react";
import { trackLandingEvent } from "@/lib/analytics";

const viewedSections = new Set<string>();

export const useTrackSectionView = (sectionId: string, source = "landing_page"): void => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (viewedSections.has(sectionId)) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          viewedSections.add(sectionId);
          trackLandingEvent("landing_section_viewed", {
            section: sectionId,
            source,
          });
          observer.disconnect();
          break;
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionId, source]);
};
