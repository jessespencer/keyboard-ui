export type KeycapSize =
  | "1u"
  | "1.25u"
  | "1.5u"
  | "2u"
  | "2u-v"
  | "3u";

export type KeycapVariant =
  | "cream"
  | "orange"
  | "charcoal"
  | "custom";

export interface KeycapProps {
  variant?: KeycapVariant;
  size?: KeycapSize;
  children?: React.ReactNode;
  legend?: string;
  onPress?: () => void;
  onRelease?: () => void;
  disabled?: boolean;
  className?: string;
  faceColor?: string;
  sideColor?: string;
}
