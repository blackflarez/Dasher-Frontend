import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { AntDesign } from '@expo/vector-icons'
import { db } from '../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import AppContext from '../components/AppContext'
import Widget from '../components/Widget'

const DATA = [
  {
    component: 'health',
  },
  {
    component: 'Histogram',
  },
]

const renderItem = ({ item }) => <Widget item={item.component} />

export default function Dashboard({ route, navigation }) {
  const [aqi, setAqi] = useState(null)
  const globalState = { aqi }
  const date = new Date('2022-08-12T00:00:00') // Remove the string parameter to get today's date

  // Calls database
  useEffect(() => {
    date.setMinutes(0)
    date.setSeconds(0)
    const formattedDate = date
      .toLocaleString('sv-SE', {
        timeZone: 'Pacific/Auckland',
      })
      .replace(/[T/]/g, '-')

    async function fetchDatabase() {
      const docRef = doc(db, 'data', route.params[0].region.toLowerCase())
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        let data = docSnap.data()[route.params[0].district]
        //console.log(formattedDate)

        if (data) {
          if (formattedDate in data) {
            setAqi(data[formattedDate])
          } else {
            setAqi('none')
          }
        } else {
          setAqi('none')
        }
      } else {
        console.log('No such document!')
      }
    }
    fetchDatabase()
  }, [])

  return (
    <AppContext.Provider value={globalState}>
      <SafeAreaView style={styles.container}>
        <AntDesign
          onPress={() => {
            navigation.navigate('Home')
          }}
          name={'close'}
          size={28}
          style={styles.close}
          color={'#626262'}
        />
        <Text style={styles.title}>
          {route.params[0].district
            ? route.params[0].district
            : route.params[0].region}
        </Text>

        <BottomSheetFlatList
          data={DATA}
          keyExtractor={(item) => item.component}
          renderItem={renderItem}
          style={{ marginTop: 10 }}
          contentContainerStyle={{ alignItems: 'center' }}
          columnWrapperStyle={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 10,
          }}
          numColumns={3}
        />
      </SafeAreaView>
    </AppContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  title: {
    alignItems: 'flex-start',
    marginBottom: 'auto',
    marginLeft: 20,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#262626',
  },
  close: {
    marginRight: 15,
    alignSelf: 'flex-end',
    overflow: 'hidden',
  },
})
