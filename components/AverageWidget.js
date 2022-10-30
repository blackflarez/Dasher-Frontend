import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons'
import { LineChart } from 'react-native-chart-kit'
import AppContext from '../components/AppContext'

const HealthWidget = ({}) => {
  const { aqi, date, aqiList } = useContext(AppContext)

  const dateMinus = new Date()
  const datePlus = new Date()

  dateMinus.setHours(date.getHours() - 6)
  datePlus.setHours(date.getHours() + 6)

  if (!aqi) {
    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <MaterialIcons name={'show-chart'} color={'#262626'} size={18} />
          <Text style={styles.title}>Average</Text>
        </View>

        <View style={styles.body}>
          <View style={{ flex: 1 }}>
            <ActivityIndicator size="large" color="#262626" />
          </View>
        </View>
      </View>
    )
  } else if (aqiList.length == 0) {
    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <MaterialIcons name={'show-chart'} color={'#262626'} size={18} />
          <Text style={styles.title}>Average</Text>
        </View>

        <View style={styles.body}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Unable to retrieve data.</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <MaterialIcons name={'show-chart'} color={'#262626'} size={18} />
        <Text style={styles.title}>Average</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.verticleLine} />
        <View style={styles.bubble}>
          <Text style={styles.bubbleTitle}>Now</Text>
          <Text style={styles.bubbleText}>{aqi}</Text>
        </View>
        <View style={styles.bubbleSecondary}>
          <Text style={styles.bubbleTitle}>Average</Text>
          <Text style={styles.bubbleText}>{10}</Text>
        </View>
        <View style={styles.triangle} />

        <LineChart
          data={{
            datasets: [
              {
                data: aqiList,
              },
              {
                //Placeholder randomised data until average dataset is available
                data: [
                  Math.random() * 15,
                  Math.random() * 15,
                  Math.random() * 15,
                  Math.random() * 15,
                  Math.random() * 15,
                  Math.random() * 15,
                  Math.random() * 15,
                  Math.random() * 15,
                  Math.random() * 15,
                  Math.random() * 15,
                  Math.random() * 15,
                  Math.random() * 15,
                  Math.random() * 15,
                ],
                fillShadowGradientTo: '#4a4a4a',
                fillShadowGradientFrom: '#4a4a4a',
                color: () => `rgba( 0, 0, 0, 0.1 )`,
              },
            ],
          }}
          width={350}
          height={160}
          withInnerLines={false}
          withDots={false}
          withHorizontalLines={false}
          withVerticalLines={false}
          withVerticalLabels={false}
          withHorizontalLabels={true}
          fromZero={true}
          chartConfig={{
            strokeWidth: 2.5,
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            fillShadowGradientTo: '#57CCFF',
            fillShadowGradientFrom: '#0084FF',
            decimalPlaces: 0,
            color: () => `#0084FF`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginTop: 50,
            borderRadius: 16,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginLeft: 40,
            marginTop: -20,
          }}
        >
          <Text style={styles.timelineText}>
            {dateMinus.toLocaleString('en-US', {
              hour: 'numeric',
              hour12: true,
            })}
          </Text>
          <Text style={styles.timelineTextCenter}>
            {date.toLocaleString('en-US', { hour: 'numeric', hour12: true })}
          </Text>
          <Text style={styles.timelineText}>
            {datePlus.toLocaleString('en-US', {
              hour: 'numeric',
              hour12: true,
            })}
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Feather name="info" size={18} color="#5C5C5C" />
          <Text style={styles.text}>
            The air quality is healthy, as expected for this time of day.
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
  content: {
    flexDirection: 'column',
  },
  title: { fontWeight: 'bold', marginLeft: 5, color: '#262626' },
  heading: {
    fontWeight: '600',
    fontSize: 24,
    color: '#262626',
  },
  infoBox: {
    marginTop: 25,
    marginHorizontal: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { color: '#5C5C5C', marginLeft: 10 },
  timelineText: { color: '#0084FF', marginHorizontal: 20, fontSize: 12 },
  timelineTextCenter: {
    color: '#0084FF',
    marginHorizontal: 60,
    fontSize: 14,
  },
  verticleLine: {
    height: 186,
    width: 2.5,
    backgroundColor: '#0084FF',
    position: 'absolute',
    left: 195,
    zIndex: 1,
  },
  bubble: {
    height: 40,
    width: 70,
    backgroundColor: '#0084FF',
    position: 'absolute',
    left: 160,
    zIndex: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  bubbleSecondary: {
    height: 40,
    width: 70,
    backgroundColor: '#92D5FF',
    position: 'absolute',
    left: 220,
    zIndex: 1,
    borderBottomEndRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    zIndex: 2,
    left: 181,
    top: 35,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#0084FF',
  },
  bubbleTitle: {
    fontSize: 11,
    color: '#fff',
  },
  bubbleText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default HealthWidget
