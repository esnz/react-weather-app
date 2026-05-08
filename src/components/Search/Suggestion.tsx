import * as React from 'react';
import { PlaceSuggestion } from '../../api/placeSuggestion';
import { useAppContext } from '../../context/AppContext';

interface ISuggestionProps {
  suggestion: PlaceSuggestion;
  hideSuggestionFn: () => void;
}

const Suggestion: React.FC<ISuggestionProps> = (props) => {
  const { fetchWeather } = useAppContext();

  const onClick = () => {
    fetchWeather({ lat: props.suggestion.lat, lng: props.suggestion.lng });
    setTimeout(() => {
      props.hideSuggestionFn();
    }, 400);
  };

  return (
    <button className="rw-suggestion-item" type="button" onClick={onClick}>
      {props.suggestion.label}
    </button>
  );
};

export default Suggestion;
