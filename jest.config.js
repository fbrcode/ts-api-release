module.exports = {
  transform: { "^.+\\.ts?$": "ts-jest", "^.+\\.[t|j]sx?$": "babel-jest" },
  testEnvironment: "node",
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|js)$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testTimeout: 20000,
  setupFilesAfterEnv: ["./tests/setup.ts", "./tests/__mocks__/node-timers-promises.ts"],
  collectCoverageFrom: [
    "**/*.ts",
    // TODO: Enable this when we get to any component tests
    "**/*.js",
    "!**/node_modules/**",
  ],
  coverageReporters: ["html", "text", "text-summary"],
  modulePathIgnorePatterns: ["out", "aws"],
};
