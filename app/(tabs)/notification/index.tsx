import { notifications } from '@/src/constants/example';
import { createFadeInAnimation, slideFromBottomStyle } from '@/src/utils/animations';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    RefreshControl,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationsScreen = () => {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  // Animation refs
  const headerAnim = useRef(new Animated.Value(0)).current;
  const filterAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    createFadeInAnimation(headerAnim, 800, 0).start();
    createFadeInAnimation(filterAnim, 800, 200).start();
    createFadeInAnimation(contentAnim, 800, 400).start();
  }, []);
  
  const markAsRead = (notificationId: number) => {
    setNotificationsList(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };
  
  const deleteNotification = (notificationId: number) => {
    setNotificationsList(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== notificationId)
    );
  };
  
  const markAllAsRead = () => {
    setNotificationsList(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const clearAll = () => {
    setNotificationsList([]);
  };
  
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  const getFilteredNotifications = () => {
    if (selectedFilter === 'All') return notificationsList;
    if (selectedFilter === 'Unread') return notificationsList.filter(n => !n.read);
    return notificationsList.filter(n => n.type === selectedFilter.toLowerCase());
  };
  
  const getNotificationIcon = (type: any) => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'offer':
        return 'pricetag';
      case 'info':
        return 'information-circle';
      default:
        return 'notifications';
    }
  };
  
  const getNotificationColor = (type: any) => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'offer':
        return '#f59e0b';
      case 'info':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };
  
  const NotificationHeader = () => (
    <Animated.View 
      style={{ opacity: headerAnim }}
      className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100"
    >
      <TouchableOpacity 
        onPress={() => router.canGoBack() ? router.back() : router.push("/")}
        className="w-10 h-10 items-center justify-center"
      >
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </TouchableOpacity>
      
      <Text className="text-xl font-bold text-gray-900">Notifications</Text>
      
      <TouchableOpacity 
        onPress={markAllAsRead}
        className="px-3 py-1 bg-red-50 rounded-full"
      >
        <Text className="text-red-500 text-sm font-medium">Mark all read</Text>
      </TouchableOpacity>
    </Animated.View>
  );
  
  const FilterTabs = () => (
    <Animated.View 
      style={{ opacity: filterAnim }}
      className="bg-white px-6 py-4"
    >
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 24 }}
      >
        {['All', 'Unread', 'Success', 'Offer', 'Info'].map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full mr-3 ${
              selectedFilter === filter ? 'bg-red-500' : 'bg-gray-100'
            }`}
          >
            <Text className={`font-medium ${
              selectedFilter === filter ? 'text-white' : 'text-gray-700'
            }`}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
  
  const NotificationCard = ({ notification, index }:any ) => {
    const cardAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
      createFadeInAnimation(cardAnim, 600, index * 100).start();
    }, []);
    
    return (
      <Animated.View style={slideFromBottomStyle(cardAnim)}>
        <TouchableOpacity 
          className={`bg-white rounded-2xl p-4 mb-3 border ${
            notification.read ? 'border-gray-100' : 'border-red-100 bg-red-50/30'
          }`}
          onPress={() => markAsRead(notification.id)}
          activeOpacity={0.7}
        >
          <View className="flex-row">
            <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
              notification.read ? 'bg-gray-100' : 'bg-red-100'
            }`}>
              <Ionicons 
                name={getNotificationIcon(notification.type)} 
                size={24} 
                color={getNotificationColor(notification.type)} 
              />
            </View>
            
            <View className="flex-1">
              <View className="flex-row items-start justify-between mb-1">
                <Text className={`text-lg font-semibold ${
                  notification.read ? 'text-gray-700' : 'text-gray-900'
                }`}>
                  {notification.title}
                </Text>
                
                <View className="flex-row items-center ml-2">
                  {!notification.read && (
                    <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  )}
                  
                  <TouchableOpacity 
                    onPress={() => deleteNotification(notification.id)}
                    className="p-1"
                  >
                    <Ionicons name="close" size={16} color="#9ca3af" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <Text className={`text-sm mb-2 ${
                notification.read ? 'text-gray-500' : 'text-gray-600'
              }`} numberOfLines={2}>
                {notification.message}
              </Text>
              
              <Text className="text-xs text-gray-400">{notification.time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  const EmptyState = () => (
    <View className="flex-1 items-center justify-center px-6 py-12">
      <Ionicons name="notifications-off-outline" size={80} color="#d1d5db" />
      <Text className="text-2xl font-bold text-gray-400 mt-4 mb-2">
        No notifications
      </Text>
      <Text className="text-gray-500 text-center">
        You're all caught up! Check back later for updates.
      </Text>
    </View>
  );
  
  const filteredNotifications = getFilteredNotifications();
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <NotificationHeader />
      <FilterTabs />
      
      {filteredNotifications.length === 0 ? (
        <EmptyState />
      ) : (
        <Animated.View style={{ opacity: contentAnim }} className="flex-1">
          <ScrollView 
            className="flex-1 px-6 py-4"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                tintColor="#ef4444"
              />
            }
          >
            {filteredNotifications.map((notification, index) => (
              <NotificationCard 
                key={notification.id} 
                notification={notification} 
                index={index} 
              />
            ))}
            
            {/* Bottom spacing */}
            <View className="h-6" />
          </ScrollView>
          
          {/* Clear All Button */}
          {filteredNotifications.length > 0 && (
            <View className="bg-white p-6 border-t border-gray-100">
              <TouchableOpacity 
                className="bg-gray-100 rounded-2xl p-4 items-center"
                onPress={clearAll}
              >
                <Text className="text-gray-700 font-semibold">Clear All Notifications</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;