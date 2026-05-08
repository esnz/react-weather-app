import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { celciusToFahrenheit, TempUnit } from '../../utils/unitConversion';

interface ITemperatureProps {
  value: number;
}

const Temperature: React.FC<ITemperatureProps> = (props) => {
  const { tempUnit: degreeType } = useAppContext();

  if (degreeType === TempUnit.FAHRENHEIT) {
    return <>{celciusToFahrenheit(props.value)}</>;
  }
  return <>{props.value}</>;
};

export default Temperature;
