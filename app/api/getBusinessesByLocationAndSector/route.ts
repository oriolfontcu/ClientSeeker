import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getPlaceDetails } from '../../../lib/googlePlaces';
import { fakeCompanies } from '../../../data/fakeCompanies';
import { constants } from "@/constants"

const API_KEY = process.env.GOOGLE_API_KEY;

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

const fetchPlacesInSubRegions = async (subRegions: { lat: number, lng: number }[], sector: string) => {
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

    allPlaces = [...allPlaces, ...response.data.results];
  }

  return allPlaces;
};

const processPlaces = (places: any[]) => {
  return places
    .filter(place => !place.website)
    .map(place => {
      let potentialClientRating: 'Low' | 'Mid' | 'High' = 'Low';
      if (place.rating && place.user_ratings_total) {
        if (place.rating >= 4 && place.user_ratings_total >= 50) {
          potentialClientRating = 'High';
        } else if (place.rating >= 3 && place.user_ratings_total >= 20) {
          potentialClientRating = 'Mid';
        }
      }
      return {
        name: place.name,
        formatted_address: place.formatted_address,
        formatted_phone_number: place.formatted_phone_number,
        website: place.website || null,
        rating: place.rating || null,
        user_ratings_total: place.user_ratings_total || null,
        potentialClientRating,
      };
    })
    .slice(0, constants.servicesUsage.getBusinessesByLocationAndSector.limiteConsultas); // Limite en constants.ts
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location');
  const sector = searchParams.get('sector');

  if (!location || !sector) {
    return NextResponse.json({ error: 'Missing location or sector parameter' }, { status: 400 });
  }

  try {
    const { lat, lng } = await getCoordinates(location);
    const subRegions = generateSubRegions(lat, lng);
    const places = await fetchPlacesInSubRegions(subRegions, sector);
    const processedData = processPlaces(places);

    return NextResponse.json(processedData, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching business details:", error);
    return NextResponse.json({ error: "Failed to fetch business details", details: error.message }, { status: 500 });
  }
}
