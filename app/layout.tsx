import classes from '@/Page.module.css'
import Meta from '@/components/Meta'
import {ThemeProviders} from '@/components/ThemeProvider'
import WeatherProvider from '@/components/WeatherProvider'
import config from '@/lib/config'
import {ColorSchemeScript, MantineProvider} from '@mantine/core'
import '@mantine/core/styles.css'
import Image from 'next/image'
import map from '../public/map.svg'
import {theme} from '../theme'

export const metadata = {
  title: `${config.siteName} - ${config.siteDescription}`,
  description: config.siteDescription
}

/**
 * Root layout component.
 */
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <Meta />
      </head>
      <body>
        <ThemeProviders>
          <div className={classes.map}>
            <Image alt="World Map" src={map} fill quality={100} />
          </div>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <WeatherProvider>{children}</WeatherProvider>
          </MantineProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
