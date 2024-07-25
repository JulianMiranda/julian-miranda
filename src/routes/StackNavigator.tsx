import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {DetailsScreen} from '../screens/DetailsScreen';
import {Product} from '../interfaces/Product.interface';
import {CreateScreen} from '../screens/CreateScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailsScreen: {item: Product};
  CreateScreen: undefined;
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
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{title: 'Banco'}}
      />
      <Stack.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{title: 'Banco'}}
      />
    </Stack.Navigator>
  );
};
