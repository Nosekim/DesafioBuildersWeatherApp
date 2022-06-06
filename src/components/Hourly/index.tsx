import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import styles from './styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { HourlyType } from './../../utils/types';

interface Props {
  data: HourlyType[];
};
interface ItemProps {
  item: HourlyType;
};

const Item = ({ item }: ItemProps) => {
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

export default function Hourly(props: Props) {
  const { data } = props;

  const renderItem = (item: HourlyType) => {
    return (
      <Item item={item} />
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <EvilIcons name="clock" color="black" size={26} />
          <Text style={styles.tempText}>{`Condições das próximas horas`}</Text>
        </View>
        <View style={styles.separator}></View>
        <FlatList
          data={data.slice(0, 12)}
          renderItem={({ item }: ItemProps) => renderItem(item)}
          keyExtractor={item => '' + item.dt}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}