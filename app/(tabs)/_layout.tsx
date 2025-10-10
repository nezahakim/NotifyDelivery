// import { Slot, usePathname } from 'expo-router';
// import React, { useEffect, useRef, useState } from 'react';
// import { Animated, Platform, StatusBar } from 'react-native';
// import { ScrollContext } from '@/src/contexts/use-scroll';
// import { BottomNav } from '@/src/components/bottom-nav';
// import { HeaderComponent } from '@/src/components/home/header';

// const HEADER_SCROLL_THRESHOLD = 50; // Minimum scroll before hiding header
// const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 44; // iOS standard

// export default function TabLayout() {
//   const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
//   const [scrollY, setScrollY] = useState(0); // Track actual scroll position
//   const translateY = useRef(new Animated.Value(0)).current;
//   const pathname = usePathname();

//   useEffect(() => {
//     // Only hide header/nav if scrolled past threshold AND scrolling down
//     const shouldHide = scrollDirection === 'down' && scrollY > HEADER_SCROLL_THRESHOLD;
    
//     Animated.timing(translateY, {
//       toValue: shouldHide ? 130 : 0,
//       duration: 300, // Slightly longer for smoother animation
//       useNativeDriver: true,
//     }).start();
//   }, [scrollDirection, scrollY]);

//   // Header background opacity based on scroll position (0 = transparent, 1 = opaque)
//   const headerBgOpacity = translateY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [1, 0], // FIXED: Was backwards - now 1 (opaque) when not scrolled
//     extrapolate: 'clamp',
//   });

//   return (
//     <ScrollContext.Provider value={{ setScrollDirection, setScrollY }}>
//       {/* Floating Header with Scroll Effect */}
//       {pathname === '/' && (
//         <Animated.View
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             zIndex: 100,
//             paddingTop: STATUS_BAR_HEIGHT, // Add top spacing for status bar
//             transform: [{ translateY: Animated.multiply(translateY, -1) }],
//             backgroundColor: headerBgOpacity.interpolate({
//               inputRange: [0, 1],
//               outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.95)'], // FIXED: Swapped order
//             }),
//           }}
//         >
//           <HeaderComponent />
//         </Animated.View>
//       )}
      
//       <Slot />
      
//       {(pathname === '/' || pathname === '/recipes') && (
//         <BottomNav point={translateY} />
//       )}
//     </ScrollContext.Provider>
//   );
// }



import { Slot, usePathname } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, StatusBar } from 'react-native';
import { ScrollContext } from '@/src/contexts/use-scroll';
import { BottomNav } from '@/src/components/bottom-nav';
import { HeaderComponent } from '@/src/components/home/header';

const HEADER_SCROLL_THRESHOLD = 50; // Minimum scroll before hiding
const BACKGROUND_FADE_START = 20; // When background starts fading in
const BACKGROUND_FADE_END = 100; // When background is fully opaque
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 44;

export default function TabLayout() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const scrollYAnimated = useRef(new Animated.Value(0)).current; // Separate animated value
  const pathname = usePathname();

  // Update animated scroll value (no conflict - separate from translateY)
  useEffect(() => {
    scrollYAnimated.setValue(scrollY);
  }, [scrollY, scrollYAnimated]);

  // Hide/show animation
  useEffect(() => {
    const shouldHide = scrollDirection === 'down' && scrollY > HEADER_SCROLL_THRESHOLD;
    
    Animated.spring(translateY, {
      toValue: shouldHide ? 130 : 0,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  }, [scrollDirection, scrollY, translateY]);

  // Header background opacity based on scroll (0 = transparent, 1 = opaque)
  const headerBgOpacity = scrollYAnimated.interpolate({
    inputRange: [BACKGROUND_FADE_START, BACKGROUND_FADE_END],
    outputRange: [0, 0.95],
    extrapolate: 'clamp',
  });

  return (
    <ScrollContext.Provider value={{ setScrollDirection, setScrollY }}>
      {/* Status Bar - Force light content */}
      
        <StatusBar
          barStyle="light-content"
          backgroundColor="#000000"
          translucent={false}
        />

      {/* Floating Header with Scroll Effect */}
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