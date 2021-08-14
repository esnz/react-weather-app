import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer/Footer';
import Forecast from '../components/Forecast/Forecast';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import Spinner from '../components/ui/Spinner/Spinner';
import Weather from '../components/Weather/Weather';
import { AppStore } from '../store/store';

const Home = () => {
  const { loading } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
  }));

  return (
    <>
      {loading && <Spinner />}
      <Header />
      <Search />
      <Weather />
      <Forecast />
      <Footer />
    </>
  );
};

export default Home;
