import { StyleSheet, View, Text } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const HealthWidget = ({ onPress, AQI = 20 }) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <FontAwesome5
          onPress={() => {
            navigation.navigate('Home')
          }}
          name={'heartbeat'}
          color={'#0083FF'}
          size={18}
        />
        <Text style={styles.title}>Health</Text>
        <Ionicons
          name={'help-circle-outline'}
          color={'#0083FF'}
          size={24}
          style={{ marginLeft: 'auto' }}
        />
      </View>

      <View style={styles.body}>
        <LinearGradient colors={['#91D5FF', '#0083FF']} style={styles.gradient}>
          <Text style={styles.aqi}>{AQI}</Text>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>Healthy</Text>
          <Text style={styles.text}>
            Currently, the air pollution around here is {AQI} AQI. Feel free to
            go outside, this poses little or no health risk.
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
    paddingHorizontal: 30,
  },
  title: { fontWeight: 'bold', marginLeft: 5, color: '#0083FF' },
  heading: {
    fontWeight: '600',
    fontSize: 24,
    color: '#0083FF',
  },
  aqi: {
    fontSize: 42,
    fontWeight: '600',
    color: '#fff',
  },
  gradient: {
    justifyContent: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    marginRight: 15,
    padding: 20,
  },
  text: { color: '#262626', marginTop: 5 },
})

export default HealthWidget
