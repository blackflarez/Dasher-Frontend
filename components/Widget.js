import { StyleSheet, View, Text } from 'react-native'
import HealthWidget from './HealthWidget'

const components = {
  health: <HealthWidget />,
}

const Widget = ({ onPress, item }) => {
  return (
    <View
      style={[styles.containerItem]}
      onPress={() => {
        onPress()
      }}
    >
      {components[item]}
    </View>
  )
}

const styles = StyleSheet.create({
  containerItem: {
    width: 360,
    height: 200,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignSelf: 'center',
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
})

export default Widget
