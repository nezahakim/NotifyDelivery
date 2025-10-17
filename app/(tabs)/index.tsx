import { CategoriesComponent } from "@/src/components/home/categories";
import { ProductsComponent } from "@/src/components/home/products";
import { SearchComponent } from "@/src/components/home/search";
import { restaurants } from "@/src/constants/example";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeroSection from "@/src/components/home/hero";
import { withScrollContext } from "@/src/components/with-scroll-context";
import { Star } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const heroAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  // Featured restaurants for hero section
  const featuredRestaurants = restaurants.slice(0, 3);

  useEffect(() => {
    // Hero animation
    Animated.timing(heroAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Auto-rotate hero every 5 seconds
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % featuredRestaurants.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentHero = featuredRestaurants[currentHeroIndex] as any;

  return (
    <View className="flex-1 bg-black">
      <Animated.ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        bounces={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section - Netflix Style */}
        <HeroSection
          currentHero={currentHero}
          currentHeroIndex={currentHeroIndex}
          featuredRestaurants={featuredRestaurants}
          heroAnim={heroAnim}
          router={router}
        />

        {/* Search Section */}
        <SearchComponent />

        {/* Categories Section - Netflix Row Style */}
        <View className="py-4">
          <Text className="text-2xl font-bold text-white px-6 mb-4">
            Browse by Category
          </Text>
          <CategoriesComponent
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </View>

        {/* Featured This Week */}
        <View className="py-4">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text className="text-2xl font-bold text-white">
              Featured This Week
            </Text>
            <TouchableOpacity>
              <Text className="text-red-500 font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          <HorizontalRestaurantRow restaurants={restaurants.slice(0, 5)} />
        </View>

        {/* Popular Dishes */}
        <View className="py-4">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text className="text-2xl font-bold text-white">
              Popular Dishes
            </Text>
            <TouchableOpacity>
              <Text className="text-red-500 font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          <ProductsComponent category={selectedCategory} />
        </View>

        {/* Top Rated */}
        <View className="py-4">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text className="text-2xl font-bold text-white">Top Rated</Text>
            <TouchableOpacity>
              <Text className="text-red-500 font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          <HorizontalRestaurantRow restaurants={restaurants.slice(2, 7)} />
        </View>

        {/* Near You */}
        <View className="py-4 pb-8">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <View className="flex-row items-center">
              <Ionicons name="location" size={24} color="#ef4444" />
              <Text className="text-2xl font-bold text-white ml-2">
                Near You
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-red-500 font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          <HorizontalRestaurantRow restaurants={restaurants.slice(3, 8)} />
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </Animated.ScrollView>
    </View>
  );
};

const HorizontalRestaurantRow = ({ restaurants }: any) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      className="flex-row"
    >
      {restaurants.map((restaurant: any, index: number) => (
        <TouchableOpacity
          key={restaurant.id || index}
          onPress={() => router.push("/provider")}
          className="mr-4"
          style={{ width: width * 0.42 }}
          activeOpacity={0.9}
        >
          <View className="bg-zinc-900 rounded-lg overflow-hidden">
            <Image
              source={{ uri: restaurant.image }}
              style={{ width: "100%", height: 140 }}
              resizeMode="cover"
            />

            {/* Rating Badge */}
            <View className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded flex-row items-center">
              <Star size={12} color='#FFD700' className="text-[#FFD700]" />
              <Text className="text-white text-xs font-bold ml-1">
                {restaurant.rating || "4.8"}
              </Text>
            </View>

            <View className="p-3">
              <Text
                className="text-white font-bold text-sm mb-1"
                numberOfLines={1}
              >
                {restaurant.name}
              </Text>
              <Text className="text-gray-400 text-xs mb-2" numberOfLines={1}>
                {restaurant.cuisine}
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={12} color="#9ca3af" />
                <Text className="text-gray-400 text-xs ml-1">25-35 min</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default withScrollContext(HomeScreen);