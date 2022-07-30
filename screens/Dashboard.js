import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default function Dashboard({ route, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <AntDesign
        onPress={() => {
          navigation.navigate('Home')
        }}
        name={'close'}
        size={24}
        style={styles.close}
        color={'#626262'}
      />
      <Text style={styles.title}>
        {route.params[0].district
          ? route.params[0].district
          : route.params[0].region}
      </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  close: {
    paddingRight: 15,
    alignSelf: 'flex-end',
  },
})
