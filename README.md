# Currency Converter Chrome Extension

This Chrome Extension allows users to select highlight a currency and value and converts the currency into a desired currency given in the popup. This Chrome extension uses [React](https://react.dev/) with TypeScript and Webpack, ([storage](https://developer.chrome.com/docs/extensions/reference/api/storage), [contextMenus](https://developer.chrome.com/docs/extensions/reference/api/contextMenus), and uses the API. 

## Installation

### Install From Release

- Download the latest release from the [Releases](https://github.com/grantwells10/currency-converter/releases)
- Unzip the downloaded ZIP file
- Open Chrome and navigate to `chrome://extensions`
- Enable "Developer mode"
- Drag and drop the unzipped folder into the extensions page

### Install From Source

1. Clone the repository:

   ```bash
   git clone https://github.com/grantwells10/currency-converter
   ```

2. Install dependencies:

   ```bash
   cd chrome-extension-text-collector
   npm install
   ```

3. Build the extension:

   ```bash
   npm run build
   ```

4. Load the extension in Chrome:

   - Open Chrome and navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` directory from the project

## Chrome Extension Architecture

This project follows the Manifest V3 architecture for Chrome extensions. Key components of the architecture include:

- `manifest.json`: Defines the extension's metadata, permissions, and script configurations
- `background.js`: Runs in the background and handles events and long-running tasks
- `content.js`: Runs all helper functions to retrieve API data and converts currency values. 
- 'App.tsx: Shows what to display in the popup menu to allow users to select the target currency.


## Credits

The initial setup of this project was based on the tutorial by [Harshita Joshi](https://github.com/Harshita-mindfire) on creating a Chrome extension with React and TypeScript. The corresponding Medium article can be found [here](https://medium.com/@tharshita13/creating-a-chrome-extension-with-react-a-step-by-step-guide-47fe9bab24a1). Additionally, this repo is based on Jérémie Lumbroso's [Text Collector](https://github.com/jlumbroso/chrome-extension-text-collector) chrome extension. 
