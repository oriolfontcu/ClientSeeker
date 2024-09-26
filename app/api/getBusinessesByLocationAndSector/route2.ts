import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { scrapeEmails } from '../../../lib/scrapeEmails';
import { scrapeSocialMedia } from '../../../lib/scrapeSocialMedia';

const API_KEY = process.env.GOOGLE_API_KEY;

interface Place {
  name: string;
  formatted_phone_number?: string;
  formatted_address?: string;
  website?: string;
}

const getCoordinates = async (location: string) => {
  const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key: API_KEY,
    },
  });

  const { lat, lng } = response.data.results[0].geometry.location;
  return { lat, lng };
};

const generateSubRegions = (lat: number, lng: number, distance: number = 0.1) => {
  const subRegions = [];

  const offsets = [-distance, 0, distance];

  for (const latOffset of offsets) {
    for (const lngOffset of offsets) {
      if (latOffset !== 0 || lngOffset !== 0) {
        subRegions.push({ lat: lat + latOffset, lng: lng + lngOffset });
      }
    }
  }

  return subRegions;
};

const fetchPlacesInSubRegions = async (subRegions: { lat: number, lng: number }[], sector: string, limit: number, isTesting: boolean) => {
  let allPlaces: any[] = [];
  let foundPlacesQty = 0;
  const requestLimit = limit;
  let subRegionIndex = 0;
  const seenPlaceIds = new Set();

  do {
    if (foundPlacesQty >= requestLimit) {
      break;
    }

    const { lat, lng } = subRegions[subRegionIndex];

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${lat},${lng}`,
        radius: 30000,
        keyword: sector,
        key: API_KEY,
        fields: 'name,formatted_phone_number,formatted_address,website'
      },
    });

    console.log(response);

    const places = response.data.results as Place[];
    const placesWithDetails = [];

    for (const place of places) {
      if (foundPlacesQty >= requestLimit) {
        break;
      }

      placesWithDetails.push({
        name: place.name,
        formatted_phone_number: place.formatted_phone_number || 'No disponible',
        formatted_address: place.formatted_address || 'No disponible',
        website: place.website || null,
      });

      foundPlacesQty++;
    }

    allPlaces = [...allPlaces, ...placesWithDetails];

    subRegionIndex++;
  } while (foundPlacesQty < requestLimit && subRegionIndex < subRegions.length);

  return isTesting ? allPlaces.slice(0, 1) : allPlaces.slice(0, requestLimit);
};

const processPlaces = async (places: any[], website: string, mail: string) => {
  const processedPlaces = await Promise.all(places.map(async place => {
    let potentialClientRating: 'Low' | 'Mid' | 'High' = 'Low';
    if (place.rating && place.user_ratings_total) {
      if (place.rating >= 4 && place.user_ratings_total >= 50) {
        potentialClientRating = 'High';
      } else if (place.rating >= 3 && place.user_ratings_total >= 20) {
        potentialClientRating = 'Mid';
      }
    }

    let email: string | null = null;
    let socialMedia: any = {};
    if (place.website) {
      email = await scrapeEmails(place.website);
      socialMedia = await scrapeSocialMedia(place.website);
    }

    return {
      name: place.name,
      formatted_address: place.formatted_address,
      formatted_phone_number: place.formatted_phone_number,
      website: place.website || null,
      rating: place.rating || null,
      user_ratings_total: place.user_ratings_total || null,
      potentialClientRating,
      email,
      socialMedia,
    };
  }));

  let filteredPlaces = processedPlaces;

  if (website === 'with') {
    filteredPlaces = filteredPlaces.filter(place => place.website);
  } else if (website === 'without') {
    filteredPlaces = filteredPlaces.filter(place => !place.website);
  }

  if (mail === 'with-mail') {
    filteredPlaces = filteredPlaces.filter(place => place.email);
  } else if (mail === 'without-mail') {
    filteredPlaces = filteredPlaces.filter(place => !place.email);
  }

  return filteredPlaces;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location');
  const sector = searchParams.get('sector');
  const isTesting = searchParams.get('isTesting') === 'true';
  const website = searchParams.get('website') || 'all';
  const mail = searchParams.get('mail') || 'all-mail';
  const limit = searchParams.get('limit');

  if (!location || !sector || !limit) {
    return NextResponse.json({ error: 'Missing location, sector parameter or leads quantity' }, { status: 400 });
  }

  try {
    const { lat, lng } = await getCoordinates(location);
    const subRegions = generateSubRegions(lat, lng);
    const places = await fetchPlacesInSubRegions(subRegions, sector, Number(limit), isTesting);

    const processedData = await processPlaces(places, website, mail);

    if (website === 'without' && mail === 'with-mail'){
      return NextResponse.json({ error: 'Oops! We need a website to find emails' }, { status: 400 });
    }

    return NextResponse.json(processedData, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching business details:", error);
    return NextResponse.json({ error: "Failed to fetch business details", details: error.message }, { status: 500 });
  }
}
