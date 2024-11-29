import { NitroModules } from "react-native-nitro-modules";
import type { NitroAccessibilityModule as NitroAccessibilityModuleSpec } from "../specs/Accessibility.nitro";

export const NitroAccessibilityModule =
  NitroModules.createHybridObject<NitroAccessibilityModuleSpec>("NitroAccessibility");
