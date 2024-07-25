import {renderHook, act} from '@testing-library/react-hooks';
import {useDebounce} from '../src/hooks/useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const {result} = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should update the debounced value after the specified delay', () => {
    const {result, rerender} = renderHook(
      ({value, delay}) => useDebounce(value, delay),
      {
        initialProps: {value: 'initial', delay: 500},
      },
    );

    expect(result.current).toBe('initial');

    rerender({value: 'updated', delay: 500});

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should reset the debounce delay if value changes before delay', () => {
    const {result, rerender} = renderHook(
      ({value, delay}) => useDebounce(value, delay),
      {
        initialProps: {value: 'initial', delay: 500},
      },
    );

    expect(result.current).toBe('initial');

    rerender({value: 'updated1', delay: 500});
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('initial');

    rerender({value: 'updated2', delay: 500});
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated2');
  });
});
