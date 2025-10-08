import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  MapPin,
  Home,
  Briefcase,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
} from 'lucide-react-native';
import { router } from 'expo-router';

const mockAddresses = [
  {
    id: '1',
    type: 'home',
    label: 'Home',
    address: '456 Main Street, Apartment 4B',
    city: 'Downtown, NY 10001',
    instructions: 'Ring doorbell twice',
    isDefault: true,
  },
  {
    id: '2',
    type: 'work',
    label: 'Work',
    address: '789 Business Ave, Floor 12',
    city: 'Midtown, NY 10002',
    instructions: 'Leave with receptionist',
    isDefault: false,
  },
  {
    id: '3',
    type: 'other',
    label: "Mom's House",
    address: '321 Oak Street',
    city: 'Brooklyn, NY 11201',
    instructions: '',
    isDefault: false,
  },
];

const AddressesScreen = () => {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return { Icon: Home, color: '#3b82f6' };
      case 'work':
        return { Icon: Briefcase, color: '#10b981' };
      default:
        return { Icon: MapPin, color: '#f59e0b' };
    }
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
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
            <Text className="text-white text-xl font-bold">Delivery Addresses</Text>
            <View className="w-10" />
          </View>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Add New Address Button */}
          <TouchableOpacity
            onPress={() => setShowAddModal(true)}
            className="mb-6"
          >
            <LinearGradient
              colors={['#7f1d1d', '#991b1b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl p-5 flex-row items-center justify-center"
            >
              <Plus size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">
                Add New Address
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Addresses List */}
          {addresses.map(address => {
            const { Icon, color } = getAddressIcon(address.type);
            
            return (
              <View key={address.id} className="bg-zinc-900 rounded-2xl mb-4 overflow-hidden">
                <View className="p-5">
                  {/* Header */}
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-row items-center flex-1">
                      <View
                        className="w-12 h-12 rounded-full items-center justify-center"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <Icon size={24} color={color} />
                      </View>
                      <View className="flex-1 ml-3">
                        <View className="flex-row items-center">
                          <Text className="text-white font-bold text-lg">
                            {address.label}
                          </Text>
                          {address.isDefault && (
                            <View className="ml-2 bg-green-600 px-2 py-0.5 rounded-full">
                              <Text className="text-white text-xs font-bold">Default</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Address Details */}
                  <View className="ml-15">
                    <Text className="text-gray-300 text-base leading-6 mb-2">
                      {address.address}
                    </Text>
                    <Text className="text-gray-400 text-sm mb-3">
                      {address.city}
                    </Text>
                    {address.instructions && (
                      <View className="bg-zinc-800 rounded-xl p-3 mb-3">
                        <Text className="text-gray-400 text-xs mb-1">
                          Delivery Instructions
                        </Text>
                        <Text className="text-white text-sm">
                          {address.instructions}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Action Buttons */}
                  <View className="flex-row gap-2 mt-3">
                    {!address.isDefault && (
                      <TouchableOpacity
                        onPress={() => setDefaultAddress(address.id)}
                        className="flex-1 bg-zinc-800 py-3 rounded-xl flex-row items-center justify-center"
                      >
                        <Check size={18} color="white" />
                        <Text className="text-white font-semibold ml-2">Set Default</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity className="flex-1 bg-zinc-800 py-3 rounded-xl flex-row items-center justify-center">
                      <Edit3 size={18} color="white" />
                      <Text className="text-white font-semibold ml-2">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => deleteAddress(address.id)}
                      className="bg-red-600/20 px-4 py-3 rounded-xl"
                    >
                      <Trash2 size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}

          <View className="h-24" />
        </ScrollView>

        {/* Add Address Modal */}
        <Modal
          visible={showAddModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowAddModal(false)}
        >
          <View className="flex-1 bg-black/95">
            <SafeAreaView className="flex-1">
              {/* Modal Header */}
              <View className="px-6 py-4 flex-row items-center justify-between border-b border-zinc-800">
                <Text className="text-white text-xl font-bold">Add New Address</Text>
                <TouchableOpacity
                  onPress={() => setShowAddModal(false)}
                  className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
                >
                  <X size={24} color="white" />
                </TouchableOpacity>
              </View>

              <ScrollView className="flex-1 px-6 py-6">
                {/* Address Type Selection */}
                <Text className="text-white font-bold mb-3">Address Type</Text>
                <View className="flex-row gap-3 mb-6">
                  {[
                    { type: 'home', label: 'Home', icon: Home },
                    { type: 'work', label: 'Work', icon: Briefcase },
                    { type: 'other', label: 'Other', icon: MapPin },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <TouchableOpacity
                        key={item.type}
                        className={`flex-1 py-4 rounded-xl items-center ${
                          selectedAddress === item.type ? 'bg-red-600' : 'bg-zinc-900'
                        }`}
                        onPress={() => setSelectedAddress(item.type)}
                      >
                        <Icon
                          size={24}
                          color={selectedAddress === item.type ? 'white' : '#71717a'}
                        />
                        <Text
                          className={`mt-2 font-semibold ${
                            selectedAddress === item.type ? 'text-white' : 'text-gray-400'
                          }`}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Form Fields */}
                <View className="mb-4">
                  <Text className="text-white font-semibold mb-2">Label</Text>
                  <TextInput
                    placeholder="e.g., Home, Office"
                    placeholderTextColor="#71717a"
                    className="bg-zinc-900 text-white px-4 py-4 rounded-xl"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-white font-semibold mb-2">Street Address</Text>
                  <TextInput
                    placeholder="Enter street address"
                    placeholderTextColor="#71717a"
                    className="bg-zinc-900 text-white px-4 py-4 rounded-xl"
                    multiline
                  />
                </View>

                <View className="flex-row gap-3 mb-4">
                  <View className="flex-1">
                    <Text className="text-white font-semibold mb-2">City</Text>
                    <TextInput
                      placeholder="City"
                      placeholderTextColor="#71717a"
                      className="bg-zinc-900 text-white px-4 py-4 rounded-xl"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-semibold mb-2">ZIP Code</Text>
                    <TextInput
                      placeholder="10001"
                      placeholderTextColor="#71717a"
                      className="bg-zinc-900 text-white px-4 py-4 rounded-xl"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="text-white font-semibold mb-2">
                    Delivery Instructions (Optional)
                  </Text>
                  <TextInput
                    placeholder="e.g., Ring doorbell, Leave at door"
                    placeholderTextColor="#71717a"
                    className="bg-zinc-900 text-white px-4 py-4 rounded-xl"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                {/* Save Button */}
                <TouchableOpacity
                  onPress={() => setShowAddModal(false)}
                  className="bg-red-600 rounded-full py-4 mt-4"
                >
                  <Text className="text-white font-bold text-center text-lg">
                    Save Address
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default AddressesScreen;