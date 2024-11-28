import { NitroDeviceModule } from "../modules/Device";

export const dimensions = {
  width: NitroDeviceModule.getScreenDimensions().width,
  height: NitroDeviceModule.getScreenDimensions().height,
  scale: NitroDeviceModule.getDisplayScale(),
  fontScale: NitroDeviceModule.getFontScale(),
};

export const scale = {
  horizontal(size: number, width: number = dimensions.width): number {
    return (width / 375) * size;
  },
  vertical(size: number, height: number = dimensions.height): number {
    return (height / 812) * size;
  },
  aspect(size: number): number {
    const ratio = dimensions.height / dimensions.width;
    const widthScale = dimensions.width / 375;
    const ratioScale = ratio / 2.164;

    const blendedScale = (widthScale * 0.5 + ratioScale * 0.5) / (0.5 + 0.5);

    const normalizedScale = Math.min(Math.max(blendedScale, 0.85), 1.15);

    return size * normalizedScale;
  },
};
