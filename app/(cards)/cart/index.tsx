import React, { useState } from 'react';
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
import { ChevronLeft, Plus, Minus, Trash2, Tag, Clock, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock cart data
const mockCartItems = [
  {
    id: '1',
    name: "Chef's Omakase Platter",
    restaurant: 'Kyoji Sushi & Grill',
    price: 75.0,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=2670',
    customizations: ['Extra Wasabi', 'No Ginger'],
  },
  {
    id: '2',
    name: 'Dragon Roll',
    restaurant: 'Kyoji Sushi & Grill',
    price: 18.0,
    quantity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1596001007324-4f964082354e?q=80&w=2670',
    customizations: [],
  },
  {
    id: '3',
    name: 'Miso Soup',
    restaurant: 'Kyoji Sushi & Grill',
    price: 4.0,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1596645318041-0f74577f1540?q=80&w=2670',
    customizations: [],
  },
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 2.99;
  const discount = appliedPromo ? subtotal * 0.15 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal + deliveryFee - discount + tax;

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        {/* Premium Header */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.canGoBack() ? router.back() : router.navigate('/') }
              className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
            >
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <View className="flex-1 ml-4">
              <Text className="text-white text-2xl font-bold">Your Cart</Text>
              <Text className="text-gray-400 text-sm">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Delivery Info Card */}
          <View className="mx-6 mb-4">
            <LinearGradient
              colors={['#1f1f1f', '#0a0a0a']}
              className="rounded-2xl p-4"
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-red-600/20 rounded-full items-center justify-center">
                    <MapPin size={20} color="#ef4444" />
                  </View>
                  <View className="ml-3">
                    <Text className="text-white font-semibold">Delivery to</Text>
                    <Text className="text-gray-400 text-sm">Downtown, NY</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Text className="text-red-500 font-semibold">Change</Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-green-600/20 rounded-full items-center justify-center">
                  <Clock size={20} color="#10b981" />
                </View>
                <View className="ml-3">
                  <Text className="text-white font-semibold">Estimated Time</Text>
                  <Text className="text-gray-400 text-sm">25-35 minutes</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Cart Items */}
          <View className="px-6">
            <Text className="text-white text-xl font-bold mb-4">Order Items</Text>
            
            {cartItems.map((item, index) => (
              <Animated.View
                key={item.id}
                className="bg-zinc-900 rounded-2xl mb-3 overflow-hidden"
              >
                <View className="flex-row p-4">
                  {/* Item Image */}
                  <Image
                    source={{ uri: item.imageUrl }}
                    className="w-24 h-24 rounded-xl"
                    resizeMode="cover"
                  />

                  {/* Item Details */}
                  <View className="flex-1 ml-4">
                    <Text className="text-white font-bold text-base mb-1">
                      {item.name}
                    </Text>
                    <Text className="text-gray-400 text-xs mb-2">
                      {item.restaurant}
                    </Text>

                    {/* Customizations */}
                    {item.customizations.length > 0 && (
                      <View className="flex-row flex-wrap mb-2">
                        {item.customizations.map((custom, idx) => (
                          <View
                            key={idx}
                            className="bg-zinc-800 px-2 py-1 rounded mr-1 mb-1"
                          >
                            <Text className="text-gray-400 text-[10px]">
                              {custom}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Price and Quantity */}
                    <View className="flex-row items-center justify-between">
                      <Text className="text-white font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>

                      <View className="flex-row items-center bg-zinc-800 rounded-full">
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 items-center justify-center"
                        >
                          <Minus size={16} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white font-bold px-3">
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 items-center justify-center"
                        >
                          <Plus size={16} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Remove Button */}
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  className="border-t border-zinc-800 py-3 flex-row items-center justify-center"
                >
                  <Trash2 size={16} color="#ef4444" />
                  <Text className="text-red-500 font-semibold ml-2">Remove</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {/* Promo Code Section */}
          <View className="px-6 my-4">
            <LinearGradient
              colors={['#7f1d1d', '#991b1b', '#7f1d1d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl p-4"
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-white/10 rounded-full items-center justify-center">
                  <Tag size={20} color="white" />
                </View>
                <View className="flex-1 ml-3">
                  <Text className="text-white font-bold">Apply Promo Code</Text>
                  {appliedPromo ? (
                    <Text className="text-green-300 text-sm">
                      15% discount applied! 🎉
                    </Text>
                  ) : (
                    <Text className="text-white/70 text-sm">
                      Get up to 15% off
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => setAppliedPromo(!appliedPromo)}
                  className="bg-white px-4 py-2 rounded-full"
                >
                  <Text className="text-red-600 font-bold text-sm">
                    {appliedPromo ? 'Remove' : 'Apply'}
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Order Summary */}
          <View className="px-6 mb-6">
            <View className="bg-zinc-900 rounded-2xl p-5">
              <Text className="text-white text-xl font-bold mb-4">
                Order Summary
              </Text>

              <View className="space-y-3">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-400">Subtotal</Text>
                  <Text className="text-white font-semibold">
                    ${subtotal.toFixed(2)}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-400">Delivery Fee</Text>
                  <Text className="text-white font-semibold">
                    ${deliveryFee.toFixed(2)}
                  </Text>
                </View>

                {appliedPromo && (
                  <View className="flex-row items-center justify-between">
                    <Text className="text-green-400">Discount (15%)</Text>
                    <Text className="text-green-400 font-semibold">
                      -${discount.toFixed(2)}
                    </Text>
                  </View>
                )}

                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-400">Tax</Text>
                  <Text className="text-white font-semibold">
                    ${tax.toFixed(2)}
                  </Text>
                </View>

                <View className="h-px bg-zinc-800 my-2" />

                <View className="flex-row items-center justify-between">
                  <Text className="text-white text-lg font-bold">Total</Text>
                  <Text className="text-white text-2xl font-bold">
                    ${total.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="h-32" />
        </ScrollView>

        {/* Floating Checkout Button */}
        <View className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)', '#000000']}
            className="absolute top-0 left-0 right-0 h-32"
          />
          
          <TouchableOpacity
            onPress={() => router.push('/delivery-tracking')}
            className="bg-red-600 rounded-full py-4 shadow-2xl"
            style={{
              shadowColor: '#ef4444',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.5,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white text-lg font-bold">
                Proceed to Checkout
              </Text>
              <View className="ml-3 bg-white/20 px-3 py-1 rounded-full">
                <Text className="text-white font-bold">
                  ${total.toFixed(2)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CartScreen;