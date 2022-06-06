import { View, Text, Button, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import produce from 'immer';

import { updateLocation, CoordsType, getWeatherData, requestLocationRNCommunityGeolocation, requestLocationRNGetLocation, requestLocationRNGeolocationService } from './actions';
import styles from './styles';
import Loading from '../Loading';
import Header from '../../components/Header';
import { parsedSample } from './../../samples/weather.sample';
import Hourly from '../../components/Hourly';
import Daily from '../../components/Daily';

const { city, current, hourly, daily } = parsedSample;
const { main, weather } = current;
const { temp, temp_min, temp_max } = main;

const { address: { town } } = city;
export default function Main() {
  const [coords, setCoords] = useState<CoordsType>({ latitude: 0, longitude: 0 });
  const [loading, setLoading] = useState<boolean>(true);

  const [locationTest, setLocationTest] = useState<any>();

  useEffect(() => {
    (async () => {
      //updateLocation(setCoords, setLoading);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (coords.latitude !== 0 && coords.longitude !== 0) {
        const wd = await getWeatherData(coords);
        console.log(JSON.stringify(wd));
      }
      setLoading(false);
    })();
  }, [coords]);

  if (loading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.content}>
          <Header cityName={town} temp={temp} min={temp_min} max={temp_max} weather={weather} />
          <View style={styles.spacer}></View>
          <Hourly data={hourly} />
          <Daily data={daily} />
          {/* <Text>Coordinates</Text>
        <Text>{`Latitude: ${coords.latitude}`}</Text>
        <Text>{`Longitude: ${coords.longitude}`}</Text>
        <Button title="Update" onPress={() => updateLocation(setCoords, setLoading)} />
        <Button title="Weather Data" onPress={() => {
          //["lat", "lon", "timezone", "timezone_offset", "current", "hourly", "daily"]
          console.log(Object.keys(sampleOnecall));
          const { lat, lon, timezone, timezone_offset, current, hourly, daily } = sampleOnecall;
          hourly.forEach(item => {
            const { dt } = item;
            const date = dayjs(dt * 1000).format();
            console.log(date)
          });
        }} /> */}
          {/* <EvilIcons name="calendar" size={40} color="black" />
        {locationTest && <Text style={{ fontFamily: "Jura-Regular" }}>{`${JSON.stringify(locationTest)}`}</Text>}
        <Button title="Set Location" onPress={() => {
          ///requestLocationRNGetLocation(setLocationTest, setLoading);
          //requestLocationRNCommunityGeolocation(setLocationTest, setLoading);
        }} /> */}
          {/* <Button title="Clean Location" onPress={() => setLocationTest(null)} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};