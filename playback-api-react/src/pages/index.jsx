import {useEffect, useState} from 'react'
import Head from 'next/head'
import {PremiumPlayer} from '@blendvision/player/react'
import styles from '@/styles/Home.module.css'
import getStreamManifestUrls from '../getStreamManifestUrls'

const Home = () => {
  const [source, setSource] = useState('')

  useEffect(() => {
    getStreamManifestUrls({
      email: '<email>',
      password: '<password>',
      orgId: '<org-id>',
      resourceType: '<resource-type>',
      resourceId: '<resource-id>',
    }).then(setSource)
  }, [])
  const drmOptions = source.licenseUrl && {
    licenseUri: `${source.licenseUrl}/api/v3/drm/license`,
    headers: {
      'X-Custom-Data': `token_type=upfront&token_value=${source.playbackToken}`,
    },
  }

  return (
    <>
      <Head>
        <title>BV One Player - Playback API Sample App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        {source ? (
          <PremiumPlayer
            source={[
              {
                type: 'dash',
                src: source.dash,
                drm: {widevine: drmOptions, playready: drmOptions},
              },
              {
                type: 'hls',
                src: source.hls,
                drm: {
                  fairplay: {
                    ...drmOptions,
                    certificateUri: `${source.licenseUrl}/api/v3/drm/license/fairplay_cert`,
                    certificateHeaders: drmOptions.headers,
                  },
                }
              },
            ]}
          />
        ) : (
          <div>
            Please replace apiKey, origId, resourceType and resourceId in
            index.jsx
          </div>
        )}
        <pre>{JSON.stringify(source, null, 2)}</pre>
      </main>
    </>
  )
}

export default Home
