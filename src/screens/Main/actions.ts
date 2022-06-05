import { Platform } from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location';
//import Geolocation from '@react-native-community/geolocation';

import { requestAndroidLocationPermission, requestIOSLocationPermission } from './../../utils/locationPermissions';

export type CoordsType = {
  latitude: number;
  longitude: number;
}

const requestLocationRNCommunityGeolocation = async (setLocation: any, setLoading: any) => {
  setLoading(true);
  Geolocation.getCurrentPosition(
    info => {
      setLocation(info);
      setLoading(false);
    },
    error => {
      console.log(error);
      setLoading(false);
    }
  );
};

const requestLocationRNGeolocationService = async (setLocation: any, setLoading: any) => {
  setLoading(true);
  Geolocation.getCurrentPosition(
    (position) => {
      setLocation(position);
      setLoading(false);
    },
    (error) => {
      // See error code charts below.
      console.log(error.code, error.message);
      setLoading(false);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}
const requestLocationPermission = async () => {
  if (Platform.OS === "android") {
    const permission = await requestAndroidLocationPermission();
    return permission;
  } else {
    const permission = await requestIOSLocationPermission();
    return permission;
  }
};

const requestLocationRNGetLocation = async (setLocation: any, setLoading: any) => {
  setLoading(true);
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      setLocation(location);
      setLoading(false);
    })
    .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
      setLoading(false);
    })
}

const requestLocation = async (fn: Function) => {
  try {
    Geolocation.getCurrentPosition(
      (position) => {
        fn(position);
      },
      (error) => {
        throw error;
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  } catch (error) {
    return undefined;
  }
};

const updateLocation = async (setCoords: (coords: CoordsType) => void, setLoading: (v: boolean) => void) => {
  setLoading(true);
  const permission = await requestLocationPermission();
  const { granted, requestable } = permission;
  if (granted) {
    await requestLocation((position: GeoPosition) => {
      const { coords: { latitude, longitude } } = position;
      setCoords({ latitude, longitude });
    });
  }
};

const getWeatherData = async (coords: CoordsType) => {
  const { latitude, longitude } = coords;
  const urlOnecall = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=bdd25db9e056dcbc05e3ff71a7c99bc2`
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=bdd25db9e056dcbc05e3ff71a7c99bc2`;
  return fetch(urlOnecall)
    .then(result => result.json())
    .then(json => json)
    .catch(error => {
      console.log(error)
      throw error;
    });
}

const sampleOnecall = {
  "lat": -26.907,
  "lon": -49.2318,
  "timezone": "America/Sao_Paulo",
  "timezone_offset": -10800,
  "current": { "dt": 1653563476, "sunrise": 1653558920, "sunset": 1653597176, "temp": 291.23, "feels_like": 291.42, "pressure": 1023, "humidity": 89, "dew_point": 289.39, "uvi": 0.35, "clouds": 18, "visibility": 10000, "wind_speed": 1.09, "wind_deg": 251, "wind_gust": 2.12, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d" }] },

  "hourly": [{ "dt": 1653562800, "temp": 291.23, "feels_like": 291.42, "pressure": 1023, "humidity": 89, "dew_point": 289.39, "uvi": 0.35, "clouds": 18, "visibility": 10000, "wind_speed": 1.09, "wind_deg": 251, "wind_gust": 2.12, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d" }], "pop": 0 }, { "dt": 1653566400, "temp": 291.29, "feels_like": 291.43, "pressure": 1023, "humidity": 87, "dew_point": 289.09, "uvi": 1.28, "clouds": 18, "visibility": 10000, "wind_speed": 1.07, "wind_deg": 249, "wind_gust": 2.01, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "pop": 0.2, "rain": { "1h": 0.56 } }, { "dt": 1653570000, "temp": 292.65, "feels_like": 292.69, "pressure": 1023, "humidity": 78, "dew_point": 288.72, "uvi": 2.73, "clouds": 24, "visibility": 10000, "wind_speed": 0.96, "wind_deg": 240, "wind_gust": 2.02, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "pop": 0.2, "rain": { "1h": 2.37 } }, { "dt": 1653573600, "temp": 294.58, "feels_like": 294.58, "pressure": 1022, "humidity": 69, "dew_point": 288.66, "uvi": 4.17, "clouds": 47, "visibility": 10000, "wind_speed": 1.03, "wind_deg": 238, "wind_gust": 2.46, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "pop": 0 }, { "dt": 1653577200, "temp": 296.53, "feels_like": 296.46, "pressure": 1022, "humidity": 59, "dew_point": 288.07, "uvi": 4.96, "clouds": 66, "visibility": 10000, "wind_speed": 0.84, "wind_deg": 221, "wind_gust": 2.36, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1653580800, "temp": 298.48, "feels_like": 298.37, "pressure": 1021, "humidity": 50, "dew_point": 286.43, "uvi": 4.66, "clouds": 83, "visibility": 10000, "wind_speed": 0.85, "wind_deg": 209, "wind_gust": 1.97, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1653584400, "temp": 298.84, "feels_like": 298.77, "pressure": 1020, "humidity": 50, "dew_point": 286.59, "uvi": 3.56, "clouds": 87, "visibility": 10000, "wind_speed": 0.9, "wind_deg": 206, "wind_gust": 2.09, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1653588000, "temp": 298.55, "feels_like": 298.5, "pressure": 1020, "humidity": 52, "dew_point": 287, "uvi": 2.08, "clouds": 89, "visibility": 10000, "wind_speed": 0.95, "wind_deg": 201, "wind_gust": 2.25, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1653591600, "temp": 297.39, "feels_like": 297.54, "pressure": 1019, "humidity": 64, "dew_point": 289.06, "uvi": 0.74, "clouds": 100, "visibility": 10000, "wind_speed": 0.54, "wind_deg": 173, "wind_gust": 1.47, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1653595200, "temp": 294.5, "feels_like": 294.62, "pressure": 1020, "humidity": 74, "dew_point": 288.76, "uvi": 0.15, "clouds": 100, "visibility": 10000, "wind_speed": 0.27, "wind_deg": 181, "wind_gust": 0.7, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1653598800, "temp": 292.78, "feels_like": 292.84, "pressure": 1020, "humidity": 78, "dew_point": 287.81, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 0.53, "wind_deg": 236, "wind_gust": 0.79, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653602400, "temp": 291.81, "feels_like": 291.87, "pressure": 1021, "humidity": 82, "dew_point": 287.56, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 0.12, "wind_deg": 181, "wind_gust": 0.6, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653606000, "temp": 291.31, "feels_like": 291.37, "pressure": 1021, "humidity": 84, "dew_point": 287.52, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 0.5, "wind_deg": 89, "wind_gust": 0.79, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653609600, "temp": 290.58, "feels_like": 290.7, "pressure": 1022, "humidity": 89, "dew_point": 287.69, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 0.32, "wind_deg": 107, "wind_gust": 0.6, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653613200, "temp": 290.15, "feels_like": 290.33, "pressure": 1022, "humidity": 93, "dew_point": 287.95, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 0.52, "wind_deg": 76, "wind_gust": 0.59, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653616800, "temp": 289.77, "feels_like": 290.02, "pressure": 1022, "humidity": 97, "dew_point": 288.06, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 0.35, "wind_deg": 18, "wind_gust": 0.46, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653620400, "temp": 289.53, "feels_like": 289.78, "pressure": 1021, "humidity": 98, "dew_point": 288.02, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 0.15, "wind_deg": 35, "wind_gust": 0.44, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653624000, "temp": 289.38, "feels_like": 289.62, "pressure": 1021, "humidity": 98, "dew_point": 287.89, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 0.04, "wind_deg": 141, "wind_gust": 0.32, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653627600, "temp": 289.1, "feels_like": 289.34, "pressure": 1021, "humidity": 99, "dew_point": 287.66, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 0.26, "wind_deg": 212, "wind_gust": 0.37, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653631200, "temp": 288.8, "feels_like": 289.01, "pressure": 1020, "humidity": 99, "dew_point": 287.52, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 0.55, "wind_deg": 237, "wind_gust": 0.53, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653634800, "temp": 288.42, "feels_like": 288.59, "pressure": 1020, "humidity": 99, "dew_point": 287.19, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 0.55, "wind_deg": 249, "wind_gust": 0.57, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653638400, "temp": 288.2, "feels_like": 288.35, "pressure": 1020, "humidity": 99, "dew_point": 286.95, "uvi": 0, "clouds": 75, "visibility": 10000, "wind_speed": 0.71, "wind_deg": 264, "wind_gust": 0.71, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653642000, "temp": 288.01, "feels_like": 288.14, "pressure": 1020, "humidity": 99, "dew_point": 286.81, "uvi": 0, "clouds": 59, "visibility": 10000, "wind_speed": 0.87, "wind_deg": 244, "wind_gust": 0.82, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653645600, "temp": 287.88, "feels_like": 287.99, "pressure": 1020, "humidity": 99, "dew_point": 286.58, "uvi": 0, "clouds": 50, "visibility": 10000, "wind_speed": 0.76, "wind_deg": 237, "wind_gust": 0.78, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "pop": 0 }, { "dt": 1653649200, "temp": 289.32, "feels_like": 289.45, "pressure": 1020, "humidity": 94, "dew_point": 287.25, "uvi": 0.38, "clouds": 45, "visibility": 10000, "wind_speed": 0.77, "wind_deg": 240, "wind_gust": 1.24, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "pop": 0 }, { "dt": 1653652800, "temp": 292.29, "feels_like": 292.35, "pressure": 1021, "humidity": 80, "dew_point": 287.59, "uvi": 1.37, "clouds": 38, "visibility": 10000, "wind_speed": 0.69, "wind_deg": 244, "wind_gust": 1.28, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "pop": 0 }, { "dt": 1653656400, "temp": 295.05, "feels_like": 295.02, "pressure": 1020, "humidity": 66, "dew_point": 287.47, "uvi": 2.88, "clouds": 0, "visibility": 10000, "wind_speed": 0.43, "wind_deg": 283, "wind_gust": 1.28, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1653660000, "temp": 297.2, "feels_like": 297.12, "pressure": 1019, "humidity": 56, "dew_point": 287.01, "uvi": 4.4, "clouds": 1, "visibility": 10000, "wind_speed": 0.38, "wind_deg": 324, "wind_gust": 2.07, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1653663600, "temp": 298.84, "feels_like": 298.74, "pressure": 1018, "humidity": 49, "dew_point": 286.49, "uvi": 5.24, "clouds": 1, "visibility": 10000, "wind_speed": 0.65, "wind_deg": 24, "wind_gust": 3.1, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1653667200, "temp": 299.99, "feels_like": 300.1, "pressure": 1016, "humidity": 44, "dew_point": 285.86, "uvi": 5.01, "clouds": 1, "visibility": 10000, "wind_speed": 0.94, "wind_deg": 47, "wind_gust": 3.69, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1653670800, "temp": 300.65, "feels_like": 300.52, "pressure": 1015, "humidity": 42, "dew_point": 285.52, "uvi": 3.84, "clouds": 1, "visibility": 10000, "wind_speed": 1.01, "wind_deg": 43, "wind_gust": 3.38, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1653674400, "temp": 300.41, "feels_like": 300.38, "pressure": 1014, "humidity": 43, "dew_point": 285.86, "uvi": 2.24, "clouds": 11, "visibility": 10000, "wind_speed": 0.72, "wind_deg": 53, "wind_gust": 2.52, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d" }], "pop": 0 }, { "dt": 1653678000, "temp": 299.04, "feels_like": 299.17, "pressure": 1014, "humidity": 57, "dew_point": 288.87, "uvi": 0.88, "clouds": 0, "visibility": 10000, "wind_speed": 0.75, "wind_deg": 78, "wind_gust": 1.27, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1653681600, "temp": 295.31, "feels_like": 295.49, "pressure": 1015, "humidity": 73, "dew_point": 289.16, "uvi": 0.17, "clouds": 1, "visibility": 10000, "wind_speed": 0.98, "wind_deg": 68, "wind_gust": 0.93, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1653685200, "temp": 292.47, "feels_like": 292.6, "pressure": 1015, "humidity": 82, "dew_point": 288.19, "uvi": 0, "clouds": 1, "visibility": 10000, "wind_speed": 0.41, "wind_deg": 62, "wind_gust": 0.69, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "pop": 0 }, { "dt": 1653688800, "temp": 291.52, "feels_like": 291.63, "pressure": 1016, "humidity": 85, "dew_point": 287.89, "uvi": 0, "clouds": 2, "visibility": 10000, "wind_speed": 0.16, "wind_deg": 90, "wind_gust": 0.7, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "pop": 0 }, { "dt": 1653692400, "temp": 291.07, "feels_like": 291.19, "pressure": 1017, "humidity": 87, "dew_point": 287.66, "uvi": 0, "clouds": 18, "visibility": 10000, "wind_speed": 0.24, "wind_deg": 220, "wind_gust": 0.7, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02n" }], "pop": 0 }, { "dt": 1653696000, "temp": 290.62, "feels_like": 290.72, "pressure": 1017, "humidity": 88, "dew_point": 287.43, "uvi": 0, "clouds": 17, "visibility": 10000, "wind_speed": 0.41, "wind_deg": 212, "wind_gust": 0.64, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02n" }], "pop": 0 }, { "dt": 1653699600, "temp": 291.28, "feels_like": 291.34, "pressure": 1017, "humidity": 84, "dew_point": 287.33, "uvi": 0, "clouds": 66, "visibility": 10000, "wind_speed": 0.91, "wind_deg": 222, "wind_gust": 0.85, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653703200, "temp": 290.81, "feels_like": 290.85, "pressure": 1018, "humidity": 85, "dew_point": 287.15, "uvi": 0, "clouds": 66, "visibility": 10000, "wind_speed": 0.9, "wind_deg": 221, "wind_gust": 0.87, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0.02 }, { "dt": 1653706800, "temp": 290.96, "feels_like": 290.99, "pressure": 1018, "humidity": 84, "dew_point": 287.07, "uvi": 0, "clouds": 71, "visibility": 10000, "wind_speed": 0.59, "wind_deg": 237, "wind_gust": 0.61, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0.09 }, { "dt": 1653710400, "temp": 289.69, "feels_like": 289.75, "pressure": 1018, "humidity": 90, "dew_point": 286.91, "uvi": 0, "clouds": 71, "visibility": 10000, "wind_speed": 0.23, "wind_deg": 296, "wind_gust": 0.39, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0.09 }, { "dt": 1653714000, "temp": 289.33, "feels_like": 289.35, "pressure": 1018, "humidity": 90, "dew_point": 286.63, "uvi": 0, "clouds": 75, "visibility": 10000, "wind_speed": 0.92, "wind_deg": 263, "wind_gust": 0.87, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0.09 }, { "dt": 1653717600, "temp": 290.08, "feels_like": 290.05, "pressure": 1016, "humidity": 85, "dew_point": 286.45, "uvi": 0, "clouds": 77, "visibility": 10000, "wind_speed": 0.53, "wind_deg": 355, "wind_gust": 0.53, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0.09 }, { "dt": 1653721200, "temp": 290, "feels_like": 289.96, "pressure": 1016, "humidity": 85, "dew_point": 286.28, "uvi": 0, "clouds": 94, "visibility": 10000, "wind_speed": 0.79, "wind_deg": 241, "wind_gust": 1.18, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653724800, "temp": 289.25, "feels_like": 289.21, "pressure": 1016, "humidity": 88, "dew_point": 286.27, "uvi": 0, "clouds": 85, "visibility": 10000, "wind_speed": 0.88, "wind_deg": 229, "wind_gust": 1, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653728400, "temp": 289.78, "feels_like": 289.74, "pressure": 1016, "humidity": 86, "dew_point": 286.41, "uvi": 0, "clouds": 89, "visibility": 10000, "wind_speed": 1.03, "wind_deg": 227, "wind_gust": 1.03, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1653732000, "temp": 289.09, "feels_like": 289.12, "pressure": 1016, "humidity": 91, "dew_point": 286.53, "uvi": 0, "clouds": 90, "visibility": 10000, "wind_speed": 1.12, "wind_deg": 247, "wind_gust": 1.08, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }], "daily": [{ "dt": 1653577200, "sunrise": 1653558920, "sunset": 1653597176, "moonrise": 1653546000, "moonset": 1653589020, "moon_phase": 0.88, "temp": { "day": 296.53, "min": 287.77, "max": 298.84, "night": 289.77, "eve": 292.78, "morn": 289.63 }, "feels_like": { "day": 296.46, "night": 290.02, "eve": 292.84, "morn": 289.74 }, "pressure": 1022, "humidity": 59, "dew_point": 288.07, "wind_speed": 1.36, "wind_deg": 244, "wind_gust": 2.46, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": 66, "pop": 0.2, "rain": 2.93, "uvi": 4.96 }, { "dt": 1653663600, "sunrise": 1653645351, "sunset": 1653683559, "moonrise": 1653635640, "moonset": 1653677280, "moon_phase": 0.91, "temp": { "day": 298.84, "min": 287.88, "max": 300.65, "night": 290.81, "eve": 292.47, "morn": 288.01 }, "feels_like": { "day": 298.74, "night": 290.85, "eve": 292.6, "morn": 288.14 }, "pressure": 1018, "humidity": 49, "dew_point": 286.49, "wind_speed": 1.01, "wind_deg": 43, "wind_gust": 3.69, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": 1, "pop": 0.02, "uvi": 5.24 }, { "dt": 1653750000, "sunrise": 1653731782, "sunset": 1653769943, "moonrise": 1653725400, "moonset": 1653765660, "moon_phase": 0.94, "temp": { "day": 295.38, "min": 289.09, "max": 295.98, "night": 290.78, "eve": 291.76, "morn": 289.78 }, "feels_like": { "day": 295.49, "night": 291.11, "eve": 292.13, "morn": 289.74 }, "pressure": 1016, "humidity": 70, "dew_point": 288.43, "wind_speed": 1.58, "wind_deg": 242, "wind_gust": 5.27, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 99, "pop": 0.39, "rain": 0.22, "uvi": 4.47 }, { "dt": 1653836400, "sunrise": 1653818212, "sunset": 1653856329, "moonrise": 1653815100, "moonset": 1653854220, "moon_phase": 0.97, "temp": { "day": 292.09, "min": 289.11, "max": 292.09, "night": 290.37, "eve": 290.73, "morn": 289.34 }, "feels_like": { "day": 292.36, "night": 290.73, "eve": 291.13, "morn": 289.44 }, "pressure": 1013, "humidity": 89, "dew_point": 289.03, "wind_speed": 1.69, "wind_deg": 225, "wind_gust": 5.38, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 100, "pop": 1, "rain": 5, "uvi": 1.14 }, { "dt": 1653922800, "sunrise": 1653904641, "sunset": 1653942716, "moonrise": 1653904860, "moonset": 1653943080, "moon_phase": 0, "temp": { "day": 288.94, "min": 287.61, "max": 290.64, "night": 287.61, "eve": 287.79, "morn": 288.9 }, "feels_like": { "day": 289.13, "night": 287.72, "eve": 287.89, "morn": 289.14 }, "pressure": 1017, "humidity": 98, "dew_point": 287.41, "wind_speed": 1.31, "wind_deg": 58, "wind_gust": 2.8, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 99, "pop": 1, "rain": 7.46, "uvi": 0.11 }, { "dt": 1654009200, "sunrise": 1653991070, "sunset": 1654029103, "moonrise": 1653994620, "moonset": 1654032120, "moon_phase": 0.04, "temp": { "day": 288.04, "min": 287.23, "max": 289.15, "night": 289.15, "eve": 288.67, "morn": 287.23 }, "feels_like": { "day": 288.17, "night": 289.42, "eve": 288.89, "morn": 287.28 }, "pressure": 1016, "humidity": 99, "dew_point": 286.82, "wind_speed": 0.72, "wind_deg": 27, "wind_gust": 2.17, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": 100, "pop": 1, "rain": 17.17, "uvi": 1 }, { "dt": 1654095600, "sunrise": 1654077499, "sunset": 1654115493, "moonrise": 1654084200, "moonset": 1654121460, "moon_phase": 0.07, "temp": { "day": 291.18, "min": 289.45, "max": 291.63, "night": 291.63, "eve": 291.5, "morn": 289.9 }, "feels_like": { "day": 291.65, "night": 292.14, "eve": 292, "morn": 290.24 }, "pressure": 1013, "humidity": 100, "dew_point": 289.97, "wind_speed": 0.97, "wind_deg": 350, "wind_gust": 1.9, "weather": [{ "id": 502, "main": "Rain", "description": "heavy intensity rain", "icon": "10d" }], "clouds": 100, "pop": 1, "rain": 86.56, "uvi": 1 }, { "dt": 1654182000, "sunrise": 1654163927, "sunset": 1654201883, "moonrise": 1654173660, "moonset": 1654210980, "moon_phase": 0.1, "temp": { "day": 292.13, "min": 291.27, "max": 292.68, "night": 291.27, "eve": 291.58, "morn": 291.74 }, "feels_like": { "day": 292.69, "night": 291.75, "eve": 292.09, "morn": 292.27 }, "pressure": 1013, "humidity": 100, "dew_point": 290.91, "wind_speed": 1.94, "wind_deg": 34, "wind_gust": 5.91, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": 100, "pop": 1, "rain": 33.71, "uvi": 1 }]
}

export { updateLocation, getWeatherData, sampleOnecall, requestLocationRNCommunityGeolocation, requestLocationRNGetLocation, requestLocationRNGeolocationService };