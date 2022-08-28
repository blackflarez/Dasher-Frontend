import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { LineChart } from 'react-native-chart-kit'
import AppContext from '../components/AppContext'

const HealthWidget = ({}) => {
  const { aqi, date, aqiList } = useContext(AppContext)

  const dateMinus = new Date()
  const datePlus = new Date()

  dateMinus.setHours(date.getHours() - 6)
  datePlus.setHours(date.getHours() + 6)

  //console.log(dateMinus)

  if (!aqi) {
    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <MaterialIcons
            onPress={() => {
              navigation.navigate('Home')
            }}
            name={'show-chart'}
            color={'#262626'}
            size={18}
          />
          <Text style={styles.title}>Average</Text>
          <Ionicons
            name={'help-circle-outline'}
            color={'#262626'}
            size={24}
            style={{ marginLeft: 'auto' }}
          />
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
          <MaterialIcons
            onPress={() => {
              navigation.navigate('Home')
            }}
            name={'show-chart'}
            color={'#262626'}
            size={18}
          />
          <Text style={styles.title}>Average</Text>
          <Ionicons
            name={'help-circle-outline'}
            color={'#262626'}
            size={24}
            style={{ marginLeft: 'auto' }}
          />
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
        <MaterialIcons
          onPress={() => {
            navigation.navigate('Home')
          }}
          name={'show-chart'}
          color={'#262626'}
          size={18}
        />
        <Text style={styles.title}>Average</Text>
        <Ionicons
          name={'help-circle-outline'}
          color={'#262626'}
          size={24}
          style={{ marginLeft: 'auto' }}
        />
      </View>

      <View style={styles.content}>
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
          height={170}
          withInnerLines={false}
          withDots={false}
          withHorizontalLines={false}
          withVerticalLines={false}
          withVerticalLabels={false}
          withHorizontalLabels={true}
          fromZero={true}
          chartConfig={{
            strokeWidth: 2,
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
            marginVertical: 8,
            borderRadius: 16,
            alignSelf: 'center',
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
    alignSelf: 'center',
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
  text: { color: '#262626', marginTop: 5 },
  timelineText: { color: '#0084FF', marginHorizontal: 20, fontSize: 12 },
  timelineTextCenter: {
    color: '#0084FF',
    marginHorizontal: 60,
    fontSize: 14,
  },
})

export default HealthWidget
