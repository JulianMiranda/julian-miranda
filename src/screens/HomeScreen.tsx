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
import {RootStackParams} from '../routes/StackNavigator';
import {Product} from '../interfaces/Product.interface';
import ProductItem from '../components/RenderItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useFocusEffect} from '@react-navigation/native';

type Props = StackScreenProps<RootStackParams, 'HomeScreen'>;

export const HomeScreen = ({navigation}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
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
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );
  const onPress = (product: Product) => {
    navigation.navigate('DetailsScreen', {item: product});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />
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
    borderRadius: 2,
    paddingHorizontal: 8,
    marginBottom: 16,
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
});
