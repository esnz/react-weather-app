import React, { useEffect } from 'react';
import HighIcon from '../../assets/high-icon.svg?react';
import HumidityIcon from '../../assets/humidity-icon.svg?react';
import LowIcon from '../../assets/low-icon.svg?react';
import PressureIcon from '../../assets/pressure-icon.svg?react';
import WindIcon from '../../assets/wind-icon.svg?react';
import { useAppContext } from '../../context/AppContext';
import { kmToMile, TempUnit } from '../../utils/unitConversion';
import ToggleSwitch from '../ui/ToggleSwitch/ToggleSwitch';
import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';

const CurrentWeather: React.FC = () => {
  const {
    changeTempUnit,
    isError,
    isInitial,
    tempUnit: degreeType,
    weatherData: weather,
  } = useAppContext();

  useEffect(() => {
    if (isError) {
      console.log('Cannot load weather for this place');
    }
  }, [isError]);

  if (isInitial) return <></>;

  return (
    <div className="rw-weather">
      <div className="rw-weather-header">
        <h6 className="rw-section-title">Current Weather</h6>
        <div>
          <ToggleSwitch onClick={changeTempUnit} />
        </div>
      </div>
      <div className="rw-current-weather-inner">
        <div className="rw-current-status">
          <h4>{weather.name}</h4>
          <div className="rw-current-temp">
            <WeatherIcon code={weather.weather.id} big />
            <span>
              <Temperature value={weather.main.temp} />
              <sup>&deg;</sup>
            </span>
          </div>
          <h6>{weather.weather.description}</h6>
        </div>

        <div className="rw-current-info">
          <p className="rw-feels-like">
            Feels like <Temperature value={weather.main.feels_like} />
            <sup>&deg;</sup>
          </p>
          <div className="rw-high-low">
            <div className="rw-weather-degree">
              <HighIcon />
              <Temperature value={weather.main.temp_max} />
              <sup>&deg;</sup>
            </div>
            <div className="rw-weather-degree">
              <LowIcon />
              <Temperature value={weather.main.temp_min} />
              <sup>&deg;</sup>
            </div>
          </div>
          <div className="rw-info-row">
            <div>
              <HumidityIcon /> Humidity
            </div>
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="rw-info-row">
            <div>
              <WindIcon /> Wind
            </div>
            <span>
              {degreeType === TempUnit.CELCIUS ? weather.wind.speed : kmToMile(weather.wind.speed)}
              {degreeType === TempUnit.CELCIUS ? 'kph' : 'mph'}
            </span>
          </div>
          <div className="rw-info-row">
            <div>
              <PressureIcon /> Pressure
            </div>
            <span>{weather.main.pressure}hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
