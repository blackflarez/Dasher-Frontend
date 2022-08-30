import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { FontAwesome5, Ionicons, Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

import AppContext from '../components/AppContext'

const colourPresets = {}

const HealthWidget = ({}) => {
  const { aqi } = useContext(AppContext)
  const [healthIndicator, setHealthIndicator] = useState()
  const [messages, setMessages] = useState()
  const [colors, setColors] = useState(['#fff'])
  const [textColor, setTextColor] = useState('#fff')

  // Initialises widget
  useEffect(() => {
    function init() {
      if (aqi !== null && aqi !== 'none') {
        if (aqi <= 54) {
          setHealthIndicator('Healthy')
          setMessages(
            'feel free to enjoy outdoor activities, this poses little or no health risk.'
          )
          setColors(['#A7E67B', '#89D852', '#6CB836'])
          setTextColor('#030303')
        } else if (aqi > 54 && aqi <= 154) {
          setHealthIndicator('Moderate')
          setMessages(
            'people who are highly sensitive to air pollution may experience some health effects.'
          )
          setColors(['#FFDD56', '#FFDD33', '#BD9209'])
          setTextColor('#030303')
        } else if (aqi > 154 && aqi <= 254) {
          setHealthIndicator('Sensitive')
          setMessages(
            'sensitive groups should reschedule strenuous outdoor activities when air quality is better.'
          )
          setColors(['#FF9825', '#FF941D', '#B4640C'])
          setTextColor('#030303')
        } else if (aqi > 254 && aqi <= 354) {
          setHealthIndicator('Unhealthy')
          setMessages(
            'sensitive groups should cut back or reschedule strenuous outdoor activities.'
          )
          setColors(['#F54F29', '#BB2A18'])
          setTextColor('#FCFCFC')
        } else if (aqi > 354 && aqi <= 424) {
          setHealthIndicator('Very Unhealthy')
          setMessages(
            'sensitive groups should avoid strenuous outdoor activities. Everyone else should cut back or reschedule strenuous outdoor activities.'
          )
          setColors(['#C61A1A', '#620E0E'])
          setTextColor('#FCFCFC')
        } else if (aqi > 424) {
          setHealthIndicator('Hazardous')
          setMessages(
            'sensitive groups should avoid all outdoor physical activities. Everyone else should significantly cut back on outdoor physical activities.'
          )
          setColors(['#861F28', '#30070b'])
          setTextColor('#FCFCFC')
        }
      }
    }
    init()
  }, [aqi])

  if (!aqi) {
    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Entypo
            onPress={() => {
              navigation.navigate('Home')
            }}
            name={'air'}
            color={'#262626'}
            size={18}
          />
          <Text style={styles.title}>Air quality</Text>
          <Ionicons
            name={'help-circle-outline'}
            color={'#262626'}
            size={24}
            style={{ marginLeft: 'auto' }}
          />
        </View>

        <View style={styles.body}>
          <View style={{ flex: 1 }}>
            <ActivityIndicator size="large" color="#262626" />
          </View>
        </View>
      </View>
    )
  } else if (aqi === 'none') {
    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Entypo
            onPress={() => {
              navigation.navigate('Home')
            }}
            name={'air'}
            color={'#262626'}
            size={18}
          />
          <Text style={styles.title}>Air quality</Text>
          <Ionicons
            name={'help-circle-outline'}
            color={'#262626'}
            size={24}
            style={{ marginLeft: 'auto' }}
          />
        </View>

        <View style={styles.body}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Unable to retrieve data.</Text>
          </View>
        </View>
      </View>
    )
  } else {
    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Entypo
            onPress={() => {
              navigation.navigate('Home')
            }}
            name={'air'}
            color={'#262626'}
            size={18}
          />
          <Text style={styles.title}>Air quality</Text>
          <Ionicons
            name={'help-circle-outline'}
            color={'#262626'}
            size={24}
            style={{ marginLeft: 'auto' }}
          />
        </View>

        <View style={styles.body}>
          <LinearGradient colors={colors} style={styles.gradient}>
            <Text style={[styles.aqi, { color: textColor }]}>{aqi}</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.heading}>{healthIndicator}</Text>
            <Text style={styles.text}>
              With a particulate matter of {aqi}, {messages}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    margin: 15,
  },
  body: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  title: { fontWeight: 'bold', marginLeft: 5, color: '#262626' },
  heading: {
    fontWeight: '600',
    fontSize: 24,
    color: '#262626',
  },
  aqi: {
    fontSize: 42,
    fontWeight: '600',
  },
  gradient: {
    justifyContent: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    marginRight: 15,
    width: 100,
    height: 100,
  },
  text: { color: '#5C5C5C', marginTop: 5 },
})

export default HealthWidget
