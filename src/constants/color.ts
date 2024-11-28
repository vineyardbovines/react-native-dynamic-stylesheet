export interface ColorInfo {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export const CONTRAST_RATIOS = {
  normal: {
    AA: 4.5,
    AAA: 7,
  },
  large: {
    AA: 3,
    AAA: 4.5,
  },
} as const;

export type ColorScheme = "light" | "dark";

export const COLOR_PROPERTIES = {
  foreground: new Set([
    "color",
    "textDecorationColor",
    "textShadowColor",
    "caretColor",
    "placeholderTextColor",
  ]),
  background: new Set(["backgroundColor", "overlayColor"]),
  border: new Set([
    "borderColor",
    "borderStartColor",
    "borderEndColor",
    "borderTopColor",
    "borderBottomColor",
    "borderLeftColor",
    "borderRightColor",
  ]),
  shadow: new Set(["shadowColor"]),
  tint: new Set(["tintColor"]),
} as const;

export type PropertyContext = keyof typeof COLOR_PROPERTIES;
type SystemPropertyContext = "foreground" | "background" | "border";

export const GRAY_RANGES: Record<
  ColorScheme,
  Record<PropertyContext, { min: number; max: number }>
> = {
  light: {
    background: { min: 240, max: 255 },
    foreground: { min: 0, max: 51 },
    border: { min: 200, max: 230 },
    shadow: { min: 0, max: 51 },
    tint: { min: 51, max: 128 },
  },
  dark: {
    background: { min: 0, max: 51 },
    foreground: { min: 200, max: 255 },
    border: { min: 51, max: 102 },
    shadow: { min: 0, max: 51 },
    tint: { min: 128, max: 200 },
  },
} as const;

const IOS_SYSTEM_GRAY_COLORS: Record<
  ColorScheme,
  Record<SystemPropertyContext, { normal: string; large: string }>
> = {
  light: {
    foreground: {
      normal: "systemGray",
      large: "systemGray2",
    },
    background: {
      normal: "systemGray6",
      large: "systemGray6",
    },
    border: {
      normal: "systemGray4",
      large: "systemGray4",
    },
  },
  dark: {
    foreground: {
      normal: "systemGray6",
      large: "systemGray5",
    },
    background: {
      normal: "systemGray",
      large: "systemGray",
    },
    border: {
      normal: "systemGray2",
      large: "systemGray2",
    },
  },
} as const;

const ANDROID_SYSTEM_GRAY_COLORS: Record<
  ColorScheme,
  Record<SystemPropertyContext, { normal: string; large: string }>
> = {
  light: {
    foreground: {
      normal: "#1F1F1F",
      large: "#404040",
    },
    background: {
      normal: "#F5F5F5",
      large: "#F5F5F5",
    },
    border: {
      normal: "#DDDDDD",
      large: "#DDDDDD",
    },
  },
  dark: {
    foreground: {
      normal: "#E1E1E1",
      large: "#CCCCCC",
    },
    background: {
      normal: "#121212",
      large: "#121212",
    },
    border: {
      normal: "#404040",
      large: "#404040",
    },
  },
} as const;

export const SYSTEM_GRAY_COLORS: Record<
  "ios" | "android",
  Record<ColorScheme, Record<SystemPropertyContext, { normal: string; large: string }>>
> = {
  ios: IOS_SYSTEM_GRAY_COLORS,
  android: ANDROID_SYSTEM_GRAY_COLORS,
};
