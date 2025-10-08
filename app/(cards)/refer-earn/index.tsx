import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Gift,
  Users,
  Copy,
  Share2,
  MessageCircle,
  Mail,
  CheckCircle,
  TrendingUp,
  DollarSign,
} from 'lucide-react-native';
import { router } from 'expo-router';

const mockReferralData = {
  referralCode: 'ALEX2024',
  totalReferrals: 8,
  totalEarned: 1600,
  pendingRewards: 400,
  referralLink: 'https://foodflix.app/r/ALEX2024',
  
  rewards: {
    perReferral: 200,
    friendGets: 100,
  },

  recentReferrals: [
    { name: 'Sarah M.', status: 'completed', earned: 200, date: '2 days ago' },
    { name: 'John D.', status: 'pending', earned: 200, date: '5 days ago' },
    { name: 'Emma W.', status: 'completed', earned: 200, date: '1 week ago' },
  ],
};

const ReferEarnScreen = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setString(mockReferralData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferral = async () => {
    try {
      await Share.share({
        message: `Join Foodflix and get $${mockReferralData.rewards.friendGets} off your first order! Use my code: ${mockReferralData.referralCode}\n${mockReferralData.referralLink}`,
      });
    } catch (error) {
      console.error(error);
    }
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
            <Text className="text-white text-xl font-bold">Refer & Earn</Text>
            <View className="w-10" />
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Hero Card */}
          <View className="px-6 mb-6">
            <LinearGradient
              colors={['#7f1d1d', '#991b1b', '#7f1d1d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-3xl p-6"
            >
              <View className="items-center mb-6">
                <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
                  <Gift size={40} color="white" />
                </View>
                <Text className="text-white text-3xl font-bold text-center mb-2">
                  Give ${mockReferralData.rewards.friendGets}, Get ${mockReferralData.rewards.perReferral}
                </Text>
                <Text className="text-white/80 text-center leading-6">
                  Invite your friends and earn rewards for every successful referral!
                </Text>
              </View>

              {/* Stats */}
              <View className="flex-row bg-white/10 rounded-2xl p-4">
                <View className="flex-1 items-center border-r border-white/20">
                  <Text className="text-white text-2xl font-bold">
                    {mockReferralData.totalReferrals}
                  </Text>
                  <Text className="text-white/70 text-xs mt-1">Friends</Text>
                </View>
                <View className="flex-1 items-center">
                  <Text className="text-white text-2xl font-bold">
                    ${mockReferralData.totalEarned}
                  </Text>
                  <Text className="text-white/70 text-xs mt-1">Earned</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Referral Code Card */}
          <View className="px-6 mb-6">
            <Text className="text-white text-xl font-bold mb-3">Your Referral Code</Text>
            <View className="bg-zinc-900 rounded-2xl p-5">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-gray-400 text-sm mb-2">Share your code</Text>
                  <Text className="text-white text-3xl font-bold tracking-wider">
                    {mockReferralData.referralCode}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={copyToClipboard}
                  className={`w-14 h-14 rounded-full items-center justify-center ${
                    copied ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {copied ? (
                    <CheckCircle size={24} color="white" />
                  ) : (
                    <Copy size={24} color="white" />
                  )}
                </TouchableOpacity>
              </View>

              {copied && (
                <View className="bg-green-600/20 rounded-xl p-3 mb-4">
                  <Text className="text-green-400 font-semibold text-center">
                    Code copied to clipboard!
                  </Text>
                </View>
              )}

              {/* Share Buttons */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={shareReferral}
                  className="flex-1 bg-zinc-800 py-3 rounded-xl flex-row items-center justify-center"
                >
                  <Share2 size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">Share</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-zinc-800 py-3 rounded-xl flex-row items-center justify-center">
                  <MessageCircle size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">Message</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-zinc-800 py-3 rounded-xl flex-row items-center justify-center">
                  <Mail size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">Email</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* How It Works */}
          <View className="px-6 mb-6">
            <Text className="text-white text-xl font-bold mb-3">How It Works</Text>
            <View className="bg-zinc-900 rounded-2xl overflow-hidden">
              {[
                {
                  step: '1',
                  title: 'Share your code',
                  description: 'Send your unique referral code to friends',
                  color: '#3b82f6',
                },
                {
                  step: '2',
                  title: 'Friend signs up',
                  description: `They get $${mockReferralData.rewards.friendGets} off their first order`,
                  color: '#10b981',
                },
                {
                  step: '3',
                  title: 'You both win!',
                  description: `Earn $${mockReferralData.rewards.perReferral} when they place their first order`,
                  color: '#eab308',
                },
              ].map((item, index) => (
                <View
                  key={index}
                  className="flex-row items-start p-5 border-b border-zinc-800 last:border-b-0"
                >
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Text
                      className="font-bold text-xl"
                      style={{ color: item.color }}
                    >
                      {item.step}
                    </Text>
                  </View>
                  <View className="flex-1 ml-4">
                    <Text className="text-white font-bold text-base mb-1">
                      {item.title}
                    </Text>
                    <Text className="text-gray-400 text-sm leading-5">
                      {item.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Pending Rewards */}
          {mockReferralData.pendingRewards > 0 && (
            <View className="px-6 mb-6">
              <LinearGradient
                colors={['#f59e0b', '#d97706']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="rounded-2xl p-5 flex-row items-center"
              >
                <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
                  <DollarSign size={24} color="white" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-white/80 text-sm">Pending Rewards</Text>
                  <Text className="text-white text-2xl font-bold">
                    ${mockReferralData.pendingRewards}
                  </Text>
                </View>
                <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
                  <Text className="text-orange-600 font-bold">Claim</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}

          {/* Recent Referrals */}
          <View className="px-6 mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-white text-xl font-bold">Recent Referrals</Text>
              <TouchableOpacity>
                <Text className="text-red-500 font-semibold">View All</Text>
              </TouchableOpacity>
            </View>

            <View className="bg-zinc-900 rounded-2xl overflow-hidden">
              {mockReferralData.recentReferrals.map((referral, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between p-4 border-b border-zinc-800 last:border-b-0"
                >
                  <View className="flex-row items-center flex-1">
                    <View className="w-12 h-12 bg-zinc-800 rounded-full items-center justify-center">
                      <Users size={20} color="#71717a" />
                    </View>
                    <View className="flex-1 ml-3">
                      <Text className="text-white font-semibold">
                        {referral.name}
                      </Text>
                      <Text className="text-gray-400 text-sm">{referral.date}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text
                      className={`font-bold ${
                        referral.status === 'completed'
                          ? 'text-green-400'
                          : 'text-yellow-400'
                      }`}
                    >
                      ${referral.earned}
                    </Text>
                    <View
                      className={`px-2 py-0.5 rounded-full mt-1 ${
                        referral.status === 'completed'
                          ? 'bg-green-600/20'
                          : 'bg-yellow-600/20'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          referral.status === 'completed'
                            ? 'text-green-400'
                            : 'text-yellow-400'
                        }`}
                      >
                        {referral.status === 'completed' ? 'Completed' : 'Pending'}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Terms */}
          <View className="px-6 mb-6">
            <TouchableOpacity className="bg-zinc-900 rounded-2xl p-4 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-semibold mb-1">
                  Terms & Conditions
                </Text>
                <Text className="text-gray-400 text-sm">
                  Read the referral program guidelines
                </Text>
              </View>
              <ChevronLeft size={20} color="#71717a" style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
          </View>

          <View className="h-24" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ReferEarnScreen;