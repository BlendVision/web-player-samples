// WARNING: This code is for demonstration purposes only.
// SECURITY RISK: This implementation exposes sensitive API keys and tokens on the client side.
// In production:
// 1. NEVER make these API calls from the client/browser
// 2. Keep your API keys and authentication tokens secure on your server
const API_HOST = ''

const uuidv4 = () =>
  '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )

const getStreamManifestUrls = async ({
  apiKey,
  orgId,
  resourceType,
  resourceId,
}) => {
  // error handling is omitted for simplicity
  // SECURITY RISK: This token request exposes your API key
  // Should be performed server-side to protect credentials
  const { token: playbackToken } = await fetch(`${API_HOST}/cms/v1/tokens`, {
    method: 'POST',
    headers: {
      'x-bv-org-id': orgId,
      authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resource_id: resourceId,
      resource_type: resourceType,
    }),
  }).then(response => response.json())

  const deviceId = uuidv4()
  const headers = { Authorization: `Bearer ${playbackToken}` }

  // SECURITY RISK: DRM license endpoints should be managed server-side
  // Exposing these endpoints could allow unauthorized access to protected content
  const { drm_server_endpoint: licenseUrl } = await fetch(
    `${API_HOST}/playback/v1/sessions/${deviceId}:start`,
    { method: 'POST', headers }
  ).then(res => res.json())
  // SECURITY RISK: Session management should be handled server-side
  // to prevent unauthorized access and token manipulation
  const streamInfo = await fetch(
    `${API_HOST}/playback/v1/sessions/${deviceId}`,
    { headers }
  ).then(res => res.json())

  const { manifests } = streamInfo.sources[0]

  return {
    dash: manifests.find(manifest => manifest.protocol === 'PROTOCOL_DASH')
      ?.url,
    hls: manifests.find(manifest => manifest.protocol === 'PROTOCOL_HLS')?.url,
    licenseUrl,
    playbackToken,
  }
}

export default getStreamManifestUrls
