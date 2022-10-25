import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { Octicons, Ionicons, Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const ReferenceWidget = ({}) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Octicons
          onPress={() => {
            navigation.navigate('https://environmentauckland.org.nz/Data/Dashboard/183')
          }}
          name={'cross-reference'}
          color={'#262626'}
          size={18}
        />
        <Text style={styles.title}>Environment Auckland</Text>
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
          At places all around the region, Auckland Council keeps an eye on the air quality. 
          They have one of the most extensive collections of air quality data in New Zealand, with some of their data sets dating back to the 1960s. 
          Assessment of conformity with the National Environmental Standards for Air Quality is done using data from their monitoring network (NES-AQ).

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

export default ReferenceWidget
