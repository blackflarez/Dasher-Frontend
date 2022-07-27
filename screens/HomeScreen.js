import { useState, useEffect, createRef } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Alert,
  Linking,
  SafeAreaView,
} from 'react-native'
import * as Location from 'expo-location'
import Constants from 'expo-constants'
import { Searchbar } from 'react-native-paper'

Location.setGoogleApiKey(Constants.manifest.extra.googleApiKey)

var currentCoordinates

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState({
    latitude: -40.86268755784721,
    longitude: 173.78307481203743,
    latitudeDelta: 5,
    longitudeDelta: 5,
  })

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:')
    } else if (Platform.OS === 'android') {
      RNAndroidOpenSettings.appDetailsSettings()
    }
  }

  const [searchQuery, setSearchQuery] = useState('')

  const onChangeSearch = (query) => setSearchQuery(query)

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
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <MapView
        mapType={Platform.OS == 'android' ? 'none' : 'standard'}
        provider={PROVIDER_GOOGLE}
        region={location}
        style={styles.map}
        //Keeps track of the current coordinates and logs its location
        onPress={
          Platform.OS === 'web'
            ? async () => {
                await navigation.navigate('Home')
                navigation.navigate(
                  'Dashboard',
                  await Location.reverseGeocodeAsync(currentCoordinates)
                )
              }
            : async (e) => {
                currentCoordinates = e.nativeEvent.coordinate
                await navigation.navigate('Home')
                navigation.navigate(
                  'Dashboard',
                  await Location.reverseGeocodeAsync(currentCoordinates)
                )
              }
        }
        onRegionChangeComplete={
          Platform.OS === 'web'
            ? (e) =>
                (currentCoordinates = {
                  latitude: e.latitude,
                  longitude: e.longitude,
                })
            : null
        }
        options={{
          disableDefaultUI: true,
        }}
        customMapStyle={[
          {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'transit',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
        ]}
      />
    </View>
  )
}

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
  searchbar: {
    position: 'absolute',
    top: 75,
    zIndex: 1,
    width: '75%',
  },
})
