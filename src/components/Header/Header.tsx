import React from 'react';
import { ReactComponent as GithubIcon } from '../../assets/github.svg';
import { HeaderContainer, Title, GithubLink } from './styed';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>ReactWeather</Title>
      <GithubLink href="http://www.github.com/esnz/reactweather">
        <GithubIcon />
      </GithubLink>
    </HeaderContainer>
  );
};

export default Header;
