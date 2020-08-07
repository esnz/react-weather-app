import { IExtendedForecastData, IWeatherData } from '../../api/types';
import { fetchExtendedForecastData, fetchWeatherData } from '../../api/weather';
import { kelvinToCelcius } from '../../utils/unitConversion';
import { getNextSevenDays } from '../../utils/dateUtils';
import { WeatherActionTypes } from '../actionTypes';
import { setIsInitialState, setIsLoading } from './app';

export const fetchWeatherStart = () => ({
  type: WeatherActionTypes.FETCH_WEATHER_START,
});

export const fetchWeatherSuccess = (weather: IWeatherData, forecast: IExtendedForecastData[]) => ({
  type: WeatherActionTypes.FETCH_WEATHER_SUCCESS,
  payload: { weather, forecast },
});

export const fetchWeatherFail = (error: any) => ({
  type: WeatherActionTypes.FETCH_WEATHER_ERROR,
  payload: error,
});

export const fetchWeatherFromApi = (city: string | { lat: number; lng: number }) => {
  return (dispatch: any) => {
    dispatch(setIsLoading(true));
    dispatch(fetchWeatherStart());

    Promise.all([fetchWeatherData(city), fetchExtendedForecastData(city)])
      .then((res) => {
        return Promise.all([res[0].json(), res[1].json()]);
      })
      .then((res) => {
        const { forecast, weather } = transformWeatherData(res);
        dispatch(fetchWeatherSuccess(weather, forecast));
        dispatch(setIsInitialState(false));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(fetchWeatherFail(err));
        dispatch(setIsLoading(false));
      });
  };
};

const transformWeatherData = (
  res: any
): {
  weather: IWeatherData;
  forecast: IExtendedForecastData[];
} => {
  const weather = res[0] as IWeatherData;
  const forecast: IExtendedForecastData[] = [];

  weather.weather = res[0].weather[0];
  weather.main = {
    ...weather.main,
    temp: kelvinToCelcius(weather.main.temp),
    feels_like: kelvinToCelcius(weather.main.feels_like),
    temp_max: kelvinToCelcius(weather.main.temp_max),
    temp_min: kelvinToCelcius(weather.main.temp_min),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  const next7Days = getNextSevenDays();

  res[1].list.forEach((i: any, index: number) => {
    forecast.push({
      day: next7Days[index],
      temp: {
        temp_max: kelvinToCelcius(i.temp.max),
        temp_min: kelvinToCelcius(i.temp.min),
      },
      weather: {
        id: i.weather[0].id,
        main: i.weather[0].main,
      },
    });
  });

  return {
    weather,
    forecast,
  };
};
