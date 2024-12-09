import { PremiumPlayer } from '@blendvision/player/react'
import './App.css'

function App() {
  // Configure DRM headers with playback token
  // Note: This is the upfront playback token, NOT the resource token
  // The playback token can be obtained from BlendVision One
  const playbackToken = 'your-playback-token'
  const drmHeaders = {
    'x-custom-data': `token_type=upfront&token_value=${playbackToken}`,
  }

  // Get your DRM URLs from BlendVision One dashboard
  const drmUrl = 'your-drm-license-url'
  const drmLicensePortalUrl = 'your-drm-license-portal-url'

  return (
    <PremiumPlayer
      title="BlendVision One"
      source={[
        {
          type: 'application/dash+xml',
          src: 'https://d2mxta927rohme.cloudfront.net/376c618f-b27a-4a3d-9457-ad7076ee87e3/vod/dea931c3-8766-477d-a87b-1c3f91490139/vod/dash.mpd',
          drm: {
            // Widevine DRM for Chrome, Firefox, and Android
            widevine: {
              licenseUri: drmUrl,
              headers: drmHeaders,
            },
            // PlayReady DRM for Edge and Xbox
            playready: {
              licenseUri: drmUrl,
              headers: drmHeaders,
            },
          },
        },
        {
          type: 'application/x-mpegurl',
          src: 'https://d2mxta927rohme.cloudfront.net/376c618f-b27a-4a3d-9457-ad7076ee87e3/vod/dea931c3-8766-477d-a87b-1c3f91490139/vod/hls.m3u8',
          drm: {
            // FairPlay DRM for Safari and iOS
            fairplay: {
              licenseUri: drmUrl,
              // FairPlay requires an additional certificate URL
              certificateUri: `${drmLicensePortalUrl}/fairplay_cert`,
              headers: drmHeaders,
            },
          },
        },
      ]}
      licenseKey="your-license-key" // Required for production deployment
    />
  )
}

export default App
