import type { KeycapProps, KeycapSize } from "../Keycap/Keycap.types";

export interface KeyPosition {
  id: string;
  col: number;
  row: number;
  colSpan?: number;
  rowSpan?: number;
  keycapProps: Omit<KeycapProps, "size"> & { size?: KeycapSize };
}

export interface KeyboardLayoutProps {
  keys: KeyPosition[];
  columns: number;
  rows: number;
  plateColor?: string;
  gap?: number;
  padding?: number;
  className?: string;
}
