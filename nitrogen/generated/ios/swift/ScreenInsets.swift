///
/// ScreenInsets.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

import NitroModules

/**
 * Represents an instance of `ScreenInsets`, backed by a C++ struct.
 */
public typealias ScreenInsets = margelo.nitro.stylesheet.ScreenInsets

public extension ScreenInsets {
  private typealias bridge = margelo.nitro.stylesheet.bridge.swift

  /**
   * Create a new instance of `ScreenInsets`.
   */
  init(top: Double, left: Double, bottom: Double, right: Double) {
    self.init(top, left, bottom, right)
  }

  var top: Double {
    @inline(__always)
    get {
      return self.__top
    }
    @inline(__always)
    set {
      self.__top = newValue
    }
  }
  
  var left: Double {
    @inline(__always)
    get {
      return self.__left
    }
    @inline(__always)
    set {
      self.__left = newValue
    }
  }
  
  var bottom: Double {
    @inline(__always)
    get {
      return self.__bottom
    }
    @inline(__always)
    set {
      self.__bottom = newValue
    }
  }
  
  var right: Double {
    @inline(__always)
    get {
      return self.__right
    }
    @inline(__always)
    set {
      self.__right = newValue
    }
  }
}
