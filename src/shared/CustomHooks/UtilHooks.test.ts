import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './UtilHooks';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated', delay: 500 });

    // Value should still be the initial value immediately after update
    expect(result.current).toBe('initial');

    // Fast-forward time by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now the value should be updated
    expect(result.current).toBe('updated');
  });

  it('should reset the timer when value changes rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    // First update
    rerender({ value: 'update1', delay: 500 });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('initial');

    // Second update before debounce completes
    rerender({ value: 'update2', delay: 500 });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('initial');

    // Third update before debounce completes
    rerender({ value: 'final', delay: 500 });
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Should only have the final value
    expect(result.current).toBe('final');
  });

  it('should handle different data types', () => {
    // Test with number
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 300 },
      }
    );

    numberRerender({ value: 42, delay: 300 });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(numberResult.current).toBe(42);

    // Test with object
    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: { count: 0 }, delay: 300 },
      }
    );

    const newObj = { count: 10 };
    objectRerender({ value: newObj, delay: 300 });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(objectResult.current).toBe(newObj);

    // Test with array
    const { result: arrayResult, rerender: arrayRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: [] as number[], delay: 300 },
      }
    );

    const newArray = [1, 2, 3];
    arrayRerender({ value: newArray, delay: 300 });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(arrayResult.current).toBe(newArray);
  });

  it('should handle delay changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    // Update with new delay
    rerender({ value: 'updated', delay: 1000 });
    
    // Advance by old delay time
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial');

    // Advance by remaining new delay time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should cleanup timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { unmount } = renderHook(() => useDebounce('test', 500));

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should handle zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 0 },
      }
    );

    rerender({ value: 'immediate', delay: 0 });
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current).toBe('immediate');
  });

  it('should handle empty string values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'text', delay: 300 },
      }
    );

    rerender({ value: '', delay: 300 });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('');
  });

  it('should handle null and undefined values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'text' as string | null | undefined, delay: 300 },
      }
    );

    // Test null
    rerender({ value: null, delay: 300 });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe(null);

    // Test undefined
    rerender({ value: undefined, delay: 300 });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe(undefined);
  });
});
