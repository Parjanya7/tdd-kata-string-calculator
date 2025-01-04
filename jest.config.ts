import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Optionally specify where your tests are located, coverage, etc.
    // testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
};

export default config;