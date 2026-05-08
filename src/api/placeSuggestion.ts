type OpenMeteoGeocodingResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
};

type OpenMeteoGeocodingResponse = {
  results?: OpenMeteoGeocodingResult[];
};

export type PlaceSuggestion = {
  id: number;
  label: string;
  lat: number;
  lng: number;
};

const buildLabel = (place: OpenMeteoGeocodingResult) => {
  const parts = [place.name, place.admin1, place.country].filter((part, index, allParts) => {
    return part && allParts.indexOf(part) === index;
  });

  return parts.join(', ');
};

export const fetchCities = async (search: string): Promise<PlaceSuggestion[]> => {
  if (search.trim().length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    name: search,
    count: '6',
    language: 'en',
    format: 'json',
  });
  const url = `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`;
  const res = (await (await fetch(url)).json()) as OpenMeteoGeocodingResponse;

  return (res.results ?? []).map((place) => ({
    id: place.id,
    label: buildLabel(place),
    lat: place.latitude,
    lng: place.longitude,
  }));
};
