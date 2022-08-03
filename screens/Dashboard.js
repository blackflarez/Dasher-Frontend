import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { AntDesign } from '@expo/vector-icons'
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
  return (
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    alignItems: 'flex-start',
    marginBottom: 'auto',
    marginLeft: 20,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0083FF',
  },
  close: {
    marginRight: 15,
    alignSelf: 'flex-end',
    overflow: 'hidden',
  },
})
