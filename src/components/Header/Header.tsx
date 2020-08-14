import React from 'react';
import { ReactComponent as GithubIcon } from '../../assets/github.svg';
import { GithubLink, HeaderContainer, Title, HeaderIconsContainer } from './styed';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../store/actions/app';
import DarkModeToggle from 'react-dark-mode-toggle';
import { AppStore } from '../../store/appStore';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: AppStore) => state.app.darkMode);

  return (
    <HeaderContainer>
      <Title>ReactWeather</Title>
      <HeaderIconsContainer>
        <DarkModeToggle checked={isDarkMode} onChange={() => dispatch(toggleDarkMode())} size={60} />
        <GithubLink href="http://www.github.com/esnz/reactweather">
          <GithubIcon />
        </GithubLink>
      </HeaderIconsContainer>
    </HeaderContainer>
  );
};

export default Header;
