import { useKeycapPress } from "../../hooks/useKeycapPress";
import type { KeycapProps } from "./Keycap.types";
import styles from "./Keycap.module.css";

export function Keycap({
  variant = "cream",
  size = "1u",
  children,
  legend,
  onPress,
  onRelease,
  disabled = false,
  className,
  faceColor,
  sideColor,
}: KeycapProps) {
  const { buttonProps } = useKeycapPress({ onPress, onRelease, disabled });

  const customStyle =
    variant === "custom"
      ? ({
          "--custom-face": faceColor,
          "--custom-side": sideColor,
        } as React.CSSProperties)
      : undefined;

  return (
    <button
      className={`${styles.keycap}${className ? ` ${className}` : ""}`}
      data-variant={variant}
      data-size={size}
      data-disabled={disabled || undefined}
      style={customStyle}
      disabled={disabled}
      {...buttonProps}
    >
      {legend && <span className={styles.legend}>{legend}</span>}
      <span className={styles.content}>{children}</span>
    </button>
  );
}
