import type { KeycapVariant, KeycapSize } from "./Keycap.types";

interface VariantGradient {
  stops: [string, string, string, string, string, string, string, string, string, string];
}

const VARIANT_GRADIENTS: Record<Exclude<KeycapVariant, "custom">, VariantGradient> = {
  cream: {
    stops: [
      "#b0a898",
      "#e0dbd0",
      "#f2ede4",
      "#ddd8cc",
      "#e0dbd0",
      "#a49e90",
      "#a09a8c",
      "#908a7c",
      "#8e8878",
      "#b0a898",
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

const SIZE_RATIOS: Record<KeycapSize, number> = {
  "1u": 1,
  "1.25u": 1.25,
  "1.5u": 1.5,
  "2u": 2,
  "2u-v": 0.5,
  "3u": 3,
};

/* ============================
 * STOP POSITIONS (degrees)
 * Tune each independently.
 * ============================ */

// 1U keys — the square keycap gradient
const STOPS_1U = [0, 5.4, 84.6, 95.4, 174.6, 185.4, 264.6, 275.4, 354.6, 360];

// 2U left endcap — outer half has detail, inner half fades to base
const STOPS_2U_LEFT = [0, 5.4, 84.6, 95.4, 197.5, 202.5, 255, 354.6, 360];

// 2U right endcap — outer half has detail, inner half fades to base
const STOPS_2U_RIGHT = [0, 22, 45, 174.6, 185.4, 264.6, 275.4, 430];

function buildConic(colors: string[], positions: number[]): string {
  const stops = colors
    .map((color, i) => `${color} ${positions[i].toFixed(1)}deg`)
    .join(", ");
  return `conic-gradient(from 225deg, ${stops})`;
}

function buildStitchedGradient(colors: string[]): string {
  const base = colors[1];

  const leftColors = [colors[0], colors[1], colors[2], "#e0dbd0", "#e0dbd0", colors[5], "#8e8878", colors[8], colors[9]];
  const rightColors = ["#8e8878", "#8e8878", "#e0dbd0", "#e0dbd0", colors[5], colors[6], "#8e8878", "#8e8878"];

  const leftConic = buildConic(leftColors, STOPS_2U_LEFT);
  const rightConic = buildConic(rightColors, STOPS_2U_RIGHT);

  return [
    `${leftConic} 0 0 / 50% 100% no-repeat`,
    `${rightConic} 100% 0 / 50% 100% no-repeat`,
  ].join(", ");
}

export function buildSideGradient(variant: KeycapVariant, size: KeycapSize): string | undefined {
  if (variant === "custom") return undefined;

  const { stops: colors } = VARIANT_GRADIENTS[variant];
  const ratio = SIZE_RATIOS[size];

  if (ratio >= 2 || ratio <= 0.5) {
    return buildStitchedGradient(colors);
  }

  return buildConic(colors, STOPS_1U);
}
