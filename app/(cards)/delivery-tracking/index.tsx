import React, { useState, useEffect, useRef } from 'react';
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
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle,
  Clock,
  Package,
  Bike,
} from 'lucide-react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const deliverySteps = [
  {
    id: 1,
    title: 'Order Confirmed',
    description: 'Restaurant received your order',
    time: '2:30 PM',
    completed: true,
    icon: CheckCircle,
  },
  {
    id: 2,
    title: 'Preparing Food',
    description: 'Chef is preparing your delicious meal',
    time: '2:35 PM',
    completed: true,
    icon: Package,
  },
  {
    id: 3,
    title: 'Out for Delivery',
    description: 'Driver is on the way to you',
    time: '2:50 PM',
    completed: true,
    active: true,
    icon: Bike,
  },
  {
    id: 4,
    title: 'Delivered',
    description: 'Enjoy your meal!',
    time: 'Est. 3:05 PM',
    completed: false,
    icon: MapPin,
  },
];

const DeliveryTrackingScreen = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for active step
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: (currentStep / deliverySteps.length) * 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.canGoBack() ? router.back() : router.navigate('/') }
              className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
            >
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Order Tracking</Text>
            <View className="w-10" />
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Live Map Placeholder */}
          <View className="mx-6 mb-6">
            <View
              className="bg-zinc-900 rounded-3xl overflow-hidden"
              style={{ height: height * 0.3 }}
            >
              {/* Map Placeholder with Gradient */}
              <LinearGradient
                colors={['#18181b', '#09090b']}
                className="flex-1 items-center justify-center"
              >
                <Animated.View
                  style={{
                    transform: [{ scale: pulseAnim }],
                  }}
                >
                  <View className="w-20 h-20 bg-red-600 rounded-full items-center justify-center">
                    <Bike size={32} color="white" />
                  </View>
                </Animated.View>
                <Text className="text-white font-bold text-lg mt-4">
                  Driver is nearby
                </Text>
                <Text className="text-gray-400 text-sm">~5 minutes away</Text>
              </LinearGradient>

              {/* Distance Badge */}
              <View className="absolute top-4 right-4 bg-black/70 px-4 py-2 rounded-full">
                <Text className="text-white font-bold">1.2 km away</Text>
              </View>
            </View>
          </View>

          {/* Driver Info Card */}
          <View className="mx-6 mb-6">
            <LinearGradient
              colors={['#1f1f1f', '#0a0a0a']}
              className="rounded-2xl p-4"
            >
              <View className="flex-row items-center">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200',
                  }}
                  className="w-16 h-16 rounded-full"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-white font-bold text-lg">
                    Marcus Johnson
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <View className="flex-row items-center bg-green-600/20 px-2 py-1 rounded">
                      <Text className="text-green-400 text-xs font-bold mr-1">
                        ★ 4.9
                      </Text>
                    </View>
                    <Text className="text-gray-400 text-xs ml-2">
                      1,247 deliveries
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-2">
                  <TouchableOpacity className="w-12 h-12 bg-zinc-800 rounded-full items-center justify-center">
                    <Phone size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-12 h-12 bg-zinc-800 rounded-full items-center justify-center">
                    <MessageCircle size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Driver Vehicle Info */}
              <View className="mt-4 pt-4 border-t border-zinc-800">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-gray-400 text-xs">Vehicle</Text>
                    <Text className="text-white font-semibold">
                      Red Honda Bike
                    </Text>
                  </View>
                  <View>
                    <Text className="text-gray-400 text-xs">Plate Number</Text>
                    <Text className="text-white font-semibold">ABC-1234</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Delivery Timeline */}
          <View className="mx-6 mb-6">
            <Text className="text-white text-xl font-bold mb-4">
              Delivery Status
            </Text>

            <View className="bg-zinc-900 rounded-2xl p-5">
              {deliverySteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === deliverySteps.length - 1;

                return (
                  <View key={step.id}>
                    <View className="flex-row items-start">
                      {/* Icon with animation for active step */}
                      <Animated.View
                        style={{
                          transform: step.active
                            ? [{ scale: pulseAnim }]
                            : [{ scale: 1 }],
                        }}
                      >
                        <View
                          className={`w-12 h-12 rounded-full items-center justify-center ${
                            step.completed
                              ? 'bg-green-600'
                              : step.active
                              ? 'bg-red-600'
                              : 'bg-zinc-800'
                          }`}
                        >
                          <Icon
                            size={20}
                            color="white"
                            strokeWidth={step.active ? 3 : 2}
                          />
                        </View>
                      </Animated.View>

                      {/* Step Details */}
                      <View className="flex-1 ml-4">
                        <View className="flex-row items-center justify-between">
                          <Text
                            className={`font-bold text-base ${
                              step.completed || step.active
                                ? 'text-white'
                                : 'text-gray-500'
                            }`}
                          >
                            {step.title}
                          </Text>
                          <Text className="text-gray-400 text-xs">
                            {step.time}
                          </Text>
                        </View>
                        <Text className="text-gray-400 text-sm mt-1">
                          {step.description}
                        </Text>

                        {/* Active Step Progress */}
                        {step.active && (
                          <View className="mt-3 bg-zinc-800 rounded-full h-2 overflow-hidden">
                            <Animated.View
                              className="h-full bg-red-600 rounded-full"
                              style={{
                                width: '70%',
                              }}
                            />
                          </View>
                        )}
                      </View>
                    </View>

                    {/* Connecting Line */}
                    {!isLast && (
                      <View className="ml-6 my-2">
                        <View
                          className={`w-0.5 h-8 ${
                            step.completed ? 'bg-green-600' : 'bg-zinc-800'
                          }`}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          {/* Order Details */}
          <View className="mx-6 mb-6">
            <Text className="text-white text-xl font-bold mb-4">
              Order Details
            </Text>

            <View className="bg-zinc-900 rounded-2xl p-5">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-400">Order ID</Text>
                <Text className="text-white font-semibold">#ORD-2024-8932</Text>
              </View>

              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-400">Restaurant</Text>
                <Text className="text-white font-semibold">
                  Kyoji Sushi & Grill
                </Text>
              </View>

              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-400">Items</Text>
                <Text className="text-white font-semibold">3 items</Text>
              </View>

              <View className="h-px bg-zinc-800 my-2" />

              <View className="flex-row items-center justify-between">
                <Text className="text-white text-lg font-bold">Total Paid</Text>
                <Text className="text-red-500 text-xl font-bold">$105.23</Text>
              </View>
            </View>
          </View>

          {/* Delivery Instructions */}
          <View className="mx-6 mb-6">
            <View className="bg-zinc-900 rounded-2xl p-5">
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-blue-600/20 rounded-full items-center justify-center">
                  <MapPin size={20} color="#3b82f6" />
                </View>
                <View className="flex-1 ml-3">
                  <Text className="text-white font-bold mb-1">
                    Delivery Address
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    123 Main Street, Apartment 4B{'\n'}Downtown, NY 10001
                  </Text>
                  <TouchableOpacity className="mt-3">
                    <Text className="text-blue-500 font-semibold text-sm">
                      View on Map
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View className="h-24" />
        </ScrollView>

        {/* Floating Action Buttons */}
        <View className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.95)']}
            className="absolute top-0 left-0 right-0 h-32"
          />

          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-zinc-900 rounded-full py-4">
              <Text className="text-white font-bold text-center">
                Cancel Order
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-red-600 rounded-full py-4">
              <Text className="text-white font-bold text-center">
                Get Help
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryTrackingScreen;