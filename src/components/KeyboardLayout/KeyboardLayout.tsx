import { Keycap } from "../Keycap";
import type { KeyboardLayoutProps } from "./KeyboardLayout.types";
import type { KeycapSize } from "../Keycap/Keycap.types";
import styles from "./KeyboardLayout.module.css";

function inferSize(colSpan: number, rowSpan: number): KeycapSize {
  if (colSpan === 3 && rowSpan === 1) return "3u";
  if (colSpan === 2 && rowSpan === 1) return "2u";
  if (colSpan === 1 && rowSpan === 2) return "2u-v";
  return "1u";
}

export function KeyboardLayout({
  keys,
  columns,
  rows,
  plateColor = "oklch(0.20 0.01 260)",
  gap = 2,
  padding = 2,
  className,
}: KeyboardLayoutProps) {
  const unit = 60;

  return (
    <div
      className={`${styles.plate}${className ? ` ${className}` : ""}`}
      style={
        {
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, ${unit}px)`,
          gridTemplateRows: `repeat(${rows}, ${unit}px)`,
          gap: `${gap}px`,
          padding: `${padding}px`,
          background: plateColor,
          "--gap": `${gap}px`,
        } as React.CSSProperties
      }
    >
      {keys.map(({ id, col, row, colSpan = 1, rowSpan = 1, keycapProps }) => {
        const size = keycapProps.size ?? inferSize(colSpan, rowSpan);
        return (
          <div
            key={id}
            style={{
              gridColumn: `${col} / span ${colSpan}`,
              gridRow: `${row} / span ${rowSpan}`,
            }}
          >
            <Keycap size={size} {...keycapProps} />
          </div>
        );
      })}
    </div>
  );
}
