import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, ActivityIndicator } from 'react-native'
import HomeStack from './HomeStack'

export default function RootNavigator() {
  return <NavigationContainer>{<HomeStack />}</NavigationContainer>
}
