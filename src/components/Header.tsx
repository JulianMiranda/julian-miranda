import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackHeaderProps} from '@react-navigation/stack';
import {ThemeContext} from '../context/theme/ThemeContext';

export const Header = ({navigation, route}: StackHeaderProps) => {
  const insets = useSafeAreaInsets();
  const isHomeScreen = route.name === 'HomeScreen';
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.header,
        {paddingTop: insets.top, borderBottomColor: colors.border},
      ]}>
      <View style={styles.headerContainer}>
        {!isHomeScreen && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.headerLogoLink}>
          <View style={styles.headerIconContainer}>
            <View style={styles.headerIconBackground} />
            <View style={styles.headerIcon}>
              <Text style={styles.headerPlus}>+</Text>
            </View>
          </View>
          <Text style={styles.headerTitle}>BANCO</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#54648e',
    fontWeight: 'bold',
  },
  headerLogoLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#54648e',
  },
  headerIconContainer: {
    marginRight: 10,
    marginTop: 15,
  },
  headerIconBackground: {
    width: 18,
    height: 14,
    backgroundColor: '#ffffff',
    borderColor: '#54648e',
    borderWidth: 3,
    borderRadius: 2,
    position: 'absolute',
    top: -5,
    left: 5,
  },
  headerIcon: {
    width: 18,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#54648e',
    borderWidth: 3,
    borderRadius: 2,
    position: 'relative',
    shadowColor: '#ffffff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  headerPlus: {
    fontSize: 14,
    color: '#54648e',
    fontWeight: 'bold',
    zIndex: 99999,
    position: 'absolute',
    top: -5,
  },
  headerTitle: {
    marginLeft: 15,
    fontSize: 20,
    color: '#54648e',
    marginTop: 5,
    fontWeight: 'bold',
  },
});
