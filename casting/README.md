# Basic Casting

##  Google Cast Integration
This sample project showcases how to casting your content to devices via [Google Cast (ChromeCast)](https://developers.google.com/cast).
The Cast receiver player plays with DASH manifest, so you should provide DASH manifest URL in source.

### Important

Web Sender apps need to support HTTPS to maintain Cast compatibility, as browsers have deprecated support for the Presentation API on insecure origins. (ref. [Google cast](https://developers.google.com/cast/docs/web_sender))

*A local server to host your app is needed.*

### Receiver application ID

- [Contact your sales to obtain the BlendVersion ID](https://www.blendvision.com/zh-tw/contact).
- Use Google sample app receiver application ID, `C0868879`.
- Created your own in the receiver application ID in [Google Cast Developer Console](https://developers.google.com/cast/docs/registration).

**DRM integration**

DRM integration is also included in this sample app, this part is required if you want to use DRM protected stream.

Caution: License requests accepts `x-custom-data` header instead.

If you are not using BV One player SDK, please refer to this guide](https://support.one.blendvision.com/hc/en-us/articles/20013861360537-Quickstart-Request-DRM-license)

## How to Run this Sample App

- Clone this repository.
- Replace `license` and `token`, you may create one in the [console](https://app.one.blendvision.com/en/developers/api-token).
- Specify your own `source` and `castReceiverAppId`.
