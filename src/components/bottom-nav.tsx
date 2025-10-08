import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChefHat, Sparkles, ChevronRight } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';

interface BottomNavProps {
  point?: any;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  point
}) => {

  const pathname = usePathname()
  const cartItemCount = 1;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY:  point }] }
      ]}
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.3)']}
        pointerEvents="none"
      />

      <View className="flex-row items-center justify-between px-4 pt-3">
        {/* View Cart Main Button */}
        <TouchableOpacity
          onPress={() => router.push('/cart')}
          activeOpacity={0.9}
          className="flex-[7] bg-red-600 rounded-full py-4 px-6 flex-row items-center justify-between mx-2 shadow-lg"
        >
          <View className="flex-row items-center">
            <View className="bg-white w-8 h-8 rounded-full items-center justify-center mr-3">
              <Text className="text-red-600 font-bold">{cartItemCount}</Text>
            </View>
            <Text className="text-white font-bold text-lg">View Cart</Text>
          </View>
          <ChevronRight size={24} color="white" />
        </TouchableOpacity>

      {pathname !== '/recipes' && (
        <TouchableOpacity
          onPress={() => router.push('/recipes')}
          activeOpacity={0.8}
          className="flex-[1.5] items-center "
        >
          <View
            className="w-12 h-12 bg-white rounded-full items-center justify-center"
          >
            <ChefHat
              size={24}
              strokeWidth={ 2.5}
            />
          </View>
        </TouchableOpacity>
)}

        {/* Vids */}
        <TouchableOpacity
          onPress={() => router.push('/vids')}
          activeOpacity={0.8}
          className="flex-[1.5] items-center"
        >
          <View
            className="w-12 h-12  bg-white rounded-full items-center justify-center"
          >
            <Sparkles
              size={24}
              strokeWidth={ 2.5}
            />
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 999,
  },
});

