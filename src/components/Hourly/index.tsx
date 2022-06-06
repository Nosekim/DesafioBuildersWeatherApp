import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import styles from './styles';

const Item = ({ item }: any) => {
  const { dt, weather, temp } = item;
  const { icon } = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const dateTime = dayjs(dt * 1000);
  return (
    <View style={styles.itemFakeContainer}>
      <View style={styles.itemContainer}>
        <Text style={styles.hourText}>{dayjs().isSame(dateTime, "hour") ? "Agora" : dateTime.format("HH") + "h"}</Text>
        <Image source={{ uri: iconUrl }} style={[styles.icon]} />
        <Text style={styles.tempText}>{`${Math.floor(temp)}º`}</Text>
      </View>
    </View>
  )
};

export default function Hourly(props: any) {
  const hr = {
    "dt": 1654459200,
    "temp": 17.64,
    "feels_like": 17.97, "pressure": 1019, "humidity": 96,
    "dew_point": 16.99, "uvi": 0.14, "clouds": 61, "visibility": 10000, "wind_speed": 0.51, "wind_deg": 77, "wind_gust": 0.58,
    "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }],
    "pop": 0.18
  }
  const { data } = props;

  const renderItem = ({ item }: any) => {
    return (
      <Item item={item} />
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.tempText}>{`Condições das próximas horas`}</Text>
        </View>

        <View style={styles.separator}></View>
        <FlatList
          data={data.slice(0,12)}
          renderItem={renderItem}
          keyExtractor={item => item.dt}
          horizontal={true}
        />
      </View>
    </View>
  )
}