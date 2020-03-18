module.exports = {
    // Setup
    // ---------------
    preset: 'ts-jest',

    // Paths
    // ---------------
    roots: [
        "./src"
    ],
    testMatch: ['**/*.test.ts?(x)'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/mocks/fileMock.js',
        '\\.(s?css|sass)$': '<rootDir>/mocks/styleMock.js'
    },

    // Coverage
    // ---------------
    collectCoverageFrom: [
        `**/*.{ts,tsx}`,

        /**
         * Ignore
         * - type definition files
         * - index files (they're just used for better export)
         * - styles, cause there is no logic in it
         * - stories, they are just for demo purposes
         * - types, no logic, just definitions
         */
        '!**/{*.d.ts,index.{ts,tsx},*.styles.{ts,tsx},*.stories.{ts,tsx},*.types.{ts,tsx}}',

        // Ignore node_modules and build folders
        '!**/node_modules/**',
        '!**/build/**'
    ],

    globals: {
        // Ts-jest configuration
        // ---------------
        'ts-jest': {
            diagnostics: {
                warnOnly: true
            }
        }
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    testTimeout: 15000
};
