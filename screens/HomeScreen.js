import { useState, useEffect, useRef } from 'react'
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Alert,
  Linking,
  ScrollView,
} from 'react-native'
import * as Location from 'expo-location'
import Constants from 'expo-constants'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

Location.setGoogleApiKey(Constants.manifest.extra.googleApiKey)
var currentCoordinates

export default function HomeScreen({ navigation }) {
  const [heatPoints, setHeatPoints] = useState([])

  const searchRef = useRef()
  const mapRef = useRef()

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:')
    } else if (Platform.OS === 'android') {
      RNAndroidOpenSettings.appDetailsSettings()
    }
  }

  // Initialise Location
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

        mapRef.current.animateToRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        })
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <GooglePlacesAutocomplete
          ref={searchRef}
          placeholder="Search"
          fetchDetails={true}
          isFocused={() => {
            navigation.navigate('Home')
          }}
          onPress={(data, details = null) => {
            navigation.navigate('Home')
            mapRef.current.animateToRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            })
            searchRef.current.clear()
          }}
          query={{
            key: Constants.manifest.extra.googleApiKey,
            language: 'en',
            components: 'country:nz',
          }}
          requestUrl={{
            useOnPlatform: 'web', // or "all"
            url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
          }}
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -36.848461,
          longitude: 174.763336,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        style={styles.map}
        ref={mapRef}
        //Keeps track of the current coordinates and logs its location
        onPress={
          Platform.OS === 'web'
            ? async () => {
                if (searchRef.current.isFocused()) {
                  searchRef.current.blur()
                } else {
                  await navigation.navigate('Home')
                  await navigation.navigate(
                    'Dashboard',
                    await Location.reverseGeocodeAsync(currentCoordinates)
                  )
                }
              }
            : async (e) => {
                if (searchRef.current.isFocused()) {
                  searchRef.current.blur()
                } else {
                  currentCoordinates = e.nativeEvent.coordinate
                  console.log(
                    await Location.reverseGeocodeAsync(currentCoordinates)
                  )
                  await navigation.navigate('Home')
                  await navigation.navigate(
                    'Dashboard',
                    await Location.reverseGeocodeAsync(currentCoordinates)
                  )
                }
              }
        }
        onRegionChange={() => {
          navigation.navigate('Home')
        }}
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
      >
        {Platform.OS == 'web' ? null : (
          <Heatmap
            points={heatPoints}
            radius={40}
            opacity={0.7}
            gradient={{
              colors: ['purple', 'red', 'orange', 'white'],
              startPoints:
                Platform.OS === 'ios'
                  ? [0.01, 0.04, 0.1, 0.45]
                  : [0.1, 0.25, 0.5, 0.75],
              colorMapSize: 200,
            }}
          />
        )}
      </MapView>
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
    zIndex: 0,
  },
  errorMsg: {
    backgroundColor: 'white',
  },
  searchbar: {
    position: 'absolute',
    width: '80%',
    zIndex: 9999,
    top: 90,
    alignSelf: 'center',
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
})
