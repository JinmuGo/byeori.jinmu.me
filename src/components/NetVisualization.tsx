"use client";

import { useRef, useEffect, useCallback, useState } from "react";

// --- Interfaces ---

interface WarpThread {
  index: number;
  baseX: number;
  animatedX: number;
  distFromCenter: number;
  color: string;
  strokeWidth: number;
  opacity: number;
  isByeori: boolean;
}

interface WeftThread {
  index: number;
  baseY: number;
  animatedY: number;
  distFromCenter: number;
  strokeWidth: number;
  opacity: number;
}

// --- Constants ---

const W = 1200;
const H = 800;
const WARP_COUNT = 13;
const WEFT_COUNT = 9;
const WEAVE_AMPLITUDE = 2.5;
const BYEORI_WEAVE_AMPLITUDE = 1.0;
const CROSSING_GAP = 2;
const RIPPLE_SPEED = 0.0008;
const BREATH_SPEED = 0.0002;
const MOUSE_RADIUS = 0.15;
const BYEORI_RESISTANCE = 0.7;
const BYEORI_INDEX = 6;
const MARGIN_X = 40;
const MARGIN_Y = 30;
const INTRO_DURATION = 2500;
const INTRO_DRAW_END = 0.4;

// Precomputed gradient stop fractions
const EDGE_FRAC = MARGIN_X / W;
const HALF_SPAN = 0.5 - EDGE_FRAC;
const TRANS_FRAC = 0.5 - 0.4 * HALF_SPAN;

// --- Helpers ---

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** 3-stop HSL color: coral(t=0) → amber(t=0.4) → muted gray(t=1) */
function getThreadColor(t: number): string {
  if (t <= 0.4) {
    const s = smoothstep(0, 0.4, t);
    return `hsl(${lerp(16, 38, s)}, ${lerp(80, 92, s)}%, ${lerp(58, 50, s)}%)`;
  }
  const s = smoothstep(0.4, 1, t);
  return `hsl(${lerp(38, 25, s)}, ${lerp(92, 12, s)}%, ${lerp(50, 55, s)}%)`;
}

// --- Thread creation ---

function createWarps(): WarpThread[] {
  const spacing = (W - 2 * MARGIN_X) / (WARP_COUNT - 1);
  const centerX = W / 2;
  const maxDist = centerX - MARGIN_X;

  return Array.from({ length: WARP_COUNT }, (_, i) => {
    const baseX = MARGIN_X + i * spacing;
    const dist = Math.min(Math.abs(baseX - centerX) / maxDist, 1);
    const isByeori = i === BYEORI_INDEX;
    return {
      index: i,
      baseX,
      animatedX: baseX,
      distFromCenter: dist,
      color: isByeori ? "hsl(16, 80%, 58%)" : getThreadColor(dist),
      strokeWidth: isByeori ? 2.5 : lerp(1.4, 0.4, dist),
      opacity: isByeori ? 0.75 : lerp(0.35, 0.1, dist),
      isByeori,
    };
  });
}

function createWefts(): WeftThread[] {
  const spacing = (H - 2 * MARGIN_Y) / (WEFT_COUNT - 1);
  const centerY = H / 2;
  const maxDist = centerY - MARGIN_Y;

  return Array.from({ length: WEFT_COUNT }, (_, j) => {
    const baseY = MARGIN_Y + j * spacing;
    const dist = Math.min(Math.abs(baseY - centerY) / maxDist, 1);
    return {
      index: j,
      baseY,
      animatedY: baseY,
      distFromCenter: dist,
      strokeWidth: lerp(1.2, 0.35, dist),
      opacity: lerp(0.25, 0.07, dist),
    };
  });
}

// --- Path generation ---

function generateWarpPath(warp: WarpThread, wefts: WeftThread[], amplitudeScale = 1): string {
  const amp = (warp.isByeori ? BYEORI_WEAVE_AMPLITUDE : WEAVE_AMPLITUDE) * (warp.isByeori ? amplitudeScale : 1);
  const x = warp.animatedX;

  // Points: top edge → each weft crossing → bottom edge
  const points: { px: number; py: number }[] = [{ px: x, py: 0 }];
  for (const weft of wefts) {
    const warpOver = (warp.index + weft.index) % 2 === 0;
    points.push({ px: x + (warpOver ? -amp : amp), py: weft.animatedY });
  }
  points.push({ px: x, py: H });

  // Quadratic bezier through points, control at baseX between crossings
  let d = `M${points[0].px.toFixed(1)} ${points[0].py.toFixed(1)}`;
  for (let k = 1; k < points.length; k++) {
    const cpY = (points[k - 1].py + points[k].py) / 2;
    d += ` Q${x.toFixed(1)} ${cpY.toFixed(1)} ${points[k].px.toFixed(1)} ${points[k].py.toFixed(1)}`;
  }
  return d;
}

/** Convert a list of crossing/gap points into a smooth SVG path */
function segToPath(
  points: { px: number; py: number }[],
  baseY: number
): string {
  if (points.length < 2) return "";
  let d = `M${points[0].px.toFixed(1)} ${points[0].py.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const cpX = (points[i - 1].px + points[i].px) / 2;
    d += ` Q${cpX.toFixed(1)} ${baseY.toFixed(1)} ${points[i].px.toFixed(1)} ${points[i].py.toFixed(1)}`;
  }
  return d;
}

function generateWeftSegments(weft: WeftThread, warps: WarpThread[]): string[] {
  const y = weft.animatedY;
  const paths: string[] = [];
  let seg: { px: number; py: number }[] = [{ px: 0, py: y }];

  for (const warp of warps) {
    const warpOver = (warp.index + weft.index) % 2 === 0;
    if (warpOver) {
      // Weft goes under → gap
      seg.push({ px: warp.animatedX - CROSSING_GAP, py: y });
      if (seg.length >= 2) paths.push(segToPath(seg, y));
      seg = [{ px: warp.animatedX + CROSSING_GAP, py: y }];
    } else {
      // Weft goes over → curve through crossing
      const amp = warp.isByeori ? BYEORI_WEAVE_AMPLITUDE : WEAVE_AMPLITUDE;
      seg.push({ px: warp.animatedX, py: y - amp });
    }
  }

  // Close final segment to right edge
  seg.push({ px: W, py: y });
  if (seg.length >= 2) paths.push(segToPath(seg, y));
  return paths;
}

// --- Component ---

const NetVisualization = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const warpsRef = useRef<WarpThread[]>([]);
  const weftsRef = useRef<WeftThread[]>([]);
  const mouseRef = useRef({ x: -1, y: -1, active: false });
  const frameRef = useRef<number>(0);
  const introStartRef = useRef<number>(-1);
  const introTRef = useRef<number>(0);
  const [, setTick] = useState(0);

  useEffect(() => {
    warpsRef.current = createWarps();
    weftsRef.current = createWefts();
  }, []);

  const updateThreads = useCallback((time: number) => {
    const warps = warpsRef.current;
    const wefts = weftsRef.current;
    const mouse = mouseRef.current;
    const introT = introTRef.current;

    for (const warp of warps) {
      const d = warp.distFromCenter;
      const damping = 1 - d * 0.7;
      const ripple = Math.sin(d * 20 - time * RIPPLE_SPEED) * 1.5 * damping;
      const breath =
        Math.sin(time * BREATH_SPEED + warp.index * 0.5) * 0.7 * damping;
      let dx = (ripple + breath) * introT;
      if (warp.isByeori) dx *= 1 - BYEORI_RESISTANCE;

      if (mouse.active) {
        const nx = warp.baseX / W;
        const mdx = nx - mouse.x;
        const dist = Math.abs(mdx);
        if (dist < MOUSE_RADIUS) {
          const resistance = warp.isByeori ? BYEORI_RESISTANCE : 0;
          dx += Math.sign(mdx) * (1 - dist / MOUSE_RADIUS) * 8 * (1 - resistance) * introT;
        }
      }

      warp.animatedX += (warp.baseX + dx - warp.animatedX) * 0.08;
    }

    for (const weft of wefts) {
      const d = weft.distFromCenter;
      const damping = 1 - d * 0.7;
      const ripple = Math.sin(d * 20 - time * RIPPLE_SPEED) * 1.0 * damping;
      const breath =
        Math.sin(time * BREATH_SPEED + weft.index * 0.5 + 1) * 0.5 * damping;
      let dy = (ripple + breath) * introT;

      if (mouse.active) {
        const ny = weft.baseY / H;
        const mdy = ny - mouse.y;
        const dist = Math.abs(mdy);
        if (dist < MOUSE_RADIUS) {
          dy += Math.sign(mdy) * (1 - dist / MOUSE_RADIUS) * 5 * introT;
        }
      }

      weft.animatedY += (weft.baseY + dy - weft.animatedY) * 0.08;
    }
  }, []);

  useEffect(() => {
    let running = true;
    const loop = (time: number) => {
      if (!running) return;
      if (document.hidden) {
        frameRef.current = requestAnimationFrame(loop);
        return;
      }
      if (introStartRef.current < 0) introStartRef.current = time;
      introTRef.current = Math.min((time - introStartRef.current) / INTRO_DURATION, 1);
      updateThreads(time);
      setTick((t) => t + 1);
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, [updateThreads]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    },
    []
  );

  const handlePointerEnd = useCallback(() => {
    mouseRef.current = { x: -1, y: -1, active: false };
  }, []);

  // --- Render data ---
  const warps = warpsRef.current;
  const wefts = weftsRef.current;

  // Intro animation progress
  const introT = introTRef.current;
  const drawProgress = smoothstep(0, INTRO_DRAW_END, introT);
  const settleProgress = smoothstep(INTRO_DRAW_END, 1, introT);
  const amplitudeScale = settleProgress;
  const byeoriStroke = lerp(4, 2.5, settleProgress);
  const byeoriOpacity = lerp(1, 0.75, settleProgress);
  const fabricOpacity = settleProgress;

  const byeori = warps.find((w) => w.isByeori);
  const byeoriPath = byeori ? generateWarpPath(byeori, wefts, amplitudeScale) : "";

  // Crossing highlights (center region only)
  const highlights: { cx: number; cy: number; opacity: number; color: string }[] = [];
  for (const warp of warps) {
    if (warp.distFromCenter > 0.5) continue;
    for (const weft of wefts) {
      if (weft.distFromCenter > 0.5) continue;
      const warpOver = (warp.index + weft.index) % 2 === 0;
      if (!warpOver) continue;
      const dist = Math.max(warp.distFromCenter, weft.distFromCenter);
      const amp = warp.isByeori ? BYEORI_WEAVE_AMPLITUDE : WEAVE_AMPLITUDE;
      highlights.push({
        cx: warp.animatedX - amp,
        cy: weft.animatedY,
        opacity: lerp(0.2, 0.04, dist / 0.5),
        color: warp.isByeori ? "hsl(16, 80%, 58%)" : getThreadColor(warp.distFromCenter),
      });
    }
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      {/* --- defs: gradients & filters --- */}
      <defs>
        <filter id="byeori-glow-wide" x="-50%" y="-10%" width="200%" height="120%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="byeori-glow-inner" x="-50%" y="-10%" width="200%" height="120%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Weft color gradient: edge muted → amber → center coral → amber → edge muted */}
        <linearGradient
          id="weft-grad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={W}
          y2="0"
        >
          <stop offset={EDGE_FRAC} stopColor="hsl(25, 12%, 55%)" />
          <stop offset={TRANS_FRAC} stopColor="hsl(38, 92%, 50%)" />
          <stop offset={0.5} stopColor="hsl(16, 80%, 58%)" />
          <stop offset={1 - TRANS_FRAC} stopColor="hsl(38, 92%, 50%)" />
          <stop offset={1 - EDGE_FRAC} stopColor="hsl(25, 12%, 55%)" />
        </linearGradient>
      </defs>

      {/* Layer 1: Byeori glow (behind everything) */}
      {byeoriPath && (
        <>
          <path
            d={byeoriPath}
            fill="none"
            stroke="hsl(16, 80%, 58%)"
            strokeWidth={10}
            strokeOpacity={0.06 * settleProgress}
            filter="url(#byeori-glow-wide)"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - drawProgress}
          />
          <path
            d={byeoriPath}
            fill="none"
            stroke="hsl(16, 80%, 58%)"
            strokeWidth={4}
            strokeOpacity={0.15 * settleProgress}
            filter="url(#byeori-glow-inner)"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - drawProgress}
          />
        </>
      )}

      {/* Layer 2: All warp paths (non-byeori only, faded by intro) */}
      {warps.map((warp) =>
        warp.isByeori ? null : (
          <path
            key={`warp-${warp.index}`}
            d={generateWarpPath(warp, wefts)}
            fill="none"
            stroke={warp.color}
            strokeWidth={warp.strokeWidth}
            strokeOpacity={warp.opacity * fabricOpacity}
            strokeLinecap="round"
          />
        )
      )}

      {/* Layer 3: All weft segments (with gaps at under-crossings) */}
      {wefts.map((weft) =>
        generateWeftSegments(weft, warps).map((seg, si) => (
          <path
            key={`weft-${weft.index}-${si}`}
            d={seg}
            fill="none"
            stroke="url(#weft-grad)"
            strokeWidth={weft.strokeWidth}
            strokeOpacity={weft.opacity * fabricOpacity}
            strokeLinecap="round"
          />
        ))
      )}

      {/* Layer 4: Byeori overdraw (always visually on top) */}
      {byeoriPath && (
        <path
          d={byeoriPath}
          fill="none"
          stroke="hsl(16, 80%, 58%)"
          strokeWidth={byeoriStroke}
          strokeOpacity={byeoriOpacity}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - drawProgress}
        />
      )}

      {/* Layer 5: Crossing highlights (center region) */}
      {highlights.map((h, i) => (
        <circle
          key={`xh-${i}`}
          cx={h.cx}
          cy={h.cy}
          r={1.2}
          fill={h.color}
          fillOpacity={h.opacity * fabricOpacity}
        />
      ))}
    </svg>
  );
};

export default NetVisualization;
