// ============================================
// LOYALTY & REWARDS SCREEN
// ============================================

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Award,
  Gift,
  Star,
  Crown,
  Zap,
  TrendingUp,
  ChevronRight,
} from 'lucide-react-native';
import { router } from 'expo-router';

const mockRewards = {
  currentPoints: 2340,
  nextTierPoints: 3000,
  tier: 'Gold',
  totalSaved: 187.50,
  availableRewards: [
    {
      id: '1',
      title: '15% Off Next Order',
      points: 500,
      image: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=200',
      expiresIn: '7 days',
    },
    {
      id: '2',
      title: 'Free Delivery (3x)',
      points: 300,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200',
      expiresIn: '14 days',
    },
    {
      id: '3',
      title: '$10 Restaurant Voucher',
      points: 800,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=200',
      expiresIn: '30 days',
    },
  ],
  recentActivity: [
    { action: 'Earned 75 points', detail: 'Order #8932', date: '2 days ago' },
    { action: 'Redeemed reward', detail: '15% discount', date: '1 week ago' },
    { action: 'Earned 50 points', detail: 'Order #8901', date: '2 weeks ago' },
  ],
};

export const RewardsScreen = () => {
  const progress = (mockRewards.currentPoints / mockRewards.nextTierPoints) * 100;

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
            <Text className="text-white text-xl font-bold">Loyalty & Rewards</Text>
            <View className="w-10" />
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Points Card */}
          <View className="px-6 mb-6">
            <LinearGradient
              colors={['#7f1d1d', '#991b1b', '#7f1d1d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-3xl p-6"
            >
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-yellow-500 rounded-full items-center justify-center">
                    <Crown size={24} color="white" />
                  </View>
                  <View className="ml-3">
                    <Text className="text-white/70 text-sm">Your Tier</Text>
                    <Text className="text-white text-xl font-bold">
                      {mockRewards.tier} Member
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-white/70 text-sm">Total Saved</Text>
                  <Text className="text-white text-xl font-bold">
                    ${mockRewards.totalSaved}
                  </Text>
                </View>
              </View>

              <View className="h-px bg-white/20 my-4" />

              <View className="mb-3">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-white text-3xl font-bold">
                    {mockRewards.currentPoints}
                  </Text>
                  <Text className="text-white/70">
                    {mockRewards.nextTierPoints - mockRewards.currentPoints} to Platinum
                  </Text>
                </View>
                <Text className="text-white/70 text-sm mb-3">Available Points</Text>
                
                {/* Progress Bar */}
                <View className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Stats */}
          <View className="px-6 mb-6">
            <View className="flex-row gap-3">
              <View className="flex-1 bg-zinc-900 rounded-2xl p-4 items-center">
                <Zap size={24} color="#eab308" />
                <Text className="text-white text-2xl font-bold mt-2">47</Text>
                <Text className="text-gray-400 text-xs mt-1">Orders</Text>
              </View>
              <View className="flex-1 bg-zinc-900 rounded-2xl p-4 items-center">
                <TrendingUp size={24} color="#10b981" />
                <Text className="text-white text-2xl font-bold mt-2">12</Text>
                <Text className="text-gray-400 text-xs mt-1">Streak Days</Text>
              </View>
              <View className="flex-1 bg-zinc-900 rounded-2xl p-4 items-center">
                <Gift size={24} color="#ef4444" />
                <Text className="text-white text-2xl font-bold mt-2">8</Text>
                <Text className="text-gray-400 text-xs mt-1">Redeemed</Text>
              </View>
            </View>
          </View>

          {/* Available Rewards */}
          <View className="px-6 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white text-xl font-bold">Available Rewards</Text>
              <TouchableOpacity>
                <Text className="text-red-500 font-semibold">See All</Text>
              </TouchableOpacity>
            </View>

            {mockRewards.availableRewards.map(reward => (
              <TouchableOpacity
                key={reward.id}
                className="bg-zinc-900 rounded-2xl mb-3 overflow-hidden"
              >
                <View className="flex-row">
                  <Image
                    source={{ uri: reward.image }}
                    style={{ width: 100, height: 100 }}
                    resizeMode="cover"
                  />
                  <View className="flex-1 p-4">
                    <Text className="text-white font-bold text-base mb-1">
                      {reward.title}
                    </Text>
                    <Text className="text-gray-400 text-sm mb-3">
                      Expires in {reward.expiresIn}
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center bg-yellow-600/20 px-3 py-1 rounded-full">
                        <Star size={14} color="#eab308" fill="#eab308" />
                        <Text className="text-yellow-500 font-bold ml-1">
                          {reward.points} pts
                        </Text>
                      </View>
                      <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-full">
                        <Text className="text-white font-bold text-sm">Redeem</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* How to Earn More */}
          <View className="px-6 mb-6">
            <Text className="text-white text-xl font-bold mb-4">Earn More Points</Text>
            <View className="bg-zinc-900 rounded-2xl overflow-hidden">
              {[
                { icon: '🍽️', title: 'Place Orders', points: '+50 points per order' },
                { icon: '⭐', title: 'Leave Reviews', points: '+25 points per review' },
                { icon: '👥', title: 'Refer Friends', points: '+200 points per referral' },
                { icon: '🎂', title: 'Birthday Bonus', points: '+500 points annually' },
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center justify-between p-4 border-b border-zinc-800"
                >
                  <View className="flex-row items-center flex-1">
                    <Text className="text-3xl mr-3">{item.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-white font-semibold">{item.title}</Text>
                      <Text className="text-green-400 text-sm">{item.points}</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#71717a" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View className="px-6 mb-6">
            <Text className="text-white text-xl font-bold mb-4">Recent Activity</Text>
            <View className="bg-zinc-900 rounded-2xl p-4">
              {mockRewards.recentActivity.map((activity, index) => (
                <View key={index} className="mb-4 last:mb-0">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                      <Text className="text-white font-semibold">{activity.action}</Text>
                      <Text className="text-gray-400 text-sm">{activity.detail}</Text>
                    </View>
                    <Text className="text-gray-500 text-xs">{activity.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="h-24" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};


// ============================================
// PAYMENT METHODS SCREEN
// ============================================

const mockPaymentMethods = [
  {
    id: '1',
    type: 'visa',
    last4: '4242',
    expiryMonth: '12',
    expiryYear: '25',
    holderName: 'Alexander Morgan',
    isDefault: true,
  },
  {
    id: '2',
    type: 'mastercard',
    last4: '8888',
    expiryMonth: '06',
    expiryYear: '26',
    holderName: 'Alexander Morgan',
    isDefault: false,
  },
  {
    id: '3',
    type: 'amex',
    last4: '1234',
    expiryMonth: '03',
    expiryYear: '27',
    holderName: 'Alexander Morgan',
    isDefault: false,
  },
];

export const PaymentMethodsScreen = () => {
  const getCardIcon = (type: string) => {
    const icons: Record<string, string> = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳',
    };
    return icons[type] || '💳';
  };

  const getCardColor = (type: string): readonly [string, string] => {
    const colors: Record<string, [string, string]> = {
      visa: ['#1a1f71', '#4169e1'],
      mastercard: ['#eb001b', '#f79e1b'],
      amex: ['#006fcf', '#00c1d4'],
      discover: ['#ff6000', '#ffb900'],
    };
    return colors[type] || ['#3f3f46', '#18181b'];
  };

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
            <Text className="text-white text-xl font-bold">Payment Methods</Text>
            <View className="w-10" />
          </View>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Add New Card Button */}
          <TouchableOpacity className="mb-6">
            <LinearGradient
              colors={['#7f1d1d', '#991b1b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl p-5 flex-row items-center justify-center"
            >
              <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Text className="text-white text-2xl">+</Text>
              </View>
              <Text className="text-white font-bold text-lg ml-3">
                Add New Card
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Cards List */}
          {mockPaymentMethods.map(card => {
            const colors = getCardColor(card.type);
            
            return (
              <View key={card.id} className="mb-4">
                <LinearGradient
                  colors={colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-2xl p-5"
                  style={{
                    shadowColor: colors[0],
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 4,
                  }}
                >
                  {/* Card Header */}
                  <View className="flex-row items-center justify-between mb-6">
                    <Text className="text-white/70 text-sm font-semibold uppercase">
                      {card.type}
                    </Text>
                    {card.isDefault && (
                      <View className="bg-white/20 px-3 py-1 rounded-full">
                        <Text className="text-white text-xs font-bold">Default</Text>
                      </View>
                    )}
                  </View>

                  {/* Card Number */}
                  <View className="mb-6">
                    <Text className="text-white text-2xl font-bold tracking-widest">
                      •••• •••• •••• {card.last4}
                    </Text>
                  </View>

                  {/* Card Footer */}
                  <View className="flex-row items-end justify-between">
                    <View>
                      <Text className="text-white/70 text-xs mb-1">Card Holder</Text>
                      <Text className="text-white font-semibold">
                        {card.holderName}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-white/70 text-xs mb-1">Expires</Text>
                      <Text className="text-white font-semibold">
                        {card.expiryMonth}/{card.expiryYear}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>

                {/* Card Actions */}
                <View className="flex-row gap-2 mt-3 px-2">
                  {!card.isDefault && (
                    <TouchableOpacity className="flex-1 bg-zinc-900 py-3 rounded-xl">
                      <Text className="text-white font-semibold text-center text-sm">
                        Set as Default
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity className="flex-1 bg-zinc-900 py-3 rounded-xl">
                    <Text className="text-white font-semibold text-center text-sm">
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-red-600/20 px-4 py-3 rounded-xl">
                    <Text className="text-red-500 font-semibold text-sm">Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {/* Payment Security Info */}
          <View className="bg-zinc-900 rounded-2xl p-5 mb-6">
            <View className="flex-row items-start">
              <View className="w-10 h-10 bg-green-600/20 rounded-full items-center justify-center">
                <Text className="text-green-500 text-xl">🔒</Text>
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-white font-bold mb-1">Secure Payment</Text>
                <Text className="text-gray-400 text-sm leading-5">
                  Your payment information is encrypted and securely stored. We use industry-standard security measures to protect your data.
                </Text>
              </View>
            </View>
          </View>

          {/* Accepted Cards */}
          <View className="mb-6">
            <Text className="text-gray-400 text-sm mb-3">We Accept</Text>
            <View className="flex-row items-center gap-3">
              {['💳 Visa', '💳 Mastercard', '💳 Amex', '💳 Discover'].map((card, index) => (
                <View key={index} className="bg-zinc-900 px-4 py-2 rounded-xl">
                  <Text className="text-white text-sm">{card}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="h-24" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PaymentMethodsScreen;