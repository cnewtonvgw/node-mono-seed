module.exports = {
    clearMocks: false,
    coverageDirectory: "build/coverage/server",
    coveragePathIgnorePatterns: [
        "/node_modules/",
    ],
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    rootDir: '..',
    testMatch: [
        "<rootDir>/src/server/**/*.spec.(ts|js)",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};
