import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ProductItem from '../src/components/RenderItem';
import {StyleSheet} from 'react-native';
const mockProduct = {
  id: '123',
  name: 'Product Test',
};

describe('ProductItem', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <ProductItem
        item={mockProduct}
        index={0}
        length={3}
        onPress={jest.fn()}
      />,
    );

    expect(getByText('Product Test')).toBeTruthy();
    expect(getByText('ID: 123')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <ProductItem
        item={mockProduct}
        index={0}
        length={3}
        onPress={onPressMock}
      />,
    );

    fireEvent.press(getByText('Product Test'));
    expect(onPressMock).toHaveBeenCalledWith(mockProduct);
  });

  it('applies styles correctly based on item position', () => {
    const {getByTestId, rerender} = render(
      <ProductItem
        item={mockProduct}
        index={0}
        length={3}
        onPress={jest.fn()}
      />,
    );

    const firstItem = getByTestId('product-item-0');
    const firstItemStyles = StyleSheet.flatten(firstItem.props.style);
    expect(firstItemStyles).toMatchObject(styles.firstItem);
    expect(firstItemStyles).not.toMatchObject(styles.lastItem);

    rerender(
      <ProductItem
        item={mockProduct}
        index={2}
        length={3}
        onPress={jest.fn()}
      />,
    );

    const lastItem = getByTestId('product-item-2');
    const lastItemStyles = StyleSheet.flatten(lastItem.props.style);
    expect(lastItemStyles).toMatchObject(styles.lastItem);
    expect(lastItemStyles).not.toMatchObject(styles.firstItem);
  });
});

const styles = {
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
};
