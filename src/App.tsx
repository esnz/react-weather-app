import React, { useEffect } from 'react';
import { useAppContext } from './context/AppContext';
import Home from './pages/Home';

const App: React.FC = () => {
  const { darkMode } = useAppContext();

  useEffect(() => {
    document.body.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return <Home />;
};

export default App;
