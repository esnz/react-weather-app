import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8rem;
`;
export const Title = styled.h1`
  color: #2f6f8a;
  font-size: 2.2rem;
`;
export const GithubLink = styled.a`
  svg {
    fill: #2f6f8a;
  }
  &:hover svg {
    fill: #20546a;
  }
`;
