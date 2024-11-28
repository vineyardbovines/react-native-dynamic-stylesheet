import type { HybridObject } from "react-native-nitro-modules";

export type ScreenInsets = { top: number; left: number; bottom: number; right: number };
export type ScreenDimensions = { width: number; height: number };
export type ColorScheme = "light" | "dark" | "unspecified";
export type ScreenOrientation = "portrait" | "landscape";

export interface DeviceTraits {
  readonly colorScheme: ColorScheme;
  readonly screenDimensions: ScreenDimensions;
  readonly contentSizeCategory: string;
  readonly screenInsets: ScreenInsets;
  readonly displayScale: number;
  readonly fontScale: number;
  readonly isRTL: boolean;
  readonly screenOrientation: ScreenOrientation;
  readonly pixelRatio: number;
}

export type HapticTypes =
  | "select"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "medium"
  | "heavy"
  | "soft"
  | "rigid";

export interface NitroDeviceModule extends HybridObject<{ ios: "swift"; android: "kotlin" }> {
  getDeviceTraits(): DeviceTraits;
  runHaptic(type: HapticTypes): void;

  getColorScheme(): ColorScheme;
  getScreenDimensions(): ScreenDimensions;
  getContentSizeCategory(): string;
  getScreenInsets(): ScreenInsets;
  getDisplayScale(): number;
  getFontScale(): number;
  getIsRTL(): boolean;
  getScreenOrientation(): ScreenOrientation;
  getPixelRatio(): number;
}
