import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../routes/StackNavigator';

type Props = StackScreenProps<RootStackParams, 'Details'>;

export const Details = ({route}: Props) => {
  const {itemId, otherParam} = route.params;

  return (
    <View style={styles.container}>
      <Text>Item ID: {itemId}</Text>
      <Text>Other Param: {otherParam}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
