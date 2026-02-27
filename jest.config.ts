import createJestConfig from 'next/jest.js'

const config = createJestConfig({
    dir: './',
})({
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/.next/',
        '/e2e/',
        '/src/components/ui/',
        '/src/lib/',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/.next/',
        '<rootDir>/e2e/',
    ],
})

export default config
