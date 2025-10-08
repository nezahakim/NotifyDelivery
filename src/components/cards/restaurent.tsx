import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";

export const RestaurantCard = ({ restaurant, index }: any) => {
    const cardAnim = useRef(new Animated.Value(0)).current;
   
    useEffect(() => {
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);
    
    return (
      <Animated.View
        style={{
          transform: [{
            translateY: cardAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            })
          }],
          opacity: cardAnim,
        }}
      >
        <TouchableOpacity className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-4"
        >
          <View className="relative">
            <Image 
              source={{ uri: restaurant.image }}
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1">
              <Text className="text-sm font-semibold text-gray-900">
                {restaurant.deliveryTime}
              </Text>
            </View>
            <TouchableOpacity className="absolute bottom-4 right-4 w-10 h-10 bg-red-500 rounded-full items-center justify-center">
              <Ionicons name="heart-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          
          <View className="p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-lg font-bold text-gray-900">
                {restaurant.name}
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#fbbf24" />
                <Text className="text-gray-700 font-medium ml-1">
                  {restaurant.rating}
                </Text>
              </View>
            </View>
            
            <Text className="text-gray-600 mb-3">{restaurant.category}</Text>
            
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center bg-green-200 px-1 rounded-lg">
                <Ionicons name="bicycle" size={16} color="#6b7280" />
                <Text className="text-gray-600 text-sm ml-1">
                  {restaurant.deliveryFee} • {restaurant.distance}
                </Text>
              </View>
              <TouchableOpacity className="bg-red-50 px-4 py-2 rounded-xl">
                <Text className="text-red-500 font-semibold text-sm">Order Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };