import { NextRequest, NextResponse } from 'next/server';
import { fetchPlaces, getPlaceDetails } from '../../../lib/googlePlaces';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location');
  const sector = searchParams.get('sector');

  if (!location || !sector) {
    return NextResponse.json({ error: 'Missing location or sector parameter' }, { status: 400 });
  }

  try {
    const placeIds = await fetchPlaces(`${sector} ${location}`);
    const placeDetailsPromises = placeIds.map(placeId => getPlaceDetails(placeId));
    const placesDetails = await Promise.all(placeDetailsPromises);

    // Filtrar los lugares que no tienen página web
    const processedData = placesDetails
      .filter(place => !place.website) // Aquí es donde se filtran los lugares sin sitio web
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
          ...place,
          potentialClientRating
        };
      });

    return NextResponse.json(processedData, { status: 200 }); // Devuelve todos los resultados sin limitar a 50
  } catch (error: any) {
    console.error("Error fetching business details:", error);
    return NextResponse.json({ error: "Failed to fetch business details", details: error.message }, { status: 500 });
  }
}
