import { Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import { requestAndroidLocationPermission, requestIOSLocationPermission } from './../../utils/locationPermissions';

export type CoordsType = {
  latitude: number;
  longitude: number;
}

const requestLocationRNCommunityGeolocation = async (setLocation: React.Dispatch<React.SetStateAction<CoordsType>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  const permission = await requestLocationPermission();
  if (permission.granted) {
    Geolocation.getCurrentPosition(
      info => {
        const { coords } = info;
        const { longitude, latitude } = coords;
        setLocation({ latitude, longitude });
        setLoading(false);
      },
      error => {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    );
  } else {
    setLoading(false);
    setError(true);
    Alert.alert("A localização foi desabilitada e não pode ser solicitada novamente, por favor, vá em configurações e habilite a localização para o aplicativo.");
  }
};

const requestLocationPermission = async () => {
  if (Platform.OS === "android") {
    const permission = await requestAndroidLocationPermission();
    return permission;
  } else {
    const permission = await requestIOSLocationPermission();
    return permission;
  }
};

const getWeatherData = async (coords: CoordsType) => {
  const { latitude, longitude } = coords;
  const urlOnecall = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,alerts&appid=bdd25db9e056dcbc05e3ff71a7c99bc2`;
  const daily = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,daily&appid=bdd25db9e056dcbc05e3ff71a7c99bc2`;
  const getCityUrl = `https://us1.locationiq.com/v1/reverse.php?key=pk.df82c9b5009512056edaf9459c447d7b&lat=${latitude}&lon=${longitude}&format=json`;

  const currentResult = await fetch(daily)
    .then(result => result.json())
    .then(json => json)
    .catch(error => {
      console.log(error)
      throw error;
    });
  const oneCallResult = await fetch(urlOnecall)
    .then(result => result.json())
    .then(json => json)
    .catch(error => {
      console.log(error)
      throw error;
    });
  const getCityName = await fetch(getCityUrl)
    .then(result => result.json())
    .then(json => json)
    .catch(error => {
      console.log(error)
      throw error;
    });
  const currentPromise = new Promise((resolve, reject) => {
    try {
      resolve(currentResult);
    } catch (error) {
      reject(error);
    };
  });
  const onecallPromise = new Promise((resolve, reject) => {
    try {
      resolve(oneCallResult);
    } catch (error) {
      reject(error);
    };
  });
  const getCityPromise = new Promise((resolve, reject) => {
    try {
      resolve(getCityName);
    } catch (error) {
      reject(error);
    };
  });

  const solvedPromise = await Promise.all([currentPromise, onecallPromise, getCityPromise])
    .then(result => {

      const [current, onecall, getCity]: any = result;
      let newResult = {
        ...onecall,
        current: current,
        city: getCity
      };
      return newResult;
    })
    .catch(error => {
      throw error;
    })

  return solvedPromise;
}

export { getWeatherData, requestLocationRNCommunityGeolocation };