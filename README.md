# react-native-nitro-stylesheet

Performant, extended [StyleSheet](https://reactnative.dev/docs/stylesheet) for React Native. Inspired by [Unistyles](https://github.com/jpudysz/react-native-unistyles).

- ⚡ Native StyleSheet API, no learning curve or overhead
- ♿ Built-in accessibility overrides
- 📐 Automatic responsive scaling
- 🏃‍♂️ Powered by [Nitro Modules](https://nitro.margelo.com)

**Table of Contents**

- [react-native-nitro-stylesheet](#react-native-nitro-stylesheet)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Themes](#themes)
    - [`StyleSheet.init`](#stylesheetinit)
    - [`StyleSheet.create`](#stylesheetcreate)
    - [`useAccessibilitySettings()`](#useaccessibilitysettings)
    - [Nitro Modules](#nitro-modules)


## Overview

When calling `StyleSheet.create`, a few things are applied automatically:

- Accessibility overrides
- Scaling based on device size
- Dynamic theming (light and dark mode)

Scaling is applied based on the device dimensions, as well as any accessibility enlargement setting (content size category).

Accessibility settings the user has applied will enhance or override when appropriate.

You can pass your own themes to the stylesheet or use the defaults provided.

## Installation

Install in any React Native application or library.

```bash
npm install react-native-nitro-stylesheet
# peer dependencies
npm install react-native-nitro-modules
```

If you're using Expo, you will need to [create a development build](https://docs.expo.dev/develop/development-builds/create-a-build/).

## Usage

```tsx
import { useStyles, StyleSheet } from "react-native-nitro-stylesheet";
import { View, Text } from "react-native";

// only has to be called once
StyleSheet.init({
    // add your themes
    light: {},
    dark: {}
})

function Component() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>App header</Text>
        </View>
    )
}

const stylesheet = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.bg
    },
    header: {
        color: theme.colors.fg,
        fontSize: theme.fontSizes.h1,
        fontFamily: theme.fonts.semibold
    }
}))
```

### Themes

You can provide either a single theme object or a theme for each color mode (`light` and `dark`).

Themes are expected to follow this shape:

```tsx
interface Theme {
  spacing: Record<string, number>;
  radius: Record<string, number>;
  fonts: Record<string, number>;
  fontSizes: Record<string, number>;
  colors: {
    bg: string;
    fg: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    [key: string]: string;
  };
  [key: string]: any; // any other properties
};
```

The `colors` are set in such a way to be dynamic based on color scheme, i.e.

```tsx
const light = {
    colors: {
        bg: "#fff"
    }
}
const dark = {
    colors: {
        bg: "#000"
    }
}

// when calling in the stylesheet
const stylesheet = StyleSheet.create((theme) => ({
    container: {
        backgroundColor: theme.colors.bg // will automatically apply based on the user's color scheme
    }
}))
```

### `StyleSheet.init`

At the root of your application, call `StyleSheet.init()` and pass your theme(s).

```tsx
import { StyleSheet } from "react-native-nitro-stylesheet";

const lightTheme = {
    // your theme
}

const darkTheme = {
    // your theme
}

StyleSheet.init({
    light: lightTheme,
    dark: darkTheme
})
```

### `StyleSheet.create`

Your theme is automatically available on the `create` function and can be used in your styles. This method is an extension of the React Native supplied StyleSheet and can be used in the same way.

Automatic scaling based on device size and accessibility overrides are automatically applied to your styles.

```tsx
import { StyleSheet } from "react-native-nitro-stylesheet";

const stylesheet = StyleSheet.create((theme) => ({
    container: {
        backgroundColor: theme.colors.bg,
        flex: 1,
        justifyContent: "center"
    }
}))
```

Also available, alongside the theme, are screen insets to apply safe area styling.

```tsx
import { StyleSheet } from "react-native-nitro-stylesheet";

const stylesheet = StyleSheet.create((theme, insets) => ({
    container: {
        backgroundColor: theme.colors.bg,
        flex: 1,
        justifyContent: "center",
        paddingTop: insets.top // safe area insets
    }
}))
```

### `useAccessibilitySettings()`

Hook that returns all accessibility settings and their enabled/disabled state. Will listen for and report changes.

```tsx
import { useAccessibilitySettings } from "react-native-nitro-stylesheet";

function Component() {
    const {
        isReduceMotionEnabled,
        isReduceTransparencyEnabled,
        isGrayscaleEnabled,
        isBoldTextEnabled,
        isVoiceOverEnabled,
        isSwitchControlEnabled,
        isVideoAutoplayEnabled,
        isClosedCaptioningEnabled,
        isDarkerSystemColorsEnabled,
        isMonoAudioEnabled,
        isShakeToUndoEnabled,
        isDifferentiateWithoutColorEnabled,
        isInvertColorsEnabled,
        isShowButtonShapesEnabled,
        prefersCrossFadeTransitionsEnabled,
        isSpeakScreenEnabled,
        isSpeakSelectionEnabled,
        isOnOffSwitchLabelsEnabled,
    } = useAccessibilitySettings()
}
```

### Nitro Modules

This package also exports the nitro modules themselves:

- [`NitroAccessibilityModule`](./src/specs/Accessibility.nitro.ts)
- [`NitroDeviceModule`](./src/specs/Device.nitro.ts)
