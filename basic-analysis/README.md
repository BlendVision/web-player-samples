#  Player basic analysis

## Overview
This sample project showcases how to send player logs to the player's default [analysis service]() by setting the AnalyticsConfig when creating the player.
You must obtain the analytics license token first in order to transmit player playback events to our data platform.

# Playerback API Sample App - basic analysis

This pure sample app demonstrates how to integrate with BlendVision One Playback API, get playback info and play with the player  provided by the player SDK.
You may also refer to [this guide](https://support.one.blendvision.com/hc/en-us/articles/19704999298457-Quickstart-Playback-a-BlendVision-One-Stream) for BV One playback integration.'=

- Analytics Field Definition
    - `analytics.token`: The field is required, this appears to be a token or authentication key for analytics purposes.

    - `analytics.sessionId`: The field is optional, this represents a session identifier, likely used to track user sessions or interactions with the application.

    - `analytics.resourceId`: The field is optional, this could be an identifier for a specific resource or source within your application, used for tracking or categorization.

    - `analytics.resourceType`: The field is optional, this might indicate the type or category of the resource mentioned above.

    - `analytics.customData`: The field is optional, this seems to be a placeholder for custom data that you can include in your analytics events, allowing you to send additional information as needed.

**DRM integration**

DRM integration is also included in this sample app, this part is required if you want to use DRM protected stream.

Caution: License requests accepts `x-custom-data` header instead.

If you are not using BV One player SDK, please refer to this guide](https://support.one.blendvision.com/hc/en-us/articles/20013861360537-Quickstart-Request-DRM-license)

## How to Run this Sample App

- Clone this repository
- Replace `license` and `token`, you may create one in the [console](https://app.one.blendvision.com/en/developers/api-token)
- Specify your own `source`.
