import {WeatherResponse} from '@/lib/types'
import {geolocation} from '@vercel/edge'

export const runtime = 'edge'

export interface GeocodeResponse {
  status: string
  results: [
    {
      geometry: {
        location: {
          lat: number
          lng: number
        }
      }
    }
  ]
}

export async function GET(request: Request) {
  // Get the client's geolocation
  const {latitude, longitude} = geolocation(request)

  const {searchParams} = new URL(request.url)
  let unsanitizedLocation = searchParams.get('location') || ''

  // Sanitize the location.
  const location = encodeURI(unsanitizedLocation)

  // Use geolocation as a fallback if no location is provided
  let lat = latitude ? parseFloat(latitude) : 60.1695 // Default to Helsinki
  let lon = longitude ? parseFloat(longitude) : 24.9355 // Default to Helsinki

  // If a location is provided, try to geocode it
  if (unsanitizedLocation) {
    try {
      const geocode = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      )

      if (geocode.status !== 200) {
        throw new Error(`${geocode.statusText}`)
      }

      const coordinates = (await geocode.json()) as GeocodeResponse

      if (coordinates.status != 'OK' || !coordinates.results.length) {
        throw new Error(`${coordinates.status}`)
      }

      lat = coordinates.results[0].geometry.location.lat
      lon = coordinates.results[0].geometry.location.lng
    } catch (error) {
      console.error(error)
      // If geocoding fails, use the default lat, lon from geolocation
    }
  }

  // Fetch weather data
  try {
    const weather = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${process.env.OPENWEATHER_API_KEY}`
    )

    if (weather.status != 200) {
      throw new Error(`${weather.statusText}`)
    }

    const forecast = (await weather.json()) as WeatherResponse

    if (!forecast.lat || !forecast.lon) {
      throw new Error('No forecast data.')
    }

    return new Response(JSON.stringify(forecast), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=300, stale-while-revalidate'
      },
      status: 200,
      statusText: 'OK'
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({error: `${error}`}), {
      status: 500,
      statusText: 'Internal Server Error'
    })
  }
}
