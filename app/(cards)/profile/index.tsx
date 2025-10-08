import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  CreditCard,
  Heart,
  Clock,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit3,
  Star,
  Award,
  Gift,
  Settings,
} from 'lucide-react-native';
import { router } from 'expo-router';

const mockUser = {
  name: 'Alexander Morgan',
  email: 'alex.morgan@email.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
  memberSince: 'January 2024',
  totalOrders: 47,
  totalSpent: 1847.50,
  loyaltyPoints: 2340,
  tier: 'Gold Member',
};

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', route: '/edit-profile', color: '#3b82f6' },
        { icon: MapPin, label: 'Addresses', route: '/addresses', color: '#10b981', badge: '3' },
        { icon: CreditCard, label: 'Payment Methods', route: '/payment', color: '#f59e0b' },
        { icon: Clock, label: 'Order History', route: '/order-history', color: '#8b5cf6' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Heart, label: 'Favorites', route: '/favorites', color: '#ef4444', badge: '12' },
        { icon: Award, label: 'Loyalty & Rewards', route: '/rewards', color: '#eab308' },
        { icon: Gift, label: 'Refer & Earn', route: '/refer-earn', color: '#ec4899' },
      ],
    },
    {
      title: 'Settings',
      items: [
        { icon: Bell, label: 'Notifications', toggle: true, value: notificationsEnabled, onChange: setNotificationsEnabled },
        { icon: MapPin, label: 'Location Services', toggle: true, value: locationEnabled, onChange: setLocationEnabled },
        { icon: Shield, label: 'Privacy & Security', route: 'https://privacy.notifycode.org/delivery', color: '#6366f1' },
        // { icon: Settings, label: 'App Settings', route: '/settings', color: '#71717a' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', route: 'https://help.notifycode.org/delivery', color: '#06b6d4' },
        { icon: LogOut, label: 'Log Out', action: 'logout', color: '#ef4444' },
      ],
    },
  ];

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logout');
  };

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.canGoBack()? router.back(): router.navigate('/')}
            className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Profile</Text>
          <TouchableOpacity className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center">
            <Edit3 size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Profile Header Card */}
          <View className="px-6 mb-6">
            <LinearGradient
              colors={['#7f1d1d', '#991b1b', '#7f1d1d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-3xl p-6"
            >
              <View className="flex-row items-center mb-4">
                <View className="relative">
                  <Image
                    source={{ uri: mockUser.avatar }}
                    className="w-20 h-20 rounded-full border-4 border-white"
                  />
                  <View className="absolute -bottom-1 -right-1 w-7 h-7 bg-yellow-500 rounded-full items-center justify-center border-2 border-white">
                    <Star size={14} color="white" fill="white" />
                  </View>
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-white text-2xl font-bold mb-1">
                    {mockUser.name}
                  </Text>
                  <View className="flex-row items-center bg-white/20 px-3 py-1 rounded-full self-start">
                    <Award size={14} color="white" />
                    <Text className="text-white text-xs font-bold ml-1">
                      {mockUser.tier}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-center justify-between pt-4 border-t border-white/20">
                <View className="items-center flex-1">
                  <Text className="text-white text-2xl font-bold">
                    {mockUser.totalOrders}
                  </Text>
                  <Text className="text-white/70 text-xs mt-1">Orders</Text>
                </View>
                <View className="w-px h-10 bg-white/20" />
                <View className="items-center flex-1">
                  <Text className="text-white text-2xl font-bold">
                    ${mockUser.totalSpent.toFixed(0)}
                  </Text>
                  <Text className="text-white/70 text-xs mt-1">Spent</Text>
                </View>
                <View className="w-px h-10 bg-white/20" />
                <View className="items-center flex-1">
                  <Text className="text-white text-2xl font-bold">
                    {mockUser.loyaltyPoints}
                  </Text>
                  <Text className="text-white/70 text-xs mt-1">Points</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Actions */}
          <View className="px-6 mb-6">
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-zinc-900 rounded-2xl p-4 items-center">
                <View className="w-12 h-12 bg-blue-600/20 rounded-full items-center justify-center mb-2">
                  <Clock size={24} color="#3b82f6" />
                </View>
                <Text className="text-white font-semibold text-sm">Orders</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 bg-zinc-900 rounded-2xl p-4 items-center">
                <View className="w-12 h-12 bg-red-600/20 rounded-full items-center justify-center mb-2">
                  <Heart size={24} color="#ef4444" />
                </View>
                <Text className="text-white font-semibold text-sm">Favorites</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 bg-zinc-900 rounded-2xl p-4 items-center">
                <View className="w-12 h-12 bg-yellow-600/20 rounded-full items-center justify-center mb-2">
                  <Gift size={24} color="#eab308" />
                </View>
                <Text className="text-white font-semibold text-sm">Rewards</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Menu Sections */}
          {menuSections.map((section, sectionIndex) => (
            <View key={sectionIndex} className="px-6 mb-6">
              <Text className="text-white text-lg font-bold mb-3">
                {section.title}
              </Text>
              <View className="bg-zinc-900 rounded-2xl overflow-hidden">
                {section.items.map((item:any, itemIndex) => {
                  const Icon = item.icon;
                  
                  if (item.toggle) {
                    return (
                      <View
                        key={itemIndex}
                        className="flex-row items-center justify-between p-4"
                      >
                        <View className="flex-row items-center flex-1">
                          <View
                            className="w-10 h-10 rounded-full items-center justify-center"
                            style={{ backgroundColor: `${item.color || '#71717a'}20` }}
                          >
                            <Icon size={20} color={item.color || '#71717a'} />
                          </View>
                          <Text className="text-white font-semibold ml-3">
                            {item.label}
                          </Text>
                        </View>
                        <Switch
                          value={item.value}
                          onValueChange={item.onChange}
                          trackColor={{ false: '#3f3f46', true: '#ef4444' }}
                          thumbColor="white"
                        />
                      </View>
                    );
                  }

                  return (
                    <TouchableOpacity
                      key={itemIndex}
                      onPress={() => {
                        if (item.action === 'logout') {
                          handleLogout();
                        } else if (item.route) {
                          router.push(item.route as any);
                        }
                      }}
                      className="flex-row items-center justify-between p-4"
                    >
                      <View className="flex-row items-center flex-1">
                        <View
                          className="w-10 h-10 rounded-full items-center justify-center"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <Icon size={20} color={item.color} />
                        </View>
                        <Text className="text-white font-semibold ml-3">
                          {item.label}
                        </Text>
                        {item.badge && (
                          <View className="ml-2 bg-red-600 px-2 py-0.5 rounded-full">
                            <Text className="text-white text-xs font-bold">
                              {item.badge}
                            </Text>
                          </View>
                        )}
                      </View>
                      <ChevronRight size={20} color="#71717a" />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          {/* App Info */}
          <View className="px-6 mb-8">
            <View className="items-center">
              <Text className="text-gray-500 text-sm mb-1">
                NotifyDelivery+ Premium
              </Text>
              <Text className="text-gray-600 text-xs">
                Version 1.0.0 • Member since {mockUser.memberSince}
              </Text>
            </View>
          </View>

          <View className="h-24" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;