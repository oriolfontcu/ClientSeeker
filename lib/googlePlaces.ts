import axios from 'axios';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_API_KEY;

export const getPlaceDetails = async (placeId: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`;
  const response = await axios.get(url);
  if (response.data.status !== 'OK') {
    throw new Error(response.data.error_message || 'Error fetching place details');
  }
  const result = response.data.result;
  return {
    name: result.name,
    formatted_address: result.formatted_address,
    formatted_phone_number: result.formatted_phone_number,
    website: result.website,
    rating: result.rating,
    user_ratings_total: result.user_ratings_total,
  };
};

export const fetchPlaces = async (query: string) => {
  let places: any[] = [];
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_PLACES_API_KEY}`;
  let response = await axios.get(url);
  if (response.data.status !== 'OK') {
    throw new Error(response.data.error_message || 'Error fetching places');
  }
  places = places.concat(response.data.results);

  while (response.data.next_page_token) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for token to become valid
    response = await axios.get(`${url}&pagetoken=${response.data.next_page_token}`);
    if (response.data.status !== 'OK') {
      break;
    }
    places = places.concat(response.data.results);
  }

  return places.map(place => place.place_id);
};
