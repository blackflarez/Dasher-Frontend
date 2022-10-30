import React, { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const Button = ({ title, primary, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[style, styles.container]}>
      <Text style={[styles.text]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    padding: 15,
    paddingHorizontal: 20,
    color: '#fff',
    backgroundColor: '#0084FF',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
})

export default Button
