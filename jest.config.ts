// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['lcov'],
  clearMocks: true,
  moduleFileExtensions: ['ts', 'tsx', 'mts', 'mtsx', 'js', 'jsx', 'mjs', 'mjsx', 'json', 'node'],
  testEnvironment: 'node',
  testRegex: ['./__tests__/.+\\.test\\.ts$', './__tests__/.+\\.spec\\.ts$'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupFiles: ['dotenv/config'],
  reporters: ['default', 'jest-junit'],

  verbose: true,
};
export default config;
