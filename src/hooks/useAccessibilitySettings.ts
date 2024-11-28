import { useEffect, useState } from "react";
import { NitroAccessibilityModule } from "../modules/Accessibility";
import type { AccessibilitySettings } from "../types/a11y";

export function useAccessibilitySettings() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    isReduceMotionEnabled: NitroAccessibilityModule.getIsReduceMotionEnabled(),
    isReduceTransparencyEnabled: NitroAccessibilityModule.getIsReduceTransparencyEnabled(),
    isGrayscaleEnabled: NitroAccessibilityModule.getIsGrayscaleEnabled(),
    isBoldTextEnabled: NitroAccessibilityModule.getIsBoldTextEnabled(),
    isVoiceOverEnabled: NitroAccessibilityModule.getIsVoiceOverEnabled(),
    isSwitchControlEnabled: NitroAccessibilityModule.getIsSwitchControlEnabled(),
    isVideoAutoplayEnabled: NitroAccessibilityModule.getIsVideoAutoplayEnabled(),
    isClosedCaptioningEnabled: NitroAccessibilityModule.getIsClosedCaptioningEnabled(),
    isDarkerSystemColorsEnabled: NitroAccessibilityModule.getIsDarkerSystemColorsEnabled(),
    isMonoAudioEnabled: NitroAccessibilityModule.getIsMonoAudioEnabled(),
    isShakeToUndoEnabled: NitroAccessibilityModule.getIsShakeToUndoEnabled(),
    isDifferentiateWithoutColorEnabled:
      NitroAccessibilityModule.getIsDifferentiateWithoutColorEnabled(),
    isInvertColorsEnabled: NitroAccessibilityModule.getIsInvertColorsEnabled(),
    isShowButtonShapesEnabled: NitroAccessibilityModule.getIsShowButtonShapesEnabled(),
    prefersCrossFadeTransitionsEnabled:
      NitroAccessibilityModule.getPrefersCrossFadeTransitionsEnabled(),
    isSpeakScreenEnabled: NitroAccessibilityModule.getIsSpeakScreenEnabled(),
    isSpeakSelectionEnabled: NitroAccessibilityModule.getIsSpeakSelectionEnabled(),
    isOnOffSwitchLabelsEnabled: NitroAccessibilityModule.getIsOnOffSwitchLabelsEnabled(),
  });

  useEffect(() => {
    NitroAccessibilityModule.addReduceMotionListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isReduceMotionEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addReduceTransparencyListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isReduceTransparencyEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addGrayscaleListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isGrayscaleEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addBoldTextListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isBoldTextEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addVoiceOverListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isVoiceOverEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addSwitchControlListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isSwitchControlEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addVideoAutoplayListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isVideoAutoplayEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addClosedCaptioningListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isClosedCaptioningEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addDarkerSystemColorsListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isDarkerSystemColorsEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addMonoAudioListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isMonoAudioEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addShakeToUndoListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isShakeToUndoEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addDifferentiateWithoutColorListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isDifferentiateWithoutColorEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addInvertColorsListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isInvertColorsEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addShowButtonShapesListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isShowButtonShapesEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addPrefersCrossFadeTransitionsListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        prefersCrossFadeTransitionsEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addSpeakScreenListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isSpeakScreenEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addSpeakSelectionListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isSpeakSelectionEnabled: isEnabled,
      }))
    );
    NitroAccessibilityModule.addOnOffSwitchLabelsListener((isEnabled) =>
      setSettings((prevSettings) => ({
        ...prevSettings,
        isOnOffSwitchLabelsEnabled: isEnabled,
      }))
    );

    return (): void => NitroAccessibilityModule.removeListeners();
  }, []);

  return settings;
}
