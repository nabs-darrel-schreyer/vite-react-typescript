import { useEffect, useRef, useState } from "react";

/**
 * Debounces a value, delaying updates until after the specified delay.
 * Useful for reducing the frequency of expensive operations like API calls or search filtering.
 * @param value - The value to debounce. Can be any type (string, number, object, etc.). 
 *                Each time this value changes, the timer resets. The debounced value only 
 *                updates after the value has stopped changing for the specified delay period.
 * @param delay - Delay in milliseconds before the value updates
 * @returns The debounced value
 * @example
 * // Debounce search input to avoid API calls on every keystroke
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     fetchSearchResults(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * 
 * @example
 * // Debounce window resize to optimize performance
 * const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 * const debouncedWidth = useDebounce(windowWidth, 300);
 * 
 * @example
 * // Debounce form validation
 * const [email, setEmail] = useState('');
 * const debouncedEmail = useDebounce(email, 600);
 * // Validate only after user stops typing
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debouncedValue;
}

/**
 * Tracks the previous value of a state or prop.
 * Returns undefined on the first render, then returns the previous value on subsequent renders.
 * @param value - The value to track
 * @returns The previous value, or undefined on first render
 * @example
 * const prevCount = usePrevious(count);
 * // Use prevCount to compare with current count
 */
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current === null ? undefined : ref.current;
}

/**
 * Attaches an event listener to a DOM element with automatic cleanup.
 * Uses a ref to ensure the handler is always up-to-date without re-subscribing.
 * @param eventName - The name of the event to listen for (e.g., 'click', 'resize', 'keydown')
 * @param handler - The event handler function
 * @param element - The target element (defaults to window)
 * @example
 * useEventListener('resize', handleResize);
 * useEventListener('click', handleClick, buttonRef.current);
 */
function useEventListener<
    K extends keyof WindowEventMap>(
    eventName: K, 
    handler: (event: WindowEventMap[K]) => void,
    element: Window | HTMLElement | null = window) {

    const savedHandler = useRef(handler);
    
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        if(!element?.addEventListener) return;
        const listener = (e: any) => savedHandler.current(e);
        element.addEventListener(eventName, listener as EventListener);
        return () => element.removeEventListener(eventName, listener as EventListener)
    }, [eventName, element]);
}

export { useDebounce, usePrevious, useEventListener };
