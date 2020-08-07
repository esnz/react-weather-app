export const fetchCities = async (search: string) => {
  const url = `https://api.teleport.org/api/cities/?search=${search}`;
  const res = await (await fetch(url)).json();
  return res._embedded['city:search-results'] as [{ matching_full_name: string }];
};
