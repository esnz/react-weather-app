import styled from 'styled-components';
import { ReactComponent as LocationIconSvg } from '../../assets/location-icon.svg';
import { ReactComponent as SearchIconSvg } from '../../assets/search-icon.svg';

export const SearchElement = styled.div`
  position: relative;
  height: 3.25rem;
  border-radius: 26px;
  background: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.4rem;
  display: flex;
  align-items: center;
`;
export const SearchInput = styled.input`
  flex: 1;
  margin-left: 1rem;
  height: 3.25rem;
  border: none;
  font-size: 1.125rem;
  color: #404c5b;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #727e8e;
  }
`;
export const SearchIcon = styled(SearchIconSvg)`
  margin-left: 1.2rem;
  fill: #4a6fa1;
`;
export const LocationButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  height: 100%;
  display: contents;
  &:hover svg {
  }
`;
export const LocationIcon = styled(LocationIconSvg)`
  margin-right: 1.2rem;
  fill: #4a6fa1;
`;
export const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  width: 98%;
  left: 1%;
  top: 3.35rem;
  border-radius: 5px;
  overflow: hidden;
`;

export const SuggestionItem = styled.a`
  color: #2079c9;
  text-decoration: none;
  padding: 0.6rem 1rem;
  display: block;
  text-align: left;
  border-bottom: 1px dotted #ccc;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;
