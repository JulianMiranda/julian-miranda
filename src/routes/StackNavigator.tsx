import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {DetailsScreen} from '../screens/DetailsScreen';
import {Product} from '../interfaces/Product.interface';
import {CreateScreen} from '../screens/CreateScreen';
import {EditScreen} from '../screens/EditScreenn';
import {Header} from '../components/Header';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailsScreen: {item: Product};
  EditScreen: {item: Product};
  CreateScreen: undefined;
};
const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: props => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          header: props => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          header: props => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          header: props => <Header {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
