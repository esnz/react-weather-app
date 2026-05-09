import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { ExtendedForecastData, WeatherData } from '../api/types';
import { fetchExtendedForecastData, fetchWeatherData } from '../api/weather';
import { getNextSevenDays } from '../utils/dateUtils';
import { kelvinToCelcius, TempUnit } from '../utils/unitConversion';

type WeatherQuery = string | { lat: number; lng: number };

type AppState = {
  tempUnit: TempUnit;
  isLoading: boolean;
  isInitial: boolean;
  darkMode: boolean;
  weatherData: WeatherData;
  extendedWeatherData: ExtendedForecastData[];
  isError: boolean;
};

type AppContextValue = AppState & {
  changeTempUnit: () => void;
  fetchWeather: (query: WeatherQuery) => Promise<void>;
  toggleDarkMode: () => void;
};

type WeatherApiResponse = [
  Omit<WeatherData, 'weather'> & {
    cod: number;
    message?: string;
    weather: WeatherData['weather'][];
  },
  {
    list: Array<{
      temp: {
        max: number;
        min: number;
      };
      weather: Array<{
        id: number;
        main: string;
      }>;
    }>;
  },
];

type Action =
  | { type: 'change-temp-unit' }
  | { type: 'fetch-error' }
  | { type: 'fetch-success'; payload: { weather: WeatherData; forecast: ExtendedForecastData[] } }
  | { type: 'set-loading'; payload: boolean }
  | { type: 'toggle-dark-mode'; payload: boolean };

const initialWeatherData: WeatherData = {
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
};

const getInitialDarkMode = () => {
  return window.localStorage.getItem('darkMode') === 'true';
};

const initialState: AppState = {
  tempUnit: TempUnit.CELCIUS,
  isLoading: false,
  isInitial: true,
  darkMode: getInitialDarkMode(),
  weatherData: initialWeatherData,
  extendedWeatherData: [],
  isError: false,
};

const transformWeatherData = (
  res: WeatherApiResponse
): {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
} => {
  const weather = {
    ...res[0],
    weather: res[0].weather[0],
    main: {
      ...res[0].main,
      temp: kelvinToCelcius(res[0].main.temp),
      feels_like: kelvinToCelcius(res[0].main.feels_like),
      temp_max: kelvinToCelcius(res[0].main.temp_max),
      temp_min: kelvinToCelcius(res[0].main.temp_min),
    },
    wind: {
      ...res[0].wind,
      speed: Math.round(res[0].wind.speed * 3.6),
    },
  };

  const next7Days = getNextSevenDays();
  const forecast = res[1].list.map((item, index) => ({
    day: next7Days[index],
    temp: {
      temp_max: kelvinToCelcius(item.temp.max),
      temp_min: kelvinToCelcius(item.temp.min),
    },
    weather: {
      id: item.weather[0].id,
      main: item.weather[0].main,
    },
  }));

  return {
    weather,
    forecast,
  };
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'change-temp-unit':
      return {
        ...state,
        tempUnit: state.tempUnit === TempUnit.CELCIUS ? TempUnit.FAHRENHEIT : TempUnit.CELCIUS,
      };
    case 'fetch-error':
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case 'fetch-success':
      return {
        ...state,
        extendedWeatherData: action.payload.forecast,
        isError: false,
        isInitial: false,
        isLoading: false,
        weatherData: action.payload.weather,
      };
    case 'set-loading':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'toggle-dark-mode':
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const changeTempUnit = useCallback(() => {
    dispatch({ type: 'change-temp-unit' });
  }, []);

  const toggleDarkMode = useCallback(() => {
    const darkMode = !state.darkMode;
    window.localStorage.setItem('darkMode', darkMode.toString());
    dispatch({ type: 'toggle-dark-mode', payload: darkMode });
  }, [state.darkMode]);

  const fetchWeather = useCallback(async (query: WeatherQuery) => {
    dispatch({ type: 'set-loading', payload: true });

    try {
      const res = (await Promise.all([fetchWeatherData(query), fetchExtendedForecastData(query)])) as WeatherApiResponse;

      if (res[0].cod === 200) {
        dispatch({
          type: 'fetch-success',
          payload: transformWeatherData(res),
        });
        return;
      }

      dispatch({ type: 'fetch-error' });
    } catch {
      dispatch({ type: 'fetch-error' });
    }
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      changeTempUnit,
      fetchWeather,
      toggleDarkMode,
    }),
    [changeTempUnit, fetchWeather, state, toggleDarkMode]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
};
