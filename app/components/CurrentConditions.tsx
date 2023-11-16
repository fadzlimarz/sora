'use client'

import classes from '@/components/CurrentConditions.module.css'
import {useWeatherContext} from '@/components/WeatherProvider'
import {formatTemperature, formatUnixTimestamp} from '@/lib/helpers'
import {Card, Stack, Text} from '@mantine/core'

/**
 * Current Conditions component.
 */
export default function CurrentConditions() {
  const {
    weather: {
      current: {
        weather: [{description}],
        temp,
        feels_like,
        dt
      }
    },
    tempUnit,
    location
  } = useWeatherContext()

  // Regular function to determine the advice based on weather and temperature
  function getWeatherAdvice() {
    let advice = 'Have a nice day!'
    // const formattedTemp = formatTemperature(tempUnit, temp)
    const tempInCelsius = tempUnit === 'c' ? temp : (temp - 32) / 1.8
    const tempInFahrenheit = tempUnit === 'f' ? temp : temp * 1.8 + 32

    // Check for thunderstorm
    if (description.startsWith('thunderstorm')) {
      advice = 'Thor might be nearby, thunderstorm alert!'
      if (
        (tempUnit === 'c' && tempInCelsius < 15) ||
        (tempUnit === 'f' && tempInFahrenheit < 59)
      ) {
        advice += " Plus it's chilly, grab a cozy blanket."
      } else if (
        (tempUnit === 'c' && tempInCelsius > 20) ||
        (tempUnit === 'f' && tempInFahrenheit > 68)
      ) {
        advice += ' Hot and stormy, an interesting combo.'
      }
    }
    // Check for rain or drizzle
    else if (description.includes('rain') || description.includes('drizzle')) {
      advice = 'Bring an umbrella.'
      if (
        (tempUnit === 'c' && tempInCelsius < 10) ||
        (tempUnit === 'f' && tempInFahrenheit < 50)
      ) {
        advice += " It's also quite chilly, consider wearing a warm jacket."
      } else if (
        (tempUnit === 'c' && tempInCelsius > 25) ||
        (tempUnit === 'f' && tempInFahrenheit > 77)
      ) {
        advice += " Don't forget to stay hydrated!"
      }
    }
    // Check for snow
    else if (description.includes('snow')) {
      advice = 'Snowball fight, anyone?'
      if (
        (tempUnit === 'c' && tempInCelsius < -5) ||
        (tempUnit === 'f' && tempInFahrenheit < 23)
      ) {
        advice += " It's super cold, dress like a polar bear."
      } else if (
        (tempUnit === 'c' && tempInCelsius > 0) ||
        (tempUnit === 'f' && tempInFahrenheit > 32)
      ) {
        advice += ' Perfect for making snowmen.'
      }
    }
    // Check for fog or mist
    else if (description.includes('mist') || description.includes('fog')) {
      advice = 'Foggy conditions: Beware of mystery novels coming to life!'
      if (
        (tempUnit === 'c' && tempInCelsius < 5) ||
        (tempUnit === 'f' && tempInFahrenheit < 41)
      ) {
        advice += " Also, it's nippy. Wear a warm hat."
      } else if (
        (tempUnit === 'c' && tempInCelsius > 15) ||
        (tempUnit === 'f' && tempInFahrenheit > 59)
      ) {
        advice += ' Oddly warm for a foggy day.'
      }
    }
    // Check for clear skies
    else if (description.includes('clear')) {
      advice = 'Clear skies, unleash your inner sunflower!'
      if (
        (tempUnit === 'c' && tempInCelsius < 10) ||
        (tempUnit === 'f' && tempInFahrenheit < 50)
      ) {
        advice += " But still chilly, don't forget your jacket."
      } else if (
        (tempUnit === 'c' && tempInCelsius > 25) ||
        (tempUnit === 'f' && tempInFahrenheit > 77)
      ) {
        advice += ' Perfect for a beach day, bring sunscreen!'
      }
    }
    // Check for clouds
    else if (description.includes('clouds')) {
      advice = 'Cloudy with a chance of... well, more clouds.'
      if (
        (tempUnit === 'c' && tempInCelsius < 10) ||
        (tempUnit === 'f' && tempInFahrenheit < 50)
      ) {
        advice += ' Kind of chilly for cloud gazing.'
      } else if (
        (tempUnit === 'c' && tempInCelsius > 25) ||
        (tempUnit === 'f' && tempInFahrenheit > 77)
      ) {
        advice += ' But still hot, stay hydrated.'
      }
    }
    // Additional conditions can be added in a similar format

    return advice
  }

  return (
    <Card>
      <Stack align="center">
        <Text size="sm" ta="center" c="dimmed">
          {formatUnixTimestamp(dt)}
          <Text
            component="p"
            gradient={{from: 'purple', to: 'violet', deg: 45}}
            variant="gradient"
            size="lg"
            ta="center"
            fw={700}
          >
            {location}
          </Text>
        </Text>
        <Text
          className={classes.description}
          component="p"
          gradient={{from: 'indigo', to: 'blue', deg: 35}}
          variant="gradient"
        >
          {description}
        </Text>
        <Text
          className={classes.bigtemp}
          component="p"
          gradient={{from: 'indigo', to: 'blue', deg: 35}}
          variant="gradient"
        >
          {formatTemperature(tempUnit, temp)}
        </Text>
        {feels_like > temp && (
          <Text
            className={classes.feelslike}
            component="p"
            gradient={{from: 'yellow', to: 'orange', deg: 35}}
            variant="gradient"
          >
            Feels Like: {formatTemperature(tempUnit, feels_like)}
          </Text>
        )}
        <Text
          component="p"
          className={classes.advice} // Ensure you have styles for this class
        >
          {getWeatherAdvice()}
        </Text>
      </Stack>
    </Card>
  )
}
