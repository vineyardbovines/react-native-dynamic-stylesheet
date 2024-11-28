import type { Config } from "jest";

const config: Config = {
  preset: "react-native",
  modulePathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/lib"],
};

export default config;
