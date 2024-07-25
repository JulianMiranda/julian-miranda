import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const Details = () => {
  const navigation = useNavigation<any>();
  const onPress = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text>Go Home</Text>
      </TouchableOpacity>
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
