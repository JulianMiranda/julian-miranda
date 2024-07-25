module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/fileTransformer.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation/.*)/)',
  ],
  moduleNameMapper: {
    '^react-native-skeleton-placeholder$':
      '<rootDir>/__mocks__/react-native-skeleton-placeholder.js',
  },
};
