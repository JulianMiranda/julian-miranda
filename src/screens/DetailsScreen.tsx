import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../routes/StackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Product} from '../interfaces/Product.interface';
import SkeletonDetails from '../skeletors/DetailsSkeleton';
import {ThemeContext} from '../context/theme/ThemeContext';
import {formatDate} from '../utils/formatDate';

type Props = StackScreenProps<RootStackParams, 'DetailsScreen'>;

export const DetailsScreen = ({route}: Props) => {
  const {item} = route.params;
  const {bottom} = useSafeAreaInsets();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  });

  useEffect(() => {
    setProduct(item);
    setIsLoading(false);
  }, [item]);

  if (isLoading) {
    return <SkeletonDetails />;
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>ID: {product.id}</Text>
        <Text style={styles.subHeader}>Información extra</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>{product.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Descripción</Text>
          <Text style={styles.value}>{product.description}</Text>
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.label}>Logo</Text>
          <Image
            source={
              imageError
                ? {uri: 'https://via.placeholder.com/150?text=Image+not+found'}
                : {uri: product.logo}
            }
            style={styles.logo}
            onError={() => setImageError(true)}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Fecha liberación</Text>
          <Text style={styles.value}>{formatDate(product.date_release)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Fecha revisión</Text>
          <Text style={styles.value}>{formatDate(product.date_revision)}</Text>
        </View>
        <View style={{...styles.spaceButton, height: bottom + 150}} />
      </ScrollView>
      <View style={{...styles.containerButton, marginBottom: bottom + 15}}>
        <TouchableOpacity style={styles.editButton} onPress={() => {}}>
          <Text style={{...styles.editButtonText, color: colors.text}}>
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 50,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    maxWidth: '60%',
    textAlign: 'right',
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  editButton: {
    backgroundColor: '#d3d3d3',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  editButtonText: {
    fontWeight: 'bold',
  },
  containerButton: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    alignSelf: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  spaceButton: {
    backgroundColor: '#fff',
  },
});
