'use client'

import classes from '@/Page.module.css'
import Alerts from '@/components/Alerts'
import BackToTop from '@/components/BackTopTop'
import CurrentConditions from '@/components/CurrentConditions'
import Footer from '@/components/Footer'
import Forecast from '@/components/Forecast'
import Header from '@/components/Header'
import Search from '@/components/Search'
import {useWeatherContext} from '@/components/WeatherProvider'
import {LoadingOverlay} from '@mantine/core'
// import Image from 'next/image'
// import map from '../public/map.svg'

/**
 * Home page component.
 */
export default function HomePage() {
  const {isLoading} = useWeatherContext()

  return (
    <>
      {/* <div className={classes.wrapper}> */}
      {/* <div className={classes.map}>
          <Image alt="World Map" src={map} fill={true} quality={100} />
        </div> */}
      <div className={classes.container}>
        <Header />
        <LoadingOverlay visible={isLoading} />
        {!isLoading && (
          <main className={classes.main}>
            <div className={classes.search}>
              <Search />
            </div>
            <CurrentConditions />
            <Forecast />
            <Alerts />
          </main>
        )}
        <Footer />
        <BackToTop />
      </div>
      {/* </div> */}
    </>
  )
}
