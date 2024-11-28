import { Platform, processColor } from "react-native";
import {
  COLOR_PROPERTIES,
  CONTRAST_RATIOS,
  type ColorInfo,
  type ColorScheme,
  GRAY_RANGES,
  type PropertyContext,
  SYSTEM_GRAY_COLORS,
} from "../constants/color";
import { themes } from "../theme";

/**
 * convertToGrayscale - convert a color to grayscale
 *
 * @param color - the color to convert
 * @param colorScheme - the color scheme to convert to
 * @param context - the context of the color property
 * @param fontSize - the font size of the text
 */
export function convertToGrayscale(
  color: string,
  colorScheme: "light" | "dark",
  context: keyof typeof COLOR_PROPERTIES = "foreground",
  fontSize?: number
): string {
  const themeBackgroundColor = parseColor(themes[colorScheme].colors.bg) ?? {
    r: colorScheme === "light" ? 255 : 0,
    g: colorScheme === "light" ? 255 : 0,
    b: colorScheme === "light" ? 255 : 0,
  };

  let currentBackground: ColorInfo = themeBackgroundColor;

  if (!color || color === "transparent") return color;

  if (typeof processColor(color) !== "number") {
    const systemColor = getContrastSafeSystemColor(colorScheme, context, fontSize);

    if (context === "background") {
      const luminance = getSystemColorLuminance(systemColor);
      if (luminance !== null) {
        const gray = Math.round(luminance * 255);
        currentBackground = { r: gray, g: gray, b: gray };
      }
    }

    return systemColor;
  }

  const colorInfo = parseColor(color);
  if (!colorInfo) return color;

  let gray = Math.round(0.2126 * colorInfo.r + 0.7152 * colorInfo.g + 0.0722 * colorInfo.b);

  gray = getThemeSafeGray(gray, colorScheme, context);

  if (context === "foreground") {
    gray = adjustGrayForContrast(gray, currentBackground, context, fontSize);
  }

  if (context === "background") {
    currentBackground = { r: gray, g: gray, b: gray };
  }

  if (colorInfo.a !== undefined && colorInfo.a < 1) {
    return `rgba(${gray}, ${gray}, ${gray}, ${colorInfo.a})`;
  }

  return `rgb(${gray}, ${gray}, ${gray})`;
}

/**
 * getColorContext - get the style context of a color property
 *
 * @param property - the color property to get the context of
 */
export function getColorContext(
  property: string
): "foreground" | "background" | "border" | "shadow" | "tint" | null {
  for (const [context, properties] of Object.entries(COLOR_PROPERTIES)) {
    if (properties.has(property)) {
      return context as keyof typeof COLOR_PROPERTIES;
    }
  }
  return null;
}

/**
 * getThemeSafeGray - get a gray value that is within the theme's safe range
 *
 * @param gray - the gray value to check
 * @param colorScheme - the color scheme to check against
 * @param context - the context of the color property
 */
function getThemeSafeGray(
  gray: number,
  colorScheme: "light" | "dark",
  context: PropertyContext
): number {
  const range = GRAY_RANGES[colorScheme][context];

  if (gray >= range.min && gray <= range.max) {
    return gray;
  }

  return gray < range.min ? range.min : range.max;
}

/**
 * adjustGrayForContrast - adjust a gray value to meet contrast requirements
 *
 * @param gray - the gray value to adjust
 * @param backgroundColor - the background color to adjust against
 * @param context - the context of the color property
 * @param fontSize - the font size of the text
 * @param level - the contrast level to meet
 */
function adjustGrayForContrast(
  gray: number,
  backgroundColor: ColorInfo,
  context: PropertyContext,
  fontSize = 16,
  level: "AA" | "AAA" = "AA"
): number {
  if (context !== "foreground") return gray;

  const isLargeText = fontSize >= 18 || (fontSize >= 14 && Platform.OS === "ios");
  const requiredContrast = CONTRAST_RATIOS[isLargeText ? "large" : "normal"][level];

  const foregroundColor: ColorInfo = { r: gray, g: gray, b: gray };
  let contrast = getContrastRatio(foregroundColor, backgroundColor);

  if (contrast >= requiredContrast) return gray;

  const bgLuminance = getLuminance(backgroundColor);
  const shouldGoLighter = bgLuminance < 0.5;

  let adjustedGray = gray;
  while (contrast < requiredContrast && adjustedGray >= 0 && adjustedGray <= 255) {
    adjustedGray += shouldGoLighter ? 1 : -1;
    foregroundColor.r = foregroundColor.g = foregroundColor.b = adjustedGray;
    contrast = getContrastRatio(foregroundColor, backgroundColor);
  }

  return adjustedGray;
}

/**
 * parseColor - parse a color string or number into an object
 *
 * @param color - the color to parse
 */
export function parseColor(color: string | number): ColorInfo | null {
  if (typeof color === "number") {
    return {
      r: (color & 0xff0000) >> 16,
      g: (color & 0xff00) >> 8,
      b: color & 0xff,
      a: ((color & 0xff000000) >>> 24) / 255,
    };
  }

  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const hasAlpha = hex.length === 8;

    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
      ...(hasAlpha && { a: Number.parseInt(hex.slice(6, 8), 16) / 255 }),
    };
  }

  if (color.startsWith("rgb")) {
    const matches = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
    if (!matches) return null;

    const [, r, g, b, a] = matches;
    return {
      r: Number(r),
      g: Number(g),
      b: Number(b),
      ...(a !== undefined && { a: Number(a) }),
    };
  }

  const processedColor = processColor(color);
  if (typeof processedColor === "number") {
    return parseColor(processedColor);
  }

  return null;
}

/**
 * getLuminance - get the relative luminance of a color
 *
 * @param color - the color to get the luminance of
 */
export function getLuminance(color: ColorInfo): number {
  const rsRGB = color.r / 255;
  const gsRGB = color.g / 255;
  const bsRGB = color.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : rsRGB + 0.055 / 1.055 ** 2.4;
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : gsRGB + 0.055 / 1.055 ** 2.4;
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : bsRGB + 0.055 / 1.055 ** 2.4;

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * getSystemColorLuminance - get the luminance of a system color
 *
 * @param color - the system color to get the luminance of
 */
export function getSystemColorLuminance(color: string): number | null {
  const systemGrayLuminance = {
    systemGray: 0.5,
    systemGray2: 0.45,
    systemGray3: 0.4,
    systemGray4: 0.35,
    systemGray5: 0.3,
    systemGray6: 0.25,
  } as const;

  return systemGrayLuminance[color as keyof typeof systemGrayLuminance] ?? null;
}

/**
 * getContrastRatio - get the contrast ratio between two colors
 *
 * @param color1 - the first color to compare
 * @param color2 - the second color to compare
 */
export function getContrastRatio(color1: ColorInfo, color2: ColorInfo): number {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * getContrastSafeSystemColor - get a system color that meets contrast requirements
 *
 * @param colorScheme - the color scheme to get the system color for
 * @param context - the context of the color property
 * @param fontSize - the font size of the text
 */
export function getContrastSafeSystemColor(
  colorScheme: ColorScheme,
  context: PropertyContext,
  fontSize?: number
): string {
  const PLATFORM_COLORS =
    Platform.OS === "ios" ? SYSTEM_GRAY_COLORS.ios : SYSTEM_GRAY_COLORS.android;

  const isLargeText = fontSize
    ? fontSize >= 18 || (fontSize >= 14 && Platform.OS === "ios")
    : false;

  const size = isLargeText ? "large" : "normal";

  return (
    // @ts-expect-error
    PLATFORM_COLORS[colorScheme][context]?.[size] || PLATFORM_COLORS[colorScheme].foreground[size]
  );
}
