import { NitroModules } from "react-native-nitro-modules";
import type { NitroDeviceModule as NitroDeviceModuleSpec } from "../specs/Device.nitro";

export const NitroDeviceModule =
  NitroModules.createHybridObject<NitroDeviceModuleSpec>("NitroDevice");
