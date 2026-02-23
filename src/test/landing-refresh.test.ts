import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { landingContentV2 } from "@/content/landing/v2";
import { useCountUp } from "@/hooks/use-count-up";

describe("landing refresh content model", () => {
  it("uses EN-only hero messaging anchored on human edge", () => {
    const combinedHeadline = `${landingContentV2.hero.headline} ${landingContentV2.hero.highlightedPhrase}`;
    expect(combinedHeadline).toContain("Stop Hiding Behind AI");
    expect(combinedHeadline).toContain("Human Edge");
    expect(landingContentV2.hero.body).not.toMatch(/[가-힣]/);
  });

  it("keeps why-now stats in conversion narrative", () => {
    const values = landingContentV2.problem.stats.map((stat) => stat.value);
    expect(values).toEqual(expect.arrayContaining([80, 17, 24]));
    expect(landingContentV2.problem.source).toContain("GitHub");
  });
});

describe("useCountUp", () => {
  it("counts to target value and applies suffix", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() =>
      useCountUp(24, {
        duration: 200,
        suffix: "%",
      }),
    );

    act(() => {
      vi.advanceTimersByTime(220);
    });

    expect(result.current.displayValue).toBe("24%");
    vi.useRealTimers();
  });
});
