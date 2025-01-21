const path = require('path');

module.exports = {
  preset: 'ts-jest',
  rootDir: path.join(__dirname),
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'json'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  coverageReporters: ['html', 'json', 'lcov', 'text', 'clover'],
  clearMocks: true,
  restoreMocks: true,
  reporters: ['default', 'jest-sonar']
};
