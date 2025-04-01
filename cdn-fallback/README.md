# BlendVision Web Player Sample - CDN Fallback

This sample demonstrates how to use a dynamic `import()` fallback mechanism to load the BlendVision Web Player from multiple CDN sources. It ensures that if one CDN is unavailable, the script will attempt the next one in the list until a successful load.

## Run the Sample App

1. Start a local HTTP server at directory `./cdn-fallback`

   > *You may use the command below if you have already installed Node.js and npm in your computer, or you can use any HTTP server you like.*
```bash
npx http-server ./cdn-fallback/ -p 8000 -o /`
```
2. The script will attempt to dynamically import the BlendVision Player module from the following URLs:
   - `https://cdn.invalid.com/@blendvision/player@2.22.1/index.js` (intentionally invalid)
   - `https://cdn.jsdelivr.net/npm/@blendvision/player@2.22.1/index.js`
   - `https://unpkg.com/@blendvision/player@2.22.1`
3. If the first CDN fails, the fallback mechanism will try the next CDN in sequence.
4. The player is then initialized inside the `#my-player` container.

## CDN Fallback Mechanism

The fallback is implemented with the following JavaScript function:

```js
async function importWithFallback(urls) {
  for (let url of urls) {
    try {
      return await import(url);
    } catch (e) {
      console.warn(`Failed to import ${url}:`, e);
    }
  }
  console.error("All fallback imports failed.");
}
```

### Example Usage

Place the code below before where you use the imported features, in `<script type="module"></script>` tags.
> ***Note**: Make sure you add `type="module"` to the containing `<script>` tag, or this will not work.*

```js
<script type="module">
  // This is the minified version of the importWithFallback function, 
  // add this before you call the function.
  async function importWithFallback(a){for(let r of a)try{return await import(r)}catch(t){console.warn(`Failed to import ${r}:`,t)}console.error("All fallback imports failed.")}

  // Call importWithFallback to import from the first CDN source that 
  // loads successfully.
  await importWithFallback([
    'https://cdn.jsdelivr.net/npm/@blendvision/player@2.22.1/index.js',
    'https://unpkg.com/@blendvision/player@2.22.1',
  ]);

  // Now you may use the imported features here.
  ...
</script>
```

## Notes

- Errors and fallbacks will be logged in the browser console for easier debugging.

## Browser Compatibility

This sample requires a modern browser that supports ES modules and dynamic `import()`.

