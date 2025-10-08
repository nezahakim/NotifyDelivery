import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Core Animation Creators
export const createFadeInAnimation = (animatedValue: any, duration = 800, delay = 0) => {
  return Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    delay,
    useNativeDriver: true,
  });
};

export const createSlideInFromTop = (animatedValue: Animated.Value | Animated.ValueXY, duration = 800, delay = 0) => {
  return Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    delay,
    useNativeDriver: true,
  });
};

export const createSlideInFromLeft = (animatedValue: Animated.Value | Animated.ValueXY, duration = 800, delay = 0) => {
  return Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    delay,
    useNativeDriver: true,
  });
};

export const createSlideInFromBottom = (animatedValue: Animated.Value | Animated.ValueXY, duration = 800, delay = 0) => {
  return Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    delay,
    useNativeDriver: true,
  });
};

export const createStaggeredAnimation = (animations: Animated.CompositeAnimation[], staggerDelay = 100) => {
  return Animated.stagger(staggerDelay, animations);
};

export const createScaleAnimation = (animatedValue: Animated.Value | Animated.ValueXY, duration = 300, delay = 0, toValue = 1) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    delay,
    useNativeDriver: true,
  });
};

export const createSpringAnimation = (animatedValue: Animated.Value | Animated.ValueXY, toValue = 1, delay = 0) => {
  return Animated.spring(animatedValue, {
    toValue,
    delay,
    tension: 100,
    friction: 8,
    useNativeDriver: true,
  });
};

export const createPulseAnimation = (animatedValue: Animated.Value | Animated.ValueXY) => {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  );
};

export const createBounceAnimation = (animatedValue: Animated.Value | Animated.ValueXY, toValue = 1, delay = 0) => {
  return Animated.spring(animatedValue, {
    toValue,
    delay,
    bounciness: 8,
    speed: 12,
    useNativeDriver: true,
  });
};

// Animation Style Generators
export const fadeInStyle = (animatedValue: any) => ({
  opacity: animatedValue,
});

export const slideFromTopStyle = (animatedValue: { interpolate: (arg0: { inputRange: number[]; outputRange: number[]; }) => any; }, distance = 50) => ({
  transform: [{
    translateY: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-distance, 0],
    })
  }],
  opacity: animatedValue,
});

export const slideFromLeftStyle = (animatedValue: { interpolate: (arg0: { inputRange: number[]; outputRange: number[]; }) => any; }, distance = width) => ({
  transform: [{
    translateX: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-distance, 0],
    })
  }],
  opacity: animatedValue,
});

export const slideFromRightStyle = (animatedValue: { interpolate: (arg0: { inputRange: number[]; outputRange: number[]; }) => any; }, distance = width) => ({
  transform: [{
    translateX: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [distance, 0],
    })
  }],
  opacity: animatedValue,
});

export const slideFromBottomStyle = (animatedValue: { interpolate: (arg0: { inputRange: number[]; outputRange: number[]; }) => any; }, distance = 50) => ({
  transform: [{
    translateY: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [distance, 0],
    })
  }],
  opacity: animatedValue,
});

export const scaleStyle = (animatedValue: any) => ({
  transform: [{ scale: animatedValue }],
});

export const rotateStyle = (animatedValue: { interpolate: (arg0: { inputRange: number[]; outputRange: string[]; }) => any; }) => ({
  transform: [{
    rotate: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })
  }],
});

// Combined Animation Styles
export const cardEntranceStyle = (animatedValue: { interpolate: (arg0: { inputRange: number[]; outputRange: number[]; }) => any; }) => ({
  transform: [{
    translateY: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    })
  }, {
    scale: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.95, 1],
    })
  }],
  opacity: animatedValue,
});

export const floatStyle = (animatedValue: { interpolate: (arg0: { inputRange: number[]; outputRange: number[]; }) => any; }) => ({
  transform: [{
    translateY: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -10],
    })
  }],
});

export const wiggleStyle = (animatedValue: { interpolate: (arg0: { inputRange: number[]; outputRange: string[]; }) => any; }) => ({
  transform: [{
    rotate: animatedValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: ['0deg', '-5deg', '0deg', '5deg', '0deg'],
    })
  }],
});

// Advanced Animation Patterns
export const createSequentialAnimation = (animatedValues: any[], duration = 600, stagger = 100) => {
  const animations = animatedValues.map((value: Animated.Value | Animated.ValueXY, index: number) => 
    Animated.timing(value, {
      toValue: 1,
      duration,
      delay: index * stagger,
      useNativeDriver: true,
    })
  );
  
  return Animated.stagger(stagger, animations);
};

export const createParallelAnimation = (animations: Animated.CompositeAnimation[]) => {
  return Animated.parallel(animations);
};

// Utility Functions
export const resetAnimation = (animatedValue: { setValue: (arg0: number) => void; }) => {
  animatedValue.setValue(0);
};

export const resetMultipleAnimations = (animatedValues: any[]) => {
  animatedValues.forEach((value: { setValue: (arg0: number) => any; }) => value.setValue(0));
};

// Custom Hooks for Complex Animations
export const useStaggeredEntrance = (count: any, delay = 100) => {
  const animations = Array.from({ length: count }, () => new Animated.Value(0));
  
  const startAnimations = () => {
    const animationArray = animations.map((anim, index) => 
      createFadeInAnimation(anim, 600, index * delay)
    );
    
    Animated.parallel(animationArray).start();
  };
  
  const resetAnimations = () => {
    animations.forEach(anim => anim.setValue(0));
  };
  
  return { animations, startAnimations, resetAnimations };
};

// Button Press Animations
export const createButtonPressAnimation = (animatedValue: Animated.Value | Animated.ValueXY) => {
  return Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
  ]);
};

export const buttonPressStyle = (animatedValue: any) => ({
  transform: [{ scale: animatedValue }],
});

// Loading Animations
export const createLoadingAnimation = (animatedValue: Animated.Value | Animated.ValueXY) => {
  return Animated.loop(
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    })
  );
};

export const loadingStyle = (animatedValue: { interpolate: (arg0: { inputRange: number[]; outputRange: number[]; }) => any; }) => ({
  opacity: animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  }),
});

// Notification Animations
export const createNotificationSlide = (animatedValue: Animated.Value | Animated.ValueXY) => {
  return Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.delay(3000),
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }),
  ]);
};

export const notificationSlideStyle = (animatedValue: { interpolate: (arg0: { inputRange: number[]; outputRange: number[]; }) => any; }) => ({
  transform: [{
    translateY: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    })
  }],
  opacity: animatedValue,
});