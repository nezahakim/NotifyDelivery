import { RestaurantCard } from '@/src/components/cards/restaurent';
import { restaurants } from "@/src/constants/example";
import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

  
 export const RestaurantsComponent = () => {

    const restaurantsAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      // Stagger animations for smooth entrance
      const animations = [
        Animated.timing(restaurantsAnim, {
          toValue: 1,
          duration: 800,
          delay: 600,
          useNativeDriver: true,
        }),
      ];
      
      Animated.stagger(100, animations).start();
    }, []);

    return (<Animated.View 
        style={{
          opacity: restaurantsAnim,
        }}
        className="px-6"
      >
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold text-gray-900">
            Popular Restaurants
          </Text>
          <TouchableOpacity>
            <Text className="text-red-500 font-medium">See all</Text>
          </TouchableOpacity>
        </View>
        
        {restaurants.map((restaurant, index) => (

          <RestaurantCard
            key={restaurant.id} 
            restaurant={restaurant} 
            index={index}
          />

        ))}

      </Animated.View>)
  };