import React from 'react';
import Temperature from '../CurrentWeather/Temperature';
import WeatherIcon from '../CurrentWeather/WeatherIcon';

interface IForecastItemProps {
  day: string;
  weatherCode: number;
  high: number;
  low: number;
  main: string;
}
const ForecastItem: React.FC<IForecastItemProps> = (props) => {
  return (
    <div className="rw-forecast-item">
      <h6>{props.day}</h6>
      <WeatherIcon code={props.weatherCode} />
      <p>{props.main}</p>
      <span>
        <Temperature value={props.high} />
        <sup>&deg;</sup>
        <small>/</small>
        <Temperature value={props.low} />
        <sup>&deg;</sup>
      </span>
    </div>
  );
};

export default ForecastItem;
