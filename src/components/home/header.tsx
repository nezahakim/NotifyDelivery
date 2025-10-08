import { Ionicons } from '@expo/vector-icons';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { router } from 'expo-router';

export const HeaderComponent = () => {
  return (
    <View className="px-6 py-3 flex-row items-center justify-between">
{/* Logo with location */}
      <View className='flex-col items-start gap-2'>
        {/* Logo/Brand */}
        <View className="flex-row items-center">
          <Text className="text-red-600 text-sm font-bold">Notify</Text>
          <Text className="text-white text-sm font-bold">De+</Text>
        </View>

        {/* Location */}
        <View className="flex-row items-center -mt-2">
          <Ionicons name="location" size={14} color="#ef4444" />
          <Text className="text-gray-400 text-sm ml-1">Downtown, NY</Text>
          <Ionicons name="chevron-down" size={14} color="#9ca3af" />
        </View>
      </View>

{/* Right actions */}
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            className="w-10 h-10 bg-zinc-800 rounded-full items-center justify-center"
            onPress={() => router.push('/notification')}
          >
            <Ionicons name="notifications-outline" size={20} color="white" />
            <View className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full items-center justify-center">
              <Text className="text-white text-[10px] font-bold">3</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.navigate('/profile')}>
            <View className="w-10 h-10 bg-red-600 rounded-full items-center justify-center">
              <Ionicons name="person" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

      
    </View>
  );
};