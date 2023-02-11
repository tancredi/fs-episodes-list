module.exports = {
  roots: ["src"],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "src/(.*)": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  resolver: "./jest/asset-resolver.js",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/jest/asset-resolver.js",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest/setup.js"],
};
