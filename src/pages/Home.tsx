import React from 'react';
import Footer from '../components/Footer/Footer';
import Forecast from '../components/Forecast/Forecast';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import Spinner from '../components/ui/Spinner/Spinner';
import CurrentWeather from '../components/CurrentWeather/CurrentWeather';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const { isLoading } = useAppContext();

  return (
    <>
      {isLoading && <Spinner />}
      <Header />
      <Search />
      <CurrentWeather />
      <Forecast />
      <Footer />
    </>
  );
};

export default Home;
