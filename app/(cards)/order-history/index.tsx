import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronRight,
  Star,
  Receipt,
} from 'lucide-react-native';
import { router } from 'expo-router';

const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-10-01',
    time: '2:30 PM',
    restaurant: 'Kyoji Sushi & Grill',
    restaurantImage: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=200',
    status: 'delivered',
    items: [
      { name: "Chef's Omakase", quantity: 1, price: 75.0 },
      { name: 'Dragon Roll', quantity: 2, price: 36.0 },
    ],
    total: 113.99,
    itemCount: 3,
    rating: 5,
  },
  {
    id: 'ORD-2024-002',
    date: '2024-09-28',
    time: '7:15 PM',
    restaurant: 'Bella Italia',
    restaurantImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200',
    status: 'delivered',
    items: [
      { name: 'Margherita Pizza', quantity: 2, price: 32.0 },
      { name: 'Caesar Salad', quantity: 1, price: 12.0 },
    ],
    total: 46.99,
    itemCount: 3,
    rating: 4,
  },
  {
    id: 'ORD-2024-003',
    date: '2024-09-25',
    time: '12:45 PM',
    restaurant: 'Thai Express',
    restaurantImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=200',
    status: 'cancelled',
    items: [
      { name: 'Pad Thai', quantity: 1, price: 14.0 },
    ],
    total: 16.99,
    itemCount: 1,
    rating: null,
  },
  {
    id: 'ORD-2024-004',
    date: '2024-09-22',
    time: '6:00 PM',
    restaurant: 'Burger House',
    restaurantImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200',
    status: 'delivered',
    items: [
      { name: 'Classic Burger', quantity: 2, price: 28.0 },
      { name: 'French Fries', quantity: 2, price: 12.0 },
    ],
    total: 42.99,
    itemCount: 4,
    rating: 5,
  },
];

const OrderHistoryScreen = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'delivered' | 'cancelled'>('all');

  const filters = [
    { id: 'all', label: 'All Orders', count: mockOrders.length },
    { id: 'delivered', label: 'Delivered', count: mockOrders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: mockOrders.filter(o => o.status === 'cancelled').length },
  ];

  const filteredOrders = activeFilter === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === activeFilter);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'delivered':
        return {
          icon: CheckCircle,
          color: '#10b981',
          bg: '#10b98120',
          label: 'Delivered',
        };
      case 'cancelled':
        return {
          icon: XCircle,
          color: '#ef4444',
          bg: '#ef444420',
          label: 'Cancelled',
        };
      case 'processing':
        return {
          icon: Clock,
          color: '#f59e0b',
          bg: '#f59e0b20',
          label: 'Processing',
        };
      default:
        return {
          icon: Package,
          color: '#71717a',
          bg: '#71717a20',
          label: 'Unknown',
        };
    }
  };

  const renderOrderItem = ({ item: order }: { item: typeof mockOrders[0] }) => {
    const statusConfig = getStatusConfig(order.status);
    const StatusIcon = statusConfig.icon;

    return (
      <TouchableOpacity
        onPress={() => router.push('/order-detail')}
        className="bg-zinc-900 rounded-2xl mb-4 overflow-hidden"
        activeOpacity={0.9}
      >
        {/* Header */}
        <View className="p-4 border-b border-zinc-800">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center flex-1">
              <Image
                source={{ uri: order.restaurantImage }}
                className="w-12 h-12 rounded-xl"
              />
              <View className="ml-3 flex-1">
                <Text className="text-white font-bold text-base">
                  {order.restaurant}
                </Text>
                <Text className="text-gray-400 text-sm">
                  {order.date} • {order.time}
                </Text>
              </View>
            </View>
            <View
              className="px-3 py-1 rounded-full flex-row items-center"
              style={{ backgroundColor: statusConfig.bg }}
            >
              <StatusIcon size={14} color={statusConfig.color} />
              <Text
                className="text-xs font-bold ml-1"
                style={{ color: statusConfig.color }}
              >
                {statusConfig.label}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="flex-row items-center bg-zinc-800 px-3 py-1 rounded-full mr-2">
              <Receipt size={12} color="#9ca3af" />
              <Text className="text-gray-400 text-xs ml-1 font-semibold">
                {order.id}
              </Text>
            </View>
            <Text className="text-gray-500 text-xs">
              {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
            </Text>
          </View>
        </View>

        {/* Items List */}
        <View className="px-4 py-3 border-b border-zinc-800">
          {order.items.map((item, index) => (
            <View key={index} className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center flex-1">
                <Text className="text-gray-400 text-sm mr-2">
                  {item.quantity}x
                </Text>
                <Text className="text-white text-sm flex-1">
                  {item.name}
                </Text>
              </View>
              <Text className="text-gray-400 text-sm font-semibold">
                ${item.price.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View className="p-4 flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-gray-400 text-sm mb-1">Total Amount</Text>
            <Text className="text-white text-xl font-bold">
              ${order.total.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row gap-2">
            {order.status === 'delivered' && (
              <>
                {order.rating ? (
                  <View className="bg-zinc-800 px-4 py-2 rounded-full flex-row items-center">
                    <Star size={16} color="#FFD700" fill="#FFD700" />
                    <Text className="text-white font-bold ml-1">{order.rating}</Text>
                  </View>
                ) : (
                  <TouchableOpacity className="bg-yellow-600 px-4 py-2 rounded-full">
                    <Text className="text-white font-bold text-sm">Rate</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-full flex-row items-center">
                  <RefreshCw size={16} color="white" />
                  <Text className="text-white font-bold text-sm ml-1">Reorder</Text>
                </TouchableOpacity>
              </>
            )}

            {order.status === 'cancelled' && (
              <TouchableOpacity className="bg-zinc-800 px-4 py-2 rounded-full">
                <Text className="text-white font-bold text-sm">View Details</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity className="bg-zinc-800 w-10 h-10 rounded-full items-center justify-center">
              <ChevronRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
            >
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Order History</Text>
            <View className="w-10" />
          </View>

          {/* Stats Cards */}
          <View className="flex-row gap-3 mb-6">
            <LinearGradient
              colors={['#1f1f1f', '#0a0a0a']}
              className="flex-1 rounded-2xl p-4"
            >
              <Text className="text-gray-400 text-sm mb-1">Total Orders</Text>
              <Text className="text-white text-2xl font-bold">{mockOrders.length}</Text>
            </LinearGradient>

            <LinearGradient
              colors={['#7f1d1d', '#991b1b']}
              className="flex-1 rounded-2xl p-4"
            >
              <Text className="text-white/70 text-sm mb-1">Total Spent</Text>
              <Text className="text-white text-2xl font-bold">
                ${mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(0)}
              </Text>
            </LinearGradient>
          </View>

          {/* Filter Tabs */}
          <View className="flex-row bg-zinc-900 rounded-2xl p-1">
            {filters.map(filter => (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setActiveFilter(filter.id as any)}
                className={`flex-1 py-3 rounded-xl ${
                  activeFilter === filter.id ? 'bg-red-600' : 'bg-transparent'
                }`}
              >
                <Text
                  className={`text-center font-bold text-sm ${
                    activeFilter === filter.id ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {filter.label}
                </Text>
                <Text
                  className={`text-center text-xs mt-1 ${
                    activeFilter === filter.id ? 'text-white/70' : 'text-gray-600'
                  }`}
                >
                  {filter.count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Orders List */}
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center justify-center py-20">
              <View className="w-24 h-24 bg-zinc-900 rounded-full items-center justify-center mb-4">
                <Package size={40} color="#71717a" />
              </View>
              <Text className="text-white text-xl font-bold mb-2">No Orders Yet</Text>
              <Text className="text-gray-400 text-center">
                Start ordering delicious food from your{'\n'}favorite restaurants
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/')}
                className="bg-red-600 px-8 py-3 rounded-full mt-6"
              >
                <Text className="text-white font-bold">Explore Restaurants</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default OrderHistoryScreen;