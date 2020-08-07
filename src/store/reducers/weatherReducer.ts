import { IExtendedForecastData, IWeatherData } from '../../api/types';
import { WeatherActionTypes } from '../actionTypes';

export interface IWeatherState {
  weatherData: IWeatherData;
  extendedWeatherData: IExtendedForecastData[];
  isError: boolean;
}

const initialState: IWeatherState = {
  weatherData: {
    main: {
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    name: '',
    sys: {
      country: '',
      sunrise: 0,
      sunset: 0,
    },
    weather: {
      id: 200,
      main: '',
      description: '',
      icon: '',
    },
    wind: {
      deg: 0,
      speed: 0,
    },
  },
  extendedWeatherData: [],
  isError: false,
};

export const weatherReducer = (state: IWeatherState = initialState, action: { type: WeatherActionTypes; payload: any }) => {
  switch (action.type) {
    case WeatherActionTypes.FETCH_WEATHER_START:
      return state;
    case WeatherActionTypes.FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weatherData: action.payload.weather,
        extendedWeatherData: action.payload.forecast,
      };
    case WeatherActionTypes.FETCH_WEATHER_ERROR:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};
