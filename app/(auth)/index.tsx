import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ExternalLink } from '@/src/components/external-link';
import { AUTH_LOGIN_URL } from '@/src/constants/utils';


const AuthWelcomeScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for CTA button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="black" />
      
      {/* Hero Background with Rotating Images */}
      <View className="absolute inset-0">

        {/* Premium Gradient Overlays */}
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.95)',
            'rgba(0,0,0,0.7)',
            'rgba(0,0,0,0.4)',
            'rgba(0,0,0,0.8)',
            'rgba(0,0,0,0.98)',
          ]}
          locations={[0, 0.2, 0.5, 0.8, 1]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        {/* Ambient Light Effects */}
        <View className="absolute -top-40 -left-40 w-96 h-96 bg-red-600 rounded-full opacity-20 blur-3xl" />
        <View className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-800 rounded-full opacity-15 blur-3xl" />
      </View>

      <SafeAreaView className="flex-col justify-between items-center relative z-10 h-screen">
        {/* Top Badge - Powered by */}
        
          <View className="bg-zinc-900/60 border border-zinc-800 px-4 py-2 rounded-full backdrop-blur mt-6 w-fit">
            <Text className="text-gray-400 text-xs tracking-widest font-semibold uppercase">
              Powered by Notifycode
            </Text>
          </View>

        {/* Main Content */}
        <View className="flex-1 justify-center px-6">
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            }}
            className="items-center"
          >
            {/* Logo */}
            <View className="mb-10">
           
              <View className="flex-row items-center justify-center">
                <Text className="text-red-600 text-4xl font-bold">Notify</Text>
                <Text className="text-white text-4xl font-bold">Delivery</Text>
                <Text className="text-red-600 text-4xl font-bold">+</Text>
              </View>
            </View>

            {/* Headline */}
            <Text className="text-white text-2xl font-bold text-center mb-2 leading-tight">
              Fast. Reliable. Effortless.
            </Text>

            {/* Description */}
            <Text className="text-gray-300 text-lg text-center leading-7 mb-12 max-w-md">
              Your next-generation delivery companion—engineered for{' '}
              <Text className="text-red-500 font-semibold">precision</Text>, designed for{' '}
              <Text className="text-red-500 font-semibold">trust</Text>.
            </Text>


            {/* CTA Button - Continue with NotifyAccount */}
            <Animated.View
              style={{
                transform: [{ scale: pulseAnim }],
              }}
            >
              <TouchableOpacity
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#dc2626', '#b91c1c', '#7f1d1d']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-full py-5 flex-row items-center justify-center shadow-2xl"
                  style={{
                    shadowColor: '#ef4444',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.6,
                    shadowRadius: 20,
                    elevation: 12,
                  }}
                >
                  <ExternalLink
                        href={AUTH_LOGIN_URL}
                        className="text-white text-lg font-bold tracking-wide"
                    >
                        Get Started with NotifyAccount
                    </ExternalLink>
                    
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          {/* Terms */}
          <Text className="text-gray-500 text-xs text-center mt-8 leading-5 w-full">
              By continuing, you agree to our{'\n'}
              <Text className="text-red-500 font-semibold"> Terms of Service </Text>
              and
              <Text className="text-red-500 font-semibold"> Privacy Policy </Text>
            </Text>

        </View>

        {/* Bottom Badge - Crafted by */}
       
          <View className="bg-zinc-900/60 border border-zinc-800 px-4 py-2 rounded-full backdrop-blur mb-6 w-fit">
            <Text className="text-gray-400 text-xs">
              Crafted with <Text className="text-red-500">❤️</Text> at{' '}
              <Text className="text-white font-semibold">NotifyLabs</Text>
            </Text>
          </View>

      </SafeAreaView>
    </View>
  );
};

export default AuthWelcomeScreen;