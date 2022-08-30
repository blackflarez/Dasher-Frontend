import { StyleSheet, View, Text } from 'react-native'
import HealthWidget from './HealthWidget'
import AverageWidget from './AverageWidget'

const components = {
  health: <HealthWidget />,
  average: <AverageWidget />,
}

const Widget = ({ onPress, item, size }) => {
  return (
    <View
      style={[
        styles.containerItem,
        size == 'small'
          ? { height: 200 }
          : size == 'large'
          ? { height: 350 }
          : null,
      ]}
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
    height: 360,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignSelf: 'center',
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
})

export default Widget
