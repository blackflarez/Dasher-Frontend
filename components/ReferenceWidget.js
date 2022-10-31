import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import * as Linking from 'expo-linking'
import { Foundation } from '@expo/vector-icons'

import SourceButton from './SourceButton'

const ReferenceWidget = ({}) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Foundation name={'page-search'} color={'#0084FF'} size={18} />
        <Text style={styles.title}>Sources</Text>
      </View>

      <View style={styles.body}>
        <View style={{ flex: 1 }}>
          <SourceButton
            title={'Environment Auckland'}
            description={'Based on PM10 data collected in Auckland.'}
            onPress={() => {
              Linking.openURL('https://environmentauckland.org.nz')
            }}
          />
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
    justifyContent: 'center',
  },
  title: { fontWeight: 'bold', marginLeft: 5, color: '#0084FF' },
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
