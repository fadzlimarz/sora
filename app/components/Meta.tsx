import config from '@/lib/config'
import {Metadata} from 'next'
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

export default function Meta() {
  return (
    <>
      <title>{config.siteName}</title>
      <meta name="description" content={config.metaDescription} />
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
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
