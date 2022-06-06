import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import dayjs from 'dayjs';
import styles from './styles';
import { getDayOfWeek } from '../../utils/weather.utils';

const Item = ({ item, index }: any) => {
  const [columnWidth, setColumnWidth] = useState(0);
  const { dt, weather, temp, sunrise, sunset } = item;
  const { min, max } = temp;
  const { icon } = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const dateTime = dayjs(dt * 1000);
  return (
    <View style={styles.itemContainer}>
      <View style={{ display: 'flex', width: 60 }}>
        <Text style={styles.dayText}>
          {dayjs().isSame(dateTime, "date") ? "Hoje" : getDayOfWeek(dateTime.day())}
        </Text>
      </View>
      <View style={styles.imageView}>
        <Image source={{ uri: iconUrl }} style={[styles.icon]} />
      </View>
      <View style={styles.sunriseContainer}>
        <View style={styles.sunsetItem}>
          <Feather name="sunrise" size={16} color="black" />
          <Text>{dayjs(sunrise * 1000).format("HH:mm")}</Text>
        </View>
        <View style={styles.sunsetItem}>
          <Feather name="sunset" size={16} color="black" />
          <Text>{dayjs(sunset * 1000).format("HH:mm")}</Text>
        </View>
      </View>
      <View style={styles.minmaxContainer}>
        <View style={styles.minmaxItem}>
          <Feather name="arrow-up" size={16} color="black" />
          <Text>{`Max.: ${Math.floor(max)}º`}</Text>
        </View>
        <View style={styles.minmaxItem}>
          <Feather name="arrow-down" size={16} color="black" />
          <Text>{`Min.: ${Math.floor(min)}º`}</Text>
        </View>
      </View>
    </View>
  )
};

export default function Daily(props: any) {
  const dl = {
    "clouds": 99,
    "dew_point": 13.78,
    "dt": 1654441200,
    "feels_like": { "day": 17.6, "eve": 17.86, "morn": 14.46, "night": 16.65 },
    "humidity": 84, "moon_phase": 0.19, "moonrise": 1654440420, "moonset": 1654480140, "pop": 0.37, "pressure": 1022, "rain": 0.22, "sunrise": 1654423208, "sunset": 1654461061,
    "temp": { "day": 17.59, "eve": 17.5, "max": 20.07, "min": 13.73, "morn": 14.45, "night": 16.37 },
    "uvi": 4.09,
    "weather": [{ "description": "light rain", "icon": "10d", "id": 500, "main": "Rain" }],
    "wind_deg": 66, "wind_gust": 1.9, "wind_speed": 1.11
  }
  const { data } = props;

  const renderItem = ({ item, index }: any) => {
    return (
      <Item key={item.dt} item={item} index={index} />
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <EvilIcons name="calendar" color="black" size={26} />
          <Text style={styles.tempText}>{`Previsão para os próximos dias`}</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.list}>
          {data.map((item: any, index: number) => renderItem({ item, index }))}
        </View>
      </View>
    </View>
  )
}