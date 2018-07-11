module.exports = {
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!<rootDir>/src/**/__snapshots__/**',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/lib'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
