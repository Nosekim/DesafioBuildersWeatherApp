import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import styles from './styles';
interface Props {
  updateCoords: () => void;
}
export default function Loading(props: Props) {
  const { updateCoords } = props;
  return (
    <View style={styles.container}>
      <Ionicons name="ios-sad-outline" size={100} color="black" />
      <Text>Algo errado aconteceu, toque para recarregar.</Text>
      <TouchableOpacity
        onPress={updateCoords}
      >
        <Ionicons name="reload" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}