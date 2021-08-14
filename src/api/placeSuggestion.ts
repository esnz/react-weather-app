export const fetchCities = async (search: string) => {
  const url = `https://places-dsn.algolia.net/1/places/query`;
  const res = await (
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        query: search,
        type: 'city',
        language: 'en',
      }),
    })
  ).json();

  return res.hits
    .filter((item: any) => item.is_city)
    .map((i: any) => {
      return i.locale_names[0] + ', ' + i.country;
    });
};
