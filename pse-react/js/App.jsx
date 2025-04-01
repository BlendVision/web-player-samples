import React from 'react';
import { PremiumPlayer } from '@blendvision/player/react';
import { selectHlsQualities } from '@blendvision/player/modules';
import { PSEHandlerReact } from '@blendvision/pse/react';
import '../css/App.css';

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

/**
 * The main application ReactJS component.
 * @returns The App component.
 */
const App = () => {
  const [psePlayerProps, setPsePlayerProps] = React.useState({});

  return (
    <PremiumPlayer
      {...psePlayerProps}
      title="PSE Sample App: React"
      licenseKey={playerLicense}
      source={videoSources}
      quality={{
        rewriteManifest: selectHlsQualities,
        default: 'pse-saving',
      }}
      videoMask={
        <PSEHandlerReact 
          enabled={true}
          onLoad={settings => setPsePlayerProps({settings})}
        />}
    />
  );
}; // End of App

export default App;