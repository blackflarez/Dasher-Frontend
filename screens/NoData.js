import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { AntDesign } from '@expo/vector-icons'

export default function Dashboard({ navigation }) {
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
      <View>
        <Text style={styles.title}>No data available</Text>
        <Text style={styles.subtitle}>
          Sorry, we don't have any air quality data collected here. Please find
          the nearest air quality marker.
        </Text>
      </View>
    </SafeAreaView>
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
  subtitle: {
    fontSize: 18,
    marginHorizontal: 20,
    marginTop: 10,
    color: '#262626',
  },
  close: {
    marginRight: 15,
    alignSelf: 'flex-end',
    overflow: 'hidden',
  },
})
