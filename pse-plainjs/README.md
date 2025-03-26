# BlendVision PSE (Perceptual Streaming Engine)
## Sample App: Plain JavaScript

This sample application demonstrates how to integrate **BlendVision PSE** with the **BlendVision Web Player SDK** to enhance video playback quality.

> 💡 This project showcases how to set up and bundle a plain JavaScript app using **npm** and **Rollup**, and how to properly initialize `BlendVision PSE` alongside the `BlendVision Web Player SDK`.

## 🚀 Features

- Seamless integration with the BlendVision Web Player SDK
- Enhanced video playback using BlendVision PSE
- Example bundling using **Rollup**
- Modular and clean project structure

## 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

## 🛠️ Setup

### 1. Replace the placeholders with your license key and content URLs in `js/index.js`:
```js
const licenseKey = '<your license key>'; // Replace with your actual license key
const source     = 
[
  {
    type: 'application/dash+xml',
    src: '<DASH content URL>', // Replace with your DASH stream URL
  },
  {
    type: 'application/x-mpegurl',
    src: '<HLS content URL>', // Replace with your HLS stream URL
  },
];
```

### 2. Clone or download this repository, then install the dependencies:

```bash
cd <path-to-cloned-repository>
cd pse-plainjs
npm install
```

## 🔧 Build the App

Use the provided script to bundle the app with Rollup:

```bash
npm run build
```

The output will be generated in the `dist/` directory.

## ▶️ Run the App

After building the app, serve the `dist/` folder with any local HTTP server. For example, using `http-server`:

```bash
npx http-server ./dist/ -p 8000 -o /
```

This will start a server at http://localhost:8000.

## 🎥 Integration Guide: BlendVision PSE + Web Player SDK

Below is a minimal example showing how to integrate **PSE** with the **Web Player SDK**.

### 1. Import Required Modules

```js
import createPlayer from '@blendvision/player'
import { selectHlsQualities } from '@blendvision/player/modules'
import { createPSEHandler } from '@blendvision/pse'
```

### 2. Initialize the Player

```js
const playerConfig = {
  title: 'PSE Sample App: PlainJS',
  licenseKey: '<your license key>', // Replace with your actual license key
  source: [
    {
      type: 'application/dash+xml',
      src: '<DASH content URL>', // Replace with your DASH stream URL
    },
    {
      type: 'application/x-mpegurl',
      src: '<HLS content URL>', // Replace with your HLS stream URL
    },
  ],
  // Make sure videoAttributes is added so the player
  // sets the default quality accordingly.
  videoAttributes: {
    quality: {
      rewriteManifest: selectHlsQualities,
      default: 'pse-saving',
    },
  },
};

// Create the player instance.
const player = createPlayer(root, playerConfig);
```

### 3. Create PSE handler

```js
// Create PSE handler.
const pseHandler = createPSEHandler({
    player,
});
```

Once initialized, the PSE handler will automatically manage PSE functions and adapt to the player's display size.

### 4. Bundle the application

If you use **Rollup** to bundle your application, remember to import the bundling utility features from the PSE package. In `rollup.config.js`:
```js
import { copyPSEEngine } from '@blendvision/pse/bundle-utils';
```
Then add copyPSEEngine to your plugins section:
```js
const config = [{
  ...
  plugins: [
    ...
    copyPSEEngine({
      dest: 'dist',
    }),
    ...
  ],
  ...
}];
```
