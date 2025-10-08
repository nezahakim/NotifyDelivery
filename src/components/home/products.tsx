import { restaurants } from "@/src/constants/example";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { AddToCartModal } from "../add-to-cart";

export const ProductsComponent = ({ category }: any) => {
  const productsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(productsAnim, {
      toValue: 1,
      duration: 800,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const allMenuItems = restaurants.flatMap((restaurant) =>
    restaurant.menu.map((item) => ({
      ...item,
      restaurantName: restaurant.name,
      restaurantImage: restaurant.image,
    }))
  );

  const filteredItems = category
    ? allMenuItems.filter(
        (item) => item.category === category || category === "All"
      )
    : allMenuItems;

  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState({});

  const handleAddToCart = (item: any, quantity: any) => {
    setCartItems((prev: any) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + quantity,
    }));
    setSelectedItem(null);
  };

  return (
    <>
      <Animated.View style={{ opacity: productsAnim }} className="px-6">
        {filteredItems.map((item: any, index) => (
          <TouchableOpacity
            key={item.id + "-" + index}
            onPress={() => setSelectedItem(item)}
            className="bg-zinc-900 rounded-2xl overflow-hidden mb-4"
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: item.image }}
              className="w-full h-48"
              resizeMode="cover"
            />

            {/* Gradient Overlay */}
            <View className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black/60" />

            <View className="p-4">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-white text-lg font-bold mb-1">
                    {item.name}
                  </Text>
                  <Text className="text-gray-400 text-sm" numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
                <View className="bg-red-600 px-3 py-1 rounded-full ml-2">
                  <Text className="text-white font-bold">
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between mt-2">
                <View className="flex-row items-center">
                  <Ionicons name="restaurant" size={14} color="#9ca3af" />
                  <Text className="text-gray-400 text-xs ml-1">
                    {item.restaurantName}
                  </Text>
                </View>
                <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-full">
                  <Text className="text-white text-xs font-bold">Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredItems.length === 0 && (
          <View className="flex items-center justify-center p-8">
            <Ionicons name="fast-food-outline" size={64} color="#3f3f46" />
            <Text className="text-gray-500 text-lg mt-4">No dishes found</Text>
          </View>
        )}
      </Animated.View>
      <AddToCartModal
        visible={selectedItem !== null}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};
