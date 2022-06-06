export type WeatherItem = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

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