import { PixelRatio } from "react-native";
import { SCALE_BLACKLIST, SCALE_PROPERTIES } from "../constants/scale";
import { NitroDeviceModule } from "../modules/Device";
import { scale } from "../util/scale";

/**
 * scaleStyle - scale a style object based on the dimensions
 *
 * @param styles - the styles to scale
 * @param dimensions - the dimensions to scale the styles by
 */
export function scaleStyle<T extends Record<string, unknown>>(styles: T): T {
  const result = {} as T;

  for (const key in styles) {
    const value = styles[key];

    if (value && typeof value === "object") {
      result[key] = scaleStyle(value as Record<string, unknown>) as T[Extract<keyof T, string>];
    } else if (typeof value === "number") {
      result[key] = scaleStyleValue(key, value) as T[Extract<keyof T, string>];
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * scaleStyleValue - scale a style value based on the key and dimensions
 *
 * @param key - the style key to scale
 * @param value - the style value to scale
 */
function scaleStyleValue(key: string, value: number): number {
  const fontScale = NitroDeviceModule.getFontScale();

  if (SCALE_BLACKLIST.has(key) || value <= 1) return value;

  let scaledValue = value;

  if (SCALE_PROPERTIES.width.has(key)) {
    scaledValue = scale.horizontal(value);
  } else if (SCALE_PROPERTIES.height.has(key)) {
    scaledValue = scale.vertical(value);
  } else if (SCALE_PROPERTIES.aspect.has(key)) {
    scaledValue = scale.aspect(value);
  } else if (key === "fontSize") {
    scaledValue = value * (fontScale ?? PixelRatio.getFontScale());
  }

  return scaledValue;
}
