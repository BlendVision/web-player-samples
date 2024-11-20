const API_HOST = 'https://api.one.blendvision.com/bv'

const uuidv4 = () =>
  '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )

const getStreamManifestUrls = async ({
  email,
  password,
  orgId,
  resourceType,
  resourceId,
}) => {
  // error handling is omitted for simplicity
  const {access_token: accessToken} = await fetch(`${API_HOST}/account/v1/accounts/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password}),
  }).then(response => response.json())

  const {token: apiToken} = await fetch(`${API_HOST}/account/v1/accounts/api-token`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({name: 'My API Token'}),
  }).then(response => response.json())

  const {token: playbackToken} = await fetch(`${API_HOST}/cms/v1/tokens`, {
    method: 'POST',
    headers: {
      'x-bv-org-id': orgId,
      authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resource_id: resourceId,
      resource_type: resourceType,
    }),
  }).then(response => response.json())

  const deviceId = uuidv4()
  const headers = {Authorization: `Bearer ${playbackToken}`}
  const {drm_server_endpoint: licenseUrl} = await fetch(
    `${API_HOST}/playback/v1/sessions/${deviceId}:start`,
    {method: 'POST', headers}
  ).then(res => res.json())
  const streamInfo = await fetch(
    `${API_HOST}/playback/v1/sessions/${deviceId}`,
    {headers}
  ).then(res => res.json())
  const {manifests} = streamInfo.sources[0]

  return {
    dash: manifests.find(manifest => manifest.protocol === 'PROTOCOL_DASH')
      ?.url,
    hls: manifests.find(manifest => manifest.protocol === 'PROTOCOL_HLS')?.url,
    licenseUrl,
    playbackToken,
  }
}

export default getStreamManifestUrls
