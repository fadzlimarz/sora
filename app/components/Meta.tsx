import config from '@/lib/config'

/**
 * Meta component.
 */
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
