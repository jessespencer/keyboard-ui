# TODO

- [ ] **Fix conic gradient corner alignment on wide keycaps** — The outer shell's conic gradient doesn't align its light/dark corner transitions with the physical `border-radius` corners on wider keys (2u, 3u). Works fine on 1u. Issue is in `src/components/Keycap/gradients.ts` — the fixed `band` value and `computeStopAngles` need to account for non-square aspect ratios.
