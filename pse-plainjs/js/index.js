import createPlayer from '@blendvision/player'
import { selectHlsQualities } from '@blendvision/player/modules'
import { createPSEHandler } from '@blendvision/pse'

const initApp = (rootId, pseSwitchButtonId) => {
  const root = document.getElementById(rootId);
  const btn  = document.getElementById(pseSwitchButtonId);

  // Set up the constants.
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

  // Configurations for the player.
  // Set up 'videoAttributes.quality.default' to 'pse-saving' 
  // to use 'AI Saving' as the default quality.
  const playerConfig = {
    title: 'PSE Sample App: PlainJS',
    licenseKey: licenseKey,
    source: source,
    ui: {uiMode: 'standalone'},
    muted: true,
    playsinline: true,
    autoplay: false,
    loop: true,
    videoAttributes: {
      quality: {
        rewriteManifest: selectHlsQualities,
        default: 'pse-saving',
      },
    },
  };

  // Create the player.
  const player = createPlayer(root, playerConfig);

  // Configurations for the PSE handler.
  const pseHandlerConfig = {
    player,
    enabled: true,
    onStateChanged: e => {
      btn.textContent = e.sender.isEnabled ? 'PSE Enabled' : 'PSE Disabled';
    }
  };

  // Create PSE handler.
  const pseHandler = createPSEHandler(pseHandlerConfig);

  // Set up the button event.
  btn.addEventListener('click', () => {
    pseHandler.isEnabled = !pseHandler.isEnabled;
  });
}; // End of initApp

export { initApp };