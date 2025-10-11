import React, { useState } from 'react';
import { View, Text, Modal, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { X, Plus, Minus } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface AddToCartModalProps {
  visible: boolean;
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    badge?: string;
    category?: string;
  } | null;
  onClose: () => void;
  onAddToCart: (item: any, quantity: number) => void;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  visible,
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (item) {
      onAddToCart(item, quantity);
      setQuantity(1); // Reset quantity
    }
  };

  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  if (!item) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/95">
        <ScrollView className="flex-1" bounces={false}>
          {/* Product Image */}
          <View className="relative">
            <Image 
              source={{ uri: item.imageUrl }} 
              style={{ width: width, height: height * 0.4 }}
              resizeMode="cover" 
            />
            
            {/* Close Button */}
            <TouchableOpacity 
              onPress={handleClose}
              className="absolute top-12 right-4 w-10 h-10 bg-black/70 rounded-full items-center justify-center"
            >
              <X size={24} color="white" />
            </TouchableOpacity>

            {/* Badge */}
            {item.badge && (
              <View className="absolute top-12 left-4 bg-red-600 px-3 py-2 rounded-lg">
                <Text className="text-white font-bold text-sm">{item.badge}</Text>
              </View>
            )}

            {/* Gradient Overlay */}
            <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
          </View>

          {/* Product Details */}
          <View className="p-6">
            {/* Title */}
            <Text className="text-white text-3xl font-bold mb-3">
              {item.name}
            </Text>

            {/* Category */}
            {item.category && (
              <View className="mb-3">
                <Text className="text-gray-400 text-sm">{item.category}</Text>
              </View>
            )}

            {/* Description */}
            <Text className="text-gray-300 text-base leading-6 mb-6">
              {item.description}
            </Text>

            {/* Price Card */}
            <View className="bg-zinc-900 rounded-xl p-4 mb-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-400 text-base">Price</Text>
                <Text className="text-white text-2xl font-bold">
                  ${item.price.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Quantity Selector */}
            <View className="bg-zinc-900 rounded-xl p-4 mb-6">
              <Text className="text-white font-bold mb-4 text-base">Quantity</Text>
              <View className="flex-row items-center justify-center">
                <TouchableOpacity 
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-zinc-800 rounded-full items-center justify-center"
                  activeOpacity={0.7}
                >
                  <Minus size={20} color="white" />
                </TouchableOpacity>
                
                <Text className="text-white text-2xl font-bold mx-8">
                  {quantity}
                </Text>
                
                <TouchableOpacity 
                  onPress={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-zinc-800 rounded-full items-center justify-center"
                  activeOpacity={0.7}
                >
                  <Plus size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Total Price Display */}
            <View className="bg-zinc-900 rounded-xl p-4 mb-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-400 text-base">Total</Text>
                <Text className="text-red-500 text-2xl font-bold">
                  ${(item.price * quantity).toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Add to Cart Button */}
            <TouchableOpacity 
              onPress={handleAddToCart}
              className="bg-red-600 rounded-full py-4 items-center shadow-lg"
              activeOpacity={0.8}
            >
              <View className="flex-row items-center">
                <Plus size={20} color="white" />
                <Text className="text-white font-bold text-lg ml-2">
                  Add {quantity} to Cart
                </Text>
              </View>
            </TouchableOpacity>

            {/* Extra spacing at bottom */}
            <View className="h-8" />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
