import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, Modal, Dimensions } from 'react-native';
import { ChevronLeft, Heart, Share2, Star, Plus, Minus, X, Clock, MapPin, Phone, Award, ChevronRight } from 'lucide-react-native';
import { AddToCartModal } from '@/src/components/add-to-cart';
import { mockRestaurant } from '@/src/constants/example';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');


const ProviderDetailScreen = () => {
  const [selectedTab, setSelectedTab] = useState('featured');
  const [selectedItem, setSelectedItem] = useState(null) as any;
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartItems, setCartItems] = useState({}) as any;

  const restaurant = mockRestaurant;

  const categorizedMenu = restaurant.menu.reduce((acc: any, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(categorizedMenu);
  const featuredItems = restaurant.menu.filter(item => item.featured) as any;

  const handleAddToCart = (item: { id: string; name: string; description: string; price: number; imageUrl: string; category: string; featured: boolean; badge: string; } | { id: string; name: string; description: string; price: number; imageUrl: string; category: string; featured?: undefined; badge?: undefined; } | { id: string; name: string; description: string; price: number; imageUrl: string; category: string; badge: string; featured?: undefined; }, qty: number) => {
    setCartItems((prev:any) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + qty
    }));
    setSelectedItem(null);
    setQuantity(1);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum:any, qty: any) => sum + qty, 0) as any;
  };

  const renderFoodItem = ({ item }: any) => {
    const isInCart = cartItems[item.id] > 0;
    
    return (
      <TouchableOpacity 
        onPress={() => setSelectedItem(item)}
        className="mr-4 bg-zinc-900 rounded-xl overflow-hidden"
        style={{ width: 160 }}
      >
        <View className="relative">
          <Image 
            source={{ uri: item.imageUrl }} 
            className="w-full h-32" 
            resizeMode="cover"
          />
          {item.badge && (
            <View className="absolute top-2 left-2 bg-red-600 px-1.5 py-0.5 rounded-full">
              <Text className="text-white text-xs font-bold">{item.badge}</Text>
            </View>
          )}
          {isInCart && (
            <View className="absolute top-2 right-2 bg-green-600 w-6 h-6 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">{cartItems[item.id]}</Text>
            </View>
          )}
        </View>
        <View className="p-3">
          <Text className="text-white font-semibold text-sm mb-1" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-gray-400 text-xs mb-2" numberOfLines={2}>
            {item.description}
          </Text>
          <Text className="text-white font-bold">${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderReview = ({ item }: any) => (
    <View className="bg-zinc-900 rounded-xl p-4 mb-3">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-white font-bold mb-1">{item.userName}</Text>
          <View className="flex-row items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                color={i < item.rating ? "#FFD700" : "#3f3f46"}
                fill={i < item.rating ? "#FFD700" : "none"}
              />
            ))}
            <Text className="text-gray-400 text-xs ml-2">{item.date}</Text>
          </View>
        </View>
      </View>
      <Text className="text-gray-300 text-sm mb-2">{item.comment}</Text>
      <Text className="text-gray-500 text-xs">{item.helpful} people found this helpful</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-black">
      <ScrollView className="flex-1">
        {/* Hero Header */}
        <View className="relative w-full" style={{ height: height * 0.5 }}>
          <Image 
            source={{ uri: restaurant.coverImageUrl }} 
            className="w-full h-full" 
            resizeMode="cover" 
          />

<LinearGradient
  colors={[
    'rgba(0, 0, 0, 0.6)',    
    'transparent',           
    'rgba(0, 0, 0, 1)', 
  ]}
  locations={[0, 0.5, 1]}
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }}
/>
                      
          {/* Top Navigation */}
          <View className="absolute top-12 left-0 right-0 px-4 flex-row justify-between items-center">
            <TouchableOpacity className="w-10 h-10 bg-black/50 rounded-full items-center justify-center"
            onPress={()=> router.canGoBack() ? router.back() : router.navigate('/') }>
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <View className="flex-row">
              <TouchableOpacity className="w-10 h-10 bg-black/50 rounded-full items-center justify-center mr-2">
                <Share2 size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setIsFavorite(!isFavorite)}
                className="w-10 h-10 bg-black/50 rounded-full items-center justify-center"
              >
                <Heart size={20} color="white" fill={isFavorite ? "white" : "none"} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Restaurant Info Overlay */}
          <View className="absolute bottom-0 left-0 right-0 p-6">
            <View className="flex-row items-center mb-2">
              {restaurant.tags.map((tag, index) => (
                <View key={index} className="bg-red-600 px-1.5 py-0.5 rounded-full mr-2">
                  <Text className="text-white text-xs font-bold">{tag}</Text>
                </View>
              ))}
            </View>
            <Text className="text-white text-4xl font-bold mb-2">{restaurant.name}</Text>
            <View className="flex-row items-center flex-wrap">
              <View className="flex-row items-center mr-4 mb-2">
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text className="text-white ml-1 font-bold">{restaurant.rating}</Text>
                <Text className="text-gray-400 ml-1">({restaurant.totalReviews})</Text>
              </View>
              <View className="flex-row items-center mr-4 mb-2">
                <Clock size={16} color="#9ca3af" />
                <Text className="text-gray-400 ml-1">{restaurant.deliveryTime}</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Text className="text-gray-400">Delivery ${restaurant.deliveryFee}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row px-6 py-4 border-b border-zinc-800">
          {[
            { id: 'featured', label: 'Featured' },
            { id: 'menu', label: 'Menu' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'info', label: 'Info' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className="mr-6"
            >
              <Text 
                className={`font-bold text-base pb-2 ${
                  selectedTab === tab.id ? 'text-red-600' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </Text>
              {selectedTab === tab.id && (
                <View className="h-1 bg-red-600 rounded-full" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Content Based on Selected Tab */}
        <View className="px-6 py-4">
          {selectedTab === 'featured' && (
            <View>
              {/* Hero Featured Item */}
              {featuredItems[0] && (
                <TouchableOpacity 
                  onPress={() => setSelectedItem(featuredItems[0])}
                  className="bg-zinc-900 rounded-2xl overflow-hidden mb-6"
                >
                  <Image 
                    source={{ uri: featuredItems[0].imageUrl }} 
                    className="w-full h-48" 
                    resizeMode="cover" 
                  />
                  <View className="p-4">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-2xl font-bold text-white flex-1">
                        {featuredItems[0].name}
                      </Text>
                      {featuredItems[0].badge && (
                        <View className="bg-red-600 px-3 py-1 rounded-full">
                          <Text className="text-white text-xs font-bold">{featuredItems[0].badge}</Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-gray-400 mb-4">{featuredItems[0].description}</Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-white text-2xl font-bold">
                        ${featuredItems[0].price.toFixed(2)}
                      </Text>
                      <TouchableOpacity 
                        onPress={() => handleAddToCart(featuredItems[0], 1)}
                        className="bg-red-600 px-6 py-3 rounded-full flex-row items-center"
                      >
                        <Plus size={20} color="white" />
                        <Text className="text-white font-bold ml-2">Add to Cart</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}

              {/* Other Featured Items */}
              {featuredItems.length > 1 && (
                <View>
                  <Text className="text-xl font-bold text-white mb-4">More Featured</Text>
                  <FlatList
                    horizontal
                    data={featuredItems.slice(1)}
                    renderItem={renderFoodItem}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}
            </View>
          )}

          {selectedTab === 'menu' && (
            <View>
              {categories.map((category) => (
                <View key={category} className="mb-8">
                  <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-2xl font-bold text-white">{category}</Text>
                    <ChevronRight size={24} color="#9ca3af" />
                  </View>
                  <FlatList
                    horizontal
                    data={categorizedMenu[category]}
                    renderItem={renderFoodItem}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              ))}
            </View>
          )}

          {selectedTab === 'reviews' && (
            <View>
              <View className="flex-row items-center justify-between mb-6">
                <View>
                  <Text className="text-3xl font-bold text-white">{restaurant.rating}</Text>
                  <View className="flex-row items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        color="#FFD700"
                        fill="#FFD700"
                      />
                    ))}
                  </View>
                  <Text className="text-gray-400 text-sm mt-1">
                    Based on {restaurant.totalReviews} reviews
                  </Text>
                </View>
              </View>
              <FlatList
                data={restaurant.reviews}
                renderItem={renderReview}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          )}

          {selectedTab === 'info' && (
            <View>
              <View className="bg-zinc-900 rounded-2xl p-5 mb-4">
                <View className="flex-row items-center mb-4">
                  <Award size={24} color="#ef4444" />
                  <Text className="text-xl font-bold text-white ml-3">About</Text>
                </View>
                <Text className="text-gray-300 leading-6 mb-4">{restaurant.about}</Text>
                <Text className="text-gray-400 text-sm italic">{restaurant.description}</Text>
              </View>

              <View className="bg-zinc-900 rounded-2xl p-5 mb-4">
                <Text className="text-xl font-bold text-white mb-4">Details</Text>
                
                <View className="flex-row items-start mb-4">
                  <MapPin size={20} color="#9ca3af" />
                  <View className="ml-3 flex-1">
                    <Text className="text-white font-semibold mb-1">Address</Text>
                    <Text className="text-gray-400">{restaurant.address}</Text>
                  </View>
                </View>

                <View className="flex-row items-start mb-4">
                  <Phone size={20} color="#9ca3af" />
                  <View className="ml-3 flex-1">
                    <Text className="text-white font-semibold mb-1">Phone</Text>
                    <Text className="text-gray-400">{restaurant.phone}</Text>
                  </View>
                </View>

                <View className="flex-row items-start">
                  <Clock size={20} color="#9ca3af" />
                  <View className="ml-3 flex-1">
                    <Text className="text-white font-semibold mb-1">Hours</Text>
                    <Text className="text-gray-400">{restaurant.hours}</Text>
                  </View>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-2xl p-5">
                <Text className="text-xl font-bold text-white mb-4">Delivery Info</Text>
                <View className="flex-row justify-between mb-3">
                  <Text className="text-gray-400">Delivery Time</Text>
                  <Text className="text-white font-semibold">{restaurant.deliveryTime}</Text>
                </View>
                <View className="flex-row justify-between mb-3">
                  <Text className="text-gray-400">Delivery Fee</Text>
                  <Text className="text-white font-semibold">${restaurant.deliveryFee.toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-400">Minimum Order</Text>
                  <Text className="text-white font-semibold">${restaurant.minOrder.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Cart Button */}
      {getTotalCartItems() > 0 && (
        <View className="absolute bottom-6 left-6 right-6">
          <TouchableOpacity className="bg-red-600 rounded-full py-4 px-6 flex-row items-center justify-between shadow-lg">
            <View className="flex-row items-center">
              <View className="bg-white w-8 h-8 rounded-full items-center justify-center mr-3">
                <Text className="text-red-600 font-bold">{getTotalCartItems()}</Text>
              </View>
              <Text className="text-white font-bold text-lg">View Cart</Text>
            </View>
            <ChevronRight size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

{/* Model */} 
  <AddToCartModal
    visible={selectedItem !== null}
    item={selectedItem}
    onClose={() => setSelectedItem(null)}
    onAddToCart={handleAddToCart}
  />
    </View>
  );
};

export default ProviderDetailScreen;