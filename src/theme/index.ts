import type { ColorScheme } from "../constants/color";
import type { Theme, ThemeConfig } from "../types/theme";

const baseTheme = {
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  radius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  fonts: {
    light: "InterTight_300Light",
    regular: "InterTight_400Regular",
    medium: "InterTight_500Medium",
    semibold: "InterTight_600SemiBold",
    bold: "InterTight_700Bold",
  },
  fontSizes: {
    display: 48,
    h1: 36,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
    p1: 18,
    p2: 12,
    p3: 10,
    body: 18,
  },
} as const;

const colors = {
  light1: "#d6dbdf",
  light2: "#95a5a6",
  neutral: "#566573",
  dark1: "#34495e",
  dark2: "#2e4053",
  white: "#fff",
  black: "#000",
  green: "#0ba95b",
  yellow: "#fcba28",
  red: "#ed203d",
  blue: "#12b5e5",
  purple: "#9d7dce",
};

export const themes: ThemeConfig = {
  light: {
    ...baseTheme,
    colors: {
      ...colors,
      bg: colors.white,
      fg: colors.black,
      success: colors.green,
      warning: colors.yellow,
      danger: colors.red,
      info: colors.blue,
    },
  },
  dark: {
    ...baseTheme,
    colors: {
      ...colors,
      bg: colors.black,
      fg: colors.white,
      success: colors.green,
      warning: colors.yellow,
      danger: colors.red,
      info: colors.blue,
    },
  },
};
