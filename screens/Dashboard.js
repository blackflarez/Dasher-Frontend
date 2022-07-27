import { StyleSheet, Text, SafeAreaView } from 'react-native'

export default function Dashboard({ route, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{JSON.stringify(route.params)}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 'auto',
    marginTop: 30,
  },
})
