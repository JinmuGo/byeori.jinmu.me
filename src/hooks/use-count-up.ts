"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseCountUpOptions {
  duration?: number;
  suffix?: string;
  start?: number;
  decimals?: number;
}

interface UseCountUpResult {
  ref: RefObject<HTMLSpanElement>;
  displayValue: string;
}

const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

const formatNumber = (value: number, decimals: number): string => {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toString();
};

export const useCountUp = (
  value: number,
  {
    duration = 1400,
    suffix = "",
    start = 0,
    decimals = 0,
  }: UseCountUpOptions = {},
): UseCountUpResult => {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState<string>(`${formatNumber(start, decimals)}${suffix}`);
  const startedRef = useRef(false);

  useEffect(() => {
    const runAnimation = () => {
      let step = 0;
      const frameDuration = 16;
      const totalSteps = Math.max(1, Math.ceil(duration / frameDuration));

      const timer = window.setInterval(() => {
        step += 1;
        const progress = Math.min(1, step / totalSteps);
        const easedProgress = easeOutCubic(progress);
        const next = start + (value - start) * easedProgress;

        setDisplayValue(`${formatNumber(next, decimals)}${suffix}`);

        if (progress >= 1) {
          window.clearInterval(timer);
        }
      }, frameDuration);
    };

    if (typeof window === "undefined") {
      setDisplayValue(`${formatNumber(value, decimals)}${suffix}`);
      return;
    }

    if (startedRef.current) return;

    if (!ref.current || typeof IntersectionObserver === "undefined") {
      startedRef.current = true;
      runAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (!isVisible) return;
        startedRef.current = true;
        runAnimation();
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [decimals, duration, start, suffix, value]);

  return { ref, displayValue };
};
