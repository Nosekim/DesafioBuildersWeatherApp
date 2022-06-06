import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { translateCondition } from './../../utils/weather.utils';
import styles from './styles';

export default function Header(props: any) {
  const { cityName, temp, min, max, weather } = props;
  const [wt] = weather;
  const { main, description, icon } = wt;
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