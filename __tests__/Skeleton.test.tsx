import React from 'react';
import {render} from '@testing-library/react-native';
import SkeletonDetails from '../src/skeletors/DetailsSkeleton';

describe('SkeletonDetails', () => {
  it('renders skeleton elements correctly', () => {
    const {getAllByTestId} = render(<SkeletonDetails />);

    expect(getAllByTestId('skeleton-element').length).toBe(10);
  });
});
