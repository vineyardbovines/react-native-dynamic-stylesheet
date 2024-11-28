import Foundation
import NitroModules
import Combine
import UIKit

class HybridNitroAccessibilityModule : HybridNitroAccessibilityModuleSpec {
    private var listeners: [(Any) -> Void] = []
    private var cancellables = Set<AnyCancellable>()

    public var hybridContext = margelo.nitro.HybridContext()

    public var memorySize: Int {
        return getSizeOf(self)
    }

    public func removeListeners() throws -> Void {
        cancellables.forEach { $0.cancel() }
        cancellables.removeAll()
    }

    public func getAllSettings() throws -> AccessibilitySettings {
        func getAllSettingsFn() -> AccessibilitySettings {
            return AccessibilitySettings(
                isReduceMotionEnabled: try getIsReduceMotionEnabled(),
                isReduceTransparencyEnabled: try getIsReduceTransparencyEnabled(),
                isDifferentiateWithoutColorEnabled: try getIsDifferentiateWithoutColorEnabled(),
                isInvertColorsEnabled: try getIsInvertColorsEnabled(),
                isShowButtonShapesEnabled: try getIsShowButtonShapesEnabled(),
                isBoldTextEnabled: try getIsBoldTextEnabled(),
                isVoiceOverEnabled: try getIsVoiceOverEnabled(),
                isSwitchControlEnabled: try getIsSwitchControlEnabled(),
                isVideoAutoplayEnabled: try getIsVideoAutoplayEnabled(),
                isClosedCaptioningEnabled: try getIsClosedCaptioningEnabled(),
                prefersCrossFadeTransitionsEnabled: try getPrefersCrossFadeTransitionsEnabled(),
                isGrayscaleEnabled: try getIsGrayscaleEnabled(),
                isDarkerSystemColorsEnabled: try getIsDarkerSystemColorsEnabled(),
                isMonoAudioEnabled: try getIsMonoAudioEnabled(),
                isShakeToUndoEnabled: try getIsShakeToUndoEnabled(),
                isSpeakScreenEnabled: try getIsSpeakScreenEnabled(),
                isSpeakSelectionEnabled: try getIsSpeakSelectionEnabled(),
                isOnOffSwitchLabelsEnabled: try getIsOnOffSwitchLabelsEnabled()
            )
        }

        if Thread.isMainThread {
            return getAllSettingsFn()
        }

        return DispatchQueue.main.sync {
            return getAllSettingsFn()
        }
    }

    public func getIsReduceMotionEnabled() throws -> Bool? {
        func getIsReduceMotionEnabledFn() -> Bool? {
            if #available(iOS 13.0, *) {
                return UIAccessibility.isReduceMotionEnabled
            } else {
                return nil
            }
        }

        if Thread.isMainThread {
            return getIsReduceMotionEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsReduceMotionEnabledFn()
        }
    }
    public func addReduceMotionListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        if #available(iOS 13.0, *) {
            NotificationCenter.default.publisher(for: UIAccessibility.reduceMotionStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsReduceMotionEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting reduce motion status: \(error)")
                }
            }
            .store(in: &cancellables)
        } else {
            print("reduceMotion is not available on this iOS version")
        }
    }

    public func getIsReduceTransparencyEnabled() throws -> Bool? {
        func getIsReduceTransparencyEnabledFn() -> Bool? {
            if #available(iOS 13.0, *) {
                return UIAccessibility.isReduceTransparencyEnabled
            } else {
                return nil
            }
        }

        if Thread.isMainThread {
            return getIsReduceTransparencyEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsReduceTransparencyEnabledFn()
        }
    }
    public func addReduceTransparencyListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        NotificationCenter.default.publisher(for: UIAccessibility.reduceTransparencyStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsReduceTransparencyEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting reduce transparency status: \(error)")
                }
            }
            .store(in: &cancellables)
    }

    public func getIsDifferentiateWithoutColorEnabled() throws -> Bool? {
        func getIsDifferentiateWithoutColorEnabledFn() -> Bool? {
            if #available(iOS 13.0, *) {
                return UIAccessibility.isDifferentiateWithoutColorEnabled
            } else {
                return nil
            }
        }

        if Thread.isMainThread {
            return getIsDifferentiateWithoutColorEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsDifferentiateWithoutColorEnabledFn()
        }
    }
    public func addDifferentiateWithoutColorListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        if #available(iOS 13.0, *) {
            NotificationCenter.default.publisher(for: UIAccessibility.differentiateWithoutColorDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsDifferentiateWithoutColorEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting differentiate without color status: \(error)")
                }
            }
            .store(in: &cancellables)
        } else {
            print("differentiateWithoutColor is not available on this iOS version")
        }
    }

    public func getIsInvertColorsEnabled() throws -> Bool? {
        func getIsInvertColorsEnabledFn() -> Bool? {
            return UIAccessibility.isInvertColorsEnabled
        }

        if Thread.isMainThread {
            return getIsInvertColorsEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsInvertColorsEnabledFn()
        }
    }
    public func addInvertColorsListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        NotificationCenter.default.publisher(for: UIAccessibility.invertColorsStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsInvertColorsEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting invert colors status: \(error)")
                }
            }
            .store(in: &cancellables)
    }

    public func getIsShowButtonShapesEnabled() throws -> Bool? {
        func getIsShowButtonShapesEnabledFn() -> Bool? {
            return UIAccessibility.buttonShapesEnabled
        }

        if Thread.isMainThread {
            return getIsShowButtonShapesEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsShowButtonShapesEnabledFn()
        }
    }
    public func addShowButtonShapesListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        NotificationCenter.default.publisher(for: UIAccessibility.buttonShapesEnabledStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsShowButtonShapesEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting show button shapes status: \(error)")
                }
            }
            .store(in: &cancellables)
    }

    public func getIsBoldTextEnabled() throws -> Bool? {
        func getIsBoldTextEnabledFn() -> Bool? {
            return UIAccessibility.isBoldTextEnabled
        }

        if Thread.isMainThread {
            return getIsBoldTextEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsBoldTextEnabledFn()
        }
    }
    public func addBoldTextListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        NotificationCenter.default.publisher(for: UIAccessibility.boldTextStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsBoldTextEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting bold text status: \(error)")
                }
            }
            .store(in: &cancellables)
    }

    public func getIsVoiceOverEnabled() throws -> Bool? {
        func getIsVoiceOverEnabledFn() -> Bool? {
            return UIAccessibility.isVoiceOverRunning
        }

        if Thread.isMainThread {
            return getIsVoiceOverEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsVoiceOverEnabledFn()
        }
    }
    public func addVoiceOverListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        NotificationCenter.default.publisher(for: UIAccessibility.voiceOverStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsVoiceOverEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting voice over status: \(error)")
                }
            }
            .store(in: &cancellables)
    }

    public func getIsSwitchControlEnabled() throws -> Bool? {
        func getIsSwitchControlEnabledFn() -> Bool? {
            return UIAccessibility.isSwitchControlRunning
        }

        if Thread.isMainThread {
            return getIsSwitchControlEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsSwitchControlEnabledFn()
        }
    }
    public func addSwitchControlListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        NotificationCenter.default.publisher(for: UIAccessibility.switchControlStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsSwitchControlEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting switch control status: \(error)")
                }
            }
            .store(in: &cancellables)
    }

    public func getIsVideoAutoplayEnabled() throws -> Bool? {
        func getIsVideoAutoplayEnabledFn() -> Bool? {
            if #available(iOS 13.0, *) {
                return UIAccessibility.isVideoAutoplayEnabled
            } else {
                return nil
            }
        }
        if Thread.isMainThread {
            return getIsVideoAutoplayEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsVideoAutoplayEnabledFn()
        }
    }
    public func addVideoAutoplayListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        if #available(iOS 13.0, *) {
            NotificationCenter.default.publisher(for: UIAccessibility.videoAutoplayStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsVideoAutoplayEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting video autoplay status: \(error)")
                }
            }
            .store(in: &cancellables)
        } else {
            print("videoAutoplay is not available on this iOS version")
        }
    }

    public func getIsClosedCaptioningEnabled() throws -> Bool? {
        func getIsClosedCaptioningEnabledFn() -> Bool? {
            return UIAccessibility.isClosedCaptioningEnabled
        }
        if Thread.isMainThread {
            return getIsClosedCaptioningEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsClosedCaptioningEnabledFn()
        }
    }
    public func addClosedCaptioningListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        NotificationCenter.default.publisher(for: UIAccessibility.closedCaptioningStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsClosedCaptioningEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting closed captioning status: \(error)")
                }
            }
            .store(in: &cancellables)
    }

    public func getPrefersCrossFadeTransitionsEnabled() throws -> Bool? {
        func getPrefersCrossFadeTransitionsEnabledFn() -> Bool? {
            if #available(iOS 14.0, *) {
                return UIAccessibility.prefersCrossFadeTransitions
            } else {
                return nil
            }
        }
        if Thread.isMainThread {
            return getPrefersCrossFadeTransitionsEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getPrefersCrossFadeTransitionsEnabledFn()
        }
    }
    public func addPrefersCrossFadeTransitionsListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        if #available(iOS 14.0, *) {
            NotificationCenter.default.publisher(for: UIAccessibility.prefersCrossFadeTransitionsStatusDidChange)
            .sink { _ in
                do {
                    let isEnabled = try self.getPrefersCrossFadeTransitionsEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting prefers cross fade transitions status: \(error)")
                }
            }
            .store(in: &cancellables)
        } else {
            print("prefersCrossFadeTransitions is not available on this iOS version")
        }
    }

    public func getIsGrayscaleEnabled() throws -> Bool? {
        func getIsGrayscaleEnabledFn() -> Bool? {
            return UIAccessibility.isGrayscaleEnabled
        }
        if Thread.isMainThread {
            return getIsGrayscaleEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsGrayscaleEnabledFn()
        }
    }
    public func addGrayscaleListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        NotificationCenter.default.publisher(for: UIAccessibility.grayscaleStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsGrayscaleEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting grayscale status: \(error)")
                }
            }
            .store(in: &cancellables)
    }

    public func getIsDarkerSystemColorsEnabled() throws -> Bool? {
        func getIsDarkerSystemColorsEnabledFn() -> Bool? {
            if #available(iOS 13.0, *) {
                return UIAccessibility.isDarkerSystemColorsEnabled
            } else {
                return nil
            }
        }
        if Thread.isMainThread {
            return getIsDarkerSystemColorsEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsDarkerSystemColorsEnabledFn()
        }
    }
    public func addDarkerSystemColorsListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        if #available(iOS 13.0, *) {
            NotificationCenter.default.publisher(for: UIAccessibility.darkerSystemColorsStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsDarkerSystemColorsEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting darker system colors status: \(error)")
                }
            }
            .store(in: &cancellables)
        } else {
            print("darkerSystemColors is not available on this iOS version")
        }
    }

    public func getIsMonoAudioEnabled() throws -> Bool? {
        func getIsMonoAudioEnabledFn() -> Bool? {
            return UIAccessibility.isMonoAudioEnabled
        }
        if Thread.isMainThread {
            return getIsMonoAudioEnabledFn()
        }

        return DispatchQueue.main.sync {
            return getIsMonoAudioEnabledFn()
        }
    }
    public func addMonoAudioListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        NotificationCenter.default.publisher(for: UIAccessibility.monoAudioStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsMonoAudioEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting mono audio status: \(error)")
                }
            }
            .store(in: &cancellables)
    }

    public func getIsShakeToUndoEnabled() throws -> Bool? {
        func getIsShakeToUndoEnabledFn() -> Bool? {
            return UIAccessibility.isShakeToUndoEnabled
        }
        if Thread.isMainThread {
            return getIsShakeToUndoEnabledFn()
        }
        return DispatchQueue.main.sync {
            return getIsShakeToUndoEnabledFn()
        }
    }
    public func addShakeToUndoListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        NotificationCenter.default.publisher(for: UIAccessibility.shakeToUndoDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsShakeToUndoEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting shake to undo status: \(error)")
                }
            }
            .store(in: &cancellables)
    }

    public func getIsSpeakScreenEnabled() throws -> Bool? {
        func getIsSpeakScreenEnabledFn() -> Bool? {
            if #available(iOS 13.0, *) {
                return UIAccessibility.isSpeakScreenEnabled
            } else {
                return nil
            }
        }
        if Thread.isMainThread {
            return getIsSpeakScreenEnabledFn()
        }
        return DispatchQueue.main.sync {
            return getIsSpeakScreenEnabledFn()
        }
    }
    public func addSpeakScreenListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        if #available(iOS 13.0, *) {
            NotificationCenter.default.publisher(for: UIAccessibility.speakScreenStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsSpeakScreenEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting speak screen status: \(error)")
                }
            }
            .store(in: &cancellables)
        } else {
            print("speakScreen is not available on this iOS version")
        }
    }

    public func getIsSpeakSelectionEnabled() throws -> Bool? {
        func getIsSpeakSelectionEnabledFn() -> Bool? {
            if #available(iOS 13.0, *) {
                return UIAccessibility.isSpeakSelectionEnabled
            } else {
                return nil
            }
        }
        if Thread.isMainThread {
            return getIsSpeakSelectionEnabledFn()
        }
        return DispatchQueue.main.sync {
            return getIsSpeakSelectionEnabledFn()
        }
    }
    public func addSpeakSelectionListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        if #available(iOS 13.0, *) {
            NotificationCenter.default.publisher(for: UIAccessibility.speakSelectionStatusDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsSpeakSelectionEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting speak selection status: \(error)")
                }
            }
            .store(in: &cancellables)
        } else {
            print("speakSelection is not available on this iOS version")
        }
    }

    public func getIsOnOffSwitchLabelsEnabled() throws -> Bool? {
        func getIsOnOffSwitchLabelsEnabledFn() -> Bool? {
            if #available(iOS 13.0, *) {
                return UIAccessibility.isOnOffSwitchLabelsEnabled
            } else {
                return nil
            }
        }
        if Thread.isMainThread {
            return getIsOnOffSwitchLabelsEnabledFn()
        }
        return DispatchQueue.main.sync {
            return getIsOnOffSwitchLabelsEnabledFn()
        }
    }
    public func addOnOffSwitchLabelsListener(onChanged: @escaping ((_ isEnabled: Bool?) -> Void)) throws -> Void {
        if #available(iOS 13.0, *) {
            NotificationCenter.default.publisher(for: UIAccessibility.onOffSwitchLabelsDidChangeNotification)
            .sink { _ in
                do {
                    let isEnabled = try self.getIsOnOffSwitchLabelsEnabled()
                    onChanged(isEnabled)
                } catch {
                    print("Error getting on off switch labels status: \(error)")
                }
            }
            .store(in: &cancellables)
        } else {
            print("onOffSwitchLabels is not available on this iOS version")
        }
    }
}
