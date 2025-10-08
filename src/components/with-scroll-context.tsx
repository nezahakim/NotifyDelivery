import React, { useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import { useScrollContext } from '../contexts/use-scroll';

const SCROLL_THRESHOLD = 5; // Prevents jittery direction changes

export function withScrollContext<T extends object>(
  Component: React.ComponentType<T>
) {
  return function WrappedWithScroll(props: T) {
    const { setScrollDirection, setScrollY } = useScrollContext();
    const lastScrollY = useRef(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffsetY = event.nativeEvent.contentOffset.y;
      const prevY = lastScrollY.current;

      // Update scroll position immediately
      setScrollY?.(currentOffsetY);

      // Only update direction if scroll delta exceeds threshold
      if (Math.abs(currentOffsetY - prevY) < SCROLL_THRESHOLD) return;

      const direction = currentOffsetY > prevY ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollY.current = currentOffsetY;
    };

    return (
      <ScrollView
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Component {...props} />
      </ScrollView>
    );
  };
}