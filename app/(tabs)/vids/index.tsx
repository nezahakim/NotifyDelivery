import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Clock,
  TrendingUp,
  Sparkles,
} from 'lucide-react-native';
import { mockVideos } from '@/src/constants/example';

import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const ChefVidsScreen = () => {
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleLike = (videoId: string) => {
    setLikedVideos(prev =>
      prev.includes(videoId) ? prev.filter(id => id !== videoId) : [...prev, videoId]
    );
  };

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = event.nativeEvent.layoutMeasurement.height;
      const index = Math.round(event.nativeEvent.contentOffset.y / slideSize);
      setCurrentIndex(index);
    },
    []
  );

  const renderVideoItem = ({ item: video, index }: { item: typeof mockVideos[0], index: number }) => (
    <View style={{ height: height, width: width }} className="relative bg-black">
      {/* Video Background - Using thumbnail as placeholder */}
      <Image
        source={{ uri: video.thumbnail }}
        style={{ width: width, height: height }}
        resizeMode="cover"
        className="absolute inset-0"
      />

      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.7)']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Top Header */}
      <SafeAreaView className="absolute top-0 left-0 right-0 z-10">
        <View className="px-6 py-4 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.canGoBack() ? router.back() : router.navigate('/')}
            className="w-10 h-10 bg-zinc-900/60 rounded-full items-center justify-center"
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-row items-center">
            <Sparkles size={22} color="#ef4444" />
            <Text className="text-white text-xl font-bold ml-2">Chef Vids</Text>
          </View>
          <View className="flex-row items-center justify-center gap-2 bg-zinc-900/60 rounded-full">
            <Clock size={18} color="white" />
            <Text className="text-white text-xs font-bold">
              {video.duration}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Play Button - Centered */}
      <View className="absolute inset-0 items-center justify-center z-0">
        <View className="w-20 h-20 bg-red-600/70 rounded-full items-center justify-center">
          <Play size={32} color="white" fill="white" />
        </View>
      </View>

      {/* Bottom Left UI (Chef Info, Video Title) */}
      <View className="absolute bottom-5 left-0 right-0 px-4 z-10">
        {/* Chef Info */}
        <View className="flex-row items-center mb-3">
          <Image
            source={{ uri: video.chefImage }}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <Text className="text-white font-bold text-lg ml-3">
            {video.chef}
          </Text>
          
        </View>

        {/* Video Title & Stats */}
        <Text className="text-white text-2xl font-bold mb-1 line-clamp-2 w-[90%]">
          {video.title}
        </Text>
        <View className="flex-row items-center">
          <Eye size={16} color="#d4d4d8" />
          <Text className="text-zinc-300 text-sm ml-1">
            {video.views} views
          </Text>
          <Text className="text-zinc-500 text-sm mx-2">•</Text>
          <Clock size={16} color="#d4d4d8" />
          <Text className="text-zinc-300 text-sm ml-1">
            {video.uploadDate}
          </Text>
        </View>
      </View>

      {/* Right Side Interaction Buttons */}
      <View className="absolute bottom-5 right-2.5 z-10 items-center">
        <TouchableOpacity
          onPress={() => toggleLike(video.id)}
          className="mb-6 items-center"
        >
          <Heart
            size={36}
            color={likedVideos.includes(video.id) ? '#ef4444' : 'white'}
            fill={likedVideos.includes(video.id) ? '#ef4444' : 'none'}
            strokeWidth={1.5}
          />
          <Text className="text-white font-bold text-sm mt-1">
            {video.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mb-6 items-center">
          <MessageCircle size={36} color="white" strokeWidth={1.5} />
          <Text className="text-white font-bold text-sm mt-1">
            {video.comments}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Share2 size={36} color="white" strokeWidth={1.5} />
          <Text className="text-white font-bold text-sm mt-1">
            {video.shares}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar (Subtle, at the very bottom) */}
      <View className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <View
          style={{ width: `${(index / mockVideos.length) * 100}%` }} // Simplified progress
          className="h-full bg-red-500"
        />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-black">
      <FlatList
        ref={flatListRef}
        data={mockVideos}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default ChefVidsScreen;