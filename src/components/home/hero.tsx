import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const HeroSection = ({ currentHero, currentHeroIndex, featuredRestaurants, heroAnim, router }:any) => {
  const [animValue] = useState(new Animated.Value(0)); 

  useEffect(() => {
    // Trigger the animation when the hero content changes
    Animated.timing(animValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [currentHeroIndex]);

  
  return (
    <View style={{ height: height * 0.75 }}>
        <Animated.View
          style={{
            opacity: heroAnim,
            transform: [
              {
                scale: heroAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1.2, 1],
                }),
              },
            ],
          }}
        >
          <Image
            source={{ uri: currentHero?.image }}
            style={{ width: width, height: height * 0.75 }}
            resizeMode="cover"
          />

          {/* Gradient Overlays */}
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent', 'rgba(0,0,0,0.95)']}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: height * 0.75,
            }}
          />

          {/* Hero Content */}
          <View className="absolute bottom-0 left-0 right-0 p-6">
            {/* Top Restaurant Badge */}
            <View className="flex-row items-center mb-3">
              <View className="bg-red-600 px-3 py-1 rounded">
                <Text className="text-white text-xs font-bold">
                  #1 TRENDING
                </Text>
              </View>
              <View className="flex-row items-center ml-3">
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text className="text-white font-bold ml-1">
                  {currentHero?.rating || '4.8'}
                </Text>
              </View>
            </View>

            {/* Restaurant Name */}
            <Text className="text-white text-4xl font-bold mb-2">
              {currentHero?.name}
            </Text>

            {/* Info Tags */}
            <View className="flex-col items-start mb-4">
              <Text className="text-gray-300 mr-3">
                {currentHero?.cuisine}
              </Text>
              <View className='flex-row items-center'>
                <View className="flex-row items-center mr-3">
                  <Ionicons name="time-outline" size={14} color="#9ca3af" />
                  <Text className="text-gray-300 ml-1">25-35 min</Text>
                </View>
                <Text className="text-gray-300">Free Delivery</Text>
              </View>
            </View>

            {/* Description */}
            <Text
              className="text-gray-300 text-sm leading-5 mb-6"
              numberOfLines={2}
            >
              Experience the finest cuisine with expertly crafted dishes made
              from premium ingredients. Order now for an unforgettable dining
              experience.
            </Text>

            {/* Action Buttons */}
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() => router.push('/provider')}
                className="flex-1 bg-white rounded-lg py-3 flex-row items-center justify-center"
                activeOpacity={0.9}
              >
                <Ionicons name="play" size={20} color="#000" />
                <Text className="text-black font-bold text-base ml-2">
                  Order Now
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-zinc-800/80 rounded-lg px-4 py-3"
                activeOpacity={0.8}
              >
                <Ionicons name="information-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Hero Indicators */}
            <View className="flex-row items-center justify-center mt-6 gap-2">
              {featuredRestaurants.map((_:any, index: any) => (
                <View
                  key={index}
                  className={`h-1 rounded-full ${
                    index === currentHeroIndex
                      ? 'bg-white w-8'
                      : 'bg-gray-600 w-1'
                  }`}
                />
              ))}
            </View>
          </View>
        </Animated.View>
      </View>
  );
};

export default HeroSection;
