import React from 'react';
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
  MapPin,
  Clock,
  Package,
  CheckCircle,
  Star,
  Phone,
  MessageCircle,
  Download,
  RefreshCw,
  AlertCircle,
} from 'lucide-react-native';
import { router } from 'expo-router';

const mockOrderDetail = {
  id: 'ORD-2024-8932',
  status: 'delivered',
  date: 'October 01, 2024',
  time: '2:30 PM',
  deliveredTime: '3:05 PM',
  
  restaurant: {
    name: 'Kyoji Sushi & Grill',
    image: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=200',
    address: '123 Sakura Street, Downtown',
    phone: '+1 (555) 123-4567',
  },

  driver: {
    name: 'Marcus Johnson',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200',
    rating: 4.9,
    phone: '+1 (555) 987-6543',
  },

  deliveryAddress: {
    label: 'Home',
    address: '456 Main Street, Apartment 4B',
    city: 'Downtown, NY 10001',
  },

  items: [
    {
      id: '1',
      name: "Chef's Omakase Platter",
      description: 'Premium sushi selection',
      quantity: 1,
      price: 75.00,
      image: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=200',
      customizations: ['Extra Wasabi', 'No Ginger'],
    },
    {
      id: '2',
      name: 'Dragon Roll',
      description: 'Eel, avocado, cucumber',
      quantity: 2,
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1596001007324-4f964082354e?q=80&w=200',
      customizations: [],
    },
    {
      id: '3',
      name: 'Miso Soup',
      description: 'Traditional Japanese soup',
      quantity: 1,
      price: 4.00,
      image: 'https://images.unsplash.com/photo-1596645318041-0f74577f1540?q=80&w=200',
      customizations: [],
    },
  ],

  payment: {
    subtotal: 111.00,
    deliveryFee: 2.99,
    tax: 8.88,
    discount: 16.65,
    total: 106.22,
    method: 'Visa •••• 4242',
  },

  timeline: [
    { status: 'Order Placed', time: '2:30 PM', completed: true },
    { status: 'Restaurant Confirmed', time: '2:32 PM', completed: true },
    { status: 'Preparing Food', time: '2:35 PM', completed: true },
    { status: 'Out for Delivery', time: '2:50 PM', completed: true },
    { status: 'Delivered', time: '3:05 PM', completed: true },
  ],

  rating: 5,
  review: 'Amazing food! Everything was fresh and delicious. Will definitely order again!',
};

const OrderDetailScreen = () => {
  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
            >
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Order Details</Text>
            <TouchableOpacity className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center">
              <Download size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Status Banner */}
          <View className="px-6 mb-6">
            <LinearGradient
              colors={['#065f46', '#10b981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl p-5"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <CheckCircle size={24} color="white" />
                    <Text className="text-white text-xl font-bold ml-2">
                      Order Delivered
                    </Text>
                  </View>
                  <Text className="text-white/80 text-sm">
                    Delivered on {mockOrderDetail.date}
                  </Text>
                  <Text className="text-white/80 text-sm">
                    at {mockOrderDetail.deliveredTime}
                  </Text>
                </View>
                <View className="bg-white/20 px-4 py-2 rounded-full">
                  <Text className="text-white font-bold">
                    #{mockOrderDetail.id.split('-')[2]}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Restaurant Info */}
          <View className="px-6 mb-6">
            <Text className="text-white text-xl font-bold mb-3">Restaurant</Text>
            <View className="bg-zinc-900 rounded-2xl p-4">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: mockOrderDetail.restaurant.image }}
                  className="w-16 h-16 rounded-xl"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-white font-bold text-lg mb-1">
                    {mockOrderDetail.restaurant.name}
                  </Text>
                  <Text className="text-gray-400 text-sm mb-1">
                    {mockOrderDetail.restaurant.address}
                  </Text>
                </View>
              </View>

              <View className="flex-row gap-2 mt-4">
                <TouchableOpacity className="flex-1 bg-zinc-800 py-3 rounded-xl flex-row items-center justify-center">
                  <Phone size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">Call</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-red-600 py-3 rounded-xl flex-row items-center justify-center">
                  <RefreshCw size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">Reorder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Order Items */}
          <View className="px-6 mb-6">
            <Text className="text-white text-xl font-bold mb-3">Order Items</Text>
            <View className="bg-zinc-900 rounded-2xl overflow-hidden">
              {mockOrderDetail.items.map((item, index) => (
                <View key={item.id}>
                  <View className="p-4">
                    <View className="flex-row">
                      <Image
                        source={{ uri: item.image }}
                        className="w-20 h-20 rounded-xl"
                      />
                      <View className="flex-1 ml-4">
                        <View className="flex-row items-start justify-between mb-1">
                          <Text className="text-white font-bold flex-1">
                            {item.name}
                          </Text>
                          <Text className="text-white font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                        </View>
                        <Text className="text-gray-400 text-sm mb-2">
                          {item.description}
                        </Text>
                        <View className="flex-row items-center justify-between">
                          <Text className="text-gray-500 text-sm">
                            Qty: {item.quantity}
                          </Text>
                          <Text className="text-gray-400 text-sm">
                            ${item.price.toFixed(2)} each
                          </Text>
                        </View>
                        {item.customizations.length > 0 && (
                          <View className="flex-row flex-wrap mt-2">
                            {item.customizations.map((custom, idx) => (
                              <View key={idx} className="bg-zinc-800 px-2 py-1 rounded mr-1 mb-1">
                                <Text className="text-gray-400 text-xs">{custom}</Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  {index < mockOrderDetail.items.length - 1 && (
                    <View className="h-px bg-zinc-800 mx-4" />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Delivery Info */}
          <View className="px-6 mb-6">
            <Text className="text-white text-xl font-bold mb-3">Delivery Information</Text>
            
            {/* Driver Card */}
            <View className="bg-zinc-900 rounded-2xl p-4 mb-3">
              <Text className="text-gray-400 text-sm mb-3">Delivered By</Text>
              <View className="flex-row items-center">
                <Image
                  source={{ uri: mockOrderDetail.driver.image }}
                  className="w-14 h-14 rounded-full"
                />
                <View className="flex-1 ml-3">
                  <Text className="text-white font-bold text-lg">
                    {mockOrderDetail.driver.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text className="text-gray-400 text-sm ml-1">
                      {mockOrderDetail.driver.rating} rating
                    </Text>
                  </View>
                </View>
                <TouchableOpacity className="w-10 h-10 bg-zinc-800 rounded-full items-center justify-center">
                  <Phone size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Address Card */}
            <View className="bg-zinc-900 rounded-2xl p-4">
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-blue-600/20 rounded-full items-center justify-center">
                  <MapPin size={20} color="#3b82f6" />
                </View>
                <View className="flex-1 ml-3">
                  <Text className="text-white font-bold mb-1">
                    {mockOrderDetail.deliveryAddress.label}
                  </Text>
                  <Text className="text-gray-400 text-sm leading-5">
                    {mockOrderDetail.deliveryAddress.address}{'\n'}
                    {mockOrderDetail.deliveryAddress.city}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Payment Summary */}
          <View className="px-6 mb-6">
            <Text className="text-white text-xl font-bold mb-3">Payment Summary</Text>
            <View className="bg-zinc-900 rounded-2xl p-5">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-400">Subtotal</Text>
                <Text className="text-white font-semibold">
                  ${mockOrderDetail.payment.subtotal.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-400">Delivery Fee</Text>
                <Text className="text-white font-semibold">
                  ${mockOrderDetail.payment.deliveryFee.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-400">Tax</Text>
                <Text className="text-white font-semibold">
                  ${mockOrderDetail.payment.tax.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-green-400">Discount (15%)</Text>
                <Text className="text-green-400 font-semibold">
                  -${mockOrderDetail.payment.discount.toFixed(2)}
                </Text>
              </View>

              <View className="h-px bg-zinc-800 my-3" />

              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white text-lg font-bold">Total Paid</Text>
                <Text className="text-red-500 text-2xl font-bold">
                  ${mockOrderDetail.payment.total.toFixed(2)}
                </Text>
              </View>

              <View className="flex-row items-center bg-zinc-800 px-4 py-3 rounded-xl">
                <View className="w-8 h-8 bg-blue-600/20 rounded items-center justify-center">
                  <Text className="text-blue-500 font-bold">💳</Text>
                </View>
                <Text className="text-white font-semibold ml-3">
                  {mockOrderDetail.payment.method}
                </Text>
              </View>
            </View>
          </View>

          {/* Order Timeline */}
          <View className="px-6 mb-6">
            <Text className="text-white text-xl font-bold mb-3">Order Timeline</Text>
            <View className="bg-zinc-900 rounded-2xl p-5">
              {mockOrderDetail.timeline.map((step, index) => (
                <View key={index} className="flex-row items-start">
                  <View className="items-center">
                    <View className={`w-8 h-8 rounded-full items-center justify-center ${
                      step.completed ? 'bg-green-600' : 'bg-zinc-800'
                    }`}>
                      {step.completed ? (
                        <CheckCircle size={18} color="white" />
                      ) : (
                        <Clock size={18} color="#71717a" />
                      )}
                    </View>
                    {index < mockOrderDetail.timeline.length - 1 && (
                      <View className={`w-0.5 h-12 ${
                        step.completed ? 'bg-green-600' : 'bg-zinc-800'
                      }`} />
                    )}
                  </View>
                  <View className="flex-1 ml-4 pb-6">
                    <Text className={`font-bold ${
                      step.completed ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step.status}
                    </Text>
                    <Text className="text-gray-400 text-sm mt-1">{step.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Your Review */}
          {mockOrderDetail.rating && (
            <View className="px-6 mb-6">
              <Text className="text-white text-xl font-bold mb-3">Your Review</Text>
              <View className="bg-zinc-900 rounded-2xl p-5">
                <View className="flex-row items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      color={i < mockOrderDetail.rating! ? "#FFD700" : "#3f3f46"}
                      fill={i < mockOrderDetail.rating! ? "#FFD700" : "none"}
                    />
                  ))}
                  <Text className="text-white font-bold ml-2 text-lg">
                    {mockOrderDetail.rating}.0
                  </Text>
                </View>
                <Text className="text-gray-300 leading-6">
                  {mockOrderDetail.review}
                </Text>
              </View>
            </View>
          )}

          {/* Help Section */}
          <View className="px-6 mb-6">
            <TouchableOpacity className="bg-zinc-900 rounded-2xl p-4 flex-row items-center">
              <View className="w-10 h-10 bg-orange-600/20 rounded-full items-center justify-center">
                <AlertCircle size={20} color="#f97316" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-white font-bold">Need Help?</Text>
                <Text className="text-gray-400 text-sm">
                  Report an issue with this order
                </Text>
              </View>
              <Text className="text-red-500 font-semibold">Contact</Text>
            </TouchableOpacity>
          </View>

          <View className="h-24" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default OrderDetailScreen;