import type { HybridObject } from "react-native-nitro-modules";

export interface AccessibilitySettings {
  readonly isReduceMotionEnabled: boolean | null;
  readonly isReduceTransparencyEnabled: boolean | null;
  readonly isDifferentiateWithoutColorEnabled: boolean | null;
  readonly isInvertColorsEnabled: boolean | null;
  readonly isShowButtonShapesEnabled: boolean | null;
  readonly isBoldTextEnabled: boolean | null;
  readonly isVoiceOverEnabled: boolean | null;
  readonly isSwitchControlEnabled: boolean | null;
  readonly isVideoAutoplayEnabled: boolean | null;
  readonly isClosedCaptioningEnabled: boolean | null;
  readonly prefersCrossFadeTransitions: boolean | null;
  readonly isGrayscaleEnabled: boolean | null;
  readonly isDarkerSystemColorsEnabled: boolean | null;
  readonly isMonoAudioEnabled: boolean | null;
  readonly isShakeToUndoEnabled: boolean | null;
  readonly isSpeakScreenEnabled: boolean | null;
  readonly isSpeakSelectionEnabled: boolean | null;
  readonly isOnOffSwitchLabelsEnabled: boolean | null;
}

export interface NitroAccessibilityModule
  extends HybridObject<{ ios: "swift"; android: "kotlin" }> {
  removeListeners(): void;

  getAllSettings(): AccessibilitySettings;

  getIsReduceMotionEnabled(): boolean | null;
  addReduceMotionListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsReduceTransparencyEnabled(): boolean | null;
  addReduceTransparencyListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsDifferentiateWithoutColorEnabled(): boolean | null;
  addDifferentiateWithoutColorListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsInvertColorsEnabled(): boolean | null;
  addInvertColorsListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsShowButtonShapesEnabled(): boolean | null;
  addShowButtonShapesListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsBoldTextEnabled(): boolean | null;
  addBoldTextListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsVoiceOverEnabled(): boolean | null;
  addVoiceOverListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsSwitchControlEnabled(): boolean | null;
  addSwitchControlListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsVideoAutoplayEnabled(): boolean | null;
  addVideoAutoplayListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsClosedCaptioningEnabled(): boolean | null;
  addClosedCaptioningListener(onChanged: (isEnabled: boolean | null) => void): void;

  getPrefersCrossFadeTransitionsEnabled(): boolean | null;
  addPrefersCrossFadeTransitionsListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsGrayscaleEnabled(): boolean | null;
  addGrayscaleListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsDarkerSystemColorsEnabled(): boolean | null;
  addDarkerSystemColorsListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsMonoAudioEnabled(): boolean | null;
  addMonoAudioListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsShakeToUndoEnabled(): boolean | null;
  addShakeToUndoListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsSpeakScreenEnabled(): boolean | null;
  addSpeakScreenListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsSpeakSelectionEnabled(): boolean | null;
  addSpeakSelectionListener(onChanged: (isEnabled: boolean | null) => void): void;

  getIsOnOffSwitchLabelsEnabled(): boolean | null;
  addOnOffSwitchLabelsListener(onChanged: (isEnabled: boolean | null) => void): void;
}
