# Tin Hat Satellite Tracker

Modern Vue 3 implementation of the Tin Hat satellite tracking application.

## Overview

Tin Hat is a satellite tracking application that provides a visual representation of satellites orbiting Earth. The application allows users to:

- View different categories of satellites (ISS, Starlink, GPS, etc.)
- Get real-time satellite position data
- View satellite details in both informational and graphical formats
- Search for locations on Earth
- Toggle between various view modes

This project is a modernized version of the original Tin Hat application, converted from a PHP-based structure to a fully-featured Vue 3 application with proper modular organization and build tools.

## Features

- Interactive satellite tracking interface
- Real-time satellite data from N2YO API
- Geocoding and reverse geocoding with LocationIQ API
- Orbit visualization with animation
- Responsive design for both desktop and mobile
- Fullscreen and viewport toggle options
- Embedded solar system view

## Technical Details

- **Frontend Framework**: Vue 3 with Options API
- **Styling**: SCSS
- **Build Tools**: Webpack, Babel
- **API Integration**: N2YO Satellite API, LocationIQ Geocoding API
- **Component Architecture**: Properly structured Vue components
- **Environment Variables**: API keys and configuration

## Project Structure

```
tinhat/
├── public/               # Static assets
├── src/
│   ├── assets/
│   │   └── scss/         # Global SCSS styles
│   ├── components/       # Vue components
│   ├── services/         # API service modules
│   ├── App.vue           # Root component
│   └── main.js           # Application entry point
├── .env                  # Environment variables
└── webpack.config.js     # Webpack configuration
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- Yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/tinhat-archive.git
   cd tinhat-archive
   ```

2. Install dependencies
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory with your API keys
   ```
   VUE_APP_N2YO_API_KEY=your-n2yo-api-key
   VUE_APP_LOCATIONIQ_API_KEY=your-locationiq-api-key
   VUE_APP_CORS_PROXY=https://cors-anywhere-example.com/
   ```

### Development

Start the development server:
```
yarn dev
```

### Production Build

Build for production:
```
yarn build
```

## Credits

- Original Tin Hat application by Woven IT
- N2YO API for satellite tracking data
- LocationIQ for geocoding services

## License

MIT
