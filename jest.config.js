module.exports = {
    // Specifies the test environment
    testEnvironment: 'jest-environment-jsdom',
    
    // Close Port After Tests Completed
    globalTeardown: './globalTeardown.js',

    // Optional: If you want Jest to look for test files in specific directories
    roots: [
      '<rootDir>/src/'
    ],
  
    // Optional: If you're using Babel, you'll need this to transpile the code
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    }
  };
  