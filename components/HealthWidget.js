import { StyleSheet, View, Text } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

let messages, healthIndicator, colors;
const HealthWidget = ({ onPress, AQI = 200}) => {

  if(AQI <= 50){
    healthIndicator = "Healthy";
    messages = "Feel free to go outside, this poses little or no health risk.";
    colors = '#0083FF';
  }else if (AQI > 50 && AQI <=100){
    healthIndicator = "Moderate";
    messages = "People who are sensitive to air pollution may experience some health effects.";
    colors = '#fff200';
  }else if(AQI > 100 && AQI <= 150){
    healthIndicator = "Unhealthy for Sensitive Groups";
    messages = "Members in sensitive groups may experience some health effects.";
    colors = '#ff9900';
  }else if (AQI > 150 && AQI <=200){
    healthIndicator = "Unhealthy";
    messages = "Sensitive members are more at risk and some of the general public.";
    colors = '#ff0000';
  }else if(AQI >200 && AQI <= 300){
    healthIndicator = "Very Unhealthy";
    messages = "Health alert: The risk of health effects is increased for everyone";
    colors = '#c300ff';
  }
  else{
    healthIndicator = "Hazardous";
    messages = "Health emergency: Everyone is more likely to be affected";
    colors = '#4a0404';
  }

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
        <LinearGradient colors={[colors, colors]} style={styles.gradient}>
          <Text style={styles.aqi}>{AQI}</Text>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>{healthIndicator}</Text>
          <Text style={styles.text}>
            Currently, the air pollution around here is {AQI} AQI. {messages}
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
