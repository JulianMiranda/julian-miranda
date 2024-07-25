import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {Details} from '../screens/Details';

export type RootStackParams = {
  HomeScreen: undefined;
  Details: {itemId: number; otherParam: string};
};
const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Banco'}}
      />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};
