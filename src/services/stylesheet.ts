import { StyleSheet as RNStyleSheet } from "react-native";
import { applyA11yOverrides } from "../middleware/a11y";
import { scaleStyle } from "../middleware/scale";
import { NitroDeviceModule } from "../modules/Device";
import type { ColorScheme } from "../specs/Device.nitro";
import { themes as defaultThemes } from "../theme";
import type { Style, Theme } from "../types/theme";

export const StyleSheet = {
  themes: defaultThemes,
  init(themeConfig?: Theme | Record<Exclude<ColorScheme, "unspecified">, Theme>): void {
    if (!themeConfig) {
      StyleSheet.themes = defaultThemes;
      return;
    }

    const hasMultipleThemes = Object.keys(themeConfig).length > 1;

    if (hasMultipleThemes) {
      if (!("light" in themeConfig) || !("dark" in themeConfig)) {
        console.warn(
          "Multiple themes provided, but missing 'light' or 'dark' theme. Defaulting to light theme."
        );
        StyleSheet.themes = defaultThemes;

        return;
      }

      StyleSheet.themes = themeConfig as Record<Exclude<ColorScheme, "unspecified">, Theme>;
    } else {
      StyleSheet.themes = {
        light: themeConfig as Theme,
        dark: themeConfig as Theme,
      };
    }
  },
  create<T extends RNStyleSheet.NamedStyles<T>>(styles: T | Style<T>): T {
    const colorScheme = NitroDeviceModule.getColorScheme();
    const insets = NitroDeviceModule.getScreenInsets();

    const colorSchemeFallback = colorScheme === "unspecified" ? "light" : (colorScheme ?? "light");
    const currentTheme = StyleSheet.themes[colorSchemeFallback];

    const rawStyles = typeof styles === "function" ? styles(currentTheme, insets) : styles;

    const processedStyles = applyA11yOverrides(scaleStyle(rawStyles));

    return RNStyleSheet.create(processedStyles);
  },
};
