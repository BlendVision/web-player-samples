# BlendVision PSE (Perceptual Streaming Engine)
## Sample App: ReactJS

This sample application demonstrates how to integrate **BlendVision PSE** with the **BlendVision Web Player SDK** to enhance video playback quality.

> 💡 This project showcases how to set up and bundle a ReactJS app using **npm** and **Vite**, and how to properly initialize `BlendVision PSE` alongside the `BlendVision Web Player SDK`.

## 🚀 Features

- Seamless integration with the BlendVision Web Player SDK
- Enhanced video playback using BlendVision PSE
- Example bundling using **Vite**
- Modular and clean project structure

## 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

## 🛠️ Setup

### 1. Replace the placeholders with your license key and content URLs in `js/App.jsx`:
```js
const playerLicense = '<your license key>'; // Replace with your actual license key
const videoSources  = 
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
cd pse-react
npm install
```

## 🔧 Build the App

Use the provided script to bundle the app with Vite:

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
import React from 'react';
import ReactDOM from 'react-dom';
import { PremiumPlayer } from '@blendvision/player/react';
import { selectHlsQualities } from '@blendvision/player/modules';
import { PSEHandlerReact } from '@blendvision/pse/react';
```

### 2. Initialize the Player and PSE Handler

```js
const App = () => {
  const [psePlayerProps, setPsePlayerProps] = React.useState({});

  return (
    <PremiumPlayer
      {...psePlayerProps}
      title="PSE Sample App: React"
      licenseKey={'<your license key>'} // Replace with your actual license key
      source={[{
            type: 'application/dash+xml',
            src: '<DASH content URL>', // Replace with your DASH stream URL
        },
        {
            type: 'application/x-mpegurl',
            src: '<HLS content URL>', // Replace with your HLS stream URL
        }]}
      quality={{
        rewriteManifest: selectHlsQualities,
        default: 'pse-saving',
      }}
      videoMask={
        <PSEHandlerReact 
          enabled={true}
        />}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

Once initialized, the PSE handler will automatically manage PSE functions and adapt to the player's display size.

### 4. Bundle the application

If you use **Vite** to bundle your application, remember to import the bundling utility features from the PSE package. In `vite.config.mjs`:
```js
import { copyPSEEngine } from '@blendvision/pse/bundle-utils';
```
Then add copyPSEEngine to your Rollup options' plugins section:
```js
export default defineConfig({
  ...
  build: {
    ...
    rollupOptions: {
      ...
      plugins: [
        ...
        copyPSEEngine({
          dest: 'dist/assets',
        }),
        ...
      ],
    },
  },
});
```
