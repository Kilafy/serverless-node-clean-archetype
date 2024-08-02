module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: 'v8',
  testMatch: ['**/test/**/*.test.ts'],
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts']
};
