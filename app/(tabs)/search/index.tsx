import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StatusBar,
  Keyboard,
  Platform,
} from "react-native";

// Sample product data
const mockProducts = [
  { id: 1, name: "Margherita Pizza", restaurant: "Bella Italia", time: "25-35 min", rating: 4.8, emoji: "🍕" },
  { id: 2, name: "Chicken Burger", restaurant: "Burger House", time: "20-30 min", rating: 4.6, emoji: "🍔" },
  { id: 3, name: "Pad Thai", restaurant: "Thai Express", time: "30-40 min", rating: 4.9, emoji: "🍜" },
  { id: 4, name: "Caesar Salad", restaurant: "Green Bowl", time: "15-25 min", rating: 4.5, emoji: "🥗" },
  { id: 5, name: "Sushi Platter", restaurant: "Tokyo Sushi", time: "35-45 min", rating: 4.9, emoji: "🍣" },
  { id: 6, name: "Tacos Al Pastor", restaurant: "Mexican Street", time: "20-30 min", rating: 4.7, emoji: "🌮" },
  { id: 7, name: "Pepperoni Pizza", restaurant: "Bella Italia", time: "25-35 min", rating: 4.8, emoji: "🍕" },
  { id: 8, name: "Veggie Burger", restaurant: "Green Bowl", time: "15-25 min", rating: 4.6, emoji: "🍔" },
];

const recentSearches = ["Pizza", "Sushi", "Burger", "Pasta"];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  const contentAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Auto-focus the search input on mount
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);

    Animated.timing(contentAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return () => clearTimeout(timeout);
  }, []);


  const filteredProducts = searchQuery.length > 0
    ? mockProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : mockProducts;

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <StatusBar barStyle="dark-content" />

      {/* Header with Search Input */}
      <View className="flex-row items-center gap-3 mb-4">
        <TouchableOpacity
          onPress={()=> router.canGoBack() ? router.back() : router.navigate('/')}
          className="w-10 h-10 justify-center items-center -ml-2"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View className="flex-1 flex-row items-center bg-gray-100 rounded-2xl px-4 py-3">
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            ref={inputRef}
            placeholder="Search restaurants or dishes..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-gray-900 text-base"
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.6}>
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main Content */}
      <Animated.View
        style={{
          flex: 1,
          opacity: contentAnim,
          transform: [{
            translateY: contentAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          }],
        }}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Recent Searches */}
          {searchQuery.length === 0 && (
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-900 mb-3">Recent Searches</Text>
              <View className="flex-row flex-wrap gap-2">
                {recentSearches.map((term, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSearchQuery(term)}
                    className="bg-gray-100 px-4 py-2 rounded-full"
                    activeOpacity={0.7}
                  >
                    <Text className="text-gray-700 text-sm">{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Results Header */}
          <View className="mb-3">
            <Text className="text-lg font-semibold text-gray-900">
              {searchQuery.length > 0
                ? `${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''}`
                : 'Popular Dishes'}
            </Text>
          </View>

          {/* Product Results */}
          <View className="pb-10">
            {filteredProducts.map((product, idx) => (
              <TouchableOpacity
                key={product.id}
                className="flex-row items-center py-4 border-b border-gray-100"
                activeOpacity={0.7}
              >
                <View className="w-16 h-16 bg-gray-100 rounded-2xl items-center justify-center mr-4">
                  <Text style={{ fontSize: 32 }}>{product.emoji}</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900 mb-1">
                    {product.name}
                  </Text>
                  <View className="flex-row items-center gap-3">
                    <Text className="text-sm text-gray-500">{product.restaurant}</Text>
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="star" size={12} color="#fbbf24" />
                      <Text className="text-sm text-gray-600 font-medium">
                        {product.rating}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="items-end">
                  <Text className="text-xs text-gray-500 mb-1">{product.time}</Text>
                  <View className="bg-red-50 px-3 py-1 rounded-full">
                    <Text className="text-xs font-medium text-red-500">Delivery</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
