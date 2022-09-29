import { useState, useEffect, useRef } from 'react'
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from 'react-native-maps'
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
import { db } from '../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

Location.setGoogleApiKey(Constants.manifest.extra.googleApiKey)
var currentCoordinates

export default function HomeScreen({ navigation }) {
  const [heatPoints, setHeatPoints] = useState([])
  const [radiusPoints, setRadiusPoints] = useState([])

  const searchRef = useRef()
  const mapRef = useRef()
  const radiusRef = useRef([])

  //mobile
  const renderCircle = (circle, index) => (
    <View key={circle.name}>
      <Marker
        coordinate={{
          latitude: circle.coordinates.latitude,
          longitude: circle.coordinates.longitude,
        }}
        image={require('../assets/datapin.png')}
        onPress={async () => {
          if (searchRef.current.isFocused()) {
            searchRef.current.blur()
          } else {
            await navigation.navigate('Home')
            let location = circle.name
            if (location) {
              await navigation.navigate('Dashboard', {
                coordinates: currentCoordinates,
                location: location,
              })
            } else {
              await navigation.navigate('NoData')
            }
          }
        }}
      />
      <Circle
        center={{
          latitude: circle.coordinates.latitude,
          longitude: circle.coordinates.longitude,
        }}
        radius={2500}
        fillColor={'rgba(0,152,255,0.3)'}
        ref={(element) => {
          radiusRef.current[index] = element
        }}
        onLayout={() =>
          radiusRef.current[index].setNativeProps({
            strokeColor: 'rgba(0,152,255,0.3)',
            fillColor: 'rgba(0,152,255,0.3)',
          })
        }
      />
    </View>
  )

  //web
  const renderDataMarker = (circle) => (
    <MapView.Marker
      coordinate={{
        latitude: circle.coordinates.latitude,
        longitude: circle.coordinates.longitude,
      }}
      key={circle.name}
      onPress={async () => {
        if (searchRef.current.isFocused()) {
          searchRef.current.blur()
        } else {
          await navigation.navigate('Home')
          let location = circle.name
          if (location) {
            await navigation.navigate('Dashboard', {
              coordinates: currentCoordinates,
              location: location,
            })
          } else {
            await navigation.navigate('NoData')
          }
        }
      }}
    />
  )

  function ptInCircle(checkPoint, centerPoint, km) {
    var ky = 40000 / 360
    var kx = Math.cos((Math.PI * centerPoint.latitude) / 180.0) * ky
    var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx
    var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky
    return Math.sqrt(dx * dx + dy * dy) <= km
  }

  function checkCoords(coordinates) {
    for (let i of radiusPoints) {
      if (ptInCircle(coordinates, i.coordinates, 3)) {
        return i.name
      }
    }
  }

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:')
    } else if (Platform.OS === 'android') {
      RNAndroidOpenSettings.appDetailsSettings()
    }
  }

  useEffect(() => {
    async function init() {
      const coordinateRef = doc(db, 'coordinates', 'auckland')
      const coordinateSnap = await getDoc(coordinateRef)

      if (radiusPoints.length == 0) {
        for (const [key, value] of Object.entries(coordinateSnap.data())) {
          setRadiusPoints((oldArray) => [
            ...oldArray,
            { name: key, coordinates: value },
          ])
        }
      }
    }

    init()
  }, [])

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
                  let location = checkCoords(currentCoordinates)
                  if (location) {
                    await navigation.navigate('Dashboard', {
                      coordinates: currentCoordinates,
                      location: location,
                    })
                  } else {
                    await navigation.navigate('NoData')
                  }
                }
              }
            : async (e) => {
                if (searchRef.current.isFocused()) {
                  searchRef.current.blur()
                } else {
                  currentCoordinates = e.nativeEvent.coordinate

                  await navigation.navigate('Home')
                  let location = checkCoords(currentCoordinates)
                  if (location) {
                    await navigation.navigate('Dashboard', {
                      coordinates: currentCoordinates,
                      location: location,
                    })
                  } else {
                    await navigation.navigate('NoData')
                  }
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
        {radiusPoints.length > 0 && Platform.OS !== 'web'
          ? radiusPoints.map((circle, index) => renderCircle(circle, index))
          : Platform.OS == 'web'
          ? radiusPoints.map((circle) => renderDataMarker(circle))
          : null}
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
