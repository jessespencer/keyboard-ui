import type { KeycapVariant, KeycapSize } from "./Keycap.types";

/**
 * Each stop in the original conic-gradient mapped to a corner position.
 * The stops are ordered clockwise from 225° (bottom-left corner on a square).
 * Pairs of stops straddle each corner to create the sharp edge transitions.
 */
interface VariantGradient {
  stops: [string, string, string, string, string, string, string, string, string, string];
  /** Fraction of the corner-to-corner arc where each stop falls (0–1 within its quadrant) */
}

const VARIANT_GRADIENTS: Record<Exclude<KeycapVariant, "custom">, VariantGradient> = {
  cream: {
    stops: [
      "#bfb9ae", // 0%   — BL corner
      "#d4cfc4", // 1%   — just past BL
      "#e2ddd4", // 24%  — approaching TL (96% of quadrant)
      "#d2cdc2", // 27%  — just past TL (108% → 8% into next quadrant)
      "#d4cfc4", // 48%  — approaching TR
      "#b8b2a6", // 52%  — just past TR
      "#b6b0a4", // 74%  — approaching BR
      "#aca69a", // 77%  — just past BR
      "#aaa49a", // 99%  — approaching BL return
      "#bfb9ae", // 100% — BL complete
    ],
  },
  orange: {
    stops: [
      "#be4516",
      "#e6602b",
      "#e58250",
      "#e55d2b",
      "#e65d2a",
      "#ad3a0d",
      "#ab3c10",
      "#982600",
      "#962900",
      "#be4516",
    ],
  },
  charcoal: {
    stops: [
      "#3a3a40",
      "#4a4a50",
      "#5c5c62",
      "#484a4e",
      "#4a4a4e",
      "#34343a",
      "#333538",
      "#2a2a2e",
      "#2a2a30",
      "#3a3a40",
    ],
  },
};

/** Aspect ratios for each keycap size (width / height). */
const SIZE_RATIOS: Record<KeycapSize, number> = {
  "1u": 1,
  "1.25u": 1.25,
  "1.5u": 1.5,
  "2u": 2,
  "2u-v": 0.5,
  "3u": 3,
};

const RAD_TO_DEG = 180 / Math.PI;

/**
 * Compute the four corner angles as degrees offset from 225° (clockwise),
 * based on width:height ratio.
 *
 * For a square (ratio=1): [0, 90, 180, 270]
 * For a 2:1 rect:         [~18.4, ~71.6, ~198.4, ~251.6]
 */
function cornerOffsets(ratio: number): [number, number, number, number] {
  const alpha = Math.atan(ratio) * RAD_TO_DEG;
  return [
    alpha - 45,     // bottom-left
    135 - alpha,    // top-left
    alpha + 135,    // top-right
    315 - alpha,    // bottom-right
  ];
}

/**
 * Map the original fixed-percentage stops to angle-adjusted stops.
 *
 * Original pattern (square, corners at 0°/90°/180°/270° from start):
 *   0%, 1%, 24%, 27%, 48%, 52%, 74%, 77%, 99%, 100%
 *
 * Each pair straddles a corner:
 *   [0,1] around BL, [24,27] around TL, [48,52] around TR, [74,77] around BR, [99,100] return to BL
 *
 * We map these by interpolating within each quadrant arc.
 */
function computeStopAngles(ratio: number): number[] {
  const [bl, tl, tr, br] = cornerOffsets(ratio);
  // Transition band half-width in degrees (1% of 360° = 3.6°, original ~1.5% per side)
  const band = 3.6 * (1.5 / 1);

  return [
    bl,              // 0%  — BL corner
    bl + band,       // 1%  — just past BL
    tl - band,       // 24% — approaching TL
    tl + band,       // 27% — just past TL
    tr - band,       // 48% — approaching TR
    tr + band,       // 52% — just past TR
    br - band,       // 74% — approaching BR
    br + band,       // 77% — just past BR
    360 - band,      // 99% — approaching BL return
    360,             // 100%
  ];
}

export function buildSideGradient(variant: KeycapVariant, size: KeycapSize): string | undefined {
  if (variant === "custom") return undefined;

  const { stops: colors } = VARIANT_GRADIENTS[variant];
  const ratio = SIZE_RATIOS[size];
  const angles = computeStopAngles(ratio);

  const stops = colors
    .map((color, i) => `${color} ${angles[i].toFixed(1)}deg`)
    .join(", ");

  return `conic-gradient(from 225deg, ${stops})`;
}
