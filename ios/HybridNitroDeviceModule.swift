import Foundation
import NitroModules
import Combine
import UIKit

class HybridNitroDeviceModule : HybridNitroDeviceModuleSpec {
    private var traitsListener: ((Any) -> Void)?
    private var cancellable: AnyCancellable?

    public var hybridContext = margelo.nitro.HybridContext()

    public var memorySize: Int {
        return getSizeOf(self)
    }

    public func getDeviceTraits() throws -> DeviceTraits {
        let colorScheme = try self.getColorScheme()
        let screenDimensions = try self.getScreenDimensions()
        let contentSizeCategory = self.getContentSizeCategory()
        let screenInsets = try self.getScreenInsets()
        let displayScale = try self.getDisplayScale()
        let fontScale = try self.getFontScale()
        let isRTL = try self.getIsRTL()
        let screenOrientation = self.getScreenOrientation()
        let pixelRatio = self.getPixelRatio()

        return DeviceTraits(
            colorScheme: colorScheme,
            screenDimensions: screenDimensions,
            contentSizeCategory: contentSizeCategory,
            screenInsets: screenInsets,
            displayScale: displayScale,
            fontScale: fontScale,
            isRTL: isRTL,
            screenOrientation: screenOrientation,
            pixelRatio: pixelRatio
        )
    }

    public func runHaptic(type: HapticTypes) throws {
        switch type {
        case .success, .warning, .error:
            let generator = UINotificationFeedbackGenerator()
            generator.prepare()
            generator.notificationOccurred(toNotificationFeedbackType(type: type))

        case .light, .medium, .heavy, .soft, .rigid:
            let generator = UIImpactFeedbackGenerator(style: toImpactFeedbackStyle(style: type))
            generator.prepare()
            generator.impactOccurred()

        case .select:
            let generator = UISelectionFeedbackGenerator()
            generator.prepare()
            generator.selectionChanged()
        }
    }

    private func toNotificationFeedbackType(type: HapticTypes) -> UINotificationFeedbackGenerator.FeedbackType {
        switch type {
        case .success: return .success
        case .warning: return .warning
        case .error: return .error
        default: return .success
        }
    }

    private func toImpactFeedbackStyle(style: HapticTypes) -> UIImpactFeedbackGenerator.FeedbackStyle {
        switch style {
        case .light: return .light
        case .medium: return .medium
        case .heavy: return .heavy
        case .soft: return .soft
        case .rigid: return .rigid
        default: return .medium
        }
    }

    public func getColorScheme() throws -> ColorScheme {
        let interfaceStyle = UIScreen.main.traitCollection.userInterfaceStyle

        switch interfaceStyle {
        case .dark:
            return ColorScheme.dark
        case .light:
            return ColorScheme.light
        case .unspecified:
            return ColorScheme.unspecified
        default:
            return ColorScheme.unspecified
        }
    }

    public func getDisplayScale() throws -> Double {
        func getDisplayScaleFn() -> Double {
            guard let window = self.getWindow() else {
                return 1
            }

            return window.screen.scale
        }

        if Thread.isMainThread {
            return getDisplayScaleFn()
        }

        return DispatchQueue.main.sync {
            return getDisplayScaleFn()
        }
    }

    public func getFontScale() throws -> Double {
        func getFontScaleFn() -> Double {
            let contentSizeCategory = UIApplication.shared.preferredContentSizeCategory
            let defaultMultiplier = 17.0

            switch contentSizeCategory {
            case .extraExtraExtraLarge:
                return 23.0 / defaultMultiplier
            case .extraExtraLarge:
                return 21.0 / defaultMultiplier
            case .extraLarge:
                return 19.0 / defaultMultiplier
            case .large:
                return 17.0 / defaultMultiplier
            case .medium:
                return 16.0 / defaultMultiplier
            case .small:
                return 15.0 / defaultMultiplier
            case .extraSmall:
                return 14.0 / defaultMultiplier
            case .accessibilityMedium:
                return 29.0 / defaultMultiplier
            case .accessibilityLarge:
                return 33.0 / defaultMultiplier
            case .accessibilityExtraLarge:
                return 40.0 / defaultMultiplier
            case .accessibilityExtraExtraLarge:
                return 47.0 / defaultMultiplier
            case .accessibilityExtraExtraExtraLarge:
                return 53.0 / defaultMultiplier
            default:
                return 1.0
            }
        }

        if Thread.isMainThread {
            return getFontScaleFn()
        }

        return DispatchQueue.main.sync {
            return getFontScaleFn()
        }
    }

    private func getScreenDimensionsFn() -> ScreenDimensions {
        let window = self.getWindow()

        guard let windowFrame = window?.frame else {
            return ScreenDimensions(width: 0, height: 0)
        }

        return ScreenDimensions(
            width: windowFrame.size.width,
            height: windowFrame.size.height
        )
    }

    public func getScreenDimensions() throws -> ScreenDimensions {
        if Thread.isMainThread {
            return self.getScreenDimensionsFn()
        }

        return DispatchQueue.main.sync {
            return self.getScreenDimensionsFn()
        }
    }

    public func getScreenOrientation() -> ScreenOrientation {
        let screenDimensions = self.getScreenDimensionsFn()

        if (screenDimensions.width > screenDimensions.height) {
            return ScreenOrientation.landscape
        }

        return ScreenOrientation.portrait
    }

    public func getContentSizeCategory() -> String {
        func getContentSizeCategoryFn() -> String {
            let contentSizeCategory = UIApplication.shared.preferredContentSizeCategory

            switch contentSizeCategory {
            case .extraExtraExtraLarge:
                return "xxxLarge"
            case .extraExtraLarge:
                return "xxLarge"
            case .extraLarge:
                return "xLarge"
            case .large:
                return "Large"
            case .medium:
                return "Medium"
            case .small:
                return "Small"
            case .extraSmall:
                return "xSmall"
            case .accessibilityMedium:
                return "accessibilityMedium"
            case .accessibilityLarge:
                return "accessibilityLarge"
            case .accessibilityExtraLarge:
                return "accessibilityExtraLarge"
            case .accessibilityExtraExtraLarge:
                return "accessibilityExtraExtraLarge"
            case .accessibilityExtraExtraExtraLarge:
                return "accessibilityExtraExtraExtraLarge"
            default:
                return "unspecified"
            }
        }

        if Thread.isMainThread {
            return getContentSizeCategoryFn()
        }

        return DispatchQueue.main.sync {
            return getContentSizeCategoryFn()
        }
    }

    public func getScreenInsets() throws -> ScreenInsets {
        func getInsetsFn() -> ScreenInsets {
            let window = self.getWindow()

            guard let insets = window?.safeAreaInsets else {
                return ScreenInsets(top: 0, left: 0, bottom: 0, right: 0)
            }

            return ScreenInsets(
                top: insets.top,
                left: insets.left,
                bottom: insets.bottom,
                right: insets.right
            )
        }

        if Thread.isMainThread {
            return getInsetsFn()
        }

        return DispatchQueue.main.sync {
            return getInsetsFn()
        }
    }

    public func getIsRTL() throws -> Bool {
        func getIsRTLFn() -> Bool {
            let hasForcedRtl = UserDefaults.standard.bool(forKey: "RCTI18nUtil_forceRTL")
            let isRtl = UIApplication.shared.userInterfaceLayoutDirection == .rightToLeft

            return hasForcedRtl || isRtl
        }

        if Thread.isMainThread {
            return getIsRTLFn()
        }

        return DispatchQueue.main.sync {
            return getIsRTLFn()
        }
    }

    public func getPixelRatio() -> Double {
        func getPixelRatioFn() -> Double {
            let window = self.getWindow()

            guard let window else {
                return 1;
            }

            return window.screen.scale
        }

        if Thread.isMainThread {
            return getPixelRatioFn()
        }

        return DispatchQueue.main.sync {
            return getPixelRatioFn()
        }
    }

    private func getWindow() -> UIWindow? {
        if #available(iOS 15.0, *) {
            guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                let window = windowScene.windows.first else {
                return nil
            }
            return window
        } else {
            return UIApplication.shared.windows.first
        }
    }
}
