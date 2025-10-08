import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Clock,
  Users,
  Flame,
  BookmarkPlus,
  Play,
  ChefHat,
  Star,
} from 'lucide-react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const mockRecipes = [
  {
    id: '1',
    title: 'Perfect Sushi Rolls',
    chef: 'Chef Takeshi Yamamoto',
    chefImage: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=200',
    image: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=2670',
    cookTime: '45 min',
    difficulty: 'Advanced',
    servings: 4,
    rating: 4.9,
    views: '2.3M',
    category: 'Japanese',
    featured: true,
  },
  {
    id: '2',
    title: 'Wagyu Beef Teppanyaki',
    chef: 'Chef Marcus Chen',
    chefImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=200',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2670',
    cookTime: '30 min',
    difficulty: 'Intermediate',
    servings: 2,
    rating: 4.8,
    views: '1.8M',
    category: 'Japanese',
  },
  {
    id: '3',
    title: 'Artisan Ramen Bowl',
    chef: 'Chef Yuki Tanaka',
    chefImage: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?q=80&w=200',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=2670',
    cookTime: '60 min',
    difficulty: 'Advanced',
    servings: 4,
    rating: 4.9,
    views: '3.1M',
    category: 'Japanese',
  },
  {
    id: '4',
    title: 'Tempura Mastery',
    chef: 'Chef Hiro Nakamura',
    chefImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200',
    image: 'https://images.unsplash.com/photo-1628120614833-289b70b33a76?q=80&w=2670',
    cookTime: '25 min',
    difficulty: 'Beginner',
    servings: 3,
    rating: 4.7,
    views: '950K',
    category: 'Japanese',
  },
];

const categories = [
  { id: '1', name: 'All', icon: '🍱' },
  { id: '2', name: 'Japanese', icon: '🍣' },
  { id: '3', name: 'Italian', icon: '🍝' },
  { id: '4', name: 'Mexican', icon: '🌮' },
  { id: '5', name: 'Desserts', icon: '🍰' },
];

const RecipeDiscoveryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const toggleSave = (id: string) => {
    setSavedRecipes(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const featuredRecipe = mockRecipes[0];

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        {/* Floating Header */}
        <View className="px-6 py-4 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.canGoBack() ? router.back() : router.navigate('/') }
            className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-row items-center">
            <ChefHat size={24} color="#ef4444" />
            <Text className="text-white text-2xl font-bold ml-2">Recipes</Text>
          </View>
          <View className="w-10" />
        </View>

        <Animated.ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* Hero Featured Recipe */}
          <View style={{ height: height * 0.6 }} className="mb-6">
            <Image
              source={{ uri: featuredRecipe.image }}
              style={{ width: width, height: height * 0.6 }}
              resizeMode="cover"
            />

            <LinearGradient
              colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.95)']}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: height * 0.6,
              }}
            />

            {/* Featured Badge */}
            <View className="absolute top-4 left-6">
              <LinearGradient
                colors={['#dc2626', '#7f1d1d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="px-4 py-2 rounded-full"
              >
                <Text className="text-white font-bold text-sm">
                  ⭐ FEATURED RECIPE
                </Text>
              </LinearGradient>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={() => toggleSave(featuredRecipe.id)}
              className="absolute top-4 right-6 w-12 h-12 bg-black/50 rounded-full items-center justify-center"
            >
              <BookmarkPlus
                size={24}
                color="white"
                fill={savedRecipes.includes(featuredRecipe.id) ? 'white' : 'none'}
              />
            </TouchableOpacity>

            {/* Content */}
            <View className="absolute bottom-0 left-0 right-0 p-6">
              {/* Chef Info */}
              <View className="flex-row items-center mb-3">
                <Image
                  source={{ uri: featuredRecipe.chefImage }}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <Text className="text-white font-semibold ml-2">
                  {featuredRecipe.chef}
                </Text>
                <View className="flex-row items-center ml-auto bg-black/50 px-3 py-1 rounded-full">
                  <Star size={14} color="#FFD700" fill="#FFD700" />
                  <Text className="text-white font-bold ml-1">
                    {featuredRecipe.rating}
                  </Text>
                </View>
              </View>

              <Text className="text-white text-3xl font-bold mb-3">
                {featuredRecipe.title}
              </Text>

              {/* Recipe Stats */}
              <View className="flex-row items-center mb-4 flex-wrap">
                <View className="flex-row items-center bg-black/50 px-3 py-2 rounded-full mr-2 mb-2">
                  <Clock size={16} color="#10b981" />
                  <Text className="text-white ml-2 font-semibold">
                    {featuredRecipe.cookTime}
                  </Text>
                </View>
                <View className="flex-row items-center bg-black/50 px-3 py-2 rounded-full mr-2 mb-2">
                  <Users size={16} color="#3b82f6" />
                  <Text className="text-white ml-2 font-semibold">
                    {featuredRecipe.servings} servings
                  </Text>
                </View>
                <View className="flex-row items-center bg-black/50 px-3 py-2 rounded-full mb-2">
                  <Flame size={16} color="#f59e0b" />
                  <Text className="text-white ml-2 font-semibold">
                    {featuredRecipe.difficulty}
                  </Text>
                </View>
              </View>

              {/* CTA Button */}
              <TouchableOpacity 
               onPress={()=> router.push('/recipe-details')}
               className="bg-red-600 rounded-full py-4 flex-row items-center justify-center">
                <Play size={20} color="white" fill="white" />
                <Text className="text-white font-bold text-lg ml-2">
                  Start Cooking
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Categories */}
          <View className="mb-6">
            <Text className="text-white text-2xl font-bold px-6 mb-4">
              Browse by Cuisine
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            >
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setSelectedCategory(category.name)}
                  className={`mr-3 px-5 py-3 rounded-full flex-row items-center gap-2 ${
                    selectedCategory === category.name
                      ? 'bg-red-600'
                      : 'bg-zinc-900'
                  }`}
                >
                  <Text className="text-2xl mb-1">{category.icon}</Text>
                  <Text
                    className={`text-sm font-semibold ${
                      selectedCategory === category.name
                        ? 'text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Popular Recipes Grid */}
          <View className="px-6 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white text-2xl font-bold">
                Popular Recipes
              </Text>
              <TouchableOpacity>
                <Text className="text-red-500 font-semibold">See All</Text>
              </TouchableOpacity>
            </View>

            {mockRecipes.slice(1).map(recipe => (
              <TouchableOpacity
                key={recipe.id}
                onPress={()=> router.push('/recipe-details')}
                className="bg-zinc-900 rounded-2xl mb-4 overflow-hidden"
                activeOpacity={0.9}
              >
                <View className="flex-row">
                  <Image
                    source={{ uri: recipe.image }}
                    style={{ width: 120, height: 140 }}
                    resizeMode="cover"
                  />

                  <View className="flex-1 p-4">
                    <View className="flex-row items-start justify-between mb-2">
                      <Text className="text-white font-bold text-base flex-1 mr-2">
                        {recipe.title}
                      </Text>
                      <TouchableOpacity
                        onPress={() => toggleSave(recipe.id)}
                      >
                        <BookmarkPlus
                          size={20}
                          color="white"
                          fill={savedRecipes.includes(recipe.id) ? 'white' : 'none'}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Chef */}
                    <View className="flex-row items-center mb-3">
                      <Image
                        source={{ uri: recipe.chefImage }}
                        className="w-6 h-6 rounded-full"
                      />
                      <Text className="text-gray-400 text-xs ml-2">
                        {recipe.chef}
                      </Text>
                    </View>

                    {/* Stats */}
                    <View className="flex-row items-center flex-wrap">
                      <View className="flex-row items-center mr-3 mb-1">
                        <Clock size={12} color="#9ca3af" />
                        <Text className="text-gray-400 text-xs ml-1">
                          {recipe.cookTime}
                        </Text>
                      </View>
                      <View className="flex-row items-center mr-3 mb-1">
                        <Star size={12} color="#FFD700" fill="#FFD700" />
                        <Text className="text-white text-xs font-bold ml-1">
                          {recipe.rating}
                        </Text>
                      </View>
                      <View className="flex-row items-center mb-1">
                        <Play size={12} color="#9ca3af" />
                        <Text className="text-gray-400 text-xs ml-1">
                          {recipe.views}
                        </Text>
                      </View>
                    </View>

                    {/* Difficulty Badge */}
                    <View className="mt-2">
                      <View
                        className={`self-start px-2 py-1 rounded ${
                          recipe.difficulty === 'Beginner'
                            ? 'bg-green-600/20'
                            : recipe.difficulty === 'Intermediate'
                            ? 'bg-yellow-600/20'
                            : 'bg-red-600/20'
                        }`}
                      >
                        <Text
                          className={`text-xs font-bold ${
                            recipe.difficulty === 'Beginner'
                              ? 'text-green-400'
                              : recipe.difficulty === 'Intermediate'
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}
                        >
                          {recipe.difficulty}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Trending This Week */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between px-6 mb-4">
              <Text className="text-white text-2xl font-bold">
                🔥 Trending This Week
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            >
              {mockRecipes.map((recipe, index) => (
                <TouchableOpacity
                  key={recipe.id + '-trending'}
                  className="mr-4"
                  style={{ width: width * 0.7 }}
                >
                  <View className="bg-zinc-900 rounded-2xl overflow-hidden">
                    <Image
                      source={{ uri: recipe.image }}
                      style={{ width: '100%', height: 180 }}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.8)']}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 100,
                      }}
                    />
                    <View className="absolute bottom-0 left-0 right-0 p-4">
                      <Text className="text-white font-bold text-lg mb-1">
                        {recipe.title}
                      </Text>
                      <View className="flex-row items-center">
                        <Star size={14} color="#FFD700" fill="#FFD700" />
                        <Text className="text-white font-bold ml-1">
                          {recipe.rating}
                        </Text>
                        <Text className="text-gray-400 ml-2 text-sm">
                          • {recipe.views} views
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="h-24" />
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default RecipeDiscoveryScreen;