import { useState, useCallback, useRef } from "react";

interface UseKeycapPressOptions {
  onPress?: () => void;
  onRelease?: () => void;
  disabled?: boolean;
}

export function useKeycapPress({ onPress, onRelease, disabled }: UseKeycapPressOptions = {}) {
  const [pressed, setPressed] = useState(false);
  const pressedRef = useRef(false);

  const press = useCallback(() => {
    if (disabled || pressedRef.current) return;
    pressedRef.current = true;
    setPressed(true);
    onPress?.();
  }, [disabled, onPress]);

  const release = useCallback(() => {
    if (!pressedRef.current) return;
    pressedRef.current = false;
    setPressed(false);
    onRelease?.();
  }, [onRelease]);

  const buttonProps = {
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      press();
    },
    onPointerUp: () => release(),
    onPointerLeave: () => release(),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        press();
      }
    },
    onKeyUp: (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        release();
      }
    },
    "data-pressed": pressed ? "true" : undefined,
    "aria-pressed": pressed,
    tabIndex: disabled ? -1 : 0,
    role: "button" as const,
  };

  return { pressed, buttonProps };
}
