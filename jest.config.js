module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JS and JSX files using Babel
    '^.+\\.mjs$': 'babel-jest',   // Handle .mjs files as well (Axios uses this extension)
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Make sure axios is not ignored by the transformer
  ],
};
