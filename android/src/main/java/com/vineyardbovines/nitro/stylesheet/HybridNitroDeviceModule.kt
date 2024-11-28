package "com.vineyardbovines.nitro.stylesheet"

import android.util.Log
import androidx.annotation.Keep
import com.facebook.proguard.annotations.DoNotStrip
import com.margelo.nitro.core.AnyMap
import com.margelo.nitro.core.AnyValue
import com.margelo.nitro.core.ArrayBuffer
import com.margelo.nitro.core.Promise
import android.accessibilityservice.AccessibilityServiceInfo
import android.content.Context
import android.provider.Settings
import android.view.accessibility.AccessibilityManager
import androidx.core.content.ContextCompat
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

@Keep
@DoNotStrip
class HybridNitroDeviceModule: HybridNitroDeviceModuleSpec() {
    private val TAG = "HybridNitroDeviceModule"

    override val memorySize: Long
        get() = 0L

    override fun getDeviceTraits(): DeviceTraits = DeviceTraits(
        colorScheme = getColorScheme(),
        screenDimensions = getScreenDimensions(),
        contentSizeCategory = getContentSizeCategory(),
        screenInsets = getScreenInsets(),
        displayScale = getDisplayScale(),
        fontScale = getFontScale(),
        isRTL = getIsRTL(),
        screenOrientation = getScreenOrientation(),
        pixelRatio = getPixelRatio()
    )

    override fun runHaptic(type: HapticTypes) {
        val vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val vibratorManager = context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as VibratorManager
            vibratorManager.defaultVibrator
        } else {
            @Suppress("DEPRECATION")
            context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        }

        if (!vibrator.hasVibrator()) return

        when (type) {
            HapticTypes.SUCCESS, HapticTypes.WARNING, HapticTypes.ERROR -> {
                val duration = when (type) {
                    HapticTypes.SUCCESS -> 50L
                    HapticTypes.WARNING -> 100L
                    else -> 150L
                }
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    vibrator.vibrate(VibrationEffect.createOneShot(duration, VibrationEffect.DEFAULT_AMPLITUDE))
                } else {
                    @Suppress("DEPRECATION")
                    vibrator.vibrate(duration)
                }
            }
            HapticTypes.LIGHT -> performHapticFeedback(20)
            HapticTypes.MEDIUM -> performHapticFeedback(40)
            HapticTypes.HEAVY -> performHapticFeedback(60)
            HapticTypes.SOFT -> performHapticFeedback(30)
            HapticTypes.RIGID -> performHapticFeedback(50)
            HapticTypes.SELECT -> performHapticFeedback(10)
        }
    }

    private fun performHapticFeedback(duration: Long) {
        val vibrator = context.getSystemService<Vibrator>() ?: return
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            vibrator.vibrate(VibrationEffect.createOneShot(duration, VibrationEffect.DEFAULT_AMPLITUDE))
        } else {
            @Suppress("DEPRECATION")
            vibrator.vibrate(duration)
        }
    }

    override fun getColorScheme(): ColorScheme = when (
        context.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
    ) {
        Configuration.UI_MODE_NIGHT_YES -> ColorScheme.DARK
        Configuration.UI_MODE_NIGHT_NO -> ColorScheme.LIGHT
        else -> ColorScheme.UNSPECIFIED
    }

    override fun getScreenDimensions(): ScreenDimensions {
        val metrics = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            context.getSystemService<DisplayManager>()?.displays?.firstOrNull()?.let { display ->
                DisplayMetrics().also { display.getRealMetrics(it) }
            } ?: context.resources.displayMetrics
        } else {
            @Suppress("DEPRECATION")
            context.resources.displayMetrics
        }

        return ScreenDimensions(
            width = metrics.widthPixels.toDouble(),
            height = metrics.heightPixels.toDouble()
        )
    }

    override fun getContentSizeCategory(): String {
        val fontScale = context.resources.configuration.fontScale
        return when {
            fontScale <= 0.85f -> "xSmall"
            fontScale <= 0.95f -> "Small"
            fontScale <= 1.05f -> "Medium"
            fontScale <= 1.15f -> "Large"
            fontScale <= 1.25f -> "xLarge"
            fontScale <= 1.35f -> "xxLarge"
            fontScale <= 1.45f -> "xxxLarge"
            fontScale <= 1.55f -> "accessibilityMedium"
            fontScale <= 1.65f -> "accessibilityLarge"
            fontScale <= 1.75f -> "accessibilityExtraLarge"
            fontScale <= 1.85f -> "accessibilityExtraExtraLarge"
            else -> "accessibilityExtraExtraExtraLarge"
        }
    }

    override fun getScreenInsets(): ScreenInsets {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val metrics = context.getSystemService<DisplayManager>()?.displays?.firstOrNull()?.let { display ->
                context.getSystemService(Context.WINDOW_SERVICE)?.let { windowManager ->
                    windowManager::class.java.getMethod("getCurrentWindowMetrics").invoke(windowManager)
                }
            }

            val insets = (metrics?.javaClass?.getMethod("getWindowInsets")?.invoke(metrics) as? WindowInsets)
                ?.getInsets(WindowInsets.Type.systemBars())

            if (insets != null) {
                return ScreenInsets(
                    top = insets.top.toDouble(),
                    left = insets.left.toDouble(),
                    bottom = insets.bottom.toDouble(),
                    right = insets.right.toDouble()
                )
            }
        }
        return ScreenInsets(0.0, 0.0, 0.0, 0.0)
    }

    override fun getDisplayScale(): Double =
        context.resources.displayMetrics.density.toDouble()

    override fun getFontScale(): Double =
        context.resources.configuration.fontScale.toDouble()

    override fun getIsRTL(): Boolean =
        context.resources.configuration.layoutDirection == Configuration.LAYOUTDIR_RTL

    override fun getScreenOrientation(): ScreenOrientation {
        val dimensions = getScreenDimensions()
        return if (dimensions.width > dimensions.height) {
            ScreenOrientation.LANDSCAPE
        } else {
            ScreenOrientation.PORTRAIT
        }
    }

    override fun getPixelRatio(): Double =
        context.resources.displayMetrics.density.toDouble()
}
