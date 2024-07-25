import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Product} from '../interfaces/Product.interface';

interface Props {
  item: Product;
  index: number;
  length: number;
  onPress: (item: Product) => void;
}
const ProductItem = ({item, index, length, onPress}: Props) => {
  const isFirstItem = index === 0;
  const isLastItem = index === length - 1;
  const itemStyles = [
    styles.itemContainer,
    isFirstItem && styles.firstItem,
    isLastItem && styles.lastItem,
  ];

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={itemStyles}
        onPress={() => onPress(item)}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemSubtitle}>ID: {item.id}</Text>
        </View>
        <Text style={styles.navigateIcon}>&gt;</Text>
      </TouchableOpacity>
      {!isLastItem && <View style={styles.separator} />}
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomColor: '#fff',
    borderTopColor: '#fff',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firstItem: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  lastItem: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 0,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemTextContainer: {
    flexDirection: 'column',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  navigateIcon: {
    fontSize: 20,
    color: '#ccc',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    width: '98%',
    alignSelf: 'center',
  },
});

export default ProductItem;
