import { Slot, usePathname } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, StatusBar } from 'react-native';
import { ScrollContext } from '@/src/contexts/use-scroll';
import { BottomNav } from '@/src/components/bottom-nav';
import { HeaderComponent } from '@/src/components/home/header';

const HEADER_SCROLL_THRESHOLD = 50; 
const BACKGROUND_FADE_START = 20; 
const BACKGROUND_FADE_END = 100; 
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 44;

export default function TabLayout() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const scrollYAnimated = useRef(new Animated.Value(0)).current; // Separate animated value
  const pathname = usePathname();

  useEffect(() => {
    scrollYAnimated.setValue(scrollY);
  }, [scrollY, scrollYAnimated]);

  useEffect(() => {
    const shouldHide = scrollDirection === 'down' && scrollY > HEADER_SCROLL_THRESHOLD;
    
    Animated.spring(translateY, {
      toValue: shouldHide ? 130 : 0,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  }, [scrollDirection, scrollY, translateY]);

  const headerBgOpacity = scrollYAnimated.interpolate({
    inputRange: [BACKGROUND_FADE_START, BACKGROUND_FADE_END],
    outputRange: [0, 0.95],
    extrapolate: 'clamp',
  });

  return (
    <ScrollContext.Provider value={{ setScrollDirection, setScrollY }}>
   
        <StatusBar
          barStyle="light-content"
          backgroundColor="#000000"
          translucent={false}
        />

      {pathname === '/' && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            paddingTop: STATUS_BAR_HEIGHT,
            // transform: [{ translateY: Animated.multiply(translateY, -1) }],
            backgroundColor: headerBgOpacity.interpolate({
              inputRange: [0, 0.95],
              outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.95)'],
            }),
          }}
        >
          <HeaderComponent />
        </Animated.View>
      )}
      
      <Slot />
      
      {(pathname === '/' || pathname === '/recipes') && (
        <BottomNav point={translateY} />
      )}
    </ScrollContext.Provider>
  );
}