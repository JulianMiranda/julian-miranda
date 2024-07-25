import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from '../api/axios';
import {StackScreenProps} from '@react-navigation/stack';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParams} from '../routes/StackNavigator';
import {Product} from '../interfaces/Product.interface';
import ProductItem from '../components/RenderItem';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useFocusEffect} from '@react-navigation/native';

type Props = StackScreenProps<RootStackParams, 'HomeScreen'>;

export const HomeScreen = ({navigation}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const {bottom} = useSafeAreaInsets();

  useEffect(() => {
    fetchProducts();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, []),
  );

  const fetchProducts = async () => {
    setLoading(true);
    try {
      axios
        .get<Product[]>('/bp/products')
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.log('Error catch', error);
        });
    } catch (error) {
      console.error('Error try catch', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );
  const onPress = (product: Product) => {
    navigation.navigate('DetailsScreen', {item: product});
  };
  const renderSkeleton = (key: number) => (
    <SkeletonPlaceholder key={key}>
      <View style={styles.skeletonContainer}>
        <View style={styles.skeletonItem} />
        <View style={styles.skeletonText} />
      </View>
    </SkeletonPlaceholder>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <>
          {[0, 1, 2, 3, 4].map(index => (
            <View key={index}>{renderSkeleton(index)}</View>
          ))}
        </>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <ProductItem
              item={item}
              index={index}
              length={filteredProducts.length}
              onPress={() => onPress(item)}
            />
          )}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.addButton,
          marginBottom: bottom + 10,
          backgroundColor: colors.primary,
        }}
        onPress={() => {
          navigation.navigate('CreateScreen');
        }}>
        <Text style={{...styles.addButtonText}}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 40,
    marginTop: 20,
  },
  addButton: {
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  skeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skeletonItem: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 16,
  },
  skeletonText: {
    width: '80%',
    height: 20,
    borderRadius: 4,
  },
});
