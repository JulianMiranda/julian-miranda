import 'react-native-gesture-handler';
import React from 'react';
import {StackNavigator} from './src/routes/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/context/theme/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};
export default App;
