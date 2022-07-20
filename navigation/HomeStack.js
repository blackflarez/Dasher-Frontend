import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import { AntDesign } from '@expo/vector-icons'

const Stack = createStackNavigator()

var transparent = 'transparent'
var animation = true

if (Platform.OS === 'android') {
  transparent = '#fff'
}
if (Platform.OS === 'web') {
  animation = false
}

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        detachPreviousScreen: false,
        headerShown: false,
        headerTransparent: true,
        gestureEnabled: true,
        gestureDirection: 'vertical',
        animationEnabled: animation,
        gestureResponseDistance: 200,
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <AntDesign name={'down'} size={24} style={{ padding: 15 }} />
        ),
        headerTintColor: 'black',
        headerStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}
