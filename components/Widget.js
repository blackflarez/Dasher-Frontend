import { StyleSheet, View, Text } from 'react-native'
import HealthWidget from './HealthWidget'
import AverageWidget from './AverageWidget'
import DescriptionWidget from './DescriptionWidget'
import ReferenceWidget from './ReferenceWidget'
import FormulaWidget from './FormulaWidget'

const components = {
  health: <HealthWidget />,
  average: <AverageWidget />,
  description: <DescriptionWidget />,
  reference: <ReferenceWidget />,
  formula: <FormulaWidget />,
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
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
})

export default Widget
