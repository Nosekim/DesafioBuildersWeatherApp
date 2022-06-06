import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { translateCondition } from './../../utils/weather.utils';
import styles from './styles';
import { WeatherItem } from '../../utils/types';

interface Props {
  cityName: string;
  temp: number;
  min: number;
  max: number;
  updateCoords: () => void;
  weather: WeatherItem[];
}

export default function Header(props: Props) {
  const { cityName, temp, min, max, weather, updateCoords } = props;
  const [wt] = weather;
  const { description, icon } = wt;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const condition = translateCondition(description);

  const [cardWidth, setCardWidth] = useState<number>(0);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.cityName}>
            {cityName}
          </Text>
          <Text style={styles.temperature}>
            {`${Math.floor(temp)}º`}
          </Text>
          <Text style={styles.minmax}>
            {`Max.: ${Math.floor(max)}º Mín.: ${Math.floor(min)}º`}
          </Text>
          <TouchableOpacity
            onPress={updateCoords}
            style={{ padding: 10 }}>
            <Ionicons name="reload" size={26} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.rightContent}>
          <View style={styles.cardRightContent} onLayout={(event) => {
            let { x, y, width, height } = event.nativeEvent.layout;
            setCardWidth(width);
          }}>
            <Image source={{ uri: iconUrl }} style={[styles.icon, { width: cardWidth, height: cardWidth }]} />
            <Text style={styles.condition}>{condition}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}