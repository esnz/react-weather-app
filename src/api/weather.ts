const baseUrl = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string | { lat: number; lng: number }) => {
  let url = `${baseUrl}/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  if (typeof city === 'object') {
    url = `${baseUrl}/weather?lat=${city.lat}&lon=${city.lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  }
  return await (await fetch(url)).json();
};

export const fetchExtendedForecastData = async (city: string | { lat: number; lng: number }) => {
  let url = `${baseUrl}/forecast/daily?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  if (typeof city === 'object') {
    url = `${baseUrl}/forecast/daily?lat=${city.lat}&lon=${city.lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  }

  return await (await fetch(url)).json();
};
