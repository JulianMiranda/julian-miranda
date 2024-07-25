import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonDetails = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.subHeader} />

        <View style={styles.infoContainer}>
          <View style={styles.label} />
          <View style={styles.value} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.label} />
          <View style={styles.value} />
        </View>
        <View style={styles.logoContainer}>
          <View style={styles.label} />
          <View style={styles.logo} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.label} />
          <View style={styles.value} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.label} />
          <View style={styles.value} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    width: '60%',
    height: 30,
    marginBottom: 8,
    borderRadius: 4,
  },
  subHeader: {
    width: '40%',
    height: 20,
    marginBottom: 16,
    borderRadius: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    width: '30%',
    height: 20,
    borderRadius: 4,
  },
  value: {
    width: '50%',
    height: 20,
    borderRadius: 4,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 100,
    borderRadius: 4,
  },
});

export default SkeletonDetails;
