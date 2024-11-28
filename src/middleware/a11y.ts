import { NitroAccessibilityModule } from "../modules/Accessibility";
import { NitroDeviceModule } from "../modules/Device";
import type { ColorScheme } from "../specs/Device.nitro";
import type { AccessibilitySettings } from "../types/a11y";
import { convertToGrayscale, getColorContext } from "../util/color";

/**
 * applyA11yOverrides - apply accessibility settings to styles as an override
 *
 * @param styles - styles to apply accessibility overrides to
 * @param settings - accessibility settings
 * @param colorScheme - color scheme
 */
export function applyA11yOverrides<T extends Record<string, unknown>>(styles: T): T {
  const settings = NitroAccessibilityModule.getAllSettings();
  const deviceColorScheme = NitroDeviceModule.getColorScheme();

  const result = { ...styles };

  const colorScheme =
    deviceColorScheme === "unspecified" ? "light" : (deviceColorScheme ?? "light");

  for (const key in result) {
    const value = result[key];

    if (value && typeof value === "object") {
      result[key] = applyA11yOverrides(value as Record<string, unknown>) as T[Extract<
        keyof T,
        string
      >];
      continue;
    }

    if (key === "fontWeight" && settings.isBoldTextEnabled) {
      result[key] = "bold" as T[Extract<keyof T, string>];
    }

    if (key === "opacity" && settings.isReduceTransparencyEnabled) {
      result[key] = Math.min(1, (value as number) + 0.3) as T[Extract<keyof T, string>];
    }

    if ((key.includes("duration") || key.includes("animation")) && settings.isReduceMotionEnabled) {
      result[key] = 0 as T[Extract<keyof T, string>];
    }

    if (key.toLowerCase().includes("color") && settings.isGrayscaleEnabled) {
      const context = getColorContext(key) ?? undefined;
      const fontSize = key.includes("fontSize") && typeof value === "number" ? value : undefined;
      result[key] = convertToGrayscale(
        value as string,
        colorScheme,
        context,
        fontSize
      ) as T[Extract<keyof T, string>];
    }
  }

  return result;
}
