import { categories } from "@/src/constants/example";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, Text, TouchableOpacity } from "react-native";

export const CategoriesComponent = ({ selectedCategory, setSelectedCategory }: any) => {
  const categoriesAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(categoriesAnim, {
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
          translateY: categoriesAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          })
        }],
        opacity: categoriesAnim,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        className="flex-row"
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.name)}
            className={`mr-3 px-5 py-3 rounded-full flex-row items-center gap-2 ${
              selectedCategory === category.name
                ? 'bg-red-600'
                : 'bg-zinc-800'
            }`}
            activeOpacity={0.8}
          >
            <Text className="text-2xl mb-1">{category.icon}</Text>
            <Text className={`text-xs font-semibold ${
              selectedCategory === category.name
                ? 'text-white'
                : 'text-gray-400'
            }`}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};