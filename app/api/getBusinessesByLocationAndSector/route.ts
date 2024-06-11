import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { constants } from "@/constants";
import { scrapeEmails } from '../../../lib/scrapeEmails';
import { scrapeSocialMedia } from '../../../lib/scrapeSocialMedia';

const API_KEY = process.env.GOOGLE_API_KEY;

interface Place {
  place_id: string;
  formatted_phone_number?: string;
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
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

const fetchPlaceDetails = async (placeId: string) => {
  const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
    params: {
      place_id: placeId,
      fields: 'formatted_phone_number,formatted_address,website',
      key: API_KEY,
    },
  });
  return response.data.result;
};

const fetchPlacesInSubRegions = async (subRegions: { lat: number, lng: number }[], sector: string, isTesting: boolean, website: string) => {
  let allPlaces: any[] = [];

  for (const { lat, lng } of subRegions) {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${lat},${lng}`,
        radius: 30000,
        keyword: sector,
        key: API_KEY,
      },
    });

    const placesWithDetails = await Promise.all((response.data.results as Place[]).map(async (place: Place) => {
      const details = await fetchPlaceDetails(place.place_id);
      return {
        ...place,
        formatted_phone_number: details.formatted_phone_number || 'No disponible',
        formatted_address: details.formatted_address || 'No disponible',
        website: details.website || null
      };
    }));

    allPlaces = [...allPlaces, ...placesWithDetails];
  }

  if (website === 'with') {
    allPlaces = allPlaces.filter(place => place.website);
  } else if (website === 'without') {
    allPlaces = allPlaces.filter(place => !place.website);
  } else if (website === null || website === 'all'){
    allPlaces = allPlaces;
  }

  return isTesting ? allPlaces.slice(0, 1) : allPlaces.slice(0, constants.servicesUsage.getBusinessesByLocationAndSector.limiteConsultas);
};

const processPlaces = async (places: any[]) => {
  const processedPlaces = await Promise.all(places.map(async place => {
    let potentialClientRating: 'Low' | 'Mid' | 'High' = 'Low';
    if (place.rating && place.user_ratings_total) {
      if (place.rating >= 4 && place.user_ratings_total >= 50) {
        potentialClientRating = 'High';
      } else if (place.rating >= 3 && place.user_ratings_total >= 20) {
        potentialClientRating = 'Mid';
      }
    }

    let email: string | null = null
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
      socialMedia
    };
  }));

  return processedPlaces;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location');
  const sector = searchParams.get('sector');
  const isTesting = searchParams.get('isTesting') === 'true';
  const website = searchParams.get('website') || 'all';

  if (!location || !sector) {
    return NextResponse.json({ error: 'Missing location or sector parameter' }, { status: 400 });
  }

  try {
    const { lat, lng } = await getCoordinates(location);
    const subRegions = generateSubRegions(lat, lng);
    const places = await fetchPlacesInSubRegions(subRegions, sector, isTesting, website);

    const processedData = await processPlaces(places);

    return NextResponse.json(processedData, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching business details:", error);
    return NextResponse.json({ error: "Failed to fetch business details", details: error.message }, { status: 500 });
  }
}
