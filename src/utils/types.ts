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
  feels_like: number;
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
  rain?: { [key: string]: number };
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
  rain?: number;
  sunrise: number;
  sunset: number;
  temp: TempType;
  uvi: number;
  weather: WeatherItem[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
};

export type CurrentType = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherItem[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type CityType = {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    city?: string;
    road: string;
    suburb: string;
    town: string;
    municipality: string;
    region: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
};

export type ParsedDataType = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentType;
  hourly: HourlyType[];
  daily: DiaryType[];
  city: CityType;
}