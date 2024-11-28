const Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["breaking", "feat", "fix", "improvement", "chore", "release", "merge", "revert"],
    ],
    "type-case": [2, "always", "lower-case"],
    "scope-empty": [2, "always"],
    "subject-case": [2, "always", "lower-case"],
    "body-case": [2, "always", "lower-case"],
    "footer-empty": [2, "always"],
  },
};

export default Configuration;
