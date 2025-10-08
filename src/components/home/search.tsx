import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

export const SearchComponent = () => {
  const { width, height } = Dimensions.get('window'); 

  const searchAnim = useRef(new Animated.Value(0)).current;
  

    useEffect(() => {
        Animated.timing(searchAnim, {
          toValue: 1,
          duration: 800,
          delay: 200,
          useNativeDriver: true,
        }).start();
      }, []);

  return (
    <Animated.View 
      style={{
        transform: [{
          translateX: searchAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-width, 0],
          })
        }],
        opacity: searchAnim,
      }}
      className="px-6 py-4"
    >
      <View className="flex-row items-center space-x-3 gap-2">
        <TouchableOpacity 
          onPress={()=> router.push('/search')}
          className="flex-1"
          activeOpacity={0.8}
        >
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-2xl px-4 py-3">
            <Ionicons name="search" size={20} color="#6b7280" />
            <Text className="flex-1 ml-3 text-gray-400 text-base">
              Search for restaurants or dishes...
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="w-12 h-12 bg-red-500 rounded-2xl items-center justify-center"
          activeOpacity={0.8}
        >
          <MaterialIcons name="tune" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};