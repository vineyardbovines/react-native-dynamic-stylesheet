///
/// JFunc_void_std__optional_bool_.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#include <fbjni/fbjni.h>
#include <functional>

#include <functional>
#include <optional>

namespace margelo::nitro::stylesheet {

  using namespace facebook;

  /**
   * C++ representation of the callback Func_void_std__optional_bool_.
   * This is a Kotlin `(isEnabled: Boolean?) -> Unit`, backed by a `std::function<...>`.
   */
  struct JFunc_void_std__optional_bool_ final: public jni::HybridClass<JFunc_void_std__optional_bool_> {
  public:
    static jni::local_ref<JFunc_void_std__optional_bool_::javaobject> fromCpp(const std::function<void(std::optional<bool> /* isEnabled */)>& func) {
      return JFunc_void_std__optional_bool_::newObjectCxxArgs(func);
    }

  public:
    void call(jni::alias_ref<jni::JBoolean> isEnabled) {
      return _func(isEnabled != nullptr ? std::make_optional(static_cast<bool>(isEnabled->value())) : std::nullopt);
    }

  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/stylesheet/Func_void_std__optional_bool_;";
    static void registerNatives() {
      registerHybrid({makeNativeMethod("call", JFunc_void_std__optional_bool_::call)});
    }

  private:
    explicit JFunc_void_std__optional_bool_(const std::function<void(std::optional<bool> /* isEnabled */)>& func): _func(func) { }

  private:
    friend HybridBase;
    std::function<void(std::optional<bool> /* isEnabled */)> _func;
  };

} // namespace margelo::nitro::stylesheet
