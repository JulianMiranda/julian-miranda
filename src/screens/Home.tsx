import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const Home = () => {
  const navigation = useNavigation<any>();
  const onPress = () => {
    navigation.navigate('Details');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text>Go Details</Text>
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
