module.exports = {
    clearMocks: false,
    coverageDirectory: "build/coverage/webapp",
    coveragePathIgnorePatterns: [
        "/node_modules/",
    ],
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy",
    },
    rootDir: '..',
    testMatch: [
        "<rootDir>/src/webapp/**/*.spec.(ts|js)",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};
