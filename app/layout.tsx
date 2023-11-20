import classes from '@/Page.module.css'
import WeatherProvider from '@/components/WeatherProvider'
import config from '@/lib/config'
import {ColorSchemeScript, MantineProvider} from '@mantine/core'
import '@mantine/core/styles.css'
import {Metadata} from 'next'
import Image from 'next/image'
import map from '../public/map.svg'
import {theme} from '../theme'

/**
 * Meta component.
 */

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: config.title,
    template: `%s | ${config.title}`
  },
  description: config.metaDescription,
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: './',
    siteName: config.title,
    images: [config.socialBanner],
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: config.title,
    card: 'summary_large_image',
    images: [config.socialBanner]
  }
}

export const meta = {
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
        <title>{config.siteName}</title>
        <meta name="description" content={config.metaDescription} />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:site_name" content={config.siteName} />
        <meta property="og:image" content={config.socialBanner} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:image" content={config.socialBanner} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        {/* Preloading API calls can be kept or removed depending on use case */}
        <link
          as="fetch"
          rel="preload"
          href="/api/places?location=Helsinki,%20Finland"
          crossOrigin="anonymous"
        />
        <link
          as="fetch"
          rel="preload"
          href="/api/weather?location=Helsinki,%20Finland"
          crossOrigin="anonymous"
        />
        <ColorSchemeScript />
      </head>
      <body>
        <>
          <div className={classes.map}>
            <Image alt="World Map" src={map} fill quality={100} />
          </div>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <WeatherProvider>{children}</WeatherProvider>
          </MantineProvider>
        </>
      </body>
    </html>
  )
}
