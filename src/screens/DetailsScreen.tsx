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
import {DeleteModal} from '../components/Modal';
import axios from '../api/axios';

type Props = StackScreenProps<RootStackParams, 'DetailsScreen'>;

export const DetailsScreen = ({route, navigation}: Props) => {
  const {item} = route.params;
  const {bottom} = useSafeAreaInsets();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
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

  useEffect(() => {
    if (deleteError) {
      const timer = setTimeout(() => {
        setDeleteError(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [deleteError]);

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  const confirmDelete = async () => {
    setIsProcessing(true);
    try {
      await axios.delete(`/bp/products?id=${product.id}`);
      navigation.navigate('HomeScreen');
    } catch (error) {
      setDeleteError('Error al eliminar el producto. Inténtalo de nuevo.');
    } finally {
      setIsProcessing(false);
      setIsModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return <SkeletonDetails />;
  }

  return (
    <>
      {deleteError && (
        <View style={styles.deleteErrorContainer}>
          <Text style={styles.deleteErrorText}>{deleteError}</Text>
        </View>
      )}
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.editButton}
          onPress={() => navigation.navigate('EditScreen', {item})}>
          <Text style={{...styles.editButtonText, color: colors.text}}>
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.deleteButton}
          onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
      <DeleteModal
        visible={isModalVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        productName={product.name}
        isProcessing={isProcessing}
      />
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
    paddingHorizontal: 16,
  },
  logoContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  value: {
    fontSize: 14,
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
  deleteErrorContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 8,
    zIndex: 999,
  },
  deleteErrorText: {
    color: '#ff0000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 99,
  },
});
