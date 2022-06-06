import { View, ScrollView, Alert, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CoordsType, getWeatherData, requestLocationRNCommunityGeolocation } from './actions';
import styles from './styles';
import Loading from '../Loading';
import Header from '../../components/Header';
import Hourly from '../../components/Hourly';
import Daily from '../../components/Daily';
import { DiaryType, HourlyType, ParsedDataType, WeatherItem } from '../../utils/types';
import ErrorPage from '../ErrorPage';


export default function Main() {
  const [coords, setCoords] = useState<CoordsType>({ latitude: 0, longitude: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [temp, setTemp] = useState<number>(0);
  const [tempMin, setTempMin] = useState<number>(0);
  const [tempMax, setTempMax] = useState<number>(0);
  const [weather, setWeather] = useState<WeatherItem[] | null>(null);
  const [hourly, setHourly] = useState<HourlyType[]>([]);
  const [daily, setDaily] = useState<DiaryType[]>([]);
  const [town, setTown] = useState<string>("");
  const [errorLoading, setErrorLoading] = useState<boolean>(false);

  const updateCoords = () => requestLocationRNCommunityGeolocation(setCoords, setLoading, setErrorLoading);

  useEffect(() => {
    (async () => {
      updateCoords();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (coords.latitude !== 0 && coords.longitude !== 0) {
        setLoading(true);
        await getWeatherData(coords)
          .then((wd: ParsedDataType) => {
            const { city, current, hourly, daily } = wd;
            const { main, weather } = current;
            setWeather(weather);
            setDaily(daily);
            setHourly(hourly);
            const { temp, temp_min, temp_max } = main;
            setTemp(temp);
            setTempMin(temp_min);
            setTempMax(temp_max);
            const { address: { town, city: cityName } } = city;
            setTown(cityName ?? town);
            setErrorLoading(false);
          })
          .catch((err) => {
            Alert.alert("Erro ao buscar dados, tente novamente mais tarde.");
            setErrorLoading(true);
            setLoading(false);
          });
      }
      setLoading(false);
    })();
  }, [coords]);

  if (loading) {
    return <Loading />
  };

  if (errorLoading) {
    return <ErrorPage updateCoords={updateCoords} />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={'#fff'}
      />
      <ScrollView>
        <View style={styles.content}>
          {weather && <Header cityName={town} temp={temp} min={tempMin} max={tempMax} weather={weather} updateCoords={updateCoords} />}
          <View style={styles.spacer}></View>
          <Hourly data={hourly} />
          <Daily data={daily} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};