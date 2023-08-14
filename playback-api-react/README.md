# Playerback API Sample App - React

This React / next.js sample app demonstrates how to integrate with BlendVision One Playback API, get playback info and play with the player component provided by the player SDK.

You may also refer to [this guide](https://support.one.blendvision.com/hc/en-us/articles/19704999298457-Quickstart-Playback-a-BlendVision-One-Stream) for BV One playback integration.

**DRM integration**

DRM integration is also included in this sample app, this part is required if you want to use DRM protected stream.

Caution: License requests accepts `x-custom-data` header instead.

If you are not using BV One player SDK, please refer to this guide](https://support.one.blendvision.com/hc/en-us/articles/20013861360537-Quickstart-Request-DRM-license)

## How to Run this Sample App

- Clone this repository
- Install dependencies: `yarn` or `npm install`
- Specify API host by `API_HOST` variable of `src/getStreamManifestUrs.js`
  - To try with BV One playback API, please use `https://api.one.blendvision.com/bv`
  - For your own streaming backend, use your streaming API endpoint like `https://my-streaming-backend.com/api/v1`
- Replace `apiKey`, `origId`, you may create one in the console https://app.one.blendvision.com/en/developers/api-token
- Replace `resourceType`, `resourceId`, these can be found in the publish VOD dialog
- Start development server: `yarn dev` or `npm run dev`
- Open http://localhost:3000 in your browser
