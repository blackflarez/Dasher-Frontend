<<<<<<< Updated upstream
import React from 'react'
import Routes from './navigation/index'

export default function App() {
  return <Routes />
}
=======
import React, { useState, useEffect, createRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from 'react-native-maps'
import { Searchbar } from 'react-native-paper'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Alert,
  Linking,
} from 'react-native'
import * as Location from 'expo-location'

export default function App(){
  const [errorMsg, setErrorMsg] = useState(null)
  const [location, setLocation] = useState({
    latitude: -40.86268755784721,
    longitude: 173.78307481203743,
    latitudeDelta: 5,
    longitudeDelta: 5,
  })
  const mapRef = createRef()

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:')
    } else if (Platform.OS === 'android') {
      RNAndroidOpenSettings.appDetailsSettings()
    }
  }

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Location permission denied.',
          'Dasher can conviniently zoom in on your current location so that you can see the air quality in your area.',
          [
            {
              text: "Don't allow",
              onPress: () => console.log('Cancel Pressed'),
            },
            {
              text: 'Allow',
              onPress: openAppSettings,
            },
          ]
        )
        return
      } else {
        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          enableHighAccuracy: true,
          timeInterval: 5,
        })
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        })
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        mapType={Platform.OS == 'android' ? 'none' : 'standard'}
        provider={PROVIDER_GOOGLE}
        region={location}
        style={styles.map}
      />
    </View>
  )
}

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={{ position: 'absolute', top: 10, width: '100%' }}>
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  errorMsg: {
    backgroundColor: 'white',
  },
})
>>>>>>> Stashed changes
