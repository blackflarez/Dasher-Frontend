import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const DescriptionWidget = ({}) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Entypo
          onPress={() => {
            navigation.navigate('Home')
          }}
          name={'info'}
          color={'#262626'}
          size={18}
        />
        <Text style={styles.title}>How we collect our data</Text>
        <Ionicons
          name={'help-circle-outline'}
          color={'#262626'}
          size={24}
          style={{ marginLeft: 'auto' }}
        />
      </View>

      <View style={styles.body}>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>
            We gathered out data from various environmental monitoring sites
            around New Zealand. This air quality data is measured in PM10
            (Particulate Matter), which is the concentration of particles 10
            microns or less. These are able to be inhaled into the lungs by
            which can impact our health in a negative manner.
          </Text>
        </View>
      </View>
    </View>
  )
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

export default DescriptionWidget
