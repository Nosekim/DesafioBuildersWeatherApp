export type WeatherItem = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type TempType = {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

export type HourlyType = {
  dt: number;
  temp: number;
  fells_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherItem[];
  pop: number;
};

export type DiaryType = {
  clouds: number;
  dew_point: number;
  dt: number;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  rain: number;
  sunrise: number;
  sunset: number;
  temp: TempType;
  uvi: number;
  weather: WeatherItem[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;

};