import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Heart,
  Star,
  Clock,
  Trash2,
  ShoppingCart,
  MapPin,
} from 'lucide-react-native';
import { router } from 'expo-router';

const mockFavorites = {
  restaurants: [
    {
      id: '1',
      name: 'Kyoji Sushi & Grill',
      cuisine: 'Japanese, Sushi',
      image: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=2670',
      rating: 4.8,
      deliveryTime: '25-35 min',
      distance: '1.2 km',
      priceRange: '$$$',
    },
    {
      id: '2',
      name: 'Bella Italia',
      cuisine: 'Italian, Pizza',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2670',
      rating: 4.6,
      deliveryTime: '20-30 min',
      distance: '0.8 km',
      priceRange: '$$',
    },
    {
      id: '3',
      name: 'Thai Express',
      cuisine: 'Thai, Asian',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=2670',
      rating: 4.9,
      deliveryTime: '30-40 min',
      distance: '2.1 km',
      priceRange: '$$',
    },
  ],
  dishes: [
    {
      id: '1',
      name: "Chef's Omakase Platter",
      restaurant: 'Kyoji Sushi & Grill',
      price: 75.0,
      image: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=2670',
      rating: 4.9,
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      restaurant: 'Bella Italia',
      price: 16.0,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2670',
      rating: 4.7,
    },
    {
      id: '3',
      name: 'Pad Thai',
      restaurant: 'Thai Express',
      price: 14.0,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=2670',
      rating: 4.8,
    },
  ],
};

const FavoritesScreen = () => {
  const [activeTab, setActiveTab] = useState<'restaurants' | 'dishes'>('restaurants');
  const [favorites, setFavorites] = useState(mockFavorites);

  const removeRestaurant = (id: string) => {
    setFavorites(prev => ({
      ...prev,
      restaurants: prev.restaurants.filter(r => r.id !== id),
    }));
  };

  const removeDish = (id: string) => {
    setFavorites(prev => ({
      ...prev,
      dishes: prev.dishes.filter(d => d.id !== id),
    }));
  };

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
            >
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Favorites</Text>
            <View className="w-10 h-10 bg-red-600/20 rounded-full items-center justify-center">
              <Heart size={20} color="#ef4444" fill="#ef4444" />
            </View>
          </View>

          {/* Stats Cards */}
          <View className="flex-row gap-3 mb-6">
            <LinearGradient
              colors={['#1f1f1f', '#0a0a0a']}
              className="flex-1 rounded-2xl p-4"
            >
              <Text className="text-gray-400 text-sm mb-1">Restaurants</Text>
              <Text className="text-white text-2xl font-bold">
                {favorites.restaurants.length}
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={['#7f1d1d', '#991b1b']}
              className="flex-1 rounded-2xl p-4"
            >
              <Text className="text-white/70 text-sm mb-1">Dishes</Text>
              <Text className="text-white text-2xl font-bold">
                {favorites.dishes.length}
              </Text>
            </LinearGradient>
          </View>

          {/* Tab Navigation */}
          <View className="flex-row bg-zinc-900 rounded-2xl p-1">
            <TouchableOpacity
              onPress={() => setActiveTab('restaurants')}
              className={`flex-1 py-3 rounded-xl ${
                activeTab === 'restaurants' ? 'bg-red-600' : 'bg-transparent'
              }`}
            >
              <Text
                className={`text-center font-bold ${
                  activeTab === 'restaurants' ? 'text-white' : 'text-gray-400'
                }`}
              >
                Restaurants
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('dishes')}
              className={`flex-1 py-3 rounded-xl ${
                activeTab === 'dishes' ? 'bg-red-600' : 'bg-transparent'
              }`}
            >
              <Text
                className={`text-center font-bold ${
                  activeTab === 'dishes' ? 'text-white' : 'text-gray-400'
                }`}
              >
                Dishes
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {activeTab === 'restaurants' ? (
            /* Restaurants List */
            favorites.restaurants.length > 0 ? (
              favorites.restaurants.map(restaurant => (
                <TouchableOpacity
                  key={restaurant.id}
                  onPress={() => router.push('/provider')}
                  className="bg-zinc-900 rounded-2xl mb-4 overflow-hidden"
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: restaurant.image }}
                    className="w-full h-48"
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 192,
                    }}
                  />

                  {/* Floating Remove Button */}
                  <TouchableOpacity
                    onPress={() => removeRestaurant(restaurant.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-black/70 rounded-full items-center justify-center"
                  >
                    <Heart size={20} color="#ef4444" fill="#ef4444" />
                  </TouchableOpacity>

                  <View className="p-4">
                    <View className="flex-row items-start justify-between mb-2">
                      <View className="flex-1">
                        <Text className="text-white font-bold text-lg mb-1">
                          {restaurant.name}
                        </Text>
                        <Text className="text-gray-400 text-sm mb-3">
                          {restaurant.cuisine} • {restaurant.priceRange}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-3">
                        <View className="flex-row items-center bg-zinc-800 px-3 py-1.5 rounded-full">
                          <Star size={14} color="#FFD700" fill="#FFD700" />
                          <Text className="text-white font-bold ml-1 text-sm">
                            {restaurant.rating}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Clock size={14} color="#9ca3af" />
                          <Text className="text-gray-400 text-sm ml-1">
                            {restaurant.deliveryTime}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <MapPin size={14} color="#9ca3af" />
                          <Text className="text-gray-400 text-sm ml-1">
                            {restaurant.distance}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="items-center justify-center py-20">
                <View className="w-24 h-24 bg-zinc-900 rounded-full items-center justify-center mb-4">
                  <Heart size={40} color="#71717a" />
                </View>
                <Text className="text-white text-xl font-bold mb-2">
                  No Favorite Restaurants
                </Text>
                <Text className="text-gray-400 text-center">
                  Start adding restaurants to your{'\n'}favorites list
                </Text>
              </View>
            )
          ) : (
            /* Dishes List */
            favorites.dishes.length > 0 ? (
              favorites.dishes.map(dish => (
                <View key={dish.id} className="bg-zinc-900 rounded-2xl mb-4 overflow-hidden">
                  <View className="flex-row">
                    <Image
                      source={{ uri: dish.image }}
                      style={{ width: 120, height: 140 }}
                      resizeMode="cover"
                    />

                    <View className="flex-1 p-4">
                      <View className="flex-row items-start justify-between mb-2">
                        <View className="flex-1">
                          <Text className="text-white font-bold text-base mb-1">
                            {dish.name}
                          </Text>
                          <Text className="text-gray-400 text-sm mb-2">
                            {dish.restaurant}
                          </Text>
                          <View className="flex-row items-center">
                            <Star size={14} color="#FFD700" fill="#FFD700" />
                            <Text className="text-white font-bold ml-1 text-sm">
                              {dish.rating}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View className="flex-row items-center justify-between mt-auto">
                        <Text className="text-red-500 text-xl font-bold">
                          ${dish.price.toFixed(2)}
                        </Text>
                        <View className="flex-row gap-2">
                          <TouchableOpacity
                            onPress={() => removeDish(dish.id)}
                            className="w-10 h-10 bg-zinc-800 rounded-full items-center justify-center"
                          >
                            <Trash2 size={18} color="#ef4444" />
                          </TouchableOpacity>
                          <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-full flex-row items-center">
                            <ShoppingCart size={16} color="white" />
                            <Text className="text-white font-bold ml-1 text-sm">Add</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View className="items-center justify-center py-20">
                <View className="w-24 h-24 bg-zinc-900 rounded-full items-center justify-center mb-4">
                  <Heart size={40} color="#71717a" />
                </View>
                <Text className="text-white text-xl font-bold mb-2">
                  No Favorite Dishes
                </Text>
                <Text className="text-gray-400 text-center">
                  Start adding dishes to your{'\n'}favorites list
                </Text>
              </View>
            )
          )}

          <View className="h-24" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default FavoritesScreen;