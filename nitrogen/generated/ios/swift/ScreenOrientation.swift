///
/// ScreenOrientation.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

/**
 * Represents the JS union `ScreenOrientation`, backed by a C++ enum.
 */
public typealias ScreenOrientation = margelo.nitro.stylesheet.ScreenOrientation

public extension ScreenOrientation {
  /**
   * Get a ScreenOrientation for the given String value, or
   * return `nil` if the given value was invalid/unknown.
   */
  init?(fromString string: String) {
    switch string {
      case "portrait":
        self = .portrait
      case "landscape":
        self = .landscape
      default:
        return nil
    }
  }

  /**
   * Get the String value this ScreenOrientation represents.
   */
  var stringValue: String {
    switch self {
      case .portrait:
        return "portrait"
      case .landscape:
        return "landscape"
    }
  }
}
