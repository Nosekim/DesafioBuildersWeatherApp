import { View, Text, Image } from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import dayjs from 'dayjs';
import styles from './styles';
import { getDayOfWeek } from '../../utils/weather.utils';
import { DiaryType } from './../../utils/types';

interface Props {
  data: DiaryType[];
};
interface ItemProps {
  item: DiaryType;
};

const Item = ({ item }: ItemProps) => {
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

export default function Daily(props: Props) {
  const { data } = props;

  const renderItem = (item: DiaryType) => {
    return (
      <Item key={`${item.dt}`} item={item} />
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
          {data.map((item: DiaryType) => renderItem(item))}
        </View>
      </View>
    </View>
  )
}