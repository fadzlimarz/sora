import classes from '@/components/Forecast.module.css'
import Icon from '@/components/Icon'
import {useWeatherContext} from '@/components/WeatherProvider'
import {
  formatDay,
  formatTemperature,
  formatTime,
  formatUnixTimestamp
} from '@/lib/helpers'
import {Card, Group, SimpleGrid, Space, Text, Title} from '@mantine/core'

/**
 * Forecast component.
 */
export default function Forecast() {
  const {
    weather,
    tempUnit,
    weather: {
      current: {dt}
    }
  } = useWeatherContext()

  return (
    <section>
      <Space h="lg" />
      <Title className={classes.title} order={2} my="lg">
        The Next 4 Hours
      </Title>
      <SimpleGrid cols={{base: 2, sm: 4}}>
        {weather?.hourly
          ?.map((forecast, index: number) => {
            const {
              dt,
              weather: [{icon, main}],
              temp,
              feels_like
            } = forecast
            return (
              <Card className={classes.card} shadow="sm" p="md" key={index}>
                <Text size="md" c="dimmed">
                  {formatTime(dt)}
                </Text>
                <Text size="lg">{formatTemperature(tempUnit, temp)}</Text>
                <Icon icon={icon} />
                <Text size="md">{main}</Text>
                {feels_like > temp && (
                  <Text
                    gradient={{from: 'yellow', to: 'orange', deg: 45}}
                    size="md"
                    variant="gradient"
                  >
                    Feels Like: {formatTemperature(tempUnit, feels_like)}
                  </Text>
                )}
              </Card>
            )
          })
          .slice(1, 5)}
      </SimpleGrid>

      <Title className={classes.title} order={2} my="lg">
        Extended Forecast
      </Title>

      <SimpleGrid cols={{base: 2, sm: 4}}>
        {weather?.daily?.map((forecast, index: number) => {
          const {
            dt,
            pop,
            weather: [{icon, main}],
            temp: {min, max},
            feels_like: {day}
          } = forecast
          return (
            <Card className={classes.card} shadow="sm" p="xl" key={index}>
              <Text size="xs" c="dimmed">
                {formatUnixTimestamp(dt)}
              </Text>
              <Text size="md" fw={700}>
                {formatDay(dt, index)}
              </Text>
              <Text size="md">
                {main} {pop ? `${Math.round(pop * 100)}%` : ''}
              </Text>
              <Group justify="center">
                <Text size="sm" c="dimmed">
                  L {formatTemperature(tempUnit, min)}
                </Text>
                <Text size="sm">H {formatTemperature(tempUnit, max)}</Text>
              </Group>
              <Icon icon={icon} />
              {day > max && (
                <Text
                  gradient={{from: 'yellow', to: 'orange', deg: 45}}
                  size="md"
                  variant="gradient"
                >
                  Feels Like: {formatTemperature(tempUnit, day)}
                </Text>
              )}
            </Card>
          )
        })}
      </SimpleGrid>
    </section>
  )
}
