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
class HybridNitroAccessibilityModule: HybridNitroAccessibilityModuleSpec() {
    private val TAG = "HybridNitroAccessibilityModule"

    override val memorySize: Long
        get() = 0L

    private val accessibilityManager: AccessibilityManager =
        context.getSystemService(Context.ACCESSIBILITY_SERVICE) as AccessibilityManager

    private val observers = mutableListOf<ContentObserver>()
    private val handler = Handler(Looper.getMainLooper())

    override fun removeListeners() {
        observers.forEach { observer ->
            context.contentResolver.unregisterContentObserver(observer)
        }
        observers.clear()
    }

    override fun getIsReduceMotionEnabled(): Boolean? {
        return Settings.Global.getFloat(context.contentResolver,
            Settings.Global.TRANSITION_ANIMATION_SCALE, 1f) == 0f
    }

    override fun addReduceMotionListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Global.getUriFor(Settings.Global.TRANSITION_ANIMATION_SCALE)) {
            onChanged(getIsReduceMotionEnabled())
        }
    }

    override fun getIsReduceTransparencyEnabled(): Boolean? {
        return Settings.Global.getInt(context.contentResolver,
            Settings.Global.TRANSITION_ANIMATION_SCALE, 1) == 0
    }

    override fun addReduceTransparencyListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Global.getUriFor(Settings.Global.TRANSITION_ANIMATION_SCALE)) {
            onChanged(getIsReduceTransparencyEnabled())
        }
    }

    override fun getIsDifferentiateWithoutColorEnabled(): Boolean? {
        return Settings.Secure.getInt(context.contentResolver,
            Settings.Secure.ACCESSIBILITY_DISPLAY_DALTONIZER_ENABLED, 0) == 1
    }

    override fun addDifferentiateWithoutColorListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Secure.getUriFor(Settings.Secure.ACCESSIBILITY_DISPLAY_DALTONIZER_ENABLED)) {
            onChanged(getIsDifferentiateWithoutColorEnabled())
        }
    }

    override fun getIsInvertColorsEnabled(): Boolean? {
        return Settings.Secure.getInt(context.contentResolver,
            Settings.Secure.ACCESSIBILITY_DISPLAY_INVERSION_ENABLED, 0) == 1
    }

    override fun addInvertColorsListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Secure.getUriFor(Settings.Secure.ACCESSIBILITY_DISPLAY_INVERSION_ENABLED)) {
            onChanged(getIsInvertColorsEnabled())
        }
    }

    override fun getIsShowButtonShapesEnabled(): Boolean? {
        return Settings.Global.getInt(context.contentResolver,
            Settings.Global.SHOW_BUTTON_BACKGROUNDS, 0) == 1
    }

    override fun addShowButtonShapesListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Global.getUriFor(Settings.Global.SHOW_BUTTON_BACKGROUNDS)) {
            onChanged(getIsShowButtonShapesEnabled())
        }
    }

    override fun getIsBoldTextEnabled(): Boolean? {
        return Settings.Global.getFloat(context.contentResolver,
            Settings.Global.FONT_SCALE, 1f) > 1f
    }

    override fun addBoldTextListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Global.getUriFor(Settings.Global.FONT_SCALE)) {
            onChanged(getIsBoldTextEnabled())
        }
    }

    override fun getIsVoiceOverEnabled(): Boolean? {
        return isAccessibilityServiceEnabled("com.google.android.marvin.talkback")
    }

    override fun addVoiceOverListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Secure.getUriFor(Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES)) {
            onChanged(getIsVoiceOverEnabled())
        }
    }

    override fun getIsSwitchControlEnabled(): Boolean? {
        return isAccessibilityServiceEnabled("com.android.switchaccess")
    }

    override fun addSwitchControlListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Secure.getUriFor(Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES)) {
            onChanged(getIsSwitchControlEnabled())
        }
    }

    override fun getIsVideoAutoplayEnabled(): Boolean? {
        return null
    }

    override fun addVideoAutoplayListener(onChanged: (Boolean?) -> Unit) {
        onChanged(null)
    }

    override fun getIsClosedCaptioningEnabled(): Boolean? {
        return Settings.Secure.getInt(context.contentResolver,
            Settings.Secure.ACCESSIBILITY_CAPTIONING_ENABLED, 0) == 1
    }

    override fun addClosedCaptioningListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Secure.getUriFor(Settings.Secure.ACCESSIBILITY_CAPTIONING_ENABLED)) {
            onChanged(getIsClosedCaptioningEnabled())
        }
    }

    override fun getPrefersCrossFadeTransitionsEnabled(): Boolean? {
        return null
    }

    override fun addPrefersCrossFadeTransitionsListener(onChanged: (Boolean?) -> Unit) {
        onChanged(null)
    }

    override fun getIsGrayscaleEnabled(): Boolean? {
        return Settings.Secure.getInt(context.contentResolver,
            Settings.Secure.ACCESSIBILITY_DISPLAY_DALTONIZER, -1) == 0
    }

    override fun addGrayscaleListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Secure.getUriFor(Settings.Secure.ACCESSIBILITY_DISPLAY_DALTONIZER)) {
            onChanged(getIsGrayscaleEnabled())
        }
    }

    override fun getIsDarkerSystemColorsEnabled(): Boolean? {
        return context.resources.configuration.uiMode and
                android.content.res.Configuration.UI_MODE_NIGHT_MASK ==
                android.content.res.Configuration.UI_MODE_NIGHT_YES
    }

    override fun addDarkerSystemColorsListener(onChanged: (Boolean?) -> Unit) {
        onChanged(getIsDarkerSystemColorsEnabled())
    }

    override fun getIsMonoAudioEnabled(): Boolean? {
        return Settings.System.getInt(context.contentResolver,
            Settings.System.MASTER_MONO, 0) == 1
    }

    override fun addMonoAudioListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.System.getUriFor(Settings.System.MASTER_MONO)) {
            onChanged(getIsMonoAudioEnabled())
        }
    }

    override fun getIsShakeToUndoEnabled(): Boolean? {
        return null
    }

    override fun addShakeToUndoListener(onChanged: (Boolean?) -> Unit) {
        onChanged(null)
    }

    override fun getIsSpeakScreenEnabled(): Boolean? {
        return isAccessibilityServiceEnabled("com.google.android.tts")
    }

    override fun addSpeakScreenListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Secure.getUriFor(Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES)) {
            onChanged(getIsSpeakScreenEnabled())
        }
    }

    override fun getIsSpeakSelectionEnabled(): Boolean? {
        return Settings.Secure.getInt(context.contentResolver,
            Settings.Secure.ACCESSIBILITY_SPEAK_PASSWORD, 0) == 1
    }

    override fun addSpeakSelectionListener(onChanged: (Boolean?) -> Unit) {
        registerSettingsObserver(Settings.Secure.getUriFor(Settings.Secure.ACCESSIBILITY_SPEAK_PASSWORD)) {
            onChanged(getIsSpeakSelectionEnabled())
        }
    }

    override fun getIsOnOffSwitchLabelsEnabled(): Boolean? {
        return null
    }

    override fun addOnOffSwitchLabelsListener(onChanged: (Boolean?) -> Unit) {
        onChanged(null)
    }

    private fun isAccessibilityServiceEnabled(serviceName: String): Boolean {
        val enabledServices = Settings.Secure.getString(context.contentResolver,
            Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES) ?: return false
        return enabledServices.split(":").any { it.contains(serviceName) }
    }

    private fun registerSettingsObserver(uri: Uri, onChange: () -> Unit) {
        val observer = object : ContentObserver(handler) {
            override fun onChange(selfChange: Boolean) {
                onChange()
            }
        }
        context.contentResolver.registerContentObserver(uri, false, observer)
        observers.add(observer)
    }
}
