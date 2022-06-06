import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './styles'

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  )
}