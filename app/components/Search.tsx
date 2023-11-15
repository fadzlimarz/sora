'use client'

import classes from '@/components/Search.module.css'
// import Settings from '@/components/Settings'
import {useWeatherContext} from '@/components/WeatherProvider'
import {usePlaces} from '@/lib/hooks'
import {Autocomplete} from '@mantine/core'
import {useDebouncedValue} from '@mantine/hooks'
import {IconMapPin} from '@tabler/icons-react'
import {SetStateAction, useState} from 'react'

/**
 * Search component.
 */
// ... (other imports remain the same)

export default function Search() {
  const {location, setLocation} = useWeatherContext()
  const [searchTerm, setSearchTerm] = useState(location)
  const [debounced] = useDebouncedValue(searchTerm, 400)
  const {locations} = usePlaces(debounced)

  // Function to clear the search term
  function clearSearch(setSearchTerm: {
    (value: SetStateAction<string>): void
    (arg0: string): any
  }) {
    return () => setSearchTerm('')
  }

  const places =
    !!locations && locations.length > 0
      ? locations
      : [
          'Montreal, QC, Canada',
          'Helsinki, Finland',
          'Tokyo, Japan',
          'Copenhagen, Denmark',
          'London, UK',
          'Vancouver, BC, Canada',
          'New York, NY, USA',
          'Bangkok, Thailand'
        ]

  return (
    <>
      <Autocomplete
        aria-label="Enter the name of your location"
        className={classes.searchbar}
        data={places}
        leftSection={<IconMapPin />}
        limit={10}
        onChange={setSearchTerm}
        onOptionSubmit={(item) => setLocation(item)}
        placeholder="Enter the name of your location"
        size="lg"
        value={searchTerm}
        onFocus={clearSearch(setSearchTerm)} // Use the clearSearch function
      />
      {/* <Settings /> */}
    </>
  )
}
