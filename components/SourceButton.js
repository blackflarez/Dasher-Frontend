import React, { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const SourceButton = ({ title, description, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[style, styles.container]}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={[styles.text, { marginBottom: 10 }]}>{title}</Text>
        <Text style={[styles.subtitle]}>{description}</Text>
      </View>

      <View style={{ justifyContent: 'center', marginLeft: 'auto' }}>
        <AntDesign name={'arrowright'} color={'#fff'} size={24} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 30,
    padding: 20,
    paddingHorizontal: 20,
    color: '#fff',
    backgroundColor: '#0084FF',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
  },
})

export default SourceButton
