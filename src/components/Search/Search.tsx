import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { fetchCities, PlaceSuggestion } from './../../api/placeSuggestion';
import { useClickOutside } from './../../hooks/useClickOutside';
import LocationIcon from '../../assets/location-icon.svg?react';
import SearchIcon from '../../assets/search-icon.svg?react';
import Suggestion from './Suggestion';

const Search: React.FC = () => {
  const { fetchWeather } = useAppContext();
  const suggestionRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearchTerm(inputValue.trim());
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [inputValue]);

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    let isActive = true;
    setShowSuggestions(true);

    fetchCities(searchTerm).then((res) => {
      if (isActive) {
        setSuggestions(res);
      }
    });

    return () => {
      isActive = false;
    };
  }, [searchTerm]);

  useClickOutside(suggestionRef, () => setShowSuggestions(false));

  const onSearchInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const showPosition = (position: GeolocationPosition) => {
    fetchWeather({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  return (
    <div className="rw-search">
      <SearchIcon className="rw-search-icon" />
      <input
        className="rw-search-input"
        value={inputValue}
        onChange={onSearchInputChanged}
        placeholder="Search for location"
      />
      <button
        className="rw-location-button"
        type="button"
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            alert('Geolocation is not supported by this browser.');
          }
        }}
      >
        <LocationIcon className="rw-location-icon" />
      </button>
      {showSuggestions && (
        <div className="rw-search-result" ref={suggestionRef}>
          {suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion.id}
              suggestion={suggestion}
              hideSuggestionFn={() => {
                setShowSuggestions(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
