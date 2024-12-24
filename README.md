# Windsurf Prompts Chrome Extension

## Overview

Windsurf Prompts is a Chrome extension designed to easily copy and paste prompts from the Windsurf Prompts Repository.

## Features

- Quick access to prompts
- Easy copy-paste functionality
- Seamless integration with Windsurf platform

## Installation

### From Chrome Web Store

1. Visit the [Chrome Web Store Listing](https://chrome.google.com/webstore/detail/your-extension-id)
2. Click "Add to Chrome"
3. Confirm the installation

### Manual Installation

1. Download the latest `extension.zip` from the [Releases](https://github.com/yourusername/windsurf-prompts-extension/releases) page
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Drag and drop the downloaded ZIP file into the extensions page

## Development

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/windsurf-prompts-extension.git
cd windsurf-prompts-extension
```

2. Install dependencies
```bash
npm install
```

### Development Workflow

- `npm run dev`: Start development mode with hot reloading
- `npm run build`: Create a production build
- `npm run build:zip`: Create a distributable ZIP file for Chrome Web Store

### Loading in Chrome

1. Run `npm run dev`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dist` directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Permissions

This extension requires the following permissions:
- `activeTab`: To interact with the current browser tab
- `downloads`: To enable screenshot downloading
- `tabs`: To access tab information

## Troubleshooting

- Ensure you're using the latest version of Chrome
- Check browser console for any error messages
- Verify extension permissions are correctly set

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/windsurf-prompts-extension](https://github.com/yourusername/windsurf-prompts-extension)
