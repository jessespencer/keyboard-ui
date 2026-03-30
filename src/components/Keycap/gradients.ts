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

/** Stop positions in degrees for a square (1u) keycap. */
const SQUARE_STOPS_DEG = [0, 5.4, 84.6, 95.4, 174.6, 185.4, 264.6, 275.4, 354.6, 360];

function buildSquareConic(colors: string[]): string {
  const stops = colors
    .map((color, i) => `${color} ${SQUARE_STOPS_DEG[i].toFixed(1)}deg`)
    .join(", ");
  return `conic-gradient(from 225deg, ${stops})`;
}

/**
 * Stitched gradient for wide keys — mirrors the Figma approach:
 * each endcap retains detail on its OUTER half and flattens to
 * a shared base color on its inner half, so the seams disappear.
 *
 * Left cap:  keeps stops 0-4, 8-9 (BL/TL corners + bottom), flattens 5-7 to base
 * Right cap: keeps stops 5-7 (TR/BR corners), flattens 0-4, 8-9 to base
 * Fill:      solid base color
 */
function buildStitchedGradient(colors: string[]): string {
  const base = colors[1]; // shared fade-to color (e.g. #E0DBD0 for cream)

  const leftStops = [colors[0], colors[1], colors[2], colors[3], colors[4], base, base, base, colors[8], colors[9]];
  const rightStops = [base, base, base, base, base, colors[5], colors[6], colors[7], base, base];

  const leftConic = buildSquareConic(leftStops);
  const rightConic = buildSquareConic(rightStops);

  return [
    `${leftConic} 0 0 / var(--h) 100% no-repeat`,
    `${rightConic} 100% 0 / var(--h) 100% no-repeat`,
    base,
  ].join(", ");
}

export function buildSideGradient(variant: KeycapVariant, size: KeycapSize): string | undefined {
  if (variant === "custom") return undefined;

  const { stops: colors } = VARIANT_GRADIENTS[variant];
  const ratio = SIZE_RATIOS[size];

  if (ratio >= 2 || ratio <= 0.5) {
    return buildStitchedGradient(colors);
  }

  return buildSquareConic(colors);
}
