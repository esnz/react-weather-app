import React from 'react';
import { useAppContext } from '../../context/AppContext';
import ForecastItem from './ForecastItem';

const Forecast: React.FC = () => {
  const { extendedWeatherData: forecast, isInitial } = useAppContext();

  if (isInitial) return <></>;

  return (
    <div className="rw-forecast">
      <h6 className="rw-section-title">Extended Forecast</h6>
      <div className="rw-forecast-items">
        {forecast.map((item, i) => {
          return (
            <ForecastItem
              key={i}
              day={item.day}
              high={item.temp.temp_max}
              low={item.temp.temp_min}
              weatherCode={item.weather.id}
              main={item.weather.main}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
