import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Clock,
  Users,
  Flame,
  BookmarkPlus,
  Share2,
  Play,
  CheckCircle,
  Circle,
  ChefHat,
  Star,
  MessageCircle,
  Heart,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { mockRecipe } from '@/src/constants/example';

const { width, height } = Dimensions.get('window');

const RecipeDetailScreen = () => {
  const [checkedSteps, setCheckedSteps] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'recipe' | 'reviews'>('recipe');
  const scrollY = useRef(new Animated.Value(0)).current;

  const toggleStep = (stepId: string) => {
    setCheckedSteps(prev =>
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View className="flex-1 bg-black">
      {/* Floating Header */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: headerOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.95)'],
          }),
        }}
      >
        <SafeAreaView>
          <View className="px-6 py-4 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.canGoBack() ? router.back() : router.navigate('/')}
              className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
            >
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <Animated.Text style={{ opacity: headerOpacity }} className="text-white font-bold text-lg">
              Recipe
            </Animated.Text>
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => setIsSaved(!isSaved)}
                className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
              >
                <BookmarkPlus size={20} color="white" fill={isSaved ? 'white' : 'none'} />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center">
                <Share2 size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Image with Video Button */}
        <View style={{ height: height * 0.45 }} className="relative">
          <Image
            source={{ uri: mockRecipe.image }}
            style={{ width: width, height: height * 0.45 }}
            resizeMode="cover"
          />

          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.8)']}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: height * 0.45,
            }}
          />

          {/* Play Video Button */}
          <TouchableOpacity className="absolute inset-0 items-center justify-center">
            <View className="w-20 h-20 bg-red-600 rounded-full items-center justify-center">
              <Play size={32} color="white" fill="white" />
            </View>
            <Text className="text-white font-bold mt-3 text-lg">Watch Tutorial</Text>
          </TouchableOpacity>
        </View>

        {/* Recipe Header */}
        <View className="px-6 py-6">
          <Text className="text-white text-3xl font-bold mb-3">
            {mockRecipe.title}
          </Text>

          {/* Stats Row */}
          <View className="flex-row items-center flex-wrap mb-4">
            <View className="flex-row items-center bg-zinc-900 px-3 py-2 rounded-full mr-2 mb-2">
              <Clock size={16} color="#10b981" />
              <Text className="text-white ml-2 font-semibold text-sm">
                {mockRecipe.cookTime}
              </Text>
            </View>
            <View className="flex-row items-center bg-zinc-900 px-3 py-2 rounded-full mr-2 mb-2">
              <Users size={16} color="#3b82f6" />
              <Text className="text-white ml-2 font-semibold text-sm">
                {mockRecipe.servings} servings
              </Text>
            </View>
            <View className="flex-row items-center bg-zinc-900 px-3 py-2 rounded-full mr-2 mb-2">
              <Flame size={16} color="#f59e0b" />
              <Text className="text-white ml-2 font-semibold text-sm">
                {mockRecipe.difficulty}
              </Text>
            </View>
            <View className="flex-row items-center bg-zinc-900 px-3 py-2 rounded-full mb-2">
              <Text className="text-white font-semibold text-sm">
                {mockRecipe.calories} cal
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text className="text-gray-300 text-base leading-6 mb-6">
            {mockRecipe.description}
          </Text>

          {/* Chef Card */}
          <LinearGradient
            colors={['#1f1f1f', '#0a0a0a']}
            className="rounded-2xl p-4 mb-6"
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: mockRecipe.chef.image }}
                className="w-16 h-16 rounded-full border-2 border-red-600"
              />
              <View className="flex-1 ml-4">
                <View className="flex-row items-center mb-1">
                  <Text className="text-white font-bold text-lg">
                    {mockRecipe.chef.name}
                  </Text>
                  <View className="ml-2 w-5 h-5 bg-blue-500 rounded-full items-center justify-center">
                    <Text className="text-white text-xs font-bold">✓</Text>
                  </View>
                </View>
                <Text className="text-gray-400 text-sm mb-2">
                  {mockRecipe.chef.specialty}
                </Text>
                <Text className="text-gray-500 text-xs">
                  {mockRecipe.chef.bio}
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Tab Navigation */}
          <View className="flex-row mb-6">
            <TouchableOpacity
              onPress={() => setActiveTab('recipe')}
              className="flex-1 pb-3"
            >
              <Text
                className={`font-bold text-center text-lg ${
                  activeTab === 'recipe' ? 'text-red-600' : 'text-gray-400'
                }`}
              >
                Recipe
              </Text>
              {activeTab === 'recipe' && (
                <View className="h-1 bg-red-600 rounded-full mt-2" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('reviews')}
              className="flex-1 pb-3"
            >
              <Text
                className={`font-bold text-center text-lg ${
                  activeTab === 'reviews' ? 'text-red-600' : 'text-gray-400'
                }`}
              >
                Reviews ({mockRecipe.reviews.length})
              </Text>
              {activeTab === 'reviews' && (
                <View className="h-1 bg-red-600 rounded-full mt-2" />
              )}
            </TouchableOpacity>
          </View>

          {activeTab === 'recipe' ? (
            <>
              {/* Ingredients Section */}
              <View className="mb-6">
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-white text-2xl font-bold">Ingredients</Text>
                  <View className="flex-row items-center bg-red-600/20 px-3 py-2 rounded-full">
                    <Users size={16} color="#ef4444" />
                    <Text className="text-red-500 ml-2 font-bold">
                      {mockRecipe.servings} servings
                    </Text>
                  </View>
                </View>

                <View className="bg-zinc-900 rounded-2xl p-5">
                  {mockRecipe.ingredients.map((ingredient, index) => (
                    <View key={ingredient.id}>
                      <View className="flex-row items-center justify-between py-3">
                        <View className="flex-1">
                          <Text className="text-white font-semibold">
                            {ingredient.item}
                          </Text>
                          <Text className="text-gray-400 text-sm mt-1">
                            {ingredient.category}
                          </Text>
                        </View>
                        <Text className="text-red-500 font-bold">
                          {ingredient.amount}
                        </Text>
                      </View>
                      {index < mockRecipe.ingredients.length - 1 && (
                        <View className="h-px bg-zinc-800" />
                      )}
                    </View>
                  ))}
                </View>
              </View>

              {/* Instructions Section */}
              <View className="mb-6">
                <Text className="text-white text-2xl font-bold mb-4">
                  Step-by-Step Instructions
                </Text>

                {mockRecipe.steps.map((step, index) => (
                  <View key={step.id} className="mb-6">
                    <TouchableOpacity
                      onPress={() => toggleStep(step.id)}
                      className="bg-zinc-900 rounded-2xl overflow-hidden"
                    >
                      {/* Step Image */}
                      <Image
                        source={{ uri: step.image }}
                        style={{ width: '100%', height: 200 }}
                        resizeMode="cover"
                      />

                      <View className="p-5">
                        {/* Step Header */}
                        <View className="flex-row items-center justify-between mb-3">
                          <View className="flex-row items-center flex-1">
                            <View
                              className={`w-8 h-8 rounded-full items-center justify-center ${
                                checkedSteps.includes(step.id)
                                  ? 'bg-green-600'
                                  : 'bg-zinc-800'
                              }`}
                            >
                              {checkedSteps.includes(step.id) ? (
                                <CheckCircle size={20} color="white" />
                              ) : (
                                <Text className="text-white font-bold">
                                  {index + 1}
                                </Text>
                              )}
                            </View>
                            <Text className="text-white font-bold text-lg ml-3 flex-1">
                              {step.title}
                            </Text>
                          </View>
                          <View className="flex-row items-center bg-zinc-800 px-3 py-1 rounded-full">
                            <Clock size={14} color="#9ca3af" />
                            <Text className="text-gray-400 text-sm ml-1">
                              {step.time}
                            </Text>
                          </View>
                        </View>

                        {/* Step Description */}
                        <Text className="text-gray-300 leading-6 mb-4">
                          {step.description}
                        </Text>

                        {/* Pro Tips */}
                        {step.tips && step.tips.length > 0 && (
                          <View className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-4">
                            <View className="flex-row items-center mb-2">
                              <ChefHat size={16} color="#d97706" />
                              <Text className="text-amber-500 font-bold ml-2">
                                Pro Tips
                              </Text>
                            </View>
                            {step.tips.map((tip, tipIndex) => (
                              <Text key={tipIndex} className="text-amber-200 text-sm leading-5 mb-1">
                                • {tip}
                              </Text>
                            ))}
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {/* Nutrition Facts */}
              <View className="mb-6">
                <Text className="text-white text-2xl font-bold mb-4">
                  Nutrition Facts
                </Text>
                <View className="bg-zinc-900 rounded-2xl p-5">
                  <Text className="text-gray-400 text-sm mb-4">Per serving</Text>
                  {mockRecipe.nutritionFacts.map((fact, index) => (
                    <View key={index}>
                      <View className="flex-row items-center justify-between py-3">
                        <Text className="text-white font-semibold">
                          {fact.label}
                        </Text>
                        <Text className="text-gray-400 font-bold">
                          {fact.value}
                        </Text>
                      </View>
                      {index < mockRecipe.nutritionFacts.length - 1 && (
                        <View className="h-px bg-zinc-800" />
                      )}
                    </View>
                  ))}
                </View>
              </View>
            </>
          ) : (
            /* Reviews Section */
            <View className="mb-6">
              {/* Rating Summary */}
              <View className="bg-zinc-900 rounded-2xl p-5 mb-4">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-white text-4xl font-bold mb-1">
                      {mockRecipe.rating}
                    </Text>
                    <View className="flex-row items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          color="#FFD700"
                          fill="#FFD700"
                        />
                      ))}
                    </View>
                    <Text className="text-gray-400 text-sm">
                      Based on {mockRecipe.reviews.length} reviews
                    </Text>
                  </View>
                  <TouchableOpacity className="bg-red-600 px-6 py-3 rounded-full">
                    <Text className="text-white font-bold">Write Review</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Individual Reviews */}
              {mockRecipe.reviews.map(review => (
                <View key={review.id} className="bg-zinc-900 rounded-2xl p-5 mb-3">
                  <View className="flex-row items-start mb-3">
                    <Image
                      source={{ uri: review.avatar }}
                      className="w-12 h-12 rounded-full"
                    />
                    <View className="flex-1 ml-3">
                      <Text className="text-white font-bold mb-1">
                        {review.userName}
                      </Text>
                      <View className="flex-row items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            color={i < review.rating ? "#FFD700" : "#3f3f46"}
                            fill={i < review.rating ? "#FFD700" : "none"}
                          />
                        ))}
                        <Text className="text-gray-400 text-xs ml-2">
                          {review.date}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text className="text-gray-300 leading-6 mb-3">
                    {review.comment}
                  </Text>
                  <TouchableOpacity className="flex-row items-center">
                    <Text className="text-gray-500 text-sm">
                      {review.helpful} people found this helpful
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <View className="h-32" />
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6">
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.95)']}
          className="absolute top-0 left-0 right-0 h-32"
        />
        <TouchableOpacity className="bg-red-600 rounded-full py-4 flex-row items-center justify-center">
          <ChefHat size={20} color="white" />
          <Text className="text-white font-bold text-lg ml-2">
            Start Cooking
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecipeDetailScreen;