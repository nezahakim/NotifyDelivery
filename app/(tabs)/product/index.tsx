import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { ChevronLeft, Heart, Search, Star, Plus } from 'lucide-react-native';
import { Restaurant, FoodItem } from '@/src/utils/types'
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data for demonstration
const mockRestaurant: Restaurant = {
  id: 'rest1',
  name: 'Kyoji Sushi & Grill',
  coverImageUrl: 'https://picsum.photos/seed/600/600',
  rating: 4.8,
  cuisine: 'Japanese, Sushi, Grill',
  description: 'Experience the curated selection of the freshest Sushi and Wagyu beef, expertly prepared daily.',
  menu: [
    {
      id: 'dish1',
      name: "Chef's Omakase Platter",
      description: "A chef's selection of the finest sushi and sashimi.",
      price: 75.00,
      imageUrl: 'https://picsum.photos/seed/600/600',
      category: 'Featured',
    },
    {
        id: 'dish_miso_soup',
        name: 'Miso Soup',
        description: 'Traditional Japanese soup with tofu and seaweed.',
        price: 4.00,
        imageUrl: 'https://images.unsplash.com/photo-1596645318041-0f74577f1540?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Featured', // Add to featured for the initial card layout
      },
    {
      id: 'dish2',
      name: 'California Roll',
      description: 'Crab meat, avocado, cucumber.',
      price: 12.00,
      imageUrl: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Sushi & Sashimi Rolls',
    },
    {
      id: 'dish3',
      name: 'Nigiri Deluxe',
      description: 'Assorted premium nigiri selection.',
      price: 28.00,
      imageUrl: 'https://images.unsplash.com/photo-1601050692790-b8875791d227?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Sushi & Sashimi Rolls',
    },
    {
      id: 'dish4',
      name: 'Spicy Tuna Roll',
      description: 'Spicy tuna, cucumber, sriracha.',
      price: 14.00,
      imageUrl: 'https://images.unsplash.com/photo-1555939228-564ae8228302?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Sushi & Sashimi Rolls',
    },
    {
      id: 'dish5',
      name: 'Yakitori Skewers',
      description: 'Grilled chicken skewers with teriyaki glaze.',
      price: 9.00,
      imageUrl: 'https://images.unsplash.com/photo-1603894468202-e221151601a9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Grilled Favorites',
    },
    {
      id: 'dish6',
      name: 'Grilled Salmon',
      description: 'Perfectly grilled salmon with lemon butter.',
      price: 18.00,
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-a32053f36077?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Grilled Favorites',
    },
    {
        id: 'dish7',
        name: 'Dragon Roll (Special)',
        description: 'Eel, avocado, cucumber, flying fish roe.',
        price: 18.00,
        imageUrl: 'https://images.unsplash.com/photo-1596001007324-4f964082354e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Kyoji Specials', // New category
      },
      {
        id: 'dish8',
        name: 'Sashimi Platter',
        description: 'Assortment of fresh sliced raw fish.',
        price: 32.00,
        imageUrl: 'https://images.unsplash.com/photo-1614798150410-b4724a7374ae?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Kyoji Specials',
      },
      {
        id: 'dish9',
        name: 'Tempura Shrimp',
        description: 'Crispy fried shrimp and vegetables.',
        price: 15.00,
        imageUrl: 'https://images.unsplash.com/photo-1628120614833-289b70b33a76?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Appetizers',
      },
      {
        id: 'dish10',
        name: 'Gyoza',
        description: 'Pan-fried pork and vegetable dumplings.',
        price: 8.00,
        imageUrl: 'https://images.unsplash.com/photo-1557997380-60b69103b41d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Appetizers',
      },
  ],
};

const ProviderDetailScreen: React.FC = () => {
  const restaurant = mockRestaurant; // In a real app, you'd fetch this via params or API

  // Group menu items by category
  const categorizedMenu = restaurant.menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FoodItem[]>);

  const categories = Object.keys(categorizedMenu);

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity className="w-32 h-44 mr-4 bg-zinc-800 rounded-lg overflow-hidden shadow-md">
      <Image source={{ uri: item.imageUrl }} className="w-full h-24" resizeMode="cover" />
      <View className="p-2">
        <Text className="text-white text-sm font-semibold truncate">{item.name}</Text>
        <Text className="text-gray-400 text-xs mt-1">${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1">
        {/* Header Image */}
        <View className="relative w-full h-64">
          <Image source={{ uri: restaurant.coverImageUrl }} className="w-full h-full" resizeMode="cover" />
          <View className="absolute top-0 left-0 right-0 p-4 flex-row justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
            <TouchableOpacity onPress={() => router.canGoBack()? router.back(): router.navigate('/') } className="p-2">
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <View className="flex-row">
              <TouchableOpacity className="p-2 mr-2">
                <Search size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2">
                <Heart size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Restaurant Details and Featured Item */}
        <View className="p-4 -mt-36 z-20"> {/* Negative margin to overlap the image */}
          <Text className="text-3xl font-bold text-white mb-2">{restaurant.name}</Text>
          <View className="flex-row items-center mb-4">
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text className="text-gray-300 ml-1 mr-3">{restaurant.rating}</Text>
            <Text className="text-gray-300">{restaurant.cuisine}</Text>
          </View>

          {/* Featured Item - Netflix Style Hero Card */}
          {categorizedMenu['Featured'] && categorizedMenu['Featured'].length > 0 && (
            <View className="bg-zinc-900 rounded-lg p-4 mb-6 shadow-xl">
              <Image
                source={{ uri: categorizedMenu['Featured'][0].imageUrl }}
                className="w-full h-48 rounded-md mb-3"
                resizeMode="cover"
              />
              <Text className="text-2xl font-bold text-white mb-1">{categorizedMenu['Featured'][0].name}</Text>
              <Text className="text-gray-400 text-sm mb-3" numberOfLines={3}>{categorizedMenu['Featured'][0].description}</Text>
              <TouchableOpacity className="bg-red-600 py-3 rounded-lg flex-row items-center justify-center">
                <Plus size={20} color="white" />
                <Text className="text-white font-bold text-base ml-2">
                  Add to Cart - ${categorizedMenu['Featured'][0].price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Navigation Tabs (Menu, Reviews, Info) - Optional, but good for Netflix feel */}
          <View className="flex-row mb-6">
            <TouchableOpacity className="mr-6 pb-2 border-b-2 border-red-600">
              <Text className="text-red-600 font-bold text-base">Featured</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-6 pb-2">
              <Text className="text-gray-400 font-medium text-base">Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity className="pb-2">
              <Text className="text-gray-400 font-medium text-base">Reviews</Text>
            </TouchableOpacity>
          </View>


          {/* Food Categories as "Episodes" */}
          {categories.map((category) => (
            <View key={category} className="mb-8">
              <Text className="text-xl font-bold text-white mb-3">{category}</Text>
              <FlatList
                horizontal
                data={categorizedMenu[category]}
                renderItem={renderFoodItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="pr-4" // Add some padding to the right
              />
            </View>
          ))}

        </View>
      </ScrollView>

      {/* Bottom Navigation (Simplified for this example) */}
      <View className="flex-row justify-around p-4 border-t border-zinc-800 bg-zinc-900">
        <TouchableOpacity className="items-center">
          <Text className="text-red-600">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Text className="text-gray-400">Search</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center relative">
          <Text className="text-gray-400">Cart</Text>
          <View className="absolute -top-1 -right-1 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center">
            <Text className="text-white text-xs">3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Text className="text-gray-400">Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProviderDetailScreen;