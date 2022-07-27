import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import Dashboard from '../screens/Dashboard'

import { AntDesign } from '@expo/vector-icons'
import { createBottomSheetNavigator } from '@th3rdwave/react-navigation-bottom-sheet'
const BottomSheet = createBottomSheetNavigator()

export default function HomeStack() {
  return (
    <BottomSheet.Navigator
      screenOptions={{
        snapPoints: ['40%', '95%'],
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
      }}
    >
      <BottomSheet.Screen name="Home" component={HomeScreen} />
      <BottomSheet.Screen name="Dashboard" component={Dashboard} />
    </BottomSheet.Navigator>
  )
}
