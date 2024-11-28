import type { ColorScheme, ScreenInsets } from "../specs/Device.nitro";

type BaseColors = {
  bg: string;
  fg: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
};

export interface Theme {
  spacing: Record<string, number>;
  radius: Record<string, number>;
  fonts: Record<string, number>;
  fontSizes: Record<string, number>;
  colors: BaseColors & {
    [key: string]: string;
  };
  [key: string]: any;
}

export type Style<T> = (theme: Theme, insets: ScreenInsets) => T;

export type ThemeConfig = Record<Exclude<ColorScheme, "unspecified">, Theme>;
