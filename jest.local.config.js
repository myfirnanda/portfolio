// Temporary config so tests can actually run in this checkout.
// react-scripts builds its testMatch from the absolute project path and escapes
// the dot in ".pemrograman" as "\.", which is valid in a regex but breaks the
// glob on Windows -- jest then matches 0 files and every test in the project is
// silently skipped. testRegex takes a real regex, so the escape behaves.
module.exports = {
    rootDir: __dirname,
    testEnvironment: 'jsdom',
    testRegex: 'src[\\\\/].*\\.test\\.jsx?$',
    transform: {
        '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['react-app'] }],
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
